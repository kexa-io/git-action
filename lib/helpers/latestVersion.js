"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayVersionAndLatest = void 0;
async function displayVersionAndLatest(logger) {
    const axios = require('axios');
    let currentVersion = require('../../package.json').version;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.github.com/repos/4urcloud/Kexa_githubAction/releases',
        headers: {}
    };
    let latestsVersionInGithub = await axios.request(config);
    let latestVersionInGithub = null;
    let betterUpgrade = -1;
    let next = false;
    if (currentVersion.includes("SNAPSHOT"))
        currentVersion = currentVersion.split('-')[0];
    let currentVersionArray = currentVersion.split('.');
    latestsVersionInGithub.data.forEach((element) => {
        if (!element.tag_name.includes("SNAPSHOT")) {
            let githubVersionArrayTest = element.tag_name.split('.');
            for (let i = 0; i < currentVersionArray.length; i++) {
                if (next)
                    return;
                if (parseInt(currentVersionArray[i]) > parseInt(githubVersionArrayTest[i])) {
                    next = true;
                    return;
                }
                if (parseInt(currentVersionArray[i]) < parseInt(githubVersionArrayTest[i])) {
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
exports.displayVersionAndLatest = displayVersionAndLatest;
async function displayUpgrade(logger, betterUpgrade, currentVersion, latestVersionInGithub) {
    logger.info(`Current version: ${currentVersion} ${betterUpgrade != -1 ? "" : "(latest)"}`);
    if (betterUpgrade != -1) {
        logger.info(`Latest version in Github: ${latestVersionInGithub}`);
        logger.info(`You should upgrade to the latest version to get the best experience.`);
        if (betterUpgrade == 0)
            logger.info(`It's a major upgrade, be aware that some breaking changes may have been made.`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF0ZXN0VmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2xhdGVzdFZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sS0FBSyxVQUFVLHVCQUF1QixDQUFDLE1BQVc7SUFDckQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLElBQUksY0FBYyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUMzRCxJQUFJLE1BQU0sR0FBRztRQUNULE1BQU0sRUFBRSxLQUFLO1FBQ2IsYUFBYSxFQUFFLFFBQVE7UUFDdkIsR0FBRyxFQUFFLGtFQUFrRTtRQUN2RSxPQUFPLEVBQUUsRUFBRztLQUNmLENBQUM7SUFDRixJQUFJLHNCQUFzQixHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RCxJQUFJLHFCQUFxQixHQUFnQixJQUFJLENBQUM7SUFDOUMsSUFBSSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBQ2pCLElBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUM7UUFBRSxjQUFjLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RixJQUFJLG1CQUFtQixHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEQsc0JBQXNCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQVksRUFBRSxFQUFFO1FBQ2pELElBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBQztZQUN0QyxJQUFJLHNCQUFzQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUM7Z0JBQy9DLElBQUcsSUFBSTtvQkFBRSxPQUFPO2dCQUNoQixJQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO29CQUN0RSxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNaLE9BQU87aUJBQ1Y7Z0JBQ0QsSUFBRyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztvQkFDdEUscUJBQXFCLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztvQkFDekMsYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxHQUFHLElBQUksQ0FBQztvQkFDWixPQUFPO2lCQUNWO2FBQ0o7WUFDRCxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ2hCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxjQUFjLENBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUscUJBQXFCLENBQUMsQ0FBQztJQUM3RSxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM3QixDQUFDO0FBcENELDBEQW9DQztBQUVELEtBQUssVUFBVSxjQUFjLENBQUMsTUFBVyxFQUFFLGFBQXFCLEVBQUUsY0FBc0IsRUFBRSxxQkFBa0M7SUFDeEgsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsY0FBYyxJQUFJLGFBQWEsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLElBQUcsYUFBYSxJQUFJLENBQUMsQ0FBQyxFQUFDO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLHFCQUFxQixFQUFFLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLHNFQUFzRSxDQUFDLENBQUM7UUFDcEYsSUFBRyxhQUFhLElBQUksQ0FBQztZQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsK0VBQStFLENBQUMsQ0FBQztLQUN2SDtBQUNMLENBQUMifQ==