"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.talkAboutOtherProject = exports.AsciiArtText = exports.propertyToSend = exports.renderTableAllScanLoud = exports.renderTableAllScan = void 0;
const addOn_service_1 = require("./addOn.service");
const colors = ["#4f5660", "#ffcc00", "#cc3300", "#cc3300"];
const logger_service_1 = require("./logger.service");
const logger = (0, logger_service_1.getNewLogger)("DiplayLogger");
const cfonts = require('cfonts');
const addOnPropertyToSend = (0, addOn_service_1.loadAddOnsCustomUtility)("display", "propertyToSend");
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
        logger.warning("Error while loading addOn display for rule : " + rule?.name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2Rpc3BsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtREFBMEQ7QUFFMUQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RCxxREFBOEM7QUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxNQUFNLG1CQUFtQixHQUFpQyxJQUFBLHVDQUF1QixFQUFDLFNBQVMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBRS9HLFNBQWdCLGtCQUFrQixDQUFDLE9BQXVCO0lBQ3RELElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTtJQUNqQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7UUFDeEMsT0FBTyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7WUFDckMsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssSUFBRSxDQUFDLENBQUMsQ0FBQztZQUNqRCxJQUFHLFFBQVEsSUFBSSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQztnQkFDbEMsUUFBUSxHQUFHLFVBQVUsRUFBRSxJQUFJLEVBQUUsSUFBSSxJQUFFLEVBQUUsQ0FBQTtnQkFDckMsTUFBTSxJQUFJOzs7Ozs2R0FLbUYsR0FBRSxLQUFLLEdBQUU7d0RBQzlELEdBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxJQUFJLEdBQUU7OzZHQUUyQixHQUFFLEtBQUssR0FBRTtnRUFDdEQs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