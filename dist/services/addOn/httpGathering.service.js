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
    logger.info("- loading client http -");
    for (let config of httpConfig ?? []) {
        let prefix = config.prefix ?? (httpConfig.indexOf(config) + "-");
        promises.push((async () => {
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
    let method = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "METHOD", config.prefix ?? (httpConfig.indexOf(config) + "-"));
    let header = await getHeader(config);
    let body = getBody(config);
    if (!header)
        return await makeHttpRequest(method, url, body);
    return await makeHttpRequest(method, url, body, header);
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
    }
    catch (e) {
        logger.error("error in getDataHttp with the url: " + url);
        logger.error(e);
    }
    return httpResources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cEdhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2h0dHBHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7O0VBUUU7Ozs7OztBQUVGLDhDQUFzQjtBQUV0QixzRkFBc0U7QUFFdEUsbURBQWdEO0FBQ2hELGtEQUFpRTtBQUNqRSxrREFBMEI7QUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBRyxHQUFHLENBQUM7QUFDL0MsSUFBSSxVQUFVLEdBQWlCLEVBQUUsQ0FBQztBQUVsQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBRXhCLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsWUFBWSxDQUFDLENBQUM7QUFFMUMsd0dBQXdHO0FBQ3hHLDJCQUEyQjtBQUMzQix3R0FBd0c7QUFDakcsS0FBSyxVQUFVLFdBQVcsQ0FBQyxXQUF3QjtJQUN0RCxVQUFVLEdBQUcsV0FBVyxDQUFDO0lBQ3pCLElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFpQixDQUFDO0lBQzNDLElBQUksUUFBUSxHQUFRLEVBQUUsQ0FBQTtJQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDdkMsS0FBSSxJQUFJLE1BQU0sSUFBSSxVQUFVLElBQUUsRUFBRSxFQUFDO1FBQzdCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdELFFBQVEsQ0FBQyxJQUFJLENBQ1QsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNSLElBQUksYUFBYSxHQUFHO2dC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