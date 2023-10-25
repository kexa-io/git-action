"use strict";
//import * as core from '@actions/core'
//import { wait } from './wait'
//
///**
// * The main function for the action.
// * @returns {Promise<void>} Resolves when the action is complete.
// */
//export async function run(): Promise<void> {
//  try {
//    const ms: string = core.getInput('milliseconds')
//
//    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
//    core.debug(`Waiting ${ms} milliseconds ...`)
//
//    // Log the current timestamp, wait, then log the new timestamp
//    core.debug(new Date().toTimeString())
//    await wait(parseInt(ms, 10))
//    core.debug(new Date().toTimeString())
//
//    // Set outputs for other workflow steps to use
//    core.setOutput('time', new Date().toTimeString())
//  } catch (error) {
//    // Fail the workflow run if an error occurs
//    if (error instanceof Error) core.setFailed(error.message)
//  }
//}
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
    //core.addPath('./rules');
    let customRules = await (0, manageVarEnvironnement_service_1.getEnvVar)("MYOWNRULES");
    if (customRules != "NO") {
        core.addPath(customRules);
        await (0, manageVarEnvironnement_service_1.setEnvVar)("RULESDIRECTORY", customRules);
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
    //logger.debug(await getEnvVar("test"));
}
exports.main = main;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1Q0FBdUM7QUFDdkMsK0JBQStCO0FBQy9CLEVBQUU7QUFDRixLQUFLO0FBQ0wsc0NBQXNDO0FBQ3RDLG1FQUFtRTtBQUNuRSxLQUFLO0FBQ0wsOENBQThDO0FBQzlDLFNBQVM7QUFDVCxzREFBc0Q7QUFDdEQsRUFBRTtBQUNGLDhFQUE4RTtBQUM5RSxrREFBa0Q7QUFDbEQsRUFBRTtBQUNGLG9FQUFvRTtBQUNwRSwyQ0FBMkM7QUFDM0Msa0NBQWtDO0FBQ2xDLDJDQUEyQztBQUMzQyxFQUFFO0FBQ0Ysb0RBQW9EO0FBQ3BELHVEQUF1RDtBQUN2RCxxQkFBcUI7QUFDckIsaURBQWlEO0FBQ2pELCtEQUErRDtBQUMvRCxLQUFLO0FBQ0wsR0FBRzs7O0FBRUgsZ0VBQXdFO0FBQ3hFLDhEQUF3RDtBQUN4RCxnRUFBZ0Y7QUFDaEYsOEZBQWlGO0FBQ2pGLDREQUFzRDtBQUN0RCwyQ0FBNkM7QUFDN0MsOERBQXVEO0FBRXZELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNyQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzdDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN0QyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDM0IsNFNBQTRTO0FBRXJTLEtBQUssVUFBVSxJQUFJO0lBQ3RCLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekIsMEJBQTBCO0lBQzFCLElBQUksV0FBVyxHQUFHLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2hELElBQUcsV0FBVyxJQUFJLElBQUksRUFBQztRQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLFdB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