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
exports.setContext = exports.getContext = exports.getNewLogger = void 0;
const debug_enum_1 = require("../enum/debug.enum");
const dotenv = __importStar(require("dotenv"));
//import { Context } from "@azure/functions"
const tslog_1 = require("tslog");
dotenv.config();
const process = require('process');
function getNewLogger(name) {
    let debug_mode;
    if (!process.env.DEBUG_MODE) {
        debug_mode = debug_enum_1.DebugEnum.INFO;
    }
    else {
        let debug_var = process.env.DEBUG_MODE;
        if (!isNaN(parseInt(debug_var)))
            debug_mode = Number(debug_var);
        else
            debug_mode = Number(debug_enum_1.DebugEnum[debug_var]);
    }
    return new tslog_1.Logger({ minLevel: debug_mode, name: name });
}
exports.getNewLogger = getNewLogger;
function getContext() {
    return LoggerAzure.getContext();
}
exports.getContext = getContext;
function setContext(context) {
    LoggerAzure.setContext(context);
}
exports.setContext = setContext;
class LoggerAzure {
    static setContext(context) {
        LoggerAzure.context = context;
    }
    static getContext() {
        return LoggerAzure.context;
    }
    LoggerAzure(context) {
        LoggerAzure.setContext(context);
    }
}
LoggerAzure.context = null;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvbG9nZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtREFBNkM7QUFDN0MsK0NBQWlDO0FBQ2pDLDRDQUE0QztBQUM1QyxpQ0FBK0I7QUFFL0IsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUVuQyxTQUFnQixZQUFZLENBQUMsSUFBWTtJQUNyQyxJQUFJLFVBQVUsQ0FBQztJQUNmLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRTtRQUN6QixVQUFVLEdBQUcsc0JBQVMsQ0FBQyxJQUFJLENBQUM7S0FDL0I7U0FBTTtRQUNILElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzNCLFVBQVUsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O1lBRS9CLFVBQVUsR0FBRyxNQUFNLENBQUMsc0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0tBQ2pEO0lBQ0QsT0FBTyxJQUFJLGNBQU0sQ0FBQyxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQVpELG9DQVlDO0FBRUQsU0FBZ0IsVUFBVTtJQUN0QixPQUFPLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNwQyxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxTQUFnQixVQUFVLENBQUMsT0FBZ0I7SUFDdkMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRkQsZ0NBRUM7QUFFRCxNQUFNLFdBQVc7SUFHYixNQUFNLENBQUMsVUFBVSxDQUFDLE9BQWU7UUFDN0IsV0FBVyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVO1FBQ2IsT0FBTyxXQUFXLENBQUMsT0FBTyxDQUFDO0lBQy9CLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBZTtRQUN2QixXQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3BDLENBQUM7O0FBWmMsbUJBQU8sR0FBa0IsSUFBSSxDQUFDIn0=