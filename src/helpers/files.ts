import * as fs from 'fs';
import { getNewLogger } from '../services/logger.service';
const logger = getNewLogger("FilesHelper");

export function writeStringToJsonFile(data: string, filePath: string): boolean {
    try {
        const fileExists = fs.existsSync(filePath);
        if (!fileExists) {
            const initialData = JSON.stringify({});
            fs.writeFileSync(filePath, initialData);
        }
        fs.writeFileSync(filePath, JSON.stringify(JSON.parse(data), null, 4), 'utf8');
        return true;
    } catch (error:any) {
        logger.error(error);
        return false;
    }
}

export function deleteFile(filePath: string): boolean {
    try {
        const fileExists = fs.existsSync(filePath);
        if (fileExists) {
            fs.unlinkSync(filePath);
        }
        return true;
    } catch (error:any) {
        logger.error(error);
        return false;
    }
}

export function getFile(filePath: string){
    try{
        const fileExists = fs.existsSync(filePath);
        if(fileExists){
            return fs.readFileSync(filePath, 'utf8');
        }
        return null;
    }catch(error){
        return null;
    }
}

export function writeFileSync(data: string, filePath:string):boolean{
    try{
        const fileExists = fs.existsSync(filePath);
        if(!fileExists){
            fs.writeFileSync(filePath, "");
        }
        fs.writeFileSync(filePath, data);
        return true;
    }catch(error){
        logger.error(error);
        return false;
    }
}
