import { ResultScan } from '../models/resultScan.models';
import { getNewLogger } from "./logger.service";
import { loadAddOnsCustomUtility } from './addOn.service';
import { SaveConfig } from '../models/export/config.models';
import { getConfig } from '../helpers/loaderConfig';
import { ProviderResource } from '../models/providerResource.models';

const configuration = getConfig();
const logger = getNewLogger("SaveLogger");

export async function exportationData(resources: ProviderResource): Promise<any[]> {
    if(!configuration.export) return [];
    const addOnExportation: { [key: string]: Function; } = loadAddOnsCustomUtility("exportation", "exportation", configuration.export.map((save: SaveConfig) => save.type));
    if(!Array.isArray(configuration.save)) configuration.save = [configuration.save];
    let promises = Promise.all(configuration.export.map(async (save: SaveConfig) => {
        if(addOnExportation[save.type]){
            try{
                await addOnExportation[save.type](save, resources);
            }catch(e:any){
                logger.error("Error in exportation " + save.type + " : " + e.message);
                logger.debug(e);
            }
        }else{
            logger.warning('Unknown exportation type: ' + save.type);
        }
    }));
    return promises;
}