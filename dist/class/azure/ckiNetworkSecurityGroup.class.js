"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CkiNetworkSecurityGroupClass = void 0;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// class azure CLOUD RESOURCES
////////////////////////////////////////////////////////////////////////////////////////////////////////
class CkiNetworkSecurityGroupClass {
    analysed = false;
    scanningDate = new Date();
    securityLevel = 0;
    constructor() { }
    setAnalysed(value) {
        this.analysed = value;
    }
    setScanningDate(value) {
        this.scanningDate = value;
    }
    setSecurityLevel(value) {
        this.securityLevel = value;
    }
    getAnalysed() {
        return this.analysed;
    }
    getScanningDate() {
        return this.scanningDate;
    }
    getSecurityLevel() {
        return this.securityLevel;
    }
    addAnalysed(value) {
        this.analysed = value;
        return this;
    }
    addScanningDate(value) {
        this.scanningDate = value;
        return this;
    }
    addSecurityLevel(value) {
        this.securityLevel = value;
        return this;
    }
}
exports.CkiNetworkSecurityGroupClass = CkiNetworkSecurityGroupClass;
//# sourceMappingURL=ckiNetworkSecurityGroup.class.js.map