"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const analyse_service_1 = require("./services/analyse.service");
const alerte_service_1 = require("./services/alerte.service");
const display_service_1 = require("./services/display.service");
const manageVarEnvironnement_service_1 = require("./services/manageVarEnvironnement.service");
const addOn_service_1 = require("./services/addOn.service");
const files_1 = require("./helpers/files");
const logger_service_1 = require("./services/logger.service");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const core = require('@actions/core');
require('dotenv').config();
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                                                   // reading environnement vars                                                       // file system
async function main() {
    let customRules = await (0, manageVarEnvironnement_service_1.getEnvVar)("MYOWNRULES");
    if (customRules != "NO") {
        await (0, manageVarEnvironnement_service_1.setEnvVar)("RULESDIRECTORY", customRules);
        core.addPath(customRules);
    }
    const logger = (0, logger_service_1.getNewLogger)("MainLogger");
    logger.debug("test");
    logger.debug(await (0, manageVarEnvironnement_service_1.getEnvVar)("TEST"));
    (0, display_service_1.AsciiArtText)("Kexa");
    logger.info("___________________________________________________________________________________________________");
    logger.info("___________________________________-= running Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________");
    let rulesDirectory = (await (0, manageVarEnvironnement_service_1.getEnvVar)("RULESDIRECTORY")) ?? "./src/rules";
    if (rulesDirectory == "") {
        rulesDirectory = "./src/rules";
    }
    let settings = await (0, analyse_service_1.gatheringRules)(rulesDirectory);
    if (settings.length != 0) {
        let stop = false;
        let resources = {};
        resources = await (0, addOn_service_1.loadAddOns)(resources);
        settings.forEach(setting => {
            let result = (0, analyse_service_1.checkRules)(setting.rules, resources, setting.alert);
            logger.setOutput('resultScan', result);
            if (setting.alert.global.enabled) {
                let compteError = (0, alerte_service_1.alertGlobal)(result, setting.alert.global);
                if (compteError[2] > 0 || compteError[3] > 0) {
                    stop = true;
                }
            }
        });
        if (stop)
            core.setFailed(`Kexa found at least one error or critical error, please check the logs for more details.`);
    }
    else {
        logger.error("No correct rules found, please check the rules directory or the rules files.");
    }
    (0, files_1.deleteFile)("./config/headers.json");
    (0, files_1.deleteFile)("./config/addOnNeed.json");
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    logger.info("___________________________________________________________________________________________________");
    logger.info("_______________________________________-= End Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________");
    (0, display_service_1.talkAboutOtherProject)();
}
exports.main = main;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdFQUF3RTtBQUN4RSw4REFBd0Q7QUFDeEQsZ0VBQWdGO0FBQ2hGLDhGQUFpRjtBQUNqRiw0REFBc0Q7QUFDdEQsMkNBQTBEO0FBQzFELDhEQUF1RDtBQUV2RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM3QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLDRTQUE0UztBQUVyUyxLQUFLLFVBQVUsSUFBSTtJQUN0QixJQUFJLFdBQVcsR0FBRyxNQUFNLElBQUEsMENBQVMsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxJQUFHLFdBQVcsSUFBSSxJQUFJLEVBQUM7UUFDbkIsTUFBTSxJQUFBLDBDQUFTLEVBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUM3QjtJQUNELE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxZQUFZLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFBLDBDQUFTLEVBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0QyxJQUFBLDhCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsSUFBSSxjQUFjLEdBQUcsQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUUsYUFBYSxDQUFDO0lBQ3hFLElBQUcsY0FBYyxJQUFJLEVBQUUsRUFBQztRQUNwQixjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQ2xDO0lBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFBLGdDQUFjLEVBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEQsSUFBRyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztRQUNwQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLFNBQVMsR0FBRyxNQUFNLElBQUEsMEJBQVUsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUEsNEJBQVUsRUFBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkMsSUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUM7Z0JBQzVCLElBQUksV0FBVyxHQUFHLElBQUEsNEJBQVcsRUFBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUQsSUFBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUM7b0JBQ3BDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBRyxJQUFJO1lBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQywwRkFBMEYsQ0FBQyxDQUFDO0tBQ3ZIO1NBQUs7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLDhFQUE4RSxDQUFDLENBQUM7S0FDaEc7SUFFRCxJQUFBLGtCQUFVLEVBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNwQyxJQUFBLGtCQUFVLEVBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN0QyxxSUFBcUk7SUFDckksTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsSUFBQSx1Q0FBcUIsR0FBRSxDQUFDO0FBQzVCLENBQUM7QUE3Q0Qsb0JBNkNDO0FBRUQsdUlBQXVJO0FBRXZJLElBQUksRUFBRSxDQUFDIn0=