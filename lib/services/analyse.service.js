"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEqualThanDate = exports.checkLessThanDate = exports.checkGreaterThanDate = exports.checkLessThanDateOrEqual = exports.checkGreaterThanDateOrEqual = exports.generateDate = exports.checkInterval = exports.checkIntervalDate = exports.checkEqualDate = exports.checkCount = exports.checkOne = exports.checkSome = exports.checkAll = exports.checkEndsWith = exports.checkStartsWith = exports.checkRegex = exports.checkIncludeNS = exports.checkInclude = exports.checkLessThan = exports.checkGreaterThan = exports.checkEqual = exports.getSubProperty = exports.resultScan = exports.checkCondition = exports.parentResultScan = exports.checkParentRule = exports.checkRule = exports.checkRules = exports.checkSubRuleCondition = exports.checkParentRuleCondition = exports.checkRuleCondition = exports.checkDocRules = exports.checkDocAlertGlobal = exports.checkDocAlertConfig = exports.checkDocAlert = exports.checkDoc = exports.logCheckDoc = exports.analyseRule = exports.extractAddOnNeed = exports.gatheringRules = void 0;
const level_enum_1 = require("./../enum/level.enum");
const fs_1 = __importDefault(require("fs"));
const condition_enum_1 = require("../enum/condition.enum");
const operator_enum_1 = require("../enum/operator.enum");
const alerte_service_1 = require("./alerte.service");
const alert_enum_1 = require("../enum/alert.enum");
const manageVarEnvironnement_service_1 = require("./manageVarEnvironnement.service");
const moment_1 = __importDefault(require("moment"));
const beHavior_enum_1 = require("../enum/beHavior.enum");
const files_1 = require("../helpers/files");
const addOn_service_1 = require("./addOn.service");
////////////////////////////////////////////////////////////////////////////////////////////////////////
const logger_service_1 = require("./logger.service");
const logger = (0, logger_service_1.getNewLogger)("AnalyseLogger");
const yaml = require('js-yaml');
const jsome = require('jsome');
jsome.level.show = true;
const varEnvMin = {
    "email": ["EMAILPORT", "EMAILHOST", "EMAILUSER", "EMAILPWD", "EMAILFROM"],
    "sms": ["SMSACCOUNTSID", "SMSAUTHTOKEN", "SMSFROM"],
};
const config = require('config');
const levelAlert = ["info", "warning", "error", "critical"];
let headers;
//Analyse  list
// read the yaml file with rules
// exam each rules and raise alarm or not
async function gatheringRules(rulesDirectory, getAll = false) {
    await (0, addOn_service_1.extractHeaders)();
    // list directory
    const paths = fs_1.default.readdirSync(rulesDirectory, { withFileTypes: true });
    logger.debug("listing rules files.");
    let settingFileList = new Array;
    headers = require('../../config/headers.json');
    let listNeedRules = getListNeedRules();
    for (const p of paths) {
        logger.debug("getting " + rulesDirectory + "/" + p.name + " rules.");
        let setting = await analyseRule(rulesDirectory + "/" + p.name, listNeedRules, getAll);
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
function extractAddOnNeed(settingFileList) {
    let providerList = new Array();
    settingFileList.forEach((ruleFile) => {
        ruleFile.rules.forEach((rule) => {
            if (!providerList.includes(rule.cloudProvider))
                providerList.push(rule.cloudProvider);
        });
    });
    (0, files_1.writeStringToJsonFile)(JSON.stringify({ "addOn": providerList }), "./config/addOnNeed.json");
}
exports.extractAddOnNeed = extractAddOnNeed;
function getListNeedRules() {
    const config = require('config');
    let listNeedRules = new Array();
    for (let cloudProvider of Object.keys(config)) {
        let configAssign = config.get(cloudProvider);
        for (let config of configAssign) {
            for (let rule of config.rules) {
                if (!listNeedRules.includes(rule))
                    listNeedRules.push(rule);
            }
        }
    }
    return listNeedRules;
}
async function analyseRule(ruleFilePath, listNeedRules, getAll = false) {
    logger.debug("analyse:" + ruleFilePath);
    try {
        const doc = yaml.load(fs_1.default.readFileSync(ruleFilePath, 'utf8'))[0];
        const name = ruleFilePath.split('/')[ruleFilePath.split('/').length - 1].split(".")[0];
        if (!listNeedRules.includes(name) && !getAll) {
            logger.info("rule not needed:" + name);
            return null;
        }
        let result = await checkDoc(doc);
        logCheckDoc(result);
        result.forEach((value) => {
            if (value.startsWith("error"))
                throw new Error(value);
        });
        return doc;
    }
    catch (e) {
        logger.error("error - " + ruleFilePath + " was not load properly : " + e);
        return null;
    }
}
exports.analyseRule = analyseRule;
function logCheckDoc(result) {
    logger.debug("log check doc");
    result.forEach((value) => {
        if (value.startsWith("error"))
            logger.error(value);
        else if (value.startsWith("warn"))
            logger.warning(value);
        else
            logger.info(value);
    });
}
exports.logCheckDoc = logCheckDoc;
async function checkDoc(doc) {
    logger.debug("check doc");
    let result = [];
    if (!doc.hasOwnProperty("version"))
        result.push("info - version not found in doc");
    else if (doc.version.match(/^[0-9]+\.[0-9]+\.[0-9]+$/) === null)
        result.push("info - version not valid in doc : " + doc.version);
    if (!doc.hasOwnProperty("date"))
        result.push("info - date not found in doc");
    else if (doc.date.match(/^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)\d\d$/) === null)
        result.push("info - date not valid in doc : " + doc.date);
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
            result.push("info - urlDescription not found in rule");
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
        if (!rule.hasOwnProperty("cloudProvider"))
            result.push("error - cloudProvider not found in rule");
        else if (!Object.keys(headers).includes(rule.cloudProvider))
            result.push("error - cloudProvider not valid in rule : " + rule.cloudProvider + "\nYou have to add this addOn to validate the rules");
        if (!rule.hasOwnProperty("objectName"))
            result.push("error - objectName not found in rule");
        else if (!Object.keys(headers).includes(rule.cloudProvider) || !headers[rule.cloudProvider]["resources"]?.includes(rule.objectName))
            result.push("error - objectName not valid in rule : " + rule.objectName + "\nYou have to verify your addOn gathering data about it");
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
    if (condition.hasOwnProperty("rules")) {
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
        result.push("info - name not found in parent rule condition");
    else if (typeof parentRule.name !== "string")
        result.push("warn - name not string in parent rule condition : " + parentRule.name);
    if (!parentRule.hasOwnProperty("description"))
        result.push("info - description not found in parent rule condition");
    else if (typeof parentRule.description !== "string")
        result.push("warn - description not string in parent rule condition : " + parentRule.description);
    if (!parentRule.hasOwnProperty("operator"))
        result.push("error - operator not found in parent rule condition");
    else if (!Object.values(operator_enum_1.OperatorEnum).includes(parentRule.operator))
        result.push("error - operator not valid in parent rule condition : " + parentRule.operator);
    else if (parentRule.operator === operator_enum_1.OperatorEnum.NOT && parentRule.rules.length > 1)
        result.push("warn - operator not will be considered in rules only the first one");
    if (!parentRule.hasOwnProperty("rules"))
        result.push("error - rules not found in parent rule condition");
    else {
        if (parentRule.rules.length === 0)
            result.push("error - rules empty in parent rule condition");
        parentRule.rules.forEach((rule) => {
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
        logger.warning("object name : " + rule.objectName + "not found in your provider " + rule.cloudProvider + " with configuration index " + index + "\nMake sure you have the right addOn or the right spelling in your rules");
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
        if (!config.has(rule.cloudProvider)) {
            logger.warning("cloud provider not found in config:" + rule.cloudProvider);
            return;
        }
        const configAssign = config.get(rule.cloudProvider);
        let objectResources = [];
        for (let i = 0; i < configAssign.length; i++) {
            if (configAssign[i].rules.includes(alert.global.name)) {
                logger.info("check rule with object with index :" + i);
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
            subResult.push({
                objectContent: {
                    "id": "global property",
                },
                rule: rule,
                error: actionAfterCheckRule(rule, objectResources, alert),
            });
        }
        else {
            objectResources.forEach((objectResource) => {
                subResult.push({
                    objectContent: objectResource,
                    rule: rule,
                    error: actionAfterCheckRule(rule, objectResource, alert),
                });
            });
        }
        result.push(subResult);
    });
    return result;
}
exports.checkRules = checkRules;
function actionAfterCheckRule(rule, objectResource, alert) {
    let subResultScan = checkRule(rule.conditions, objectResource);
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
        if (condition.hasOwnProperty("rules")) {
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
    let result = checkRule(parentRule.rules, resources);
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
        message: subResultScans.map((value) => value.message).join(" || ")
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
        logger.error("error in checkCondition:" + err);
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
    let properties = property.split(".");
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
        if (value.toString().match(condition.value.toString()))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2FuYWx5c2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxxREFBaUQ7QUFDakQsNENBQW9CO0FBSXBCLDJEQUF1RDtBQUV2RCx5REFBcUQ7QUFFckQscURBQWlEO0FBSWpELG1EQUErQztBQUMvQyxxRkFBbUU7QUFDbkUsb0RBQW9EO0FBQ3BELHlEQUFxRDtBQUNyRCw0Q0FBeUQ7QUFDekQsbURBQWlEO0FBRWpELHdHQUF3RztBQUV4RyxxREFBOEM7QUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNoQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE1BQU0sU0FBUyxHQUFHO0lBQ2QsT0FBTyxFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQztJQUN6RSxLQUFLLEVBQUUsQ0FBQyxlQUFlLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztDQUN0RCxDQUFBO0FBQ0QsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDNUQsSUFBSSxPQUFZLENBQUM7QUFDakIsZUFBZTtBQUNmLGdDQUFnQztBQUNoQyx5Q0FBeUM7QUFDbEMsS0FBSyxVQUFVLGNBQWMsQ0FBQyxjQUFxQixFQUFFLFNBQWUsS0FBSztJQUM1RSxNQUFNLElBQUEsOEJBQWMsR0FBRSxDQUFD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