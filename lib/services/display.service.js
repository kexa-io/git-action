"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.talkAboutOtherProject = exports.AsciiArtText = exports.propertyToSend = exports.renderTableAllScanLoud = exports.renderTableAllScan = void 0;
const addOn_service_1 = require("./addOn.service");
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const logger_service_1 = require("./logger.service");
const logger = (0, logger_service_1.getNewLogger)("DiplayLogger");
const cfonts = require('cfonts');
const addOnPropertyToSend = (0, addOn_service_1.loadAddOnsDisplay)();
function renderTableAllScan(allScan) {
    let lastRule = "";
    let result = allScan.map((listResultScan) => {
        return listResultScan.map((resultScan) => {
            let result = "";
            const color = colors[resultScan?.rule?.level ?? 0];
            if (lastRule != resultScan?.rule?.name) {
                lastRule = resultScan?.rule?.name ?? "";
                result += `<tr style="border: 4px solid black; border-width: 4px 0;">
                            <td>
                                <table style="width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;color:` + color + `"  colspan="1">
                                                Name : ` + resultScan?.rule?.name + `
                                            </td>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;color:` + color + `"  colspan="2">
                                            &nbspDescription : ` + resultScan?.rule?.description + `
                                            </td>
                                        </tr>`;
            }
            result += `
                <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center" colspan="3">
                        ` + propertyToSend(resultScan.rule, resultScan.objectContent, false) + `
                    </td>
                </tr>`;
            result += (listResultScan[listResultScan.length - 1].objectContent === resultScan.objectContent) ? '</tbody></table></td></tr>' : '';
            return result;
        }).join(' ');
    }).join(' ');
    return result;
}
exports.renderTableAllScan = renderTableAllScan;
function renderTableAllScanLoud(allScan) {
    let lastRule = "";
    let result = allScan.map((listResultScan) => {
        return listResultScan.map((resultScan) => {
            let result = "";
            if (lastRule != resultScan?.rule?.name) {
                lastRule = resultScan?.rule?.name ?? "";
                result += `<tr style="border: 4px solid black; border-width: 4px 0;">
                            <td>
                                <table style="width:100%">
                                    <tbody>
                                        <tr>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;"  colspan="1">
                                                Name : ` + resultScan?.rule?.name + `
                                            </td>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;"  colspan="2">
                                            &nbspDescription : ` + resultScan?.loud?.message + `
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="direction:ltr;padding:20px 0;text-align:center;"  colspan="3">
                                                All the following object are compliant with the rule
                                            </td>
                                        </tr>`;
            }
            result += `
                <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center" colspan="3">
                        ` + propertyToSend(resultScan.rule, resultScan.objectContent, false) + `
                    </td>
                </tr>`;
            result += (listResultScan[listResultScan.length - 1].objectContent === resultScan.objectContent) ? '</tbody></table></td></tr>' : '';
            return result;
        }).join(' ');
    }).join(' ');
    return result;
}
exports.renderTableAllScanLoud = renderTableAllScanLoud;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2Rpc3BsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtREFBb0Q7QUFFcEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RCxxREFBOEM7QUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxNQUFNLG1CQUFtQixHQUFpQyxJQUFBLGlDQUFpQixHQUFFLENBQUM7QUFFOUUsU0FBZ0Isa0JBQWtCLENBQUMsT0FBdUI7SUFDdEQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxjQUFjLEVBQUUsRUFBRTtRQUN4QyxPQUFPLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtZQUNyQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUUsS0FBSyxJQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2pELElBQUcsUUFBUSxJQUFJLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO2dCQUNsQyxRQUFRLEdBQUcsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLElBQUUsRUFBRSxDQUFBO2dCQUNyQyxNQUFNLElBQUk7Ozs7OzZHQUttRixHQUFFLEtBQUssR0FBRTt3REFDOUQsR0FBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRTs7NkdBRTJCLEdBQUUsS0FBSyxHQUFFO2dFQUN0RCxHQUFFLFVBQVUsRUFBRSxJQUFJLEVB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