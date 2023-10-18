"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectData = void 0;
/*
    * Provider : aws
    * Thumbnail : https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png
    * Documentation : https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/welcome.html
    * Creation date : 2023-08-14
    * Note :
    * Resources :
    *     - ec2Instance
    *     - ec2SG
    *     - ec2Volume
    *     - rds
    *     - resourceGroup
    *     - tagsValue
    *     - ecsCluster
    *     - ecrRepository
*/
const aws_sdk_1 = require("aws-sdk");
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
const client_ec2_1 = require("@aws-sdk/client-ec2");
////////////////////////////////////////////////////////////////////////////////////////////////////////
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("AWSLogger");
let ec2Client;
let rdsClient;
let s3Client;
let ecsClient;
let ecrClient;
////////////////////////////////////////////////////////////////////////////////////////////////////////
//// LISTING CLOUD RESOURCES ///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
async function collectData(awsConfig) {
    let resources = new Array();
    for (let oneConfig of awsConfig ?? []) {
        let awsResource = {
            "ec2Instance": null,
            "ec2SG": null,
            "ec2Volume": null,
            "rds": null,
            //      "s3": null,
            "resourceGroup": null,
            "tagsValue": null,
            "ecsCluster": null,
            //   "ecrImage": null
            // Add more AWS resource
        };
        let prefix = oneConfig["prefix"] ?? (awsConfig.indexOf(oneConfig) + "-");
        try {
            let awsKeyId = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(oneConfig, "AWS_ACCESS_KEY_ID", prefix);
            let awsSecretKey = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(oneConfig, "AWS_SECRET_ACCESS_KEY", prefix);
            let credentials = new aws_sdk_1.SharedIniFileCredentials({ profile: 'default' });
            if (awsKeyId && awsSecretKey) {
                credentials = new aws_sdk_1.Credentials({
                    accessKeyId: awsKeyId,
                    secretAccessKey: awsSecretKey
                });
            }
            const client = new client_ec2_1.EC2Client({ region: "us-east-1", credentials: credentials });
            const command = new client_ec2_1.DescribeRegionsCommand({ AllRegions: false, });
            const response = await client.send(command);
            let gatherAll = false;
            let userRegions = new Array();
            let skip = false;
            if ('regions' in oneConfig) {
                userRegions = oneConfig.regions;
                if (userRegions.length > 0) {
                    userRegions.forEach((userRegion) => {
                        let check = false;
                        response.Regions?.forEach((regionObj) => {
                            if (userRegion == regionObj.RegionName)
                                check = true;
                        });
                        if (!check) {
                            logger.error("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " Skipped - Regions '" + userRegion + "' is not a valid AWS region.");
                            skip = true;
                        }
                    });
                }
                else
                    gatherAll = true;
            }
            else {
                gatherAll = true;
                logger.info("AWS - No Regions found in Config, gathering all regions...");
            }
            if (skip)
                continue;
            else if (!gatherAll)
                logger.info("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " correctly loaded user regions.");
            if (response.Regions) {
                const promises = response.Regions.map(async (region) => {
                    try {
                        if (!gatherAll) {
                            if (!(userRegions.includes(region.RegionName)))
                                return;
                        }
                        logger.info("Retrieving AWS Region : " + region.RegionName);
                        aws_sdk_1.config.update({ credentials: credentials, region: region.RegionName });
                        ec2Client = new aws_sdk_1.EC2();
                        rdsClient = new aws_sdk_1.RDS();
                        //    s3Client = new AWS.S3(config);
                        ecsClient = new aws_sdk_1.ECS();
                        ecrClient = new aws_sdk_1.ECR();
                        const resourceGroups = new aws_sdk_1.ResourceGroups();
                        const tags = new aws_sdk_1.ResourceGroupsTaggingAPI();
                        const ec2InstancesPromise = ec2InstancesListing(ec2Client, region.RegionName);
                        const ec2VolumesPromise = ec2VolumesListing(ec2Client, region.RegionName);
                        const ec2SGPromise = ec2SGListing(ec2Client, region.RegionName);
                        const rdsListPromise = rdsInstancesListing(rdsClient, region.RegionName);
                        const resourceGroupPromise = resourceGroupsListing(resourceGroups, region.RegionName);
                        const tagsValuePromise = tagsValueListing(tags, region.RegionName);
                        const ecsClusterPromise = ecsClusterListing(ecsClient, region.RegionName);
                        const [ec2Instances, ec2Volumes, ec2SG, rdsList, resourceGroup, tagsValue, ecsCluster] = await Promise.all([ec2InstancesPromise, ec2VolumesPromise, ec2SGPromise, rdsListPromise, resourceGroupPromise, tagsValuePromise, ecsClusterPromise]);
                        return {
                            ec2Instance: ec2Instances,
                            ec2SG,
                            ec2Volume: ec2Volumes,
                            rds: rdsList,
                            resourceGroup,
                            tagsValue,
                            ecsCluster
                        };
                    }
                    catch (e) {
                        logger.error("error in collectAWSData with AWSACCESSKEYID: " + oneConfig["AWSACCESSKEYID"] ?? null);
                        logger.error(e);
                    }
                });
                const awsResourcesPerRegion = await Promise.all(promises);
                const awsResource = {};
                awsResourcesPerRegion.forEach((regionResources) => {
                    if (regionResources) {
                        Object.keys(regionResources).forEach((resourceType) => {
                            const key = resourceType.toString();
                            const regionKey = resourceType.toString();
                            awsResource[key] = [...(awsResource[key] || []), ...regionResources[regionKey]];
                        });
                    }
                });
                logger.info("- Listing AWS resources done -");
                resources.push(awsResource);
            }
        }
        catch (e) {
            logger.error("error in AWS connect with AWSACCESSKEYID: " + oneConfig["AWSACCESSKEYID"] ?? null);
            logger.error(e);
        }
    }
    return resources ?? null;
}
exports.collectData = collectData;
function addRegion(resources, region) {
    for (let resource of resources) {
        resource.region = region;
    }
    return resources;
}
async function ec2SGListing(client, region) {
    try {
        const data = await client.describeSecurityGroups().promise();
        let jsonData = JSON.parse(JSON.stringify(data.SecurityGroups));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ec2SGListing Done");
        return jsonData;
    }
    catch (err) {
        logger.error("Error in ec2SGListing: " + err);
        return null;
    }
}
async function ec2VolumesListing(client, region) {
    try {
        const data = await client.describeVolumes().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Volumes));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ec2VolumesListing Done");
        return jsonData;
    }
    catch (err) {
        logger.error("Error in ec2VolumesListing: ", err);
        return null;
    }
}
async function ec2InstancesListing(client, region) {
    try {
        const data = await client.describeInstances().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Reservations));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ec2InstancesListing Done");
        return jsonData;
    }
    catch (err) {
        logger.error("Error in ec2InstancesListing: ", err);
        return null;
    }
}
async function rdsInstancesListing(client, region) {
    try {
        const data = await client.describeDBInstances().promise();
        let jsonData = JSON.parse(JSON.stringify(data.DBInstances));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - rdsInstancesListing Done");
        return jsonData;
    }
    catch (err) {
        logger.error("Error in rdsInstancesListing: ", err);
        return null;
    }
}
async function resourceGroupsListing(client, region) {
    try {
        const data = await client.listGroups().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Groups));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - Ressource Group Done");
        return jsonData;
    }
    catch (err) {
        logger.error("Error in Ressource Group Listing: ", err);
        return null;
    }
}
async function tagsValueListing(client, region) {
    try {
        const dataKeys = await client.getTagKeys().promise();
        const jsonDataKeys = JSON.parse(JSON.stringify(dataKeys.TagKeys));
        let jsonData = [];
        for (const element of jsonDataKeys) {
            const newData = {
                Value: element,
                Region: region,
            };
            jsonData.push(newData);
        }
        logger.debug(region + " - Tags Done");
        return jsonDataKeys;
    }
    catch (err) {
        logger.error("Error in Tags Value Listing: ", err);
        return null;
    }
}
async function s3BucketsListing(client, region) {
    try {
        const data = await client.listBuckets().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Buckets));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - s3BucketsListing Done");
        return jsonData;
    }
    catch (err) {
        logger.error("Error in s3BucketsListing: ", err);
        return null;
    }
}
async function ecsClusterListing(client, region) {
    try {
        const data = await client.describeClusters().promise();
        let jsonData = JSON.parse(JSON.stringify(data.clusters));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ECS Done");
        return jsonData;
    }
    catch (err) {
        logger.error("Error in ECS Listing: ", err);
        return null;
    }
}
async function ecrImagesListing(client, region) {
    try {
        const data = await client.describeRepositories().promise();
        let jsonData = JSON.parse(JSON.stringify(data.repositories));
        jsonData = addRegion(jsonData, region);
        logger.debug(region + " - ECR Done");
        return jsonData;
    }
    catch (err) {
        logger.error("Error in ECR Listing: ", err);
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vYXdzR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBQ0YscUNBQTBJO0FBRTFJLHNGQUFzRTtBQUN0RSxvREFBd0U7QUFHeEUsd0dBQXdHO0FBRXhHLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFFekMsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxRQUFZLENBQUM7QUFDakIsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxTQUFjLENBQUM7QUFDbkIsd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDakcsS0FBSyxVQUFVLFdBQVcsQ0FBQyxTQUFzQjtJQUNwRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztJQUMxQyxLQUFLLElBQUksU0FBUyxJQUFJLFNBQVMsSUFBSSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxXQUFXLEdBQUc7WUFDZCxhQUFhLEVBQUUsSUFBSTtZQUNuQixPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsbUJBQW1CO1lBQ25CLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLHFCQUFxQjtZQUNyQix3QkFBd0I7U0FDWCxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBRSxDQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUE7UUFDdkUsSUFBSTtZQUNBLElBQUksUUFBUSxH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