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
    core.addPath('./config');
    core.addPath('./src');
    core.addPath('./lib');
    let customRules = await (0, manageVarEnvironnement_service_1.getEnvVar)("MYOWNRULES");
    if (customRules != "NO") {
        await (0, manageVarEnvironnement_service_1.setEnvVar)("RULESDIRECTORY", customRules);
        core.addPath(customRules);
    }
    (0, files_1.setRealPath)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdFQUF3RTtBQUN4RSw4REFBd0Q7QUFDeEQsZ0VBQWdGO0FBQ2hGLDhGQUFpRjtBQUNqRiw0REFBc0Q7QUFDdEQsMkNBQTBEO0FBQzFELDhEQUF1RDtBQUV2RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDckMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUM3QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdEMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzNCLDRTQUE0UztBQUVyUyxLQUFLLFVBQVUsSUFBSTtJQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN0QixJQUFJLFdBQVcsR0FBRyxNQUFNLElBQUEsMENBQVMsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxJQUFHLFdBQVcsSUFBSSxJQUFJLEVBQUM7UUFDbkIsTUFBTSxJQUFBLDBDQUFTLEVBQUMsZ0JBQWdCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUM3QjtJQUNELElBQUEsbUJBQVcsR0FBRSxDQUFDO0lBQ2QsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUEsOEJBQVksRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxJQUFJLGNBQWMsR0FBRyxDQUFDLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBRSxhQUFhLENBQUM7SUFDeEUsSUFBRyxjQUFjLElBQUksRUFBRSxFQUFDO1FBQ3BCLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDbEM7SUFDRCxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUEsZ0NBQWMsRUFBQyxjQUFjLENBQUMsQ0FBQztJQUNwRCxJQUFHLFFBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFDO1FBQ3BCLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsU0FBUyxHQUFHLE1BQU0sSUFBQSwwQkFBVSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxNQUFNLEdBQUcsSUFBQSw0QkFBVSxFQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRSxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2QyxJQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBQztnQkFDNUIsSUFBSSxXQUFXLEdBQUcsSUFBQSw0QkFBVyxFQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM1RCxJQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQztvQkFDcEMsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDZjthQUNKO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFHLElBQUk7WUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLDBGQUEwRixDQUFDLENBQUM7S0FDdkg7U0FBSztRQUNGLE1BQU0sQ0FBQyxLQUFLLENBQUMsOEVBQThFLENBQUMsQ0FBQztLQUNoRztJQUVELElBQUEsa0JBQVUsRUFBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3BDLElBQUEsa0JBQVUsRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQ3RDLHFJQUFxSTtJQUNySSxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxJQUFBLHVDQUFxQixHQUFFLENBQUM7QUFDNUIsQ0FBQztBQWpERCxvQkFpREM7QUFFRCx1SUFBdUk7QUFFdkksSUFBSSxFQUFFLENBQUMifQ==