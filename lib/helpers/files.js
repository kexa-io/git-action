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
exports.setRealPath = exports.writeFileSync = exports.getFile = exports.deleteFile = exports.writeStringToJsonFile = void 0;
const fs = __importStar(require("fs"));
const logger_service_1 = require("../services/logger.service");
const jsonStringify_1 = require("./jsonStringify");
const logger = (0, logger_service_1.getNewLogger)("FilesHelper");
function writeStringToJsonFile(data, filePath) {
    try {
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            const initialData = (0, jsonStringify_1.jsonStringify)({});
            fs.writeFileSync(filePath, initialData);
        }
        fs.writeFileSync(filePath, (0, jsonStringify_1.jsonStringify)(JSON.parse(data), 4), 'utf8');
        return true;
    }
    catch (error) {
        logger.error(error);
        return false;
    }
}
exports.writeStringToJsonFile = writeStringToJsonFile;
function deleteFile(filePath) {
    try {
        const fileExists = fs.existsSync(filePath);
        if (fileExists) {
            fs.unlinkSync(filePath);
        }
        return true;
    }
    catch (error) {
        logger.error(error);
        return false;
    }
}
exports.deleteFile = deleteFile;
function getFile(filePath) {
    try {
        const fileExists = fs.existsSync(filePath);
        if (fileExists) {
            return fs.readFileSync(filePath, 'utf8');
        }
        return null;
    }
    catch (error) {
        return null;
    }
}
exports.getFile = getFile;
function writeFileSync(data, filePath) {
    try {
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            fs.writeFileSync(filePath, "");
        }
        fs.writeFileSync(filePath, data);
        return true;
    }
    catch (error) {
        logger.error(error);
        return false;
    }
}
exports.writeFileSync = writeFileSync;
function setRealPath() {
    const workspace = process.env.GITHUB_WORKSPACE;
    logger.info(`workspace: ${workspace}`);
    logger.info(`ls pre: ${fs.readdirSync("./")}`);
    if (!workspace) {
        return;
    }
    process.chdir(workspace);
    logger.info(`cwd: ${process.cwd()}`);
    logger.info(`ls after: ${fs.readdirSync(process.cwd())}`);
    logger.info(`ls after: ${fs.readdirSync("./")}`);
}
exports.setRealPath = setRealPath;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9maWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QjtBQUN6QiwrREFBMEQ7QUFDMUQsbURBQWdEO0FBQ2hELE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxhQUFhLENBQUMsQ0FBQztBQUUzQyxTQUFnQixxQkFBcUIsQ0FBQyxJQUFZLEVBQUUsUUFBZ0I7SUFDaEUsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNiLE1BQU0sV0FBVyxHQUFHLElBQUEsNkJBQWEsRUFBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMzQztRQUNELEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUEsNkJBQWEsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLEtBQVMsRUFBRTtRQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQWJELHNEQWFDO0FBRUQsU0FBZ0IsVUFBVSxDQUFDLFFBQWdCO0lBQ3ZDLElBQUk7UUFDQSxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksVUFBVSxFQUFFO1lBQ1osRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQjtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFBQyxPQUFPLEtBQVMsRUFBRTtRQUNoQixNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQVhELGdDQVdDO0FBRUQsU0FBZ0IsT0FBTyxDQUFDLFFBQWdCO0lBQ3BDLElBQUc7UUFDQyxNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUcsVUFBVSxFQUFDO1lBQ1YsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFBQSxPQUFNLEtBQUssRUFBQztRQUNULE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDTCxDQUFDO0FBVkQsMEJBVUM7QUFFRCxTQUFnQixhQUFhLENBQUMsSUFBWSxFQUFFLFFBQWU7SUFDdkQsSUFBRztRQUNDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBRyxDQUFDLFVBQVUsRUFBQztZQUNYLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ2xDO1FBQ0QsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUFBLE9BQU0sS0FBSyxFQUFDO1FBQ1QsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUM7QUFaRCxzQ0FZQztBQUVELFNBQWdCLFdBQVc7SUFDdkIsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUN2QyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0MsSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNaLE9BQVE7S0FDWDtJQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNyRCxDQUFDO0FBWEQsa0NBV0MifQ==