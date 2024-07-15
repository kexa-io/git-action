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
const latestVersion_1 = require("./helpers/latestVersion");
const save_service_1 = require("./services/save.service");
const core = require('@actions/core');
require('dotenv').config();
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
    await (0, latestVersion_1.displayVersionAndLatest)(logger);
    let rulesDirectory = (await (0, manageVarEnvironnement_service_1.getEnvVar)("RULESDIRECTORY")) ?? "./rules";
    if (rulesDirectory == "") {
        rulesDirectory = "./rules";
    }
    let settings = await (0, analyse_service_1.gatheringRules)(rulesDirectory);
    if (settings.length != 0) {
        let stop = false;
        let resources = {};
        resources = await (0, addOn_service_1.loadAddOns)(resources, settings);
        logger.info("Resources loaded");
        logger.debug(JSON.stringify(resources));
        settings.forEach(setting => {
            let result = (0, analyse_service_1.checkRules)(setting.rules, resources, setting.alert);
            logger.setOutput('resultScan', result);
            if (setting.alert.global.enabled) {
                let compteError = (0, alerte_service_1.alertGlobal)(result, setting.alert.global);
                if (compteError[2] > 0 || compteError[3] > 0) {
                    stop = true;
                }
            }
            (0, save_service_1.saveResult)(result);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdFQUF3RTtBQUN4RSw4REFBd0Q7QUFDeEQsZ0VBQWdGO0FBQ2hGLDhGQUFpRjtBQUNqRiw0REFBc0Q7QUFDdEQsMkNBQTBEO0FBQzFELDhEQUF1RDtBQUN2RCwyREFBa0U7QUFDbEUsMERBQXFEO0FBRXJELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN0QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFcEIsS0FBSyxVQUFVLElBQUk7SUFDdEIsSUFBSSxXQUFXLEdBQUcsTUFBTSxJQUFBLDBDQUFTLEVBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEQsSUFBRyxXQUFXLElBQUksSUFBSSxFQUFDO1FBQ25CLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLGdCQUFnQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDN0I7SUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsWUFBWSxDQUFDLENBQUM7SUFFMUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDdEMsSUFBQSw4QkFBWSxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sSUFBQSx1Q0FBdUIsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUN0QyxJQUFJLGNBQWMsR0FBRyxDQUFDLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBRSxTQUFTLENBQUM7SUFDcEUsSUFBRyxjQUFjLElBQUksRUFBRSxFQUFDO1FBQ3BCLGNBQWMsR0FBRyxTQUFTLENBQUM7S0FDOUI7SUFDRCxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUEsZ0NBQWMsRUFBQyxjQUFjLENBQUMsQ0FBQztJQUNwRCxJQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1FBQ3BCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsU0FBUyxHQUFHLE1BQU0sSUFBQSwwQkFBVSxFQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDeEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QixJQUFJLE1BQU0sR0FBRyxJQUFBLDRCQUFVLEVBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZDLElBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDO2dCQUM1QixJQUFJLFdBQVcsR0FBRyxJQUFBLDRCQUFXLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVELElBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDO29CQUNwQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2lCQUNmO2FBQ0o7WUFDRCxJQUFBLHlCQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFHLElBQUk7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLDBGQUEwRixDQUFDLENBQUM7S0FDdkg7U0FBSztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsOEVBQThFLENBQUMsQ0FBQztLQUNoRztJQUVELElBQUEsa0JBQVUsRUFBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3BDLElBQUEsa0JBQVUsRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3RDLHFJQUFxSTtJQUNySSxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxJQUFBLHVDQUFxQixHQUFFLENBQUM7QUFDNUIsQ0FBQztBQWpERCxvQkFpREM7QUFFRCx1SUFBdUk7QUFFdkksSUFBSSxFQUFFLENBQUMifQ==