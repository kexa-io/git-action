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
            else if (!gatherAll) {
                logger.info("AWS - Config n°" + awsConfig.indexOf(oneConfig) + " correctly loaded user regions.");
            }
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
        logger.debug("Error in ec2SGListing: ", err);
        return null;
    }
}
async function ec2VolumesListing(client, region) {
    try {
        const data = await client.describeVolumes().promise();
        let jsonData = JSON.parse(JSON.stringify(data.Volumes));
        jsonData = addRegion(jsonData, region);
        logger.debug(region, " - ec2VolumesListing Done");
        return jsonData;
    }
    catch (err) {
        logger.debug("Error in ec2VolumesListing: ", err);
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
        logger.debug("Error in ec2InstancesListing: ", err);
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
        logger.debug("Error in rdsInstancesListing: ", err);
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
        logger.debug("Error in Ressource Group Listing: ", err);
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
        logger.debug("Error in Tags Value Listing: ", err);
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
        logger.debug("Error in s3BucketsListing: ", err);
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
        logger.debug("Error in ECS Listing: ", err);
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
        logger.debug("Error in ECR Listing: ", err);
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXdzR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vYXdzR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztFQWVFO0FBQ0YscUNBQTBJO0FBRTFJLHNGQUFzRTtBQUN0RSxvREFBd0U7QUFHeEUsd0dBQXdHO0FBRXhHLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsV0FBVyxDQUFDLENBQUM7QUFJekMsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxRQUFZLENBQUM7QUFDakIsSUFBSSxTQUFjLENBQUM7QUFDbkIsSUFBSSxTQUFjLENBQUM7QUFDbkIsd0dBQXdHO0FBQ3hHLHdHQUF3RztBQUN4Ryx3R0FBd0c7QUFDakcsS0FBSyxVQUFVLFdBQVcsQ0FBQyxTQUFzQjtJQUNwRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztJQUMxQyxLQUFLLElBQUksU0FBUyxJQUFJLFNBQVMsSUFBSSxFQUFFLEVBQUU7UUFDbkMsSUFBSSxXQUFXLEdBQUc7WUFDZCxhQUFhLEVBQUUsSUFBSTtZQUNuQixPQUFPLEVBQUUsSUFBSTtZQUNiLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLEtBQUssRUFBRSxJQUFJO1lBQ1gsbUJBQW1CO1lBQ25CLGVBQWUsRUFBRSxJQUFJO1lBQ3JCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFlBQVksRUFBRSxJQUFJO1lBQ2xCLHFCQUFxQjtZQUNyQix3QkFBd0I7U0FDWCxDQUFDO1FBQ2xCLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBRSxDQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUM1RSxJQUFJO1lBQ0EsSUFBSSxR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