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
        request.post(webhook_to, { json: JSON.stringify(content) }, (res) => {
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
        logger.warn("warning:" + rule.name);
        logger.warn(sentenceConditionLog(objectResource.id));
    }
    logger.debug(jsome.getColoredString(conditions));
    logger.warn((0, display_service_1.propertyToSend)(rule, objectResource, true));
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
        const jsonContent = JSON.stringify(content);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYWxlcnRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQStDO0FBQy9DLG1EQUErQztBQUkvQyw2Q0FBMEM7QUFHMUMsbUNBQWtDO0FBQ2xDLHVEQUErRjtBQUMvRixnREFBNkM7QUFDN0MscUZBQXFFO0FBQ3JFLGtEQUEwQjtBQUUxQixzREFBbUQ7QUFDbkQsMkNBQXdDO0FBRXhDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3pELE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDNUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFFekMscURBQWdEO0FBQ2hELE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlDLFNBQWdCLFdBQVcsQ0FBQyxPQUF1QixFQUFFLEtBQXdCO0lBQ3pFLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztJQUNwQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQixJ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