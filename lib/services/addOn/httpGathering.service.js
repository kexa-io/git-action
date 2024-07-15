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
const tls_1 = __importDefault(require("tls"));
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
            let listHttpResources = new Array();
            try {
                const url = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "URL", prefix);
                if (!url) {
                    throw new Error("- Please pass URL in your config file");
                }
                if (!Array.isArray(url)) {
                    let data = await getDataHttp(url, config);
                    listHttpResources.push(data);
                }
                else {
                    await Promise.all(url.map(async (url) => {
                        let data = await getDataHttp(url, config);
                        listHttpResources.push(data);
                        return Promise.resolve();
                    }));
                }
            }
            catch (e) {
                logger.error("error in collectHttpData with the url: " + ((await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "URL", prefix)) ?? null));
                logger.error(e);
            }
            return { request: listHttpResources };
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
            const cipherName = socket.encrypted ? socket.getCipher().name : null;
            const protocolVersion = socket.encrypted ? socket.getProtocol() : null;
            const TLS = {
                cipherName,
                protocolVersion,
            };
            socket.end();
            resolve({ cert, TLS });
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
        const { cert, TLS } = await getCertificateFromResponse(response);
        httpResources.certificate = cert;
        httpResources.tls = TLS;
        httpResources.delays = response?.delays;
    }
    catch (e) {
        logger.error("error in getDataHttp with the url: " + url);
        logger.error(e);
    }
    return httpResources;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cEdhdGhlcmluZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2h0dHBHYXRoZXJpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7O0VBUUU7Ozs7OztBQUVGLDhDQUFzQjtBQUV0Qiw4Q0FBcUM7QUFFckMsc0ZBQXNFO0FBRXRFLG1EQUFnRDtBQUNoRCxrREFBaUU7QUFDakUsa0RBQTBCO0FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsR0FBRyxDQUFDO0FBQy9DLElBQUksVUFBVSxHQUFpQixFQUFFLENBQUM7QUFFbEMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUV4QixzREFBK0M7QUFDL0MsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFlBQVksQ0FBQyxDQUFDO0FBRTFDLHdHQUF3RztBQUN4RywyQkFBMkI7QUFDM0Isd0dBQXdHO0FBQ2pHLEtBQUssVUFBVSxXQUFXLENBQUMsV0FBd0I7SUFDdEQsVUFBVSxHQUFHLFdBQVcsQ0FBQztJQUN6QixJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBaUIsQ0FBQztJQUMzQyxJQUFJLFFBQVEsR0FBUSxFQUFFLENBQUE7SUFDdEIsS0FBSSxJQUFJLE1BQU0sSUFBSSxVQUFVLElBQUUsRUFBRSxFQUFDO1FBQzdCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDcEUsUUFBUSxDQUFDLElBQUksQ0FDVCxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQzND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