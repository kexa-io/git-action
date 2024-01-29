"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unzipFile = exports.downloadFile = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const logger_service_1 = require("../services/logger.service");
const path_1 = __importDefault(require("path"));
const manageVarEnvironnement_service_1 = require("../services/manageVarEnvironnement.service");
const logger = (0, logger_service_1.getNewLogger)("DownloadLogger");
async function downloadFile(url, destinationPath, type) {
    try {
        if (!await checkFileType(url))
            throw new Error("File type not valid");
        let authorization = await (0, manageVarEnvironnement_service_1.getEnvVar)("RULESAUTHORIZATION");
        let axiosConfig = {
            method: "get",
            url: url,
            responseType: "stream",
        };
        if (authorization)
            axiosConfig.headers = { "Authorization": authorization };
        const response = await (0, axios_1.default)(axiosConfig);
        const fileStream = fs_1.default.createWriteStream(destinationPath + ".zip");
        response.data.pipe(fileStream);
        return new Promise((resolve, reject) => {
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
            fileStream.on('error', (err) => {
                reject(err);
            });
        });
    }
    catch (error) {
        logger.error(`Error downloading file: ${error}`);
        throw new Error(`Error downloading file: ${error}`);
    }
}
exports.downloadFile = downloadFile;
async function unzipFile(relativePath) {
    const extract = require('extract-zip');
    const absolutePath = path_1.default.resolve(relativePath);
    logger.debug(`Unzipping file: ${absolutePath}`);
    try {
        if (fs_1.default.existsSync(absolutePath))
            fs_1.default.rmSync(absolutePath, { recursive: true, force: true });
        await extract(absolutePath + ".zip", { dir: absolutePath });
        await moveSubFilesToRoot(absolutePath);
    }
    catch (err) {
        logger.error(`Error unzipping file: ${err}`);
        throw new Error(`Error unzipping file: ${err.message}`);
    }
    fs_1.default.unlinkSync(relativePath + ".zip");
}
exports.unzipFile = unzipFile;
async function checkFileType(url, type = "application/zip") {
    let authorization = await (0, manageVarEnvironnement_service_1.getEnvVar)("RULESAUTHORIZATION");
    let axiosConfig = {};
    if (authorization)
        axiosConfig.headers = { "Authorization": authorization };
    const response = await axios_1.default.head(url, axiosConfig);
    const fileType = response.headers['content-type'];
    if (!fileType || fileType !== type) {
        return false;
    }
    return true;
}
async function moveSubFilesToRoot(folderPath) {
    try {
        const files = fs_1.default.readdirSync(folderPath);
        files.forEach((file) => {
            const filePath = path_1.default.join(folderPath, file);
            if (fs_1.default.statSync(filePath).isDirectory()) {
                const subFiles = fs_1.default.readdirSync(filePath);
                subFiles.forEach((subFile) => {
                    const subFilePath = path_1.default.join(filePath, subFile);
                    const newFilePath = path_1.default.join(folderPath, subFile);
                    fs_1.default.renameSync(subFilePath, newFilePath);
                });
                fs_1.default.rmdirSync(filePath);
            }
        });
        logger.debug('All sub-files have been successfully moved to the root.');
    }
    catch (error) {
        logger.error(`Error moving subFiles : ${error}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG93bG9hZEZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9kb3dsb2FkRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrREFBaUU7QUFDakUsNENBQW9CO0FBQ3BCLCtEQUEwRDtBQUMxRCxnREFBd0I7QUFDeEIsK0ZBQXVFO0FBRXZFLE1BQU0sTUFBTSxHQUFHLElBQUEsNkJBQVksRUFBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRXZDLEtBQUssVUFBVSxZQUFZLENBQUMsR0FBVyxFQUFFLGVBQXVCLEVBQUUsSUFBVztJQUNoRixJQUFJO1FBQ0EsSUFBRyxDQUFDLE1BQU0sYUFBYSxDQUFDLEdBQUcsQ0FBQztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztRQUNyRSxJQUFJLGFBQWEsR0FBRyxNQUFNLElBQUEsMENBQVMsRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFELElBQUksV0FBVyxHQUF1QjtZQUNsQyxNQUFNLEVBQUUsS0FBSztZQUNiLEdBQUcsRUFBRSxHQUFHO1lBQ1IsWUFBWSxFQUFFLFFBQVE7U0FDekIsQ0FBQztRQUNGLElBQUcsYUFBYTtZQUFFLFdBQVcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLENBQUM7UUFDM0UsTUFBTSxRQUFRLEdBQWtCLE1BQU0sSUFBQSxlQUFLLEVBQUMsV0FBVyxDQUFDLENBQUM7UUFDekQsTUFBTSxVQUFVLEdBQUcsWUFBRSxDQUFDLGlCQUFpQixDQUFDLGVBQWUsR0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMvQixPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLFVBQVUsQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDekIs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