"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEqualThanDate = exports.checkLessThanDate = exports.checkGreaterThanDate = exports.checkLessThanDateOrEqual = exports.checkGreaterThanDateOrEqual = exports.generateDate = exports.checkInterval = exports.checkIntervalDate = exports.checkEqualDate = exports.checkCount = exports.checkOne = exports.checkSome = exports.checkAll = exports.checkEndsWith = exports.checkStartsWith = exports.checkRegex = exports.checkIncludeNS = exports.checkInclude = exports.checkLessThan = exports.checkGreaterThan = exports.checkEqual = exports.getSubProperty = exports.resultScan = exports.checkCondition = exports.parentResultScan = exports.checkParentRule = exports.checkRule = exports.checkRules = exports.checkSubRuleCondition = exports.checkParentRuleCondition = exports.checkRuleCondition = exports.checkDocRules = exports.checkDocAlertGlobal = exports.checkDocAlertConfig = exports.checkDocAlert = exports.checkDoc = exports.logCheckDoc = exports.replaceBlockVariable = exports.replaceVariable = exports.replaceElement = exports.analyzeRule = exports.extractAddOnNeed = exports.gatheringRules = void 0;
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
    (0, files_1.writeStringToJsonFile)(JSON.stringify({ "addOn": providerList, "objectNameNeed": objectNameList }), "./config/addOnNeed.json");
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
    logger.debug("check greater than");
    if (value > condition.value)
        return true;
    return false;
}
exports.checkGreaterThan = checkGreaterThan;
function checkLessThan(condition, value) {
    logger.debug("check less than");
    if (value < condition.value)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2FuYWx5c2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBaUQ7QUFDakQsNENBQW9CO0FBQ3BCLHNEQUEyQjtBQUkzQiwyREFBdUQ7QUFFdkQseURBQXFEO0FBRXJELHFEQUFpRDtBQUlqRCxtREFBK0M7QUFDL0MscUZBQW1FO0FBQ25FLG9EQUFvRDtBQUNwRCx5REFBcUQ7QUFDckQsNENBQXlEO0FBQ3pELDBEQUFvRDtBQUVwRCx3R0FBd0c7QUFFeEcscURBQWdEO0FBQ2hELGdEQUFtRDtBQUNuRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsZUFBZSxDQUFDLENBQUM7QUFFN0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUN4QixNQUFNLFNBQVMsR0FBRztJQUNkLE9BQU8sRUFBRSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxXQUFXLENBQUM7SUFDekUsS0FBSyxFQUFFLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUM7Q0FDdEQsQ0FBQTtBQUNELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUNoRCxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVELElBQUksT0FBWSxDQUFDO0FBQ2pCLGdCQUFnQjtBQUNoQixnQ0FBZ0M7QUFDaEMseUNBQXlDO0FBQ2xDLEtBQUssVUFBVSxjQUFjLENBQUMsY0FBcUIsRUFBRSxTQUFlLEtBQUs7SUFDNUUseUJBQXlCO0lBQ3pCLGlCQUFpQjtJQUNqQixNQUFN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
