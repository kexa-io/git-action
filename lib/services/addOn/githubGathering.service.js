"use strict";
/*
    * Provider : github
    * Thumbnail : https://1000logos.net/wp-content/uploads/2021/05/GitHub-logo-768x432.png
    * Documentation : https://docs.github.com/en/rest?apiVersion=2022-11-28
    * Creation date : 2023-08-14
    * Note :
    * Resources :
    *     - repositories
    *     - branches
    *     - issues
    *     - organizations
    *     - members
    *     - teams
    *     - teamProjects
    *     - teamMembers
    *     - teamRepositories
    *     - outsideCollaborators
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectTeamProjects = exports.collectTeamRepos = exports.collectTeamMembers = exports.collectTeams = exports.collectOutsideCollaborators = exports.collectMembers = exports.collectOrganizations = exports.collectIssues = exports.collectBranch = exports.collectRepo = exports.collectData = void 0;
const octokit_1 = require("octokit");
const dotenv_1 = __importDefault(require("dotenv"));
const manageVarEnvironnement_service_1 = require("../manageVarEnvironnement.service");
dotenv_1.default.config();
const logger_service_1 = require("../logger.service");
const logger = (0, logger_service_1.getNewLogger)("GithubLogger");
let githubToken = "";
let currentConfig;
async function collectData(gitConfig) {
    let resources = new Array();
    for (let config of gitConfig ?? []) {
        currentConfig = config;
        let prefix = config.prefix ?? (gitConfig.indexOf(config).toString());
        githubToken = await (0, manageVarEnvironnement_service_1.getConfigOrEnvVar)(config, "GITHUBTOKEN", prefix);
        if (!githubToken) {
            throw new Error("- Please pass GITHUBTOKEN in your config file");
        }
        await (0, manageVarEnvironnement_service_1.setEnvVar)("GITHUBTOKEN", githubToken);
        try {
            logger.info("Gathering github data");
            const promisesPrimaryData = [collectRepo(), collectOrganizations()];
            let [allRepo, allOrganizations] = await Promise.all(promisesPrimaryData);
            const promisesSecondaryData = [
                collectRepoRelaidInfo(allRepo),
                collectOrganizationRelaidInfo(allOrganizations),
            ];
            let [secondaryDataRepo, secondaryDataOrganization] = await Promise.all(promisesSecondaryData);
            resources.push({
                "repositories": allRepo,
                "branches": secondaryDataRepo.allBranches,
                "issues": secondaryDataRepo.allIssues,
                "organizations": allOrganizations,
                "members": secondaryDataOrganization.allMembers,
                "outsideCollaborators": secondaryDataOrganization.allOutsideCollaborators,
                "teams": secondaryDataOrganization.allTeams,
                "teamMembers": secondaryDataOrganization.allTeamMembers,
                "teamRepositories": secondaryDataOrganization.allTeamRepos,
                "teamProjects": secondaryDataOrganization.allTeamProjects
            });
        }
        catch (e) {
            logger.error(e);
        }
    }
    return resources ?? null;
}
exports.collectData = collectData;
async function collectRepoRelaidInfo(allRepo) {
    let allBranches = [];
    let allIssues = [];
    logger.info("Collecting github branches");
    logger.info("Collecting github issues");
    await Promise.all(allRepo.map(async (repo) => {
        const [issues, branches] = await Promise.all([
            collectIssues(repo.name, repo.owner.login),
            collectBranch(repo.name, repo.owner.login)
        ]);
        allIssues.push(...addInfoRepo(repo, issues));
        allBranches.push(...addInfoRepo(repo, branches));
    }));
    return {
        allIssues,
        allBranches
    };
}
async function collectOrganizationRelaidInfo(allOrganizations) {
    let allMembers = [];
    let allOutsideCollaborators = [];
    let allTeams = [];
    let allTeamMembers = [];
    let allTeamRepos = [];
    let allTeamProjects = [];
    logger.info("Collecting github members");
    logger.info("Collecting github outside collaborators");
    await Promise.all(allOrganizations.map(async (org) => {
        const [members, outsideCollaborators, teamsData] = await Promise.all([
            collectMembers(org.login),
            collectOutsideCollaborators(org.login),
            collectTeamsRelaidInfo(org.login)
        ]);
        allMembers.push(...addInfoOrg(org, members));
        allOutsideCollaborators.push(...addInfoOrg(org, outsideCollaborators));
        allTeams.push(...addInfoOrg(org, teamsData.allTeams));
        allTeamMembers.push(...teamsData.allTeamMembers);
        allTeamRepos.push(...teamsData.allTeamRepos);
        allTeamProjects.push(...teamsData.allTeamProjects);
    }));
    return {
        allMembers,
        allOutsideCollaborators,
        allTeams,
        allTeamMembers,
        allTeamRepos,
        allTeamProjects
    };
}
async function collectTeamsRelaidInfo(org) {
    let allTeams = [];
    let allTeamMembers = [];
    let allTeamRepos = [];
    let allTeamProjects = [];
    logger.info("Collecting github teams");
    logger.info("Collecting github team members");
    logger.info("Collecting github team repos");
    logger.info("Collecting github team projects");
    const teams = await collectTeams(org);
    await Promise.all(teams.map(async (team) => {
        const [members, repos, projects] = await Promise.all([
            collectTeamMembers(org, team.slug),
            collectTeamRepos(org, team.slug),
            collectTeamProjects(org, team.slug)
        ]);
        allTeamMembers.push(...addInfoOrg(org, addInfoTeam(team, members)));
        allTeamRepos.push(...addInfoOrg(org, addInfoTeam(team, repos)));
        allTeamProjects.push(...addInfoOrg(org, addInfoTeam(team, projects)));
    }));
    allTeams.push(...teams);
    return {
        allTeams,
        allTeamMembers,
        allTeamRepos,
        allTeamProjects
    };
}
function addInfoTeam(team, datas) {
    try {
        datas.forEach((data) => {
            data["team"] = team.name;
            data["teamUrl"] = team.url;
        });
    }
    catch (e) {
        logger.debug(e);
    }
    return datas;
}
function addInfoOrg(org, datas) {
    try {
        datas.forEach((data) => {
            data["organization"] = org.login;
            data["organizationUrl"] = org.url;
        });
    }
    catch (e) {
        logger.debug(e);
    }
    return datas;
}
function addInfoRepo(repo, datas) {
    try {
        datas.forEach((data) => {
            data["repo"] = repo.name;
            data["repoUrl"] = repo.html_url;
        });
    }
    catch (e) {
        logger.debug(e);
    }
    return datas;
}
async function getOctokit() {
    return new octokit_1.Octokit({ auth: githubToken });
}
async function collectRepo() {
    if (!currentConfig?.ObjectNameNeed?.includes("repositories")
        && !currentConfig?.ObjectNameNeed?.includes("branches")
        && !currentConfig?.ObjectNameNeed?.includes("issues"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let repos = [];
        while (true) {
            let repo = (await (octokit).request('GET /user/repos?page=' + page)).data;
            if (repo.length == 0) {
                break;
            }
            page++;
            repos.push(...repo);
        }
        return repos;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectRepo = collectRepo;
async function collectBranch(repo, owner) {
    if (!currentConfig?.ObjectNameNeed?.includes("branches"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let members = [];
        while (true) {
            let member = (await (octokit).request('GET /repos/{owner}/{repo}/branches?page=' + page, {
                owner: owner,
                repo: repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if (member.length == 0) {
                break;
            }
            page++;
            members.push(...member);
        }
        return members;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectBranch = collectBranch;
async function collectIssues(repo, owner) {
    if (!currentConfig?.ObjectNameNeed?.includes("issues"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let issues = [];
        while (true) {
            let issue = (await (octokit).request('GET /repos/{owner}/{repo}/issues?page=' + page, {
                owner: owner,
                repo: repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if (issue.length == 0) {
                break;
            }
            page++;
            issues.push(...issue);
        }
        return issues;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectIssues = collectIssues;
async function collectOrganizations() {
    if (!currentConfig?.ObjectNameNeed?.includes("organizations")
        && !currentConfig?.ObjectNameNeed?.includes("members")
        && !currentConfig?.ObjectNameNeed?.includes("teams")
        && !currentConfig?.ObjectNameNeed?.includes("teamMembers")
        && !currentConfig?.ObjectNameNeed?.includes("teamRepositories")
        && !currentConfig?.ObjectNameNeed?.includes("teamProjects")
        && !currentConfig?.ObjectNameNeed?.includes("outsideCollaborators"))
        return [];
    try {
        return (await (await getOctokit()).request('GET /user/orgs')).data;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectOrganizations = collectOrganizations;
async function collectMembers(org) {
    if (!currentConfig?.ObjectNameNeed?.includes("members"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let members = [];
        while (true) {
            let member = (await (octokit).request('GET /orgs/{org}/members?page=' + page, {
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if (member.length == 0) {
                break;
            }
            let memberWithoutMFA = (await (octokit).request('GET /orgs/{org}/members?filter=2fa_disabled&page=' + page + '&filter=2fa_disabled', {
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            member.forEach((_member) => {
                _member["mfa"] = ((memberWithoutMFA.filter((memberWithoutMFA) => memberWithoutMFA.login == _member.login).length == 0) ? true : false);
            });
            page++;
            members.push(...member);
        }
        return members;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectMembers = collectMembers;
async function collectOutsideCollaborators(org) {
    if (!currentConfig?.ObjectNameNeed?.includes("outsideCollaborators"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let collaborators = [];
        while (true) {
            let collaborator = (await (octokit).request('GET /orgs/{org}/outside_collaborators?page=' + page, {
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if (collaborator.length == 0) {
                break;
            }
            page++;
            collaborators.push(...collaborator);
        }
        return collaborators;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectOutsideCollaborators = collectOutsideCollaborators;
async function collectTeams(org) {
    if (!currentConfig?.ObjectNameNeed?.includes("teams"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let teams = [];
        while (true) {
            let team = (await (octokit).request('GET /orgs/{org}/teams?page=' + page, {
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if (team.length == 0) {
                break;
            }
            page++;
            teams.push(...team);
        }
        return teams;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectTeams = collectTeams;
async function collectTeamMembers(org, team) {
    if (!currentConfig?.ObjectNameNeed?.includes("teamMembers"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let membersTeam = [];
        while (true) {
            let memberTeam = (await (octokit).request('GET /orgs/{org}/teams/{team_slug}/members?page=' + page, {
                team_slug: team,
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if (memberTeam.length == 0) {
                break;
            }
            page++;
            membersTeam.push(...memberTeam);
        }
        return membersTeam;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectTeamMembers = collectTeamMembers;
async function collectTeamRepos(org, team) {
    if (!currentConfig?.ObjectNameNeed?.includes("teamRepositories"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let reposTeam = [];
        while (true) {
            let repoTeam = (await (octokit).request('GET /orgs/{org}/teams/{team_slug}/repos?page=' + page, {
                team_slug: team,
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if (repoTeam.length == 0) {
                break;
            }
            page++;
            reposTeam.push(...repoTeam);
        }
        return reposTeam;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectTeamRepos = collectTeamRepos;
async function collectTeamProjects(org, team) {
    if (!currentConfig?.ObjectNameNeed?.includes("teamProjects"))
        return [];
    let page = 1;
    try {
        let octokit = await getOctokit();
        let projectsTeam = [];
        while (true) {
            let projectTeam = (await (octokit).request('GET /orgs/{org}/teams/{team_slug}/projects?page=' + page, {
                team_slug: team,
                org: org,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })).data;
            if (projectTeam.length == 0) {
                break;
            }
            page++;
            projectsTeam.push(...projectTeam);
        }
        return projectsTeam;
    }
    catch (e) {
        logger.debug(e);
        return [];
    }
}
exports.collectTeamProjects = collectTeamProjects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ2l0aHViR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCRTs7Ozs7O0FBRUYscUNBQWtDO0FBQ2xDLG9EQUF5QjtBQUV6QixzRkFBaUY7QUFFakYsZ0JBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUViLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLElBQUksYUFBdUIsQ0FBQTtBQUVwQixLQUFLLFVBQVUsV0FBVyxDQUFDLFNBQXFCO0lBQ25ELElBQUksU0FBUyxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO0lBQzFDLEtBQUksSUFBSSxNQUFNLElBQUksU0FBUyxJQUFFLEVBQUUsRUFBQztRQUM1QixhQUFhLEdBQUcsTUFBTSxDQUFDO1FBQ3ZCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbkUsV0FBVyxHQUFHLE1BQU0sSUFBQSxrREFBaUIsRUFBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3JFLElBQUcsQ0FBQyxXQUFXLEVBQUM7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxDQUFDLENBQUM7U0FDcEU7UUFDRCxNQUFNLElBQUEsMENBQVMsRUFBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUE7UUFDM0MsSUFBSTtZQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNyQyxNQUFNLG1CQUFtQixHQUFTLENB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