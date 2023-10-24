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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcGxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2Rpc3BsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtREFBb0Q7QUFFcEQsTUFBTSxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUM1RCxxREFBOEM7QUFDOUMsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxNQUFNLG1CQUFtQixHQUFpQyxJQUFBLGlDQUFpQixHQUFFLENBQUM7QUFFOUUsU0FBZ0Isa0JBQWtCLENBQUMsT0FBdUI7SUFDdEQsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBO0lBQ2pCLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNsQyxPQUFPLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxJQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUcsUUFBUSxJQUFJLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDO2dCQUM1QixRQUFRLEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLElBQUUsRUFBRSxDQUFBO2dCQUMvQixNQUFNLElBQUk7Ozs7OzZHQUttRixHQUFFLEtBQUssR0FBRTt3REFDOUQsR0FBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksR0FBRTs7NkdBRWlDLEdBQUUsS0FBSyxHQUFFO2dFQUN0RCxHQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFOzs4Q0FFN0MsQ0FBQzthQUNsQztZQUNELE1BQU0sSUFBSTs7O3lCQUdHLEdBQUUsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUMsR0FBRTs7c0JBRTNELENBQUM7WUFDWCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBLENBQUMsQ0FBQSw0QkFBNEIsQ0FBQSxDQUFDLENBQUEsRUFBRSxDQUFDO1lBQzdHLE9BQU8sTUFBTSxDQUFBO1FBQ2pCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNoQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFWixPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO0FBakNELGdEQWlDQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxJQUFXLEVBQUUsYUFBa0IsRUFBRSxRQUFlLEtBQUs7SUFDaEYsSUFBRztRQUNDLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDL0U7SUFBQSxPQUFNLENBQUMsRUFBQztRQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsK0NBQStDLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdFLE9BQU8sT0FBTyxHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUE7S0FDcEM7QUFDTCxDQUFDO0FBUEQsd0NBT0M7QUFFRCxTQUFnQixZQUFZLENBQUMsSUFBVztJQUNwQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRTtRQUNiLElBQUksRUFBRSxPQUFPO1FBQ2IsS0FBSyxFQUFFLFFBQVE7UUFDZixNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDbEIsVUFBVSxFQUFFLGFBQWE7UUFDekIsYUFBYSxFQUFFLENBQUM7UUFDaEIsVUFBVSxFQUFFLENBQUM7UUFDYixLQUFLLEVBQUUsSUFBSTtRQUNYLFNBQVMsRUFBRSxHQUFHO1FBQ2QsUUFBUSxFQUFFLEtBQUs7UUFDZixtQkFBbUIsRUFBRSxLQUFLO1FBQzFCLGtCQUFrQixFQUFFLEtBQUs7UUFDekIsR0FBRyxFQUFFLE1BQU0sQ0FBaUIscURBQXFEO0tBQ3BGLENBQUMsQ0FBQztBQUNQLENBQUM7QUFmRCxvQ0FlQztBQUVELFNBQWdCLHFCQUFxQjtJQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNFQUFzRSxDQUFDLENBQUM7QUFDeEYsQ0FBQztBQUZELHNEQUVDIn0=