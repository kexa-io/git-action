"use strict";
/*
    * Provider : http
    * Thumbnail : https://cdn-icons-png.flaticon.com/512/2165/2165004.png
    * Documentation : https://developer.mozilla.org/fr/docs/Web/HTTP
    * Creation date : 2023-08-14
    * Note :
    * Resources :
    *     - request
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectData = void 0;
const dns_1 = __importDefault(require("dns"));
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const isEmpty_1 = require("../../helpers/isEmpty");
const axios_1 = __importDefault(require("axios"));
const https_1 = __importDefault(require("https"));
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
let httpConfig = [];
const jsome = require('jsome');
jsome.level.show = true;
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("HttpLogger");
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING HTTP RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function collectData(_httpConfig) {
    httpConfig = _httpConfig;
    let resources = new Array();
    let promises = [];
    for (let config of httpConfig ?? []) {
        let prefix = config.prefix ?? (httpConfig.indexOf(config).toString());
        promises.push((async () => {
            logger.info("- add one config for http -");
            let httpResources = {
                certificate: null,
                body: null,
                headers: null,
                code: null,
            };
            try {
                const url = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "URL", prefix);
                if (!url) {
                    throw new Error("- Please pass URL in your config file");
                }
                httpResources = await getDataHttp(url, config);
            }
            catch (e) {
                logger.error("error in collectHttpData with the url: " + ((await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "URL", prefix)) ?? null));
                logger.error(e);
            }
            return { request: [httpResources] };
        })());
    }
    const results = await Promise.all(promises);
    resources.push(...results);
    logger.info("- listing http resources done -");
    return resources ?? null;
}
exports.collectData = collectData;
async function getHeader(config) {
    let authorization = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "AUTHORIZATION", config.prefix ?? (httpConfig.indexOf(config) + "-"));
    let header = { ...config.header };
    if (authorization) {
        header["Authorization"] = authorization;
    }
    if ((0, isEmpty_1.isEmpty)(header))
        return null;
    return header;
}
function getBody(config) {
    let body = config.body;
    if ((0, isEmpty_1.isEmpty)(body))
        return null;
    return body;
}
const tls_1 = __importDefault(require("tls"));
const URL = require('url');
async function makeHttpRequest(method, url, body, headers) {
    const agent = new https_1.default.Agent({
        rejectUnauthorized: false,
    });
    const requestConfig = {
        method: method,
        url,
        data: body,
        headers,
        validateStatus: (status) => status >= 0 && status < 1000,
        httpsAgent: agent,
    };
    try {
        const response = await (0, axios_1.default)(requestConfig);
        return response;
    }
    catch (error) {
        throw error;
    }
}
async function getCertificateFromResponse(response) {
    return new Promise((resolve, reject) => {
        const socket = tls_1.default.connect({
            host: URL.parse(response.config.url).hostname,
            port: 443,
            socket: response.config.httpsAgent?.keepAliveSocket,
        }, () => {
            const cert = socket.getPeerCertificate();
            socket.end();
            resolve(cert);
        });
        socket.on('error', (err) => {
            resolve(null);
        });
    });
}
async function dnsLookup(hostname) {
    return new Promise((resolve, reject) => {
        dns_1.default.resolve(hostname, (err, addresses) => {
            if (err) {
                resolve(null);
            }
            else {
                resolve(addresses);
            }
        });
    });
}
async function doRequest(url, config) {
    const method = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "METHOD", config.prefix ?? (httpConfig.indexOf(config) + "-"));
    const header = await getHeader(config);
    const body = getBody(config);
    const start = Date.now();
    let result = null;
    if (!header)
        result = await makeHttpRequest(method, url, body);
    else
        result = await makeHttpRequest(method, url, body, header);
    const delays = Date.now() - start;
    return {
        ...result,
        delays: delays,
    };
}
async function getDataHttp(url, config) {
    let httpResources = {
        certificate: null,
        body: null,
        headers: null,
        code: null,
    };
    try {
        let response = await doRequest(url, config);
        httpResources.body = response?.data;
        httpResources.headers = response?.headers;
        httpResources.code = response?.status;
        httpResources.url = url;
        httpResources.ip = await dnsLookup(URL.parse(url).hostname);
        httpResources.certificate = await getCertificateFromResponse(response);
        httpResources.delays = response?.delays;
    }
    catch (e) {
        logger.error("error in getDataHttp with the url: " + url);
        logger.error(e);
    }
    return httpResources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cEdhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2h0dHBHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7O0VBUUU7Ozs7OztBQUVGLDhDQUFzQjtBQUV0QixzRkFBc0U7QUFFdEUsbURBQWdEO0FBQ2hELGtEQUFpRTtBQUNqRSxrREFBMEI7QUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBRyxHQUFHLENBQUM7QUFDL0MsSUFBSSxVQUFVLEdBQWlCLEVBQUUsQ0FBQztBQUVsQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBRXhCLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsWUFBWSxDQUFDLENBQUM7QUFFMUMsd0dBQXdHO0FBQ3hHLDJCQUEyQjtBQUMzQix3R0FBd0c7QUFDakcsS0FBSyxVQUFVLFdBQVcsQ0FBQyxXQUF3QjtJQUN0RCxVQUFVLEdBQUcsV0FBVyxDQUFDO0lBQ3pCLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFpQixDQUFDO0lBQzNDLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQTtJQUN0QixLQUFJLElBQUksTUFBTSxJQUFJLFVBQVUsSUFBRSxFQUFFLEVBQUM7UUFDN0IsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNwRSxRQUFRLENBQUMsSUFBSSxDQUNULENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDM0MsSUFBSSxhQUFhLEdB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