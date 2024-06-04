"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCardMessageToTeamsChannel = exports.alertSMS = exports.alertEmail = exports.alertTeams = exports.warnLog = exports.alertLog = exports.alertFromRule = exports.compteRender = exports.alertTeamsGlobal = exports.alertWebhookGlobal = exports.alertSMSGlobal = exports.alertEmailGlobal = exports.alertLogGlobal = exports.alertFromGlobal = exports.alertGlobal = void 0;
const alert_enum_1 = require("../enum/alert.enum");
const level_enum_1 = require("../enum/level.enum");
const emails_1 = require("../emails/emails");
const stream_1 = require("stream");
const display_service_1 = require("./display.service");
const groupBy_1 = require("../helpers/groupBy");
const manageVarEnvironnement_service_1 = require("./manageVarEnvironnement.service");
const axios_1 = __importDefault(require("axios"));
const extractURL_1 = require("../helpers/extractURL");
const teams_1 = require("../emails/teams");
const jsonStringify_1 = require("../helpers/jsonStringify");
const jsome = require('jsome');
jsome.level.show = true;
const request = require('request');
const nodemailer = require("nodemailer");
const levelAlert = ["info", "warning", "error", "fatal"];
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const config = require('node-config-ts');
const logger_service_1 = require("./logger.service");
const logger = (0, logger_service_1.getNewLogger)("functionLogger");
function alertGlobal(allScan, alert) {
    let isAlert = false;
    let compteError = [0, 0, 0, 0];
    allScan.forEach((rule) => {
        rule.forEach((scan) => {
            if (scan.error.length > 0)
                compteError[scan.rule?.level ?? 3]++;
            if (scan.rule?.loud)
                isAlert = true;
        });
    });
    logger.debug("compteError:");
    logger.debug(compteError);
    alert.conditions.forEach((condition) => {
        if (isAlert)
            return;
        logger.debug("condition:");
        logger.debug(condition);
        if (compteError[condition.level] >= condition.min) {
            logger.debug("alert:" + levelAlert[condition.level]);
            isAlert = true;
        }
    });
    if (isAlert) {
        alertFromGlobal(alert, compteError, allScan);
    }
    return compteError;
}
exports.alertGlobal = alertGlobal;
function alertFromGlobal(alert, compteError, allScan) {
    allScan = allScan.map(scan => scan.filter(value => value.error.length > 0 || value.loud));
    alert.type.forEach((type) => {
        switch (type) {
            case alert_enum_1.AlertEnum.LOG:
                alertLogGlobal(alert, compteError, allScan);
                break;
            case alert_enum_1.AlertEnum.EMAIL:
                alertEmailGlobal(alert, compteError, allScan);
                break;
            case alert_enum_1.AlertEnum.SMS:
                alertSMSGlobal(alert, compteError);
                break;
            case alert_enum_1.AlertEnum.SLACK:
                throw new Error("not implemented");
                break;
            case alert_enum_1.AlertEnum.TEAMS:
                alertTeamsGlobal(alert, compteError, allScan);
                break;
            case alert_enum_1.AlertEnum.WEBHOOK:
                alertWebhookGlobal(alert, compteError, allScan);
                break;
            default:
                alertLogGlobal(alert, compteError, allScan);
                break;
        }
    });
}
exports.alertFromGlobal = alertFromGlobal;
function alertLogGlobal(alert, compteError, allScan) {
    logger.info("_______________________________________-= Result Global scan: " + alert.name + " =-___________________________________");
    compteError.forEach((value, index) => {
        logger.info("number of " + levelAlert[index] + " :" + value);
    });
    logger.info("-= Detail for each Rules =-");
    let allScanOneDimension = [];
    for (let row of allScan)
        for (let e of row)
            allScanOneDimension.push(e);
    let subResult = (0, groupBy_1.groupBy)(allScanOneDimension, (scan) => scan.rule?.name);
    Object.entries(subResult).forEach(([key, value]) => {
        logger.info("rule:" + key);
        logger.info("description:" + value[0].rule?.description);
        logger.info("all resources who not respect the rules:");
        value.filter(value => value.error.length > 0).map((scan) => scan.objectContent).forEach((resource, index) => {
            logger.info("resource " + (index + 1) + ":");
            alertLog(value[index].rule, value[index].error, resource, false);
        });
        if (value[0].rule?.loud) {
            logger.info("all resources who respect the rules:");
            value.filter(value => value.loud).map((scan) => scan.objectContent).forEach((resource, index) => {
                logger.info("resource " + (index + 1) + ":");
                alertLog(value[index].rule, value[index].error, resource, false);
            });
        }
    });
    logger.info("_____________________________________-= End Result Global scan =-_________________________________");
}
exports.alertLogGlobal = alertLogGlobal;
function alertEmailGlobal(alert, compteError, allScan) {
    logger.debug("alert email");
    alert.to.forEach((email_to) => {
        if (!email_to.includes("@"))
            return;
        logger.debug("send email to:" + email_to);
        let render_table = (0, display_service_1.renderTableAllScan)(allScan.map(scan => scan.filter(value => value.error.length > 0)));
        let render_table_loud = (0, display_service_1.renderTableAllScanLoud)(allScan.map(scan => scan.filter(value => value.loud)));
        let mail = emails_1.Emails.GlobalAlert(email_to, compteError, render_table, render_table_loud, alert);
        SendMailWithAttachment(mail, email_to, "Kexa - Global Alert - " + (alert.name ?? "Uname"), compteRender(allScan));
    });
}
exports.alertEmailGlobal = alertEmailGlobal;
function alertSMSGlobal(alert, compteError) {
    logger.debug("alert sms");
    let content = "";
    compteError.forEach((value, index) => {
        content += "number of " + levelAlert[index] + " :" + value + "\n";
    });
    alert.to.forEach((sms_to) => {
        if (!sms_to.startsWith("+"))
            return;
        logger.debug("send sms to:" + sms_to);
        sendSMS(sms_to, "Kexa - Global Alert - " + (alert.name ?? "Uname"), content);
    });
}
exports.alertSMSGlobal = alertSMSGlobal;
function alertWebhookGlobal(alert, compteError, allScan) {
    logger.debug("alert webhook");
    let content = compteRender(allScan);
    let nbrError = [];
    compteError.forEach((value, index) => {
        nbrError.push({
            [levelAlert[index]]: value
        });
    });
    content["nbrError"] = nbrError;
    content["title"] = "Kexa - Global Alert - " + (alert.name ?? "Uname");
    alert.to.forEach((webhook_to) => {
        if (!webhook_to.includes("http"))
            return;
        logger.debug("send webhook to:" + webhook_to);
        request.post(webhook_to, { json: (0, jsonStringify_1.jsonStringify)(content) }, (res) => {
            logger.debug(`webhook to: ${webhook_to} are send`);
        }).on('error', (error) => {
            logger.error(error);
        });
    });
}
exports.alertWebhookGlobal = alertWebhookGlobal;
function alertTeamsGlobal(alert, compteError, allScan) {
    logger.debug("alert Teams Global");
    let nbrError = {};
    compteError.forEach((value, index) => {
        nbrError[levelAlert[index]] = value;
    });
    let content = "";
    let render_table = (0, display_service_1.renderTableAllScan)(allScan.map(scan => scan.filter(value => value.error.length > 0)));
    let render_table_loud = (0, display_service_1.renderTableAllScanLoud)(allScan.map(scan => scan.filter(value => value.loud)));
    content += render_table;
    if (render_table_loud.length > 30) {
        content += "\n\n\n<h3>Loud Section:</h3>\n";
        content += render_table_loud;
    }
    for (const teams_to of alert.to) {
        const regex = /^https:\/\/(?:[a-zA-Z0-9_-]+\.)?webhook\.office\.com\/[^\s"]+$/;
        if (!regex.test(teams_to))
            return;
        logger.debug("send teams to:" + teams_to);
        const payload = teams_1.Teams.GlobalTeams(colors[0], "Global Alert - " + (alert.name ?? "Uname"), content, nbrError);
        sendCardMessageToTeamsChannel(teams_to, payload);
    }
}
exports.alertTeamsGlobal = alertTeamsGlobal;
function compteRender(allScan) {
    let result = { content: new Array() };
    allScan.forEach((rule) => {
        if (rule.length == 0)
            return;
        return result.content.push({
            rule: rule[0].rule,
            result: rule.map((scan) => {
                return {
                    objectContent: scan.objectContent,
                    error: scan?.error,
                    loud: scan?.loud,
                    rule: scan?.rule,
                };
            })
        });
    });
    return result;
}
exports.compteRender = compteRender;
function alertFromRule(rule, conditions, objectResource, alert) {
    let detailAlert = alert[levelAlert[rule.level]];
    if (!detailAlert.enabled)
        return;
    if (rule.level > level_enum_1.LevelEnum.FATAL)
        rule.level = level_enum_1.LevelEnum.FATAL;
    detailAlert.type.forEach((type) => {
        switch (type) {
            case alert_enum_1.AlertEnum.LOG:
                alertLog(rule, conditions, objectResource);
                break;
            case alert_enum_1.AlertEnum.EMAIL:
                alertEmail(detailAlert, rule, conditions, objectResource);
                break;
            case alert_enum_1.AlertEnum.SMS:
                alertSMS(detailAlert, rule, objectResource);
                break;
            case alert_enum_1.AlertEnum.SLACK:
                throw new Error("not implemented");
                break;
            case alert_enum_1.AlertEnum.TEAMS:
                alertTeams(detailAlert, rule, objectResource);
                break;
            case alert_enum_1.AlertEnum.WEBHOOK:
                sendWebhook(detailAlert, "Kexa - " + levelAlert[rule.level] + " - " + rule.name, conditions);
                break;
            default:
                logger.error("error:" + rule.name);
                logger.error("resource:");
                logger.error(conditions);
                break;
        }
    });
}
exports.alertFromRule = alertFromRule;
const sentenceConditionLog = (resource) => {
    return "condition not respect for " + resource + " :";
};
function alertLog(rule, conditions, objectResource, fullDetail = true) {
    switch (rule.level) {
        case level_enum_1.LevelEnum.INFO:
            if (fullDetail) {
                logger.info("info name:" + rule.name);
                logger.info("info description:" + rule?.description);
                logger.info(sentenceConditionLog(objectResource.id));
            }
            logger.debug(jsome.getColoredString(conditions));
            logger.info((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        case level_enum_1.LevelEnum.WARNING:
            warnLog(rule, conditions, objectResource);
            break;
        case level_enum_1.LevelEnum.ERROR:
            if (fullDetail) {
                logger.error("error name:" + rule.name);
                logger.error("error description:" + rule?.description);
                logger.error(sentenceConditionLog(objectResource.id));
            }
            logger.debug(jsome.getColoredString(conditions));
            logger.error((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        case level_enum_1.LevelEnum.FATAL:
            if (fullDetail) {
                logger.fatal("critical name:" + rule.name);
                logger.fatal("critical description:" + rule?.description);
                logger.fatal(sentenceConditionLog(objectResource.id));
            }
            logger.debug(jsome.getColoredString(conditions));
            logger.fatal((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        default:
            warnLog(rule, conditions, objectResource);
            break;
    }
}
exports.alertLog = alertLog;
function warnLog(rule, conditions, objectResource, fullDetail = true) {
    if (fullDetail) {
        logger.warning("warning:" + rule.name);
        logger.warning(sentenceConditionLog(objectResource.id));
    }
    logger.debug(jsome.getColoredString(conditions));
    logger.warning((0, display_service_1.propertyToSend)(rule, objectResource, true));
}
exports.warnLog = warnLog;
function alertTeams(detailAlert, rule, objectResource) {
    logger.debug("alert Teams");
    for (const teams_to of detailAlert.to) {
        const regex = /^https:\/\/(?:[a-zA-Z0-9_-]+\.)?webhook\.office\.com\/[^\s"]+$/;
        if (!regex.test(teams_to))
            return;
        let content = (0, display_service_1.propertyToSend)(rule, objectResource);
        const payload = teams_1.Teams.OneTeams(colors[rule.level], "Kexa - " + levelAlert[rule.level] + " - " + rule.name, (0, extractURL_1.extractURL)(content) ?? "", rule.description ?? "");
        sendCardMessageToTeamsChannel(teams_to, payload);
    }
}
exports.alertTeams = alertTeams;
function alertEmail(detailAlert, rule, conditions, objectResource) {
    logger.debug("alert email");
    detailAlert.to.forEach((email_to) => {
        if (!email_to.includes("@"))
            return;
        logger.debug("send email to:" + email_to);
        let mail = emails_1.Emails.OneAlert(email_to, rule, (0, display_service_1.propertyToSend)(rule, objectResource, false), colors[rule.level]);
        SendMailWithAttachment(mail, email_to, "Kexa - " + levelAlert[rule.level] + " - " + rule.name, objectResource);
    });
}
exports.alertEmail = alertEmail;
function alertSMS(detailAlert, rule, objectResource) {
    logger.debug("alert sms");
    detailAlert.to.forEach((sms_to) => {
        if (!sms_to.startsWith("+"))
            return;
        logger.debug("send sms to:" + sms_to);
        let content = "error with : " + (0, display_service_1.propertyToSend)(rule, objectResource, true);
        sendSMS(sms_to, "Kexa - " + levelAlert[rule.level] + " - " + rule.name, content);
    });
}
exports.alertSMS = alertSMS;
async function getTransporter() {
    return nodemailer.createTransport({
        host: await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "EMAILHOST"),
        port: await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "EMAILPORT"),
        secure: Number(await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "EMAILPORT")) == 465,
        auth: {
            user: await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "EMAILUSER"),
            pass: await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "EMAILPWD"),
        },
    });
}
async function SendMail(mail, to, subject) {
    try {
        let transporter = await getTransporter();
        await transporter.sendMail({
            from: await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "EMAILFROM"),
            to,
            subject,
            html: mail, // html body
        });
        return true;
    }
    catch (e) {
        logger.error("error:");
        logger.error(e);
        return false;
    }
}
async function SendMailWithAttachment(mail, to, subject, content) {
    try {
        const jsonContent = (0, jsonStringify_1.jsonStringify)(content);
        const jsonStream = new stream_1.Readable();
        jsonStream.push(jsonContent);
        jsonStream.push(null);
        let transporter = await getTransporter();
        await transporter.sendMail({
            from: await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "EMAILFROM"),
            to,
            subject,
            html: mail,
            attachments: [
                {
                    filename: subject + '.json',
                    content: jsonStream
                }
            ]
        });
        logger.info(`Email sent: ${subject} to ${to} with attachment`);
        return true;
    }
    catch (e) {
        return false;
    }
}
async function sendSMS(to, subject, content) {
    const accountSid = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SMSACCOUNTSID");
    const authToken = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SMSAUTHTOKEN");
    const client = require('twilio')(accountSid, authToken);
    client.messages
        .create({
        body: `${subject}
${content}`,
        from: await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "SMSFROM"),
        to
    })
        .then((message) => {
        logger.debug("send sms");
    });
}
async function sendWebhook(alert, subject, content) {
    content["title"] = subject;
    logger.debug("send webhook");
    for (const webhook_to of alert.to) {
        if (!webhook_to.includes("http"))
            continue;
        const payload = {
            title: "Kexa scan : " + subject,
            text: content.content,
        };
        try {
            const response = await axios_1.default.post(webhook_to, payload);
            if (response.status === 200) {
                logger.info('Webhook sent successfully!');
            }
            else {
                logger.error('Failed to send Webhook.');
            }
        }
        catch (error) {
            logger.error('Webhook : An error occurred:', error);
        }
    }
}
async function sendCardMessageToTeamsChannel(channelWebhook, payload) {
    if (!channelWebhook) {
        logger.error("Cannot retrieve TEAMS_CHANNEL_WEBHOOK_URL from env");
        throw ("Error on TEAMS_CHANNEL_WEBHOOK_URL retrieve");
    }
    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: channelWebhook,
        headers: {
            'Content-Type': 'application/json'
        },
        data: payload
    };
    try {
        const response = await axios_1.default.request(config);
        if (response.status === 200) {
            logger.info('Card sent successfully!');
        }
        else {
            logger.info('Failed to send card.');
        }
    }
    catch (error) {
        console.error('An error occurred:', error);
    }
}
exports.sendCardMessageToTeamsChannel = sendCardMessageToTeamsChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYWxlcnRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQStDO0FBQy9DLG1EQUErQztBQUkvQyw2Q0FBMEM7QUFHMUMsbUNBQWtDO0FBQ2xDLHVEQUErRjtBQUMvRixnREFBNkM7QUFDN0MscUZBQXFFO0FBQ3JFLGtEQUEwQjtBQUMxQixzREFBbUQ7QUFDbkQsMkNBQXdDO0FBQ3hDLDREQUF5RDtBQUV6RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ3hCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDekMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUN6RCxNQUFNLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQzVELE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXpDLHFEQUFnRDtBQUNoRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM5QyxTQUFnQixXQUFXLENBQUMsT0FBdUIsRUFBRSxLQUF3QjtJQUN6RSxJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFF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