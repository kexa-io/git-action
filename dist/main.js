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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const analyse_service_1 = require("./services/analyse.service");
const alerte_service_1 = require("./services/alerte.service");
const display_service_1 = require("./services/display.service");
const manageVarEnvironnement_service_1 = require("./services/manageVarEnvironnement.service");
const addOn_service_1 = require("./services/addOn.service");
const files_1 = require("./helpers/files");
const logger_service_1 = require("./services/logger.service");
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const args = yargs(hideBin(process.argv)).argv;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
dotenv_1.default.config(); // reading environnement vars                                                       // file system
async function main() {
    const logger = (0, logger_service_1.getNewLogger)("MainLogger");
    logger.debug(args);
    (0, display_service_1.AsciiArtText)("Kexa");
    logger.info("___________________________________________________________________________________________________");
    logger.info("___________________________________-= running Kexa scan =-_________________________________________");
    logger.info("___________________________________________________________________________________________________");
    let settings = await (0, analyse_service_1.gatheringRules)(await (0, manageVarEnvironnement_service_1.getEnvVar)("RULESDIRECTORY") ?? "./Kexa/rules");
    if (settings.length != 0) {
        let resources = {};
        resources = await (0, addOn_service_1.loadAddOns)(resources);
        if (args.o)
            (0, files_1.writeStringToJsonFile)(JSON.stringify(resources), "./config/resultScan" + new Date().toISOString().slice(0, 16).replace(/[-T:/]/g, '') + ".json");
        settings.forEach(setting => {
            let result = (0, analyse_service_1.checkRules)(setting.rules, resources, setting.alert);
            if (setting.alert.global.enabled) {
                (0, alerte_service_1.alertGlobal)(result, setting.alert.global);
            }
        });
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
if (require.main === module) {
    main();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSx1Q0FBdUM7QUFDdkMsK0JBQStCO0FBQy9CLEVBQUU7QUFDRixLQUFLO0FBQ0wsc0NBQXNDO0FBQ3RDLG1FQUFtRTtBQUNuRSxLQUFLO0FBQ0wsOENBQThDO0FBQzlDLFNBQVM7QUFDVCxzREFBc0Q7QUFDdEQsRUFBRTtBQUNGLDhFQUE4RTtBQUM5RSxrREFBa0Q7QUFDbEQsRUFBRTtBQUNGLG9FQUFvRTtBQUNwRSwyQ0FBMkM7QUFDM0Msa0NBQWtDO0FBQ2xDLDJDQUEyQztBQUMzQyxFQUFFO0FBQ0Ysb0RBQW9EO0FBQ3BELHVEQUF1RDtBQUN2RCxxQkFBcUI7QUFDckIsaURBQWlEO0FBQ2pELCtEQUErRDtBQUMvRCxLQUFLO0FBQ0wsR0FBRzs7Ozs7O0FBRUgsb0RBQXlCO0FBQ3pCLGdFQUF3RTtBQUN4RSw4REFBd0Q7QUFDeEQsZ0VBQWdGO0FBQ2hGLDhGQUFzRTtBQUN0RSw0REFBc0Q7QUFDdEQsMkNBQW9FO0FBQ3BFLDhEQUF1RDtBQUV2RCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7QUFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQTtBQUM1QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtBQUU5Qyx1SUFBdUk7QUFDdkksZ0JBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFvRSxrR0FBa0c7QUFFNUssS0FBSyxVQUFVLElBQUk7SUFDdEIsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLFlBQVksQ0FBQyxDQUFDO0lBRTFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsSUFBQSw4QkFBWSxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILElBQUksUUFBUSxHQUFHLE1BQU0sSUFBQSxnQ0FBYyxFQUFDLE1BQU0sSUFBQSwwQ0FBUyxFQUFDLGdCQUFnQixDQUFDLElBQUUsY0FBYyxDQUFDLENBQUM7SUFDdkYsSUFBRyxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBQztRQUVwQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsU0FBUyxHQUFHLE1BQU0sSUFBQSwwQkFBVSxFQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3hDLElBQUcsSUFBSSxDQUFDLENBQUM7WUFBRSxJQUFBLDZCQUFxQixFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEVBQUUscUJBQXFCLEdBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEdBQUUsT0FBTyxDQUFDLENBQUM7UUFDMUosUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN2QixJQUFJLE1BQU0sR0FBRyxJQUFBLDRCQUFVLEVBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2pFLElBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFDO2dCQUM1QixJQUFBLDRCQUFXLEVBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDN0M7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNOO1NBQUs7UUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLDhFQUE4RSxDQUFDLENBQUM7S0FDaEc7SUFFRCxJQUFBLGtCQUFVLEVBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNwQyxJQUFBLGtCQUFVLEVBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN0QyxxSUFBcUk7SUFDckksTUFBTSxDQUFDLElBQUksQ0FBQyxxR0FBcUcsQ0FBQyxDQUFDO0lBQ25ILE1BQU0sQ0FBQyxJQUFJLENBQUMscUdBQXFHLENBQUMsQ0FBQztJQUNuSCxNQUFNLENBQUMsSUFBSSxDQUFDLHFHQUFxRyxDQUFDLENBQUM7SUFDbkgsSUFBQSx1Q0FBcUIsR0FBRSxDQUFDO0lBQ3hCLHdDQUF3QztBQUM1QyxDQUFDO0FBaENELG9CQWdDQztBQUVELHVJQUF1STtBQUV2SSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO0lBQ3pCLElBQUksRUFBRSxDQUFDO0NBQ1YifQ==