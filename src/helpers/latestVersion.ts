import { getEnvVar } from "../services/manageVarEnvironnement.service";

export async function displayVersionAndLatest(logger: any): Promise<void>{
    const axios = require('axios');
    let currentVersion = require('../../package.json').version;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.github.com/repos/4urcloud/Kexa_githubAction/releases',
        headers: { }
    };
    let latestsVersionInGithub = await axios.request(config);
    let latestVersionInGithub: null|string = null;
    let betterUpgrade = -1;
    let next = false;
    if(currentVersion.includes("SNAPSHOT")) currentVersion = currentVersion.split('-')[0];
    let currentVersionArray = currentVersion.split('.');
    latestsVersionInGithub.data.forEach((element: any) => {
        if(!element.tag_name.includes("SNAPSHOT")){
            let githubVersionArrayTest = element.tag_name.split('.');
            for(let i = 0; i < currentVersionArray.length; i++){
                if(next) return;
                if(parseInt(currentVersionArray[i]) > parseInt(githubVersionArrayTest[i])){
                    next = true;
                    return;
                }
                if(parseInt(currentVersionArray[i]) < parseInt(githubVersionArrayTest[i])){
                    latestVersionInGithub = element.tag_name;
                    betterUpgrade = i;
                    next = true;
                    return;
                }
            }
            next = false;
        }
    });
    displayUpgrade(logger, betterUpgrade, currentVersion, latestVersionInGithub);
    return Promise.resolve();
}

async function displayUpgrade(logger: any, betterUpgrade: number, currentVersion: string, latestVersionInGithub: string|null): Promise<void>{
    logger.info(`Current version: ${currentVersion} ${betterUpgrade != -1 ? "" : "(latest)"}`);
    if(betterUpgrade != -1){
        logger.info(`Latest version in Github: ${latestVersionInGithub}`);
        logger.info(`You should upgrade to the latest version to get the best experience.`);
        if(betterUpgrade == 0) logger.info(`It's a major upgrade, be aware that some breaking changes may have been made.`);
    }
}