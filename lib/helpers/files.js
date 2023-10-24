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
exports.writeFileSync = exports.getFile = exports.deleteFile = exports.writeStringToJsonFile = void 0;
const fs = __importStar(require("fs"));
const logger_service_1 = require("../services/logger.service");
const logger = (0, logger_service_1.getNewLogger)("FilesHelper");
function writeStringToJsonFile(data, filePath) {
    try {
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            const initialData = JSON.stringify({});
            fs.writeFileSync(filePath, initialData);
        }
        fs.writeFileSync(filePath, JSON.stringify(JSON.parse(data), null, 4), 'utf8');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9maWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVDQUF5QjtBQUN6QiwrREFBMEQ7QUFDMUQsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRTNDLFNBQWdCLHFCQUFxQixDQUFDLElBQVksRUFBRSxRQUFnQjtJQUNoRSxJQUFJO1FBQ0EsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2IsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN2QyxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsQ0FBQztTQUMzQztRQUNELEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDOUUsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUFDLE9BQU8sS0FBUyxFQUFFO1FBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBYkQsc0RBYUM7QUFFRCxTQUFnQixVQUFVLENBQUMsUUFBZ0I7SUFDdkMsSUFBSTtRQUNBLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxVQUFVLEVBQUU7WUFDWixFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQzNCO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUFDLE9BQU8sS0FBUyxFQUFFO1FBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEIsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBWEQsZ0NBV0M7QUFFRCxTQUFnQixPQUFPLENBQUMsUUFBZ0I7SUFDcEMsSUFBRztRQUNDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBRyxVQUFVLEVBQUM7WUFDVixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDZjtJQUFBLE9BQU0sS0FBSyxFQUFDO1FBQ1QsT0FBTyxJQUFJLENBQUM7S0FDZjtBQUNMLENBQUM7QUFWRCwwQkFVQztBQUVELFNBQWdCLGFBQWEsQ0FBQyxJQUFZLEVBQUUsUUFBZTtJQUN2RCxJQUFHO1FBQ0MsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFHLENBQUMsVUFBVSxFQUFDO1lBQ1gsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDbEM7UUFDRCxFQUFFLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxPQUFPLElBQUksQ0FBQztLQUNmO0lBQUEsT0FBTSxLQUFLLEVBQUM7UUFDVCxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztBQVpELHNDQVlDIn0=