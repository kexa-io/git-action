"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayVersionAndLatest = void 0;
async function displayVersionAndLatest(logger) {
    const axios = require('axios');
    let version = require('../../package.json').version;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.github.com/repos/4urcloud/Kexa_githubAction/releases',
        headers: {}
    };
    let latestsVersionInGithub = await axios.request(config);
    let latestVersionInGithub = null;
    let betterUpgrade = -1;
    latestsVersionInGithub.data.forEach((element) => {
        if (!element.tag_name.includes("SNAPSHOT")) {
            latestVersionInGithub = element;
            if (!latestVersionInGithub) {
                latestVersionInGithub = element.tag_name;
                return;
            }
            let versionArray = version.split('.');
            let latestVersionInGithubArray = latestVersionInGithub.tag_name.split('.');
            for (let i = 0; i < versionArray.length; i++) {
                if (parseInt(versionArray[i]) < parseInt(latestVersionInGithubArray[i])) {
                    latestVersionInGithub = element.tag_name;
                    betterUpgrade = i;
                    return;
                }
            }
        }
    });
    logger.info(`Current version: ${version}`);
    if (betterUpgrade != -1) {
        logger.info(`Latest version in Github: ${latestVersionInGithub}`);
        logger.info(`You should upgrade to the latest version to get the best experience.`);
        if (betterUpgrade == 0)
            logger.info(`It's a major upgrade, be aware that some breaking changes may have been made.`);
    }
    return Promise.resolve();
}
exports.displayVersionAndLatest = displayVersionAndLatest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF0ZXN0VmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL2xhdGVzdFZlcnNpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sS0FBSyxVQUFVLHVCQUF1QixDQUFDLE1BQVc7SUFDckQsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQy9CLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNwRCxJQUFJLE1BQU0sR0FBRztRQUNULE1BQU0sRUFBRSxLQUFLO1FBQ2IsYUFBYSxFQUFFLFFBQVE7UUFDdkIsR0FBRyxFQUFFLGtFQUFrRTtRQUN2RSxPQUFPLEVBQUUsRUFBRztLQUNmLENBQUM7SUFDRixJQUFJLHNCQUFzQixHQUFHLE1BQU0sS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN6RCxJQUFJLHFCQUFxQixHQUFHLElBQUksQ0FBQztJQUNqQyxJQUFJLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN2QixzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBWSxFQUFFLEVBQUU7UUFDakQsSUFBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFDO1lBQ3RDLHFCQUFxQixHQUFHLE9BQU8sQ0FBQztZQUNoQyxJQUFHLENBQUMscUJBQXFCLEVBQUM7Z0JBQ3RCLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQ3pDLE9BQU87YUFDVjtZQUNELElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEMsSUFBSSwwQkFBMEIsR0FBRyxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzNFLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFDO2dCQUN4QyxJQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQztvQkFDbkUscUJBQXFCLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztvQkFDekMsYUFBYSxHQUFHLENBQUMsQ0FBQztvQkFDbEIsT0FBTztpQkFDVjthQUNKO1NBQ0o7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0MsSUFBRyxhQUFhLElBQUksQ0FBQyxDQUFDLEVBQUM7UUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQyw2QkFBNkIscUJBQXFCLEVBQUUsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0VBQXNFLENBQUMsQ0FBQztRQUNwRixJQUFHLGFBQWEsSUFBSSxDQUFDO1lBQUUsTUFBTSxDQUFDLElBQUksQ0FBQywrRUFBK0UsQ0FBQyxDQUFDO0tBQ3ZIO0lBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDN0IsQ0FBQztBQXJDRCwwREFxQ0MifQ==