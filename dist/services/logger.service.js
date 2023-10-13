"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNewLogger = void 0;
//import { Logger } from "tslog";
const dotenv = __importStar(require("dotenv"));
const core = __importStar(require("@actions/core"));
dotenv.config();
const process = require('process');
//export function getNewLogger(name: string) {
//    let debug_mode;
//    if (!process.env.DEBUG_MODE) {
//        debug_mode = DebugEnum.INFO;
//    } else {
//        let debug_var = process.env.DEBUG_MODE;
//        if (!isNaN(parseInt(debug_var)))
//            debug_mode = Number(debug_var);
//        else
//            debug_mode = Number(DebugEnum[debug_var]);
//    }
//    return new Logger({minLevel: debug_mode, name: name});
//}
function getNewLogger(name) {
    return core;
}
exports.getNewLogger = getNewLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBaUM7QUFDakMsK0NBQWlDO0FBQ2pDLG9EQUFzQztBQUV0QyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBRW5DLDhDQUE4QztBQUM5QyxxQkFBcUI7QUFDckIsb0NBQW9DO0FBQ3BDLHNDQUFzQztBQUN0QyxjQUFjO0FBQ2QsaURBQWlEO0FBQ2pELDBDQUEwQztBQUMxQyw2Q0FBNkM7QUFDN0MsY0FBYztBQUNkLHdEQUF3RDtBQUN4RCxPQUFPO0FBQ1AsNERBQTREO0FBQzVELEdBQUc7QUFFSCxTQUFnQixZQUFZLENBQUMsSUFBWTtJQUNyQyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRkQsb0NBRUMifQ==