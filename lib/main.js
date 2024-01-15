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
    await (0, latestVersion_1.displayVersionAndLatest)(logger);
    let rulesDirectory = (await (0, manageVarEnvironnement_service_1.getEnvVar)("RULESDIRECTORY")) ?? "./rules";
    if (rulesDirectory == "") {
        rulesDirectory = "./rules";
    }
    let settings = await (0, analyse_service_1.gatheringRules)(rulesDirectory);
    if (settings.length != 0) {
        let stop = false;
        let resources = {};
        resources = await (0, addOn_service_1.loadAddOns)(resources);
        logger.info(JSON.stringify(resources));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdFQUF3RTtBQUN4RSw4REFBd0Q7QUFDeEQsZ0VBQWdGO0FBQ2hGLDhGQUFpRjtBQUNqRiw0REFBc0Q7QUFDdEQsMkNBQTBEO0FBQzFELDhEQUF1RDtBQUN2RCwyREFBa0U7QUFDbEUsMERBQXFEO0FBRXJELE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN0QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0IsNFNBQTRTO0FBRXJTLEtBQUssVUFBVSxJQUFJO0lBQ3RCLElBQUksV0FBVyxHQUFHLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hELElBQUcsV0FBVyxJQUFJLElBQUksRUFBQztRQUNuQixNQUFNLElBQUEsMENBQVMsRUFBQyxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzdCO0lBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLElBQUEsOEJBQVksRUFBQyxNQUFNLENBQUMsQ0FBQztJQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLElBQUEsdUNBQXVCLEVBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxNQUFNLElBQUEsMENBQVMsRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUUsU0FBUyxDQUFDO0lBQ3BFLElBQUcsY0FBYyxJQUFJLEVBQUUsRUFBQztRQUNwQixjQUFjLEdBQUcsU0FBUyxDQUFDO0tBQzlCO0lBQ0QsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFBLGdDQUFjLEVBQUMsY0FBYyxDQUFDLENBQUM7SUFDcEQsSUFBRyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztRQUNwQixJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLFNBQVMsR0FBRyxNQUFNLElBQUEsMEJBQVUsRUFBQyxTQUFTLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN2QyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3ZCLElBQUksTUFBTSxHQUFHLElBQUEsNEJBQVUsRUFBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkMsSUFBRyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUM7Z0JBQzVCLElBQUksV0FBVyxHQUFHLElBQUEsNEJBQVcsRUFBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDNUQsSUFBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUM7b0JBQ3BDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjtZQUNELElBQUEseUJBQVUsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztRQUNILElBQUcsSUFBSTtZQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsMEZBQTBGLENBQUMsQ0FBQztLQUN2SDtTQUFLO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyw4RUFBOEUsQ0FBQyxDQUFDO0tBQ2hHO0lBRUQsSUFBQSxrQkFBVSxFQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDcEMsSUFBQSxrQkFBVSxFQUFDLHlCQUF5QixDQUFDLENBQUM7SUFDdEMscUlBQXFJO0lBQ3JJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILElBQUEsdUNBQXFCLEdBQUUsQ0FBQztBQUM1QixDQUFDO0FBaERELG9CQWdEQztBQUVELHVJQUF1STtBQUV2SSxJQUFJLEVBQUUsQ0FBQyJ9