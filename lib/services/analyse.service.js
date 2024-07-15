"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEqualThanDate = exports.checkLessThanDate = exports.checkGreaterThanDate = exports.checkLessThanDateOrEqual = exports.checkGreaterThanDateOrEqual = exports.generateDate = exports.checkInterval = exports.checkIntervalDate = exports.checkEqualDate = exports.checkCount = exports.checkOne = exports.checkSome = exports.checkAll = exports.checkEndsWith = exports.checkStartsWith = exports.checkRegex = exports.checkIncludeNS = exports.checkInclude = exports.checkLessThan = exports.checkGreaterThan = exports.checkEqual = exports.getSubProperty = exports.resultScan = exports.checkCondition = exports.parentResultScan = exports.checkParentRule = exports.checkRule = exports.checkRules = exports.checkSubRuleCondition = exports.checkParentRuleCondition = exports.checkRuleCondition = exports.checkDocRules = exports.checkDocAlertGlobal = exports.checkDocAlertConfig = exports.checkDocAlert = exports.checkDoc = exports.logCheckDoc = exports.replaceBlockVariable = exports.replaceVariable = exports.replaceElement = exports.analyzeRule = exports.extractAddOnNeed = exports.gatheringDistantRules = exports.gatheringRules = void 0;
const level_enum_1 = require("./../enum/level.enum");
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const condition_enum_1 = require("../enum/condition.enum");
const operator_enum_1 = require("../enum/operator.enum");
const alerte_service_1 = require("./alerte.service");
const alert_enum_1 = require("../enum/alert.enum");
const manageVarEnvironnement_service_1 = require("./manageVarEnvironnement.service");
const moment_1 = __importDefault(require("moment"));
const beHavior_enum_1 = require("../enum/beHavior.enum");
const files_1 = require("../helpers/files");
const loaderConfig_1 = require("../helpers/loaderConfig");
const jsonStringify_1 = require("../helpers/jsonStringify");
////////////////////////////////////////////////////////////////////////////////////////////////////////
const logger_service_1 = require("./logger.service");
const spliter_1 = require("../helpers/spliter");
const dowloadFile_1 = require("../helpers/dowloadFile");
const logger = (0, logger_service_1.getNewLogger)("AnalyseLogger");
const jsome = require('jsome');
jsome.level.show = true;
const varEnvMin = {
    "email": ["EMAILPORT", "EMAILHOST", "EMAILUSER", "EMAILPWD", "EMAILFROM"],
    "sms": ["SMSACCOUNTSID", "SMSAUTHTOKEN", "SMSFROM"],
};
const config = require('node-config-ts').config;
const levelAlert = ["info", "warning", "error", "critical"];
let headers;
const defaultRulesDirectory = "./rules";
// Analyze  list
// read the yaml file with rules
// exam each rules and raise alarm or not
async function gatheringRules(rulesDirectory, getAll = false) {
    //await extractHeaders();
    // list directory
    if (rulesDirectory.startsWith("http")) {
        logger.debug("gathering distant rules");
        await gatheringDistantRules(rulesDirectory);
        rulesDirectory = defaultRulesDirectory;
    }
    const paths = fs_1.default.readdirSync(rulesDirectory, { withFileTypes: true });
    logger.debug("listing rules files.");
    let settingFileList = new Array;
    headers = require('../../config/headers.json');
    let listNeedRules = getListNeedRules();
    for (const p of paths) {
        logger.debug("getting " + rulesDirectory + "/" + p.name + " rules.");
        let setting = await analyzeRule(rulesDirectory + "/" + p.name, listNeedRules, getAll);
        if (setting) {
            setting.alert.global.name = p.name.split(".")[0];
            settingFileList.push(setting);
        }
    }
    extractAddOnNeed(settingFileList);
    logger.debug("rules list:");
    logger.debug(settingFileList.map((value) => value.alert.global.name).join(", "));
    return settingFileList;
}
exports.gatheringRules = gatheringRules;
async function gatheringDistantRules(rulesOrigin, rulesDirectory = defaultRulesDirectory) {
    try {
        await (0, dowloadFile_1.downloadFile)(rulesOrigin, rulesDirectory, "application/zip");
        await (0, dowloadFile_1.unzipFile)(rulesDirectory);
        return true;
    }
    catch (err) {
        logger.error("error in gatheringDistantRules:" + err);
        return false;
    }
}
exports.gatheringDistantRules = gatheringDistantRules;
function extractAddOnNeed(settingFileList) {
    let providerList = new Array();
    let objectNameList = {};
    settingFileList.forEach((ruleFile) => {
        objectNameList[ruleFile.alert.global.name] = {};
        ruleFile.rules.forEach((rule) => {
            if (!providerList.includes(rule.cloudProvider))
                providerList.push(rule.cloudProvider);
            if (!objectNameList[ruleFile.alert.global.name][rule.cloudProvider])
                objectNameList[ruleFile.alert.global.name][rule.cloudProvider] = new Array();
            if (!objectNameList[ruleFile.alert.global.name][rule.cloudProvider].includes(rule.objectName))
                objectNameList[ruleFile.alert.global.name][rule.cloudProvider].push(rule.objectName);
        });
    });
    (0, files_1.writeStringToJsonFile)((0, jsonStringify_1.jsonStringify)({ "addOn": providerList, "objectNameNeed": objectNameList }), "./config/addOnNeed.json");
}
exports.extractAddOnNeed = extractAddOnNeed;
function getListNeedRules() {
    const config = require('node-config-ts').config;
    let listNeedRules = new Array();
    for (let cloudProvider of Object.keys(config)) {
        if (["host", "host", "workerId", "requestId", "grpcMaxMessageLength"].includes(cloudProvider))
            continue;
        try {
            let configAssign = config[cloudProvider];
            for (let config of configAssign) {
                if (Array.isArray(config?.rules)) {
                    for (let rule of config.rules) {
                        if (!listNeedRules.includes(rule))
                            listNeedRules.push(rule);
                    }
                }
            }
        }
        catch (err) {
            logger.debug("error in getListNeedRules:" + err);
        }
    }
    return listNeedRules;
}
async function analyzeRule(ruleFilePath, listNeedRules, getAll = false) {
    logger.debug("analyze:" + ruleFilePath);
    try {
        let lastBlockSplited = ruleFilePath.split('/')[ruleFilePath.split('/').length - 1].split(".");
        if (lastBlockSplited.length == 1) {
            logger.debug("It's a directory");
            return null;
        }
        const name = lastBlockSplited[0];
        if (!listNeedRules.includes(name) && !getAll) {
            logger.debug("rule not needed:" + name);
            return null;
        }
        let contentRuleFile = fs_1.default.readFileSync(ruleFilePath, 'utf8');
        contentRuleFile = replaceElement(contentRuleFile, (0, loaderConfig_1.getConfig)()?.variable?.[name]);
        const doc = js_yaml_1.default.load(contentRuleFile)[0];
        let result = await checkDoc(doc);
        logCheckDoc(result);
        result.forEach((value) => {
            if (value.startsWith("error"))
                throw new Error(value);
        });
        logger.info("rule:" + name + " is valid");
        return doc;
    }
    catch (e) {
        logger.error("error - " + ruleFilePath + " was not load properly : " + e);
        return null;
    }
}
exports.analyzeRule = analyzeRule;
function replaceElement(contentRuleFile, variable) {
    if (!variable)
        return contentRuleFile;
    if (typeof variable !== "object")
        return contentRuleFile;
    for (let key of Object.keys(variable)) {
        if (typeof variable[key] === "object") {
            contentRuleFile = replaceBlockVariable(contentRuleFile, variable[key], key);
        }
        else {
            contentRuleFile = replaceVariable(contentRuleFile, variable[key], key);
        }
    }
    return contentRuleFile;
}
exports.replaceElement = replaceElement;
function replaceVariable(contentRuleFile, variable, key) {
    if (!variable)
        return contentRuleFile;
    let regex = new RegExp('\\b' + key + ': &' + key + '\\b', 'g');
    if (regex.test(contentRuleFile)) {
        contentRuleFile = contentRuleFile.slice(0, regex.lastIndex).trimEnd() + " " + variable.toString() + contentRuleFile.slice(regex.lastIndex);
    }
    return contentRuleFile;
}
exports.replaceVariable = replaceVariable;
function replaceBlockVariable(contentRuleFile, variable, key) {
    if (!variable)
        return contentRuleFile;
    let indentation = contentRuleFile.split('\n').filter((line) => { return line.trim() !== '' && /^(\s+)/.test(line); })[0].match(/^(\s+)/)?.[0] ?? "  ";
    variable = js_yaml_1.default.dump(variable, { indent: indentation.length });
    let regex = new RegExp('\\b' + key + ': &' + key + '\\b', 'g');
    if (regex.test(contentRuleFile)) {
        const lastIndex = regex.lastIndex;
        contentRuleFile = contentRuleFile.slice(0, lastIndex).trimEnd() + "\n" + variable.toString().split('\n').map((line) => indentation + indentation + line).join('\n') + contentRuleFile.slice(lastIndex);
    }
    return contentRuleFile;
}
exports.replaceBlockVariable = replaceBlockVariable;
function logCheckDoc(result) {
    logger.debug("log check doc");
    result.forEach((value) => {
        if (value.startsWith("error"))
            logger.error(value);
        else if (value.startsWith("warn"))
            logger.warning(value);
        else if (value.startsWith("info"))
            logger.info(value);
        else
            logger.debug(value);
    });
}
exports.logCheckDoc = logCheckDoc;
async function checkDoc(doc) {
    logger.debug("check doc");
    let result = [];
    if (!doc.hasOwnProperty("version"))
        result.push("info - version not found in doc");
    else if (RegExp(/^[0-9]+\.[0-9]+\.[0-9]+$/).exec(doc.version) === null)
        result.push("debug - version not valid in doc : " + doc.version);
    if (!doc.hasOwnProperty("date"))
        result.push("info - date not found in doc");
    else if (RegExp(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/).exec(doc.date) === null)
        result.push("debug - date not valid in doc : " + doc.date);
    (await checkDocAlert(doc.alert)).forEach((value) => result.push(value));
    checkDocRules(doc.rules).forEach((value) => result.push(value));
    return result;
}
exports.checkDoc = checkDoc;
async function checkDocAlert(alert) {
    logger.debug("check Alert in doc");
    let result = [];
    for (let level of Object.keys(level_enum_1.LevelEnum)) {
        if (!isNaN(Number(level))) {
            continue;
        }
        if (!alert.hasOwnProperty(level.toLowerCase())) {
            result.push("error - " + level.toLowerCase() + " not found in alert");
            continue;
        }
        if (level.toLowerCase() != "global") {
            (await checkDocAlertConfig(alert[level.toLowerCase()], level.toLowerCase())).forEach((value) => result.push(value));
        }
        else {
            (await checkDocAlertGlobal(alert.global)).forEach((value) => result.push(value));
        }
    }
    return result;
}
exports.checkDocAlert = checkDocAlert;
async function checkDocAlertConfig(alertConfig, level) {
    logger.debug("check Alert config in doc");
    let result = [];
    if (!alertConfig.hasOwnProperty("enabled"))
        result.push("error - enabled not found in alert config for " + level);
    else if (typeof alertConfig.enabled !== "boolean")
        result.push("error - enabled not boolean in alert config for " + level + " : " + alertConfig.enabled);
    if (!alertConfig.hasOwnProperty("type"))
        result.push("error - type not found in alert config for " + level);
    else {
        if (alertConfig.type.length === 0)
            result.push("error - type empty in alert config for " + level);
        for (let type of alertConfig.type) {
            if (!Object.values(alert_enum_1.AlertEnum).includes(type)) {
                result.push("warn - type not valid in alert config for " + level + " : " + type);
                continue;
            }
            try {
                for (let env of varEnvMin[type.toLowerCase()]) {
                    if (!(await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, env)))
                        result.push("error - " + env + " not found in env for " + level);
                }
            }
            catch (err) { }
        }
        ;
    }
    if (alertConfig.hasOwnProperty("type") && alertConfig.type.some((type) => type !== alert_enum_1.AlertEnum.LOG)) {
        if (!alertConfig.hasOwnProperty("to"))
            result.push("error - to not found in alert config for " + level);
        else {
            if (alertConfig.to.length === 0)
                result.push("warn - to empty in alert config for " + level);
            alertConfig.to.forEach((to) => {
                if (typeof to !== "string")
                    result.push("error - to not string in alert config for " + level + " : " + to);
            });
        }
    }
    return result;
}
exports.checkDocAlertConfig = checkDocAlertConfig;
async function checkDocAlertGlobal(alertGlobal) {
    logger.debug("check Alert global in doc");
    let result = [];
    (await checkDocAlertConfig(alertGlobal, "global")).forEach((value) => result.push(value));
    if (!alertGlobal.hasOwnProperty("conditions"))
        result.push("error - conditions not found in alert global config");
    else {
        if (alertGlobal.conditions.length === 0)
            result.push("error - conditions empty in alert global config");
        alertGlobal.conditions.forEach((condition) => {
            if (!condition.hasOwnProperty("level"))
                result.push("error - level not found in alert global config");
            else if (!Object.values(level_enum_1.LevelEnum).includes(condition.level))
                result.push("warn - level not valid in alert global config for " + condition.level);
            if (!condition.hasOwnProperty("min"))
                result.push("error - min not found in alert global config");
            else if (typeof condition.min !== "number" && condition.min >= 0)
                result.push("warn - min is not positive number in alert global config : " + condition.min);
        });
    }
    //if (!alertGlobal.hasOwnProperty("name")) result.push("error - name empty in alert global config");
    //else if (typeof alertGlobal.name !== "string") result.push("warn - name not string in alert global config : "+alertGlobal.name);
    return result;
}
exports.checkDocAlertGlobal = checkDocAlertGlobal;
function checkDocRules(rules) {
    logger.debug("check rules in doc");
    let result = [];
    if (rules.length === 0)
        result.push("error - rules empty in doc");
    rules.forEach((rule) => {
        if (!rule.hasOwnProperty("name"))
            result.push("info - name not found in rule");
        else if (typeof rule.name !== "string")
            result.push("warn - name not string in rule : " + rule.name);
        if (!rule.hasOwnProperty("description"))
            result.push("info - description not found in rule");
        else if (typeof rule.description !== "string")
            result.push("warn - description not string in rule : " + rule.description);
        if (!rule.hasOwnProperty("urlDescription"))
            result.push("debug - urlDescription not found in rule");
        else if (typeof rule.urlDescription !== "string")
            result.push("warn - urlDescription not string in rule : " + rule.urlDescription);
        if (!rule.hasOwnProperty("applied"))
            result.push("error - applied not found in rule");
        else if (typeof rule.applied !== "boolean")
            result.push("error - applied not boolean in rule : " + rule.applied);
        if (!rule.hasOwnProperty("level"))
            result.push("error - level not found in rule");
        else if (!Object.values(level_enum_1.LevelEnum).includes(rule.level))
            result.push("warn - level not valid in rule -> default info : " + rule.level);
        if (headers) {
            if (!rule.hasOwnProperty("cloudProvider"))
                result.push("error - cloudProvider not found in rule");
            else if (!Object.keys(headers).includes(rule.cloudProvider))
                result.push("error - cloudProvider not valid in rule : " + rule.cloudProvider + "\nYou have to add this addOn to validate the rules");
            if (!rule.hasOwnProperty("objectName"))
                result.push("error - objectName not found in rule");
            else if (!Object.keys(headers).includes(rule.cloudProvider) || !headers[rule.cloudProvider]["resources"]?.includes(rule.objectName))
                result.push("error - objectName not valid in rule : " + rule.objectName + "\nYou have to verify your addOn gathering data about it");
        }
        if (!rule.hasOwnProperty("conditions"))
            result.push("error - conditions not found in rule");
        else {
            if (rule.conditions.length === 0)
                result.push("error - conditions empty in rule");
            rule.conditions.forEach((condition) => {
                checkRuleCondition(condition).forEach((value) => result.push(value));
            });
        }
    });
    return result;
}
exports.checkDocRules = checkDocRules;
function checkRuleCondition(condition) {
    logger.debug("check rule condition");
    let result = [];
    if (condition.hasOwnProperty("criteria")) {
        checkParentRuleCondition(condition).forEach((value) => result.push(value));
    }
    else {
        checkSubRuleCondition(condition).forEach((value) => result.push(value));
    }
    return result;
}
exports.checkRuleCondition = checkRuleCondition;
function checkParentRuleCondition(parentRule) {
    logger.debug("check parent rule condition");
    let result = [];
    if (!parentRule.hasOwnProperty("name"))
        result.push("debug - name not found in parent rule condition");
    else if (typeof parentRule.name !== "string")
        result.push("warn - name not string in parent rule condition : " + parentRule.name);
    if (!parentRule.hasOwnProperty("description"))
        result.push("debug - description not found in parent rule condition");
    else if (typeof parentRule.description !== "string")
        result.push("warn - description not string in parent rule condition : " + parentRule.description);
    if (!parentRule.hasOwnProperty("operator"))
        result.push("error - operator not found in parent rule condition");
    else if (!Object.values(operator_enum_1.OperatorEnum).includes(parentRule.operator))
        result.push("error - operator not valid in parent rule condition : " + parentRule.operator);
    else if (parentRule.operator === operator_enum_1.OperatorEnum.NOT && parentRule.criteria.length > 1)
        result.push("warn - operator not will be considered in criteria only the first one");
    if (!parentRule.hasOwnProperty("criteria"))
        result.push("error - criteria not found in parent rule condition");
    else {
        if (parentRule.criteria.length === 0)
            result.push("error - criteria empty in parent rule condition");
        parentRule.criteria.forEach((rule) => {
            checkRuleCondition(rule).forEach((value) => result.push(value));
        });
    }
    return result;
}
exports.checkParentRuleCondition = checkParentRuleCondition;
function checkSubRuleCondition(subRule) {
    logger.debug("check sub rule condition");
    let result = [];
    if (!subRule.hasOwnProperty("property"))
        result.push("error - property not found in sub rule condition");
    else if (typeof subRule.property !== "string")
        result.push("error - property not string in sub rule condition : " + subRule.property);
    if (!subRule.hasOwnProperty("condition"))
        result.push("error - condition not found in sub rule condition");
    else if (!Object.values(condition_enum_1.ConditionEnum).includes(subRule.condition))
        result.push("error - condition not valid in sub rule condition : " + subRule.condition);
    else if (subRule.condition.includes("DATE") && !subRule.hasOwnProperty("date"))
        result.push("error - date not found in sub rule condition");
    if (!subRule.hasOwnProperty("value"))
        result.push("error - value not found in sub rule condition");
    //else if(typeof subRule.value !== "string" && typeof subRule.value !== "number" && !Array.isArray(subRule.value)) result.push("error - value not valid in sub rule condition : " + subRule.value);
    //else if(Array.isArray(subRule.value) && subRule.value.length === 0) result.push("error - value empty in sub rule condition");
    //else if(Array.isArray(subRule.value)){
    //    subRule.value.forEach((value) => {
    //        checkRuleCondition(value).forEach((value) => result.push(value));
    //    });
    //}
    return result;
}
exports.checkSubRuleCondition = checkSubRuleCondition;
function checkMatchConfigAndResource(rule, resources, index) {
    if (!resources[rule.cloudProvider]) {
        logger.warning("This cloud provider is not supported:" + rule.cloudProvider + "\nDon't forget to add this addOn");
        return beHavior_enum_1.BeHaviorEnum.RETURN;
    }
    if (!Array.isArray(resources[rule.cloudProvider]) || resources[rule.cloudProvider].length === 0) {
        logger.warning("the addOn for : " + rule.cloudProvider + " are not supported multi-configuration");
        return beHavior_enum_1.BeHaviorEnum.NONE;
    }
    if (!resources[rule.cloudProvider][index].hasOwnProperty(rule.objectName)) {
        logger.warning("object name : " + rule.objectName + " not found in your provider " + rule.cloudProvider + " with configuration index " + index + "\nMake sure you have the right addOn or the right spelling in your rules");
        return beHavior_enum_1.BeHaviorEnum.CONTINUE;
    }
    if (resources[rule.cloudProvider][index][rule.objectName] === null) {
        logger.warning("No " + rule.objectName + " found in your provider " + rule.cloudProvider + " with configuration index " + index);
        return beHavior_enum_1.BeHaviorEnum.CONTINUE;
    }
    return beHavior_enum_1.BeHaviorEnum.NONE;
}
function checkRules(rules, resources, alert) {
    logger.debug("check rules");
    let result = [];
    rules.forEach(rule => {
        if (!rule.applied)
            return;
        logger.info("check rule:" + rule.name);
        if (!config.hasOwnProperty(rule.cloudProvider)) {
            logger.debug("cloud provider not found in config:" + rule.cloudProvider);
            return;
        }
        const configAssign = config[rule.cloudProvider];
        logger.info("check rule with config " + rule.cloudProvider);
        let objectResources = [];
        for (let i = 0; i < configAssign.length; i++) {
            if (configAssign[i].rules.includes(alert.global.name)) {
                logger.info("check rule with config " + rule.cloudProvider + " with index/prefix :" + (configAssign[i].prefix ?? i));
                switch (checkMatchConfigAndResource(rule, resources, i)) {
                    case beHavior_enum_1.BeHaviorEnum.RETURN:
                        return;
                    case beHavior_enum_1.BeHaviorEnum.CONTINUE:
                        continue;
                }
                objectResources = [...objectResources, ...resources[rule.cloudProvider][i][rule.objectName]];
            }
        }
        let subResult = [];
        if (rule.conditions[0].hasOwnProperty("property") && rule.conditions[0].property === ".") {
            let subResultScan = checkRule(rule.conditions, objectResources);
            subResult.push({
                objectContent: {
                    "id": "global property",
                },
                rule: rule,
                error: actionAfterCheckRule(rule, objectResources, alert, subResultScan),
            });
        }
        else {
            objectResources.forEach((objectResource) => {
                let subResultScan = checkRule(rule.conditions, objectResource);
                subResult.push({
                    objectContent: objectResource,
                    rule: rule,
                    error: actionAfterCheckRule(rule, objectResource, alert, subResultScan),
                });
            });
        }
        if (rule.loud && subResult[subResult.length - 1].error.length <= 0) {
            subResult[subResult.length - 1].loud = {
                value: subResult[subResult.length - 1].objectContent,
                condition: rule.conditions,
                result: true,
                message: rule.loudMessage ?? rule.name
            };
        }
        result.push(subResult);
    });
    return result;
}
exports.checkRules = checkRules;
function actionAfterCheckRule(rule, objectResource, alert, subResultScan) {
    let error = subResultScan.filter((value) => !value.result);
    if (error.length > 0) {
        (0, alerte_service_1.alertFromRule)(rule, subResultScan, objectResource, alert);
    }
    return error;
}
function checkRule(conditions, resources) {
    logger.debug("check subrule");
    let result = [];
    conditions.forEach(condition => {
        if (condition.hasOwnProperty("criteria")) {
            result.push(checkParentRule(condition, resources));
        }
        else {
            condition = condition;
            logger.debug("check condition:" + condition.property);
            result.push(checkCondition(condition, resources));
        }
    });
    return result;
}
exports.checkRule = checkRule;
function checkParentRule(parentRule, resources) {
    logger.debug("check parent rule");
    let result = checkRule(parentRule.criteria, resources);
    switch (parentRule.operator) {
        case operator_enum_1.OperatorEnum.AND:
            return parentResultScan(result, result.every((value) => value.result));
        case operator_enum_1.OperatorEnum.OR:
            return parentResultScan(result, result.some((value) => value.result));
        case operator_enum_1.OperatorEnum.XOR:
            return parentResultScan(result, result.filter((value) => value.result).length === 1);
        case operator_enum_1.OperatorEnum.NAND:
            return parentResultScan(result, !result.every((value) => value.result));
        case operator_enum_1.OperatorEnum.NOR:
            return parentResultScan(result, !result.some((value) => value.result));
        case operator_enum_1.OperatorEnum.XNOR:
            return parentResultScan(result, result.filter((value) => value.result).length !== 1);
        case operator_enum_1.OperatorEnum.NOT:
            return parentResultScan(result, !result[0].result);
        default:
            return {
                value: resources,
                condition: [],
                result: false,
                message: "operator not found in " + Object.keys(operator_enum_1.OperatorEnum).join(", ")
            };
    }
}
exports.checkParentRule = checkParentRule;
function parentResultScan(subResultScans, result) {
    return {
        value: null,
        condition: subResultScans.map((value) => value.condition).flat(),
        result,
        message: subResultScans.map((value) => value.message).filter(item => item != "").join(" || ")
    };
}
exports.parentResultScan = parentResultScan;
function checkCondition(condition, resource) {
    try {
        let value = getSubProperty(resource, condition.property);
        switch (condition.condition) {
            case condition_enum_1.ConditionEnum.EQUAL:
                return resultScan(condition, value, [checkEqual]);
            case condition_enum_1.ConditionEnum.DIFFERENT:
                return resultScan(condition, value, [checkEqual], true);
            case condition_enum_1.ConditionEnum.SUP:
                return resultScan(condition, value, [checkGreaterThan]);
            case condition_enum_1.ConditionEnum.SUP_OR_EQUAL:
                return resultScan(condition, value, [checkGreaterThan, checkEqual]);
            case condition_enum_1.ConditionEnum.INF:
                return resultScan(condition, value, [checkLessThan]);
            case condition_enum_1.ConditionEnum.INF_OR_EQUAL:
                return resultScan(condition, value, [checkLessThan, checkEqual]);
            case condition_enum_1.ConditionEnum.INCLUDE:
                return resultScan(condition, value, [checkInclude]);
            case condition_enum_1.ConditionEnum.NOT_INCLUDE:
                return resultScan(condition, value, [checkInclude], true);
            case condition_enum_1.ConditionEnum.STARTS_WITH:
                return resultScan(condition, value, [checkStartsWith]);
            case condition_enum_1.ConditionEnum.NOT_STARTS_WITH:
                return resultScan(condition, value, [checkStartsWith], true);
            case condition_enum_1.ConditionEnum.ENDS_WITH:
                return resultScan(condition, value, [checkEndsWith]);
            case condition_enum_1.ConditionEnum.NOT_ENDS_WITH:
                return resultScan(condition, value, [checkEndsWith], true);
            case condition_enum_1.ConditionEnum.INCLUDE_NOT_SENSITIVE:
                return resultScan(condition, value, [checkIncludeNS]);
            case condition_enum_1.ConditionEnum.NOT_INCLUDE_NOT_SENSITIVE:
                return resultScan(condition, value, [checkIncludeNS], true);
            case condition_enum_1.ConditionEnum.REGEX:
                return resultScan(condition, value, [checkRegex]);
            case condition_enum_1.ConditionEnum.ALL:
                return resultScan(condition, value, [checkAll]);
            case condition_enum_1.ConditionEnum.NOT_ANY:
                return resultScan(condition, value, [checkAll], true);
            case condition_enum_1.ConditionEnum.SOME:
                return resultScan(condition, value, [checkSome]);
            case condition_enum_1.ConditionEnum.ONE:
                return resultScan(condition, value, [checkOne]);
            case condition_enum_1.ConditionEnum.COUNT:
                return resultScan(condition, value.length, [checkEqual]);
            case condition_enum_1.ConditionEnum.COUNT_SUP:
                return resultScan(condition, value.length, [checkGreaterThan]);
            case condition_enum_1.ConditionEnum.COUNT_SUP_OR_EQUAL:
                return resultScan(condition, value.length, [checkGreaterThan, checkEqual]);
            case condition_enum_1.ConditionEnum.COUNT_INF:
                return resultScan(condition, value.length, [checkLessThan]);
            case condition_enum_1.ConditionEnum.COUNT_INF_OR_EQUAL:
                return resultScan(condition, value.length, [checkLessThan, checkEqual]);
            case condition_enum_1.ConditionEnum.DATE_EQUAL:
                return resultScan(condition, value, [checkEqualDate]);
            case condition_enum_1.ConditionEnum.DATE_SUP:
                return resultScan(condition, value, [checkGreaterThanDate]);
            case condition_enum_1.ConditionEnum.DATE_SUP_OR_EQUAL:
                return resultScan(condition, value, [checkGreaterThanDateOrEqual]);
            case condition_enum_1.ConditionEnum.DATE_INF:
                return resultScan(condition, value, [checkLessThanDate]);
            case condition_enum_1.ConditionEnum.DATE_INF_OR_EQUAL:
                return resultScan(condition, value, [checkLessThanDateOrEqual]);
            case condition_enum_1.ConditionEnum.INTERVAL:
                return resultScan(condition, value, [checkInterval]);
            case condition_enum_1.ConditionEnum.DATE_INTERVAL:
                return resultScan(condition, value, [checkIntervalDate]);
            default:
                return {
                    value,
                    condition: [condition],
                    result: false,
                    message: "condition not found in " + Object.keys(condition_enum_1.ConditionEnum).join(", ")
                };
        }
    }
    catch (err) {
        logger.debug("error in checkCondition:" + err);
        return {
            value: resource,
            condition: [condition],
            result: false,
            message: "property not found in resource"
        };
    }
}
exports.checkCondition = checkCondition;
function resultScan(condition, value, fs, reverse = false) {
    return {
        value,
        condition: [condition],
        result: (fs.map(f => f(condition, value)).some((value) => value) !== reverse)
    };
}
exports.resultScan = resultScan;
function getSubProperty(object, property) {
    if (property === ".")
        return object;
    let properties = (0, spliter_1.splitProperty)(property, ".", "/");
    let result = object;
    properties.forEach(prop => {
        result = result[prop];
    });
    return result;
}
exports.getSubProperty = getSubProperty;
function checkEqual(condition, value) {
    logger.debug("check equal");
    if (value === condition.value)
        return true;
    return false;
}
exports.checkEqual = checkEqual;
function checkGreaterThan(condition, value) {
    logger.debug("check greater than:" + value + " > " + condition.value + " ?");
    if (typeof value === "number" && value > condition.value)
        return true;
    if (~~value > ~~condition.value)
        return true;
    return false;
}
exports.checkGreaterThan = checkGreaterThan;
function checkLessThan(condition, value) {
    logger.debug("check less than:" + value + " < " + condition.value + " ?");
    if (typeof value === "number" && value < condition.value)
        return true;
    if (~~value < ~~condition.value)
        return true;
    return false;
}
exports.checkLessThan = checkLessThan;
function checkInclude(condition, value) {
    logger.debug("check include");
    if (value.includes(condition.value))
        return true;
    return false;
}
exports.checkInclude = checkInclude;
function checkIncludeNS(condition, value) {
    logger.debug("check include not sensitive");
    try {
        if (value.toLowerCase().includes(String(condition.value).toLowerCase()))
            return true;
        return false;
    }
    catch (err) {
        logger.error("error in checkIncludeNS:" + err);
        return false;
    }
}
exports.checkIncludeNS = checkIncludeNS;
function checkRegex(condition, value) {
    logger.debug("check regex");
    if (typeof value == "number") {
        if (RegExp(condition.value.toString()).exec(value.toString()))
            return true;
        else
            return false;
    }
    if (value.match(condition.value))
        return true;
    return false;
}
exports.checkRegex = checkRegex;
function checkStartsWith(condition, value) {
    logger.debug("check starts with");
    if (value.startsWith(condition.value))
        return true;
    return false;
}
exports.checkStartsWith = checkStartsWith;
function checkEndsWith(condition, value) {
    logger.debug("check ends with");
    if (value.endsWith(condition.value))
        return true;
    return false;
}
exports.checkEndsWith = checkEndsWith;
function checkAll(condition, value) {
    logger.debug("check any");
    let result = [];
    value.forEach((v) => {
        result.push(checkRule(condition.value, v));
    });
    let finalResult = [];
    for (let row of result)
        for (let e of row)
            finalResult.push(e.result);
    return finalResult.every((v) => v);
}
exports.checkAll = checkAll;
function checkSome(condition, value) {
    logger.debug("check some");
    let result = [];
    value.forEach((v) => {
        result.push(checkRule(condition.value, v));
    });
    let finalResult = [];
    for (let row of result)
        for (let e of row)
            finalResult.push(e.result);
    return finalResult.some((v) => v);
}
exports.checkSome = checkSome;
function checkOne(condition, value) {
    logger.debug("check one");
    let result = [];
    value.forEach((v) => {
        result.push(checkRule(condition.value, v));
    });
    let finalResult = [];
    for (let row of result)
        for (let e of row)
            finalResult.push(e.result);
    if (finalResult.filter((v) => v).length === 1)
        return true;
    return false;
}
exports.checkOne = checkOne;
function checkCount(condition, value) {
    logger.debug("check count");
    if (value.length === condition.value)
        return true;
    return false;
}
exports.checkCount = checkCount;
function checkEqualDate(condition, value) {
    logger.debug("check equal date");
    let value_date = (0, moment_1.default)(value, condition.date);
    let condition_date = (0, moment_1.default)(condition.value, condition.date);
    if (condition_date.isSame(value_date))
        return true;
    return false;
}
exports.checkEqualDate = checkEqualDate;
function checkIntervalDate(condition, value) {
    logger.debug("check interval date");
    let condition_value = condition.value.split(" ");
    let value_date = (0, moment_1.default)(value, condition.date).toDate();
    let condition_date_one = (0, moment_1.default)(condition_value[0], condition.date).toDate();
    let condition_date_two = (0, moment_1.default)(condition_value[1], condition.date).toDate();
    if (value_date >= condition_date_one && value_date <= condition_date_two)
        return true;
    return false;
}
exports.checkIntervalDate = checkIntervalDate;
function checkInterval(condition, value) {
    logger.debug("check interval");
    let condition_value = condition.value.split(" ");
    if (value >= condition_value[0] && value <= condition_value[1])
        return true;
    return false;
}
exports.checkInterval = checkInterval;
const unitTime = ["seconds", "minutes", "hours", "days", "weeks", "months", "years"];
function generateDate(differential, add = true) {
    let differentialList = differential.split(" ");
    let date = (0, moment_1.default)();
    for (let i = 0; i < differentialList.length; i++) {
        const unit = unitTime[i];
        if (add) {
            date.add(Number(differentialList[i]), unit);
        }
        else {
            date.subtract(Number(differentialList[i]), unitTime[i]);
        }
    }
    return date;
}
exports.generateDate = generateDate;
function checkGreaterThanDateOrEqual(condition, value) {
    logger.debug("check greater than date or equal");
    return checkGreaterThanDate(condition, value) || checkEqualThanDate(condition, value, false);
}
exports.checkGreaterThanDateOrEqual = checkGreaterThanDateOrEqual;
function checkLessThanDateOrEqual(condition, value) {
    logger.debug("check less than date or equal");
    return checkLessThanDate(condition, value) || checkEqualThanDate(condition, value, false);
}
exports.checkLessThanDateOrEqual = checkLessThanDateOrEqual;
function checkGreaterThanDate(condition, value) {
    logger.debug("check greater than date");
    let dynamic_date = generateDate(condition.value, false);
    let value_date = (0, moment_1.default)(value, condition.date).toDate();
    if (value_date < dynamic_date.toDate())
        return true;
    return false;
}
exports.checkGreaterThanDate = checkGreaterThanDate;
function checkLessThanDate(condition, value) {
    logger.debug("check less than date");
    let dynamic_date = generateDate(condition.value, false);
    let value_date = (0, moment_1.default)(value, condition.date).toDate();
    if (value_date > dynamic_date.toDate())
        return true;
    return false;
}
exports.checkLessThanDate = checkLessThanDate;
function checkEqualThanDate(condition, value, add = true) {
    logger.debug("check equal than date");
    let dynamic_date = generateDate(condition.value, add);
    let value_date = (0, moment_1.default)(value, condition.date);
    if (dynamic_date.isSame(value_date, 'day'))
        return true;
    return false;
}
exports.checkEqualThanDate = checkEqualThanDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2FuYWx5c2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBaUQ7QUFDakQsNENBQW9CO0FBQ3BCLHNEQUEyQjtBQUkzQiwyREFBdUQ7QUFFdkQseURBQXFEO0FBRXJELHFEQUFpRDtBQUlqRCxtREFBK0M7QUFDL0MscUZBQW1FO0FBQ25FLG9EQUFvRDtBQUNwRCx5REFBcUQ7QUFDckQsNENBQXlEO0FBQ3pELDBEQUFvRDtBQUNwRCw0REFBeUQ7QUFFekQsd0dBQXdHO0FBRXhHLHFEQUFnRDtBQUNoRCxnREFBbUQ7QUFDbkQsd0RBQWlFO0FBQ2pFLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxlQUFlLENBQUMsQ0FBQztBQUU3QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE1BQU0sU0FBUyxHQUFHO0lBQ2QsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztJQUN6RSxLQUFLLEVBQUUsQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztDQUN0RCxDQUFBO0FBQ0QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ2hELE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUQsSUFBSSxPQUFZLENBQUM7QUFDakIsTUFBTSxxQkFBcUIsR0FBRyxTQUFTLENBQUM7QUFDeEMsZ0JBQWdCO0FBQ2hCLGdDQUFnQztBQUNoQyx5Q0FBeUM7QUFDbEMsS0FBSyxVQUFVLGNBQWMsQ0FB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