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
    *     - runners
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
                "teamProjects": secondaryDataOrganization.allTeamProjects,
                "runners": secondaryDataOrganization.allRunners
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
    let allRunners = [];
    logger.info("Collecting github members");
    logger.info("Collecting github outside collaborators");
    await Promise.all(allOrganizations.map(async (org) => {
        const [members, outsideCollaborators, teamsData, runners] = await Promise.all([
            collectMembers(org.login),
            collectOutsideCollaborators(org.login),
            collectTeamsRelaidInfo(org.login),
            collectRunnersInfo(org.login)
        ]);
        allMembers.push(...addInfoOrg(org, members));
        allOutsideCollaborators.push(...addInfoOrg(org, outsideCollaborators));
        allTeams.push(...addInfoOrg(org, teamsData.allTeams));
        allTeamMembers.push(...teamsData.allTeamMembers);
        allTeamRepos.push(...teamsData.allTeamRepos);
        allTeamProjects.push(...teamsData.allTeamProjects);
        allRunners.push(...runners);
    }));
    return {
        allMembers,
        allOutsideCollaborators,
        allTeams,
        allTeamMembers,
        allTeamRepos,
        allTeamProjects,
        allRunners
    };
}
async function collectRunnersInfo(org) {
    let allRunners = [];
    logger.info("Collecting github runners");
    try {
        let octokit = await getOctokit();
        let runners = (await (octokit).request('GET /orgs/{org}/actions/runners', {
            org: org,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })).data;
        allRunners.push(...runners.runners);
        allRunners.forEach((runner) => {
            runner["organization"] = org;
            runner["organizationUrl"] = "https://github.com/" + org;
        });
    }
    catch (e) {
        logger.debug(e);
    }
    return {
        allRunners
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ2l0aHViR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFrQkU7Ozs7OztBQUVGLHFDQUFrQztBQUNsQyxvREFBeUI7QUFFekIsc0ZBQWlGO0FBRWpGLGdCQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFYixzREFBaUQ7QUFDakQsTUFBTSxNQUFNLEdBQUcsSUFBQSw2QkFBWSxFQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQzVDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUNyQixJQUFJLGFBQXVCLENBQUE7QUFFcEIsS0FBSyxVQUFVLFdBQVcsQ0FBQyxTQUFxQjtJQUNuRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztJQUMxQyxLQUFJLElBQUksTUFBTSxJQUFJLFNBQVMsSUFBRSxFQUFFLEVBQUM7UUFDNUIsYUFBYSxHQUFHLE1BQU0sQ0FBQztRQUN2QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLFdBQVcsR0FBRyxNQUFNLElBQUEsa0RBQWlCLEVBQUMsTUFBTSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNyRSxJQUFHLENBQUMsV0FBVyxFQUFDO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxDQUFDO1NBQ3BFO1FBQ0QsTUFBTSxJQUFBLDBDQUFTLEVBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFBO1FBQzNDLElBQUk7WUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDckMsTUFBTSxtQkFBbUIsR0FBUyxD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