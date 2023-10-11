"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.talkAboutOtherProject = exports.AsciiArtText = exports.propertyToSend = exports.renderTableAllScan = void 0;
const addOn_service_1 = require("./addOn.service");
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const logger_service_1 = require("./logger.service");
const logger = (0, logger_service_1.getNewLogger)("DiplayLogger");
const cfonts = require('cfonts');
const addOnPropertyToSend = (0, addOn_service_1.loadAddOnsDisplay)();
function renderTableAllScan(allScan) {
    let lastRule = "";
    let result = allScan.map((mainRule) => {
        return mainRule.map((rule) => {
            let result = "";
            const color = colors[rule?.rule?.level ?? 0];
            if (lastRule != rule?.rule?.name) {
                lastRule = rule?.rule?.name ?? "";
                result += `<tr style="border: 4px solid black; border-width: 4px 0;">
                            <td>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;color:` + color + `"  colspan="1">
                                                Name : ` + rule?.rule?.name + `
                                            </td>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;color:` + color + `"  colspan="2">
                                            &nbspDescription : ` + rule?.rule?.description + `
                                            </td>
                                        </tr>`;
            }
            result += `
                <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center" colspan="3">
                        ` + propertyToSend(rule.rule, rule.objectContent, false) + `
                    </td>
                </tr>`;
            result += (mainRule[mainRule.length - 1].objectContent === rule.objectContent) ? '</tbody></table></td></tr>' : '';
            return result;
        }).join(' ');
    }).join(' ');
    return result;
}
exports.renderTableAllScan = renderTableAllScan;
function propertyToSend(rule, objectContent, isSms = false) {
    try {
        return addOnPropertyToSend[rule?.cloudProvider](rule, objectContent, isSms);
    }
    catch (e) {
        logger.warn("Error while loading addOn display for rule : " + rule?.name);
        return `Id : ` + objectContent.id;
    }
}
exports.propertyToSend = propertyToSend;
function AsciiArtText(text) {
    cfonts.say(text, {
        font: 'block',
        align: 'center',
        colors: ['system'],
        background: 'transparent',
        letterSpacing: 1,
        lineHeight: 1,
        space: true,
        maxLength: '0',
        gradient: false,
        independentGradient: false,
        transitionGradient: false,
        env: 'node' // define the environment cfonts is being executed in
    });
}
exports.AsciiArtText = AsciiArtText;
function talkAboutOtherProject() {
    logger.info("You can go check our other project : https://www.thecloudprices.com/");
}
exports.talkAboutOtherProject = talkAboutOtherProject;
//# sourceMappingURL=display.service.js.map