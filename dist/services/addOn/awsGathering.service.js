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
        logger.error("Error in ec2SGListing: ", err);
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
//# sourceMappingURL=awsGathering.service.js.map