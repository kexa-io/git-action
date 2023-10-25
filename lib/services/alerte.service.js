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
            alertLog(value[index].rule, value[index].error, resource, false);
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
function alertLog(rule, conditions, objectResource, fullDetail = true) {
    switch (rule.level) {
        case level_enum_1.LevelEnum.INFO:
            if (fullDetail) {
                logger.info("information:" + rule.name);
                logger.info(sentenceConditionLog(objectResource.id));
            }
            logger.debug(jsome.getColoredString(conditions));
            logger.info((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        case level_enum_1.LevelEnum.WARNING:
            warnLog(rule, conditions, objectResource, fullDetail);
            break;
        case level_enum_1.LevelEnum.ERROR:
            if (fullDetail) {
                logger.error("error:" + rule.name);
                logger.error(sentenceConditionLog(objectResource.id));
            }
            logger.debug(jsome.getColoredString(conditions));
            logger.error((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        case level_enum_1.LevelEnum.FATAL:
            if (fullDetail) {
                logger.error("critical:" + rule.name);
                logger.error(sentenceConditionLog(objectResource.id));
            }
            logger.debug(jsome.getColoredString(conditions));
            logger.error((0, display_service_1.propertyToSend)(rule, objectResource, true));
            break;
        default:
            warnLog(rule, conditions, objectResource, fullDetail);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYWxlcnRlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbURBQStDO0FBQy9DLG1EQUErQztBQUsvQyw2Q0FBMEM7QUFHMUMsbUNBQWtDO0FBQ2xDLHVEQUF1RTtBQUN2RSxnREFBNkM7QUFDN0MscUZBQXFFO0FBRXJFLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDeEIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN6QyxNQUFNLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO0FBQzVELE1BQU0sTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDNUQsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLHFEQUE4QztBQUM5QyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUM5QyxTQUFnQixXQUFXLENBQUMsT0FBdUIsRUFBRSxLQUF3QjtJQUN6RSxJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNyQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDbEIsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssSUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDckMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBYSxFQUFFLEVBQUU7UUFDdkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQixNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLElBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLENBQUMsR0FBRyxFQUFDO1lBQzdDLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNuRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxJQUFHLE9BQU8sRUFBQztRQUNQLGVBQWUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ2hEO0lBQ0QsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQXRCRCxrQ0FzQkM7QUFFRCxTQUFnQixlQUFlLENBQUMsS0FBd0IsRUFBRSxXQUFxQixFQUFFLE9BQXVCO0lBQ3BHLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QixRQUFPLElBQUksRUFBQztZQUNSLEtBQUssc0JBQVMsQ0FBQyxHQUFHO2dCQUNkLGNBQWMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM1QyxNQUFNO1lBQ1YsS0FBSyxzQkFBUyxDQUFDLEtBQUs7Z0JBQ2hCLGdCQUFnQixDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzlDLE1BQU07WUFDVixLQUFLLHNCQUFTLENBQUMsR0FBRztnQkFDZCxjQUFjLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNO1lBQ1YsS0FBSyxzQkFBUyxDQUFDLEtBQUs7Z0JBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFDbkMsTUFBTTtZQUNWLEtBQUssc0JBQVMsQ0FBQyxLQUFLO2dCQUNoQixnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUM5QyxNQUFNO1lBQ1YsS0FBSyxzQkFBUyxDQUFDLE9BQU87Z0JBQ2xCLGtCQUFrQixDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ2hELE1BQU07WUFDVjtnQkFDSSxjQUFjLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDNUMsTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBM0JELDBDQTJCQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxLQUF3QixFQUFFLFdBQXFCLEVBQUUsT0FBdUI7SUFDbkcsTUFBTSxDQUFDLElBQUksQ0FBQyxnRUFBZ0UsR0FBRSxLQUFLLENBQUMsSUFBSSxHQUFFLHdDQUF3QyxDQUFDLENBQUM7SUFDcEksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUMsSUFBSSxHQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzNDLElBQUksbUJBQW1CLEdBQUcsRUFBRSxDQUFDO0lBQzdCLEtBQUssSUFBSSxHQUFHLElBQUksT0FBTztRQUFFLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRztZQUFFLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxJQUFJLFNBQVMsR0FBRyxJQUFBLGlCQUFPLEVBQUMsbUJBQW1CLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDeEUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFO1FBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsMENBQTBDLENBQUMsQ0FBQztRQUN4RCxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBZSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxFQUFFO1lBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLG9HQUFvRyxDQUFDLENBQUM7QUFDdEgsQ0FBQztBQWxCRCx3Q0FrQkM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxLQUF3QixFQUFFLFdBQXFCLEVBQUUsT0FBdUI7SUFDckcsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQzFCLElBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU87UUFDbkMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLFlBQVksR0FBRyxJQUFBLG9DQUFrQixFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZHLElBQUksSUFBSSxHQUFHLGVBQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUUsc0JBQXNCLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsR0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUUsTUFBTSxDQUFDLEVBQUUsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakgsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBVEQsNENBU0M7QUFFRCxTQUFnQixjQUFjLENBQUMsS0FBd0IsRUFBRSxXQUFxQjtJQUMxRSxNQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQTtJQUNoQixXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO1FBQ2pDLE9BQU8sSUFBSSxZQUFZLEdBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFDLElBQUksR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDO0lBQzlELENBQUMsQ0FBQyxDQUFDO0lBQ0gsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUN4QixJQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPO1FBQ25DLE1BQU0sQ0FBQyxLQUFLLENBQUMsY0FBYyxHQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsd0JBQXdCLEdBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlFLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQVhELHdDQVdDO0FBRUQsU0FBZ0Isa0JBQWtCLENBQUMsS0FBd0IsRUFBRSxXQUFxQixFQUFFLE9BQXVCO0lBQ3ZHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDOUIsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLElBQUksUUFBUSxHQUErQixFQUFFLENBQUM7SUFDOUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ1YsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRyxLQUFLO1NBQzlCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUMvQixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsd0JBQXdCLEdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDNUIsSUFBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQUUsT0FBTztRQUN4QyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQU8sRUFBRSxFQUFFO1lBQ3BFLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxVQUFVLFdBQVcsQ0FBQyxDQUFBO1FBQ3RELENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFTLEVBQUUsRUFBRTtZQUN6QixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBcEJELGdEQW9CQztBQUVELFNBQWdCLGdCQUFnQixDQUFDLEtBQXdCLEVBQUUsV0FBcUIsRUFBRSxPQUF1QjtJQUNyRyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbkMsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLElBQUksUUFBUSxHQUErQixFQUFFLENBQUM7SUFDOUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRTtRQUNqQyxRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ1YsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRyxLQUFLO1NBQzlCLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQztJQUMvQixPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsd0JBQXdCLEdBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xFLEtBQUssTUFBTSxRQUFRLElBQUksS0FBSyxDQUFDLEVBQUUsRUFBRTtRQUM3QixNQUFNLEtBQUssR0FBRyxnRUFBZ0UsQ0FBQztRQUMvRSxJQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQUUsT0FBTztRQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLDZCQUE2QixDQUFDLFFBQVEsRUFBRSx3QkFBd0IsR0FBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUUsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDckc7QUFDTCxDQUFDO0FBakJELDRDQWlCQztBQUVELFNBQWdCLFlBQVksQ0FBQyxPQUF1QjtJQUNoRCxJQUFJLE1BQU0sR0FBRyxFQUFDLE9BQU8sRUFBRyxJQUFJLEtBQUssRUFBTyxFQUFDLENBQUM7SUFDMUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3JCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDO1lBQUUsT0FBTztRQUM3QixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUN0QjtZQUNJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtZQUNsQixNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUN4QixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQ3pCO2lCQUNBLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNWLE9BQU87b0JBQ0gsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhO29CQUNqQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ3BCLENBQUM7WUFDTixDQUFDLENBQUM7U0FDTCxDQUNKLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7QUFwQkQsb0NBb0JDO0FBRUQsU0FBZ0IsYUFBYSxDQUFDLElBQVUsRUFBRSxVQUEwQixFQUFFLGNBQWtCLEVBQUUsS0FBWTtJQUNsRyxJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQXVCLENBQUMsQ0FBQztJQUN0RSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU87UUFBRSxPQUFNO0lBQ2hDLElBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxzQkFBUyxDQUFDLEtBQUs7UUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLHNCQUFTLENBQUMsSUFBSSxDQUFDO0lBQzdELFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDOUIsUUFBTyxJQUFJLEVBQUM7WUFDUixLQUFLLHNCQUFTLENBQUMsR0FBRztnQkFDZCxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDM0MsTUFBTTtZQUNWLEtBQUssc0JBQVMsQ0FBQyxLQUFLO2dCQUNoQixVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQzFELE1BQU07WUFDVixLQUFLLHNCQUFTLENBQUMsR0FBRztnQkFDZCxRQUFRLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztnQkFDNUMsTUFBTTtZQUNWLEtBQUssc0JBQVMsQ0FBQyxLQUFLO2dCQUNoQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7Z0JBQ25DLE1BQU07WUFDVixLQUFLLHNCQUFTLENBQUMsS0FBSztnQkFDaEIsVUFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7Z0JBQzlDLE1BQU07WUFDVixLQUFLLHNCQUFTLENBQUMsT0FBTztnQkFDbEIsV0FBVyxDQUFDLFdBQVcsRUFBRSxTQUFTLEdBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQTtnQkFDdEYsTUFBTTtZQUNWO2dCQUNJLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDekIsTUFBTTtTQUNiO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBL0JELHNDQStCQztBQUVELE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxRQUFpQixFQUFFLEVBQUU7SUFDL0MsT0FBTyw0QkFBNEIsR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzFELENBQUMsQ0FBQTtBQUVELFNBQWdCLFFBQVEsQ0FBQyxJQUFXLEVBQUUsVUFBMkIsRUFBRSxjQUFtQixFQUFFLGFBQXFCLElBQUk7SUFDN0csUUFBTyxJQUFJLENBQUMsS0FBSyxFQUFDO1FBQ2QsS0FBSyxzQkFBUyxDQUFDLElBQUk7WUFDZixJQUFHLFVBQVUsRUFBQztnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDeEQ7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSxnQ0FBYyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4RCxNQUFNO1FBQ1YsS0FBSyxzQkFBUyxDQUFDLE9BQU87WUFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3RELE1BQU07UUFDVixLQUFLLHNCQUFTLENBQUMsS0FBSztZQUNoQixJQUFHLFVBQVUsRUFBQztnQkFDVixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDekQ7WUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ2pELE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBQSxnQ0FBYyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN6RCxNQUFNO1FBQ1YsS0FBSyxzQkFBUyxDQUFDLEtBQUs7WUFDaEIsSUFBRyxVQUFVLEVBQUM7Z0JBQ1YsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNwQyxNQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNqRCxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUEsZ0NBQWMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDekQsTUFBTTtRQUNWO1lBQ0ksT0FBTyxDQUFDLElBQUksRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3RELE1BQU07S0FDYjtBQUNMLENBQUM7QUFqQ0QsNEJBaUNDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLElBQVcsRUFBRSxVQUEwQixFQUFFLGNBQWtCLEVBQUUsYUFBcUIsSUFBSTtJQUMxRyxJQUFHLFVBQVUsRUFBQztRQUNWLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQzNEO0lBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUNqRCxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsZ0NBQWMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQVBELDBCQU9DO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLFdBQTBDLEVBQUUsSUFBVyxFQUFFLGNBQWtCO0lBQ2xHLE1BQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUIsS0FBSyxNQUFNLFFBQVEsSUFBSSxXQUFXLENBQUMsRUFBRSxFQUFFO1FBQ25DLE1BQU0sS0FBSyxHQUFHLGdFQUFnRSxDQUFDO1FBQy9FLElBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7WUFBRSxPQUFPO1FBQ2hDLElBQUksT0FBTyxHQUFHLElBQUEsZ0NBQWMsRUFBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDbkQsNkJBQTZCLENBQUMsUUFBUSxFQUFFLFNBQVMsR0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFDLEtBQUssR0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3RHO0FBQ0wsQ0FBQztBQVJELGdDQVFDO0FBQ0QsU0FBZ0IsVUFBVSxDQUFDLFdBQTBDLEVBQUUsSUFBVyxFQUFFLFVBQTBCLEVBQUUsY0FBa0I7SUFDOUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU87UUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxJQUFJLElBQUksR0FBRyxlQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBQSxnQ0FBYyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzVHLHNCQUFzQixDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxHQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDN0csQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsZ0NBUUM7QUFFRCxTQUFnQixRQUFRLENBQUMsV0FBMEMsRUFBRSxJQUFXLEVBQUUsY0FBa0I7SUFDaEcsTUFBTSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMxQixXQUFXLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU87UUFDcEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLEdBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxPQUFPLEdBQUcsZUFBZSxHQUFHLElBQUEsZ0NBQWMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxHQUFFLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUUsS0FBSyxHQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEYsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBUkQsNEJBUUM7QUFFRCxLQUFLLFVBQVUsY0FBYztJQUN6QixPQUFPLFVBQVUsQ0FBQyxlQUFlLENBQUM7UUFDOUIsSUFBSSxFQUFFLE1BQU0sSUFBQSxrREFBaUIsRUFBQyxNQUFNLEVBQUUsV0FBVyxDQUFDO1FBQ2xELElBQUksRUFBRSxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztRQUNsRCxNQUFNLEVBQUUsTUFBTSxDQUFDLE1BQU0sSUFBQSxrREFBaUIsRUFBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxHQUFHO1FBQ25FLElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztZQUNsRCxJQUFJLEVBQUUsTUFBTSxJQUFBLGtEQUFpQixFQUFDLE1BQU0sRUFBRSxVQUFVLENBQUM7U0FDcEQ7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsS0FBSyxVQUFVLFFBQVEsQ0FBQyxJQUFZLEVBQUUsRUFBVSxFQUFFLE9BQWU7SUFDN0QsSUFBRztRQUNDLElBQUksV0FBVyxHQUFHLE1BQU0sY0FBYyxFQUFFLENBQUM7UUFDekMsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztZQUNsRCxFQUFFO1lBQ0YsT0FBTztZQUNQLElBQUksRUFBRSxJQUFJLEVBQUUsWUFBWTtTQUMzQixDQUFDLENBQUM7UUFDSCxPQUFPLElBQUksQ0FBQztLQUNmO0lBQUEsT0FBTyxDQUFLLEVBQUU7UUFDWCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBRUQsS0FBSyxVQUFVLHNCQUFzQixDQUFDLElBQVksRUFBRSxFQUFVLEVBQUUsT0FBZSxFQUFFLE9BQVk7SUFDekYsSUFBRztRQUNDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUMsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7UUFDbEMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RCLElBQUksV0FBVyxHQUFHLE1BQU0sY0FBYyxFQUFFLENBQUM7UUFDekMsTUFBTSxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQ3ZCLElBQUksRUFBRSxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQztZQUNsRCxFQUFFO1lBQ0YsT0FBTztZQUNQLElBQUksRUFBRSxJQUFJO1lBQ1YsV0FBVyxFQUFFO2dCQUNUO29CQUNJLFFBQVEsRUFBRSxPQUFPLEdBQUUsT0FBTztvQkFDMUIsT0FBTyxFQUFFLFVBQVU7aUJBQ3RCO2FBQ0o7U0FDSixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsT0FBTyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUMvRCxPQUFPLElBQUksQ0FBQztLQUNmO0lBQUEsT0FBTyxDQUFDLEVBQUU7UUFDUCxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEIsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBRUQsS0FBSyxVQUFVLE9BQU8sQ0FBQyxFQUFVLEVBQUUsT0FBZSxFQUFFLE9BQVk7SUFDNUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLGtEQUFpQixFQUFDLE1BQU0sRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNwRSxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ2xFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFeEQsTUFBTSxDQUFDLFFBQVE7U0FDVixNQUFNLENBQUM7UUFDSixJQUFJLEVBQUUsR0FBRyxPQUFPO0VBQzFCLE9BQU8sRUFBRTtRQUNDLElBQUksRUFBRSxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQztRQUNoRCxFQUFFO0tBQ0wsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLE9BQVcsRUFBRSxFQUFFO1FBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDLENBQUE7QUFDVixDQUFDO0FBRUQsS0FBSyxVQUFVLFdBQVcsQ0FBQyxLQUFrQixFQUFFLE9BQWUsRUFBRSxPQUFZO0lBQ3hFLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3QixLQUFLLE1BQU0sVUFBVSxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUU7UUFDL0IsSUFBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQUUsU0FBUztRQUMxQyxNQUFNLE9BQU8sR0FBRztZQUNaLEtBQUssRUFBRSxjQUFjO1lBQ3JCLElBQUksRUFBRSxPQUFPLENBQUMsT0FBTztTQUN4QixDQUFDO1FBQ0YsSUFBSTtZQUNBLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdkQsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQzdDO2lCQUFNO2dCQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMseUJBQXlCLENBQUMsQ0FBQzthQUMzQztTQUNKO1FBQUMsT0FBTyxLQUFTLEVBQUU7WUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3RDtLQUNKO0FBQ0wsQ0FBQztBQUVELGtEQUEwQjtBQUVuQixLQUFLLFVBQVUsNkJBQTZCLENBQUMsY0FBc0IsRUFBRSxPQUFlLEVBQUUsT0FBWTtJQUNyRyxJQUFJLENBQUMsY0FBYyxFQUFFO1FBQ2pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztRQUNuRSxNQUFLLENBQUMsNkNBQTZDLENBQUMsQ0FBQztLQUN4RDtJQUNELE1BQU0sT0FBTyxHQUFHO1FBQ1osS0FBSyxFQUFFLE9BQU87UUFDZCxJQUFJLEVBQUUsT0FBTztLQUNoQixDQUFDO0lBQ0YsSUFBSTtRQUNBLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBSyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0QsSUFBSSxRQUFRLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztTQUN2QztLQUNKO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQzlDO0FBQ0wsQ0FBQztBQW5CRCxzRUFtQkMifQ==