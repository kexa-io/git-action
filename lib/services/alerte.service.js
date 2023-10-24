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
const jsome = require('jsome');
jsome.level.show = true;
const request = require('request');
const nodemailer = require("nodemailer");
const levelAlert = ["info", "warning", "error", "critical"];
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const config = require('config');
const logger_service_1 = require("./logger.service");
const logger = (0, logger_service_1.getNewLogger)("functionLogger");
function alertGlobal(allScan, alert) {
    let compteError = [0, 0, 0, 0];
    allScan.forEach((rule) => {
        rule.forEach((scan) => {
            if (scan.error.length > 0)
                compteError[scan.rule?.level ?? 4]++;
        });
    });
    logger.debug("compteError:");
    logger.debug(compteError.toString());
    let isAlert = false;
    alert.conditions.forEach((condition) => {
        logger.debug("condition:");
        logger.debug(condition.toString());
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
    allScan = allScan.map(scan => scan.filter(value => value.error.length > 0));
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
        logger.info("all resources who not respect the rules:");
        value.map((scan) => scan.objectContent).forEach((resource, index) => {
            logger.info("resource " + (index + 1) + ":");
            logger.debug(jsome.getColoredString(resource));
            logger.info((0, display_service_1.propertyToSend)(value[index].rule, resource, true));
        });
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
        let mail = emails_1.Emails.GlobalAlert(email_to, compteError, render_table, alert);
        SendMailWithAttachment(mail, email_to, "Kexa - Global Alert - " + (alert.name ?? "name"), compteRender(allScan));
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
    let content = compteRender(allScan);
    let nbrError = [];
    compteError.forEach((value, index) => {
        nbrError.push({
            [levelAlert[index]]: value
        });
    });
    content["nbrError"] = nbrError;
    content["title"] = "Kexa - Global Alert - " + (alert.name ?? "Uname");
    for (const teams_to of alert.to) {
        const regex = /^https:\/\/(?:[a-zA-Z0-9_-]+\.)?webhook\.office\.com\/[^\s"]+$/;
        if (regex.test(teams_to))
            return;
        logger.debug("send teams to:" + teams_to);
        sendCardMessageToTeamsChannel(teams_to, "Kexa - Global Alert - " + (alert.name ?? "Uname"), content);
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
            result: rule.filter(value => value.error.length > 0)
                .map((scan) => {
                return {
                    objectContent: scan.objectContent,
                    error: scan.error
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
        rule.level = level_enum_1.LevelEnum.INFO;
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
function alertLog(rule, conditions, objectResource) {
    switch (rule.level) {
        case level_enum_1.LevelEnum.INFO:
            logger.info("information:" + rule.name);
            logger.info(sentenceConditionLog(objectResource.id));
            logger.debug(jsome.getColoredString(conditions));
            logger.info((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        case level_enum_1.LevelEnum.WARNING:
            warnLog(rule, conditions, objectResource);
            break;
        case level_enum_1.LevelEnum.ERROR:
            logger.error("error:" + rule.name);
            logger.error(sentenceConditionLog(objectResource.id));
            logger.debug(jsome.getColoredString(conditions));
            logger.info((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        case level_enum_1.LevelEnum.FATAL:
            logger.error("critical:" + rule.name);
            logger.error(sentenceConditionLog(objectResource.id));
            logger.debug(jsome.getColoredString(conditions));
            logger.info((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        default:
            warnLog(rule, conditions, objectResource);
            break;
    }
}
exports.alertLog = alertLog;
function warnLog(rule, conditions, objectResource) {
    logger.warn("warning:" + rule.name);
    logger.warn(sentenceConditionLog(objectResource.id));
    logger.info(jsome.getColoredString(conditions));
}
exports.warnLog = warnLog;
function alertTeams(detailAlert, rule, objectResource) {
    logger.debug("alert Teams");
    for (const teams_to of detailAlert.to) {
        const regex = /^https:\/\/(?:[a-zA-Z0-9_-]+\.)?webhook\.office\.com\/[^\s"]+$/;
        if (regex.test(teams_to))
            return;
        let content = (0, display_service_1.propertyToSend)(rule, objectResource);
        sendCardMessageToTeamsChannel(teams_to, "Kexa - " + levelAlert[rule.level] + " - " + rule.name, content);
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
        logger.error("error:");
        logger.error(e);
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
            title: "Kexa scan : ",
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
            logger.error('Teams webhook : An error occurred:', error);
        }
    }
}
const axios_1 = __importDefault(require("axios"));
async function sendCardMessageToTeamsChannel(channelWebhook, subject, content) {
    if (!channelWebhook) {
        logger.error("Cannot retrieve TEAMS_CHANNEL_WEBHOOK_URL from env");
        throw ("Error on TEAMS_CHANNEL_WEBHOOK_URL retrieve");
    }
    const payload = {
        title: subject,
        text: content,
    };
    try {
        const response = await axios_1.default.post(channelWebhook, payload);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYWxlcnRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQStDO0FBQy9DLG1EQUErQztBQUsvQyw2Q0FBMEM7QUFHMUMsbUNBQWtDO0FBQ2xDLHVEQUF1RTtBQUN2RSxnREFBNkM7QUFDN0MscUZBQXFFO0FBRXJFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVELE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDNUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLHFEQUE4QztBQUM5QyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM5QyxTQUFnQixXQUFXLENBQUMsT0FBdUIsRUFBRSxLQUF3QjtJQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEIsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1B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