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
    if (process.env.DEV)
        if (process.env.DEV == "true") {
            logger.settings.minLevel = 2;
            console.log("DEBUG");
        }
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
//# sourceMappingURL=main.js.map