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
        let prefix = oneConfig["prefix"] ?? (awsConfig.indexOf(oneConfig).toString());
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
                logger.info("AWS - No Regions found, gathering all regions...");
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
        logger.error("Error in ec2VolumesListing: " + err);
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
        logger.error("Error in ec2InstancesListing: " + err);
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
        logger.error("Error in rdsInstancesListing: " + err);
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
        logger.error("Error in Ressource Group Listing: " + err);
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
        logger.error("Error in Tags Value Listing: " + err);
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
        logger.error("Error in s3BucketsListing: " + err);
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
        logger.error("Error in ECS Listing: " + err);
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
        logger.error("Error in ECR Listing: " + err);
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vYXdzR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBQ0YscUNBQTBJO0FBRTFJLHNGQUFzRTtBQUN0RSxvREFBd0U7QUFHeEUsd0dBQXdHO0FBRXhHLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFFekMsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxRQUFZLENBQUM7QUFDakIsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxTQUFjLENBQUM7QUFDbkIsd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDakcsS0FBSyxVQUFVLFdBQVcsQ0FBQyxTQUFzQjtJQUNwRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztJQUMxQyxLQUFLLElBQUksU0FBUyxJQUFJLFNBQVMsSUFBSSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxXQUFXLEdBQUc7WUFDZCxhQUFhLEVBQUUsSUFBSTtZQUNuQixPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsbUJBQW1CO1lBQ25CLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLHFCQUFxQjtZQUNyQix3QkFBd0I7U0FDWCxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBRSxDQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUM1RSxJQUFJO1lBQ0EsSUFBSSxR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