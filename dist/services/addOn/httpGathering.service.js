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
//# sourceMappingURL=httpGathering.service.js.map