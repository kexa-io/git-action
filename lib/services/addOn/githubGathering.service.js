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
async function collectData(gitConfig) {
    let resources = new Array();
    for (let config of gitConfig ?? []) {
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
        logger.error(e);
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
        logger.error(e);
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
        logger.error(e);
    }
    return datas;
}
async function getOctokit() {
    return new octokit_1.Octokit({ auth: githubToken });
}
async function collectRepo() {
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
        logger.error(e);
        return [];
    }
}
exports.collectRepo = collectRepo;
async function collectBranch(repo, owner) {
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
        logger.error(e);
        return [];
    }
}
exports.collectBranch = collectBranch;
async function collectIssues(repo, owner) {
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
        logger.error(e);
        return [];
    }
}
exports.collectIssues = collectIssues;
async function collectOrganizations() {
    try {
        return (await (await getOctokit()).request('GET /user/orgs')).data;
    }
    catch (e) {
        logger.error(e);
        return [];
    }
}
exports.collectOrganizations = collectOrganizations;
async function collectMembers(org) {
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
        logger.error(e);
        return [];
    }
}
exports.collectMembers = collectMembers;
async function collectOutsideCollaborators(org) {
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
        logger.error(e);
        return [];
    }
}
exports.collectOutsideCollaborators = collectOutsideCollaborators;
async function collectTeams(org) {
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
        logger.error(e);
        return [];
    }
}
exports.collectTeams = collectTeams;
async function collectTeamMembers(org, team) {
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
        logger.error(e);
        return [];
    }
}
exports.collectTeamMembers = collectTeamMembers;
async function collectTeamRepos(org, team) {
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
        logger.error(e);
        return [];
    }
}
exports.collectTeamRepos = collectTeamRepos;
async function collectTeamProjects(org, team) {
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
        logger.error(e);
        return [];
    }
}
exports.collectTeamProjects = collectTeamProjects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2l0aHViR2F0aGVyaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZ2l0aHViR2F0aGVyaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7OztFQWlCRTs7Ozs7O0FBRUYscUNBQWtDO0FBQ2xDLG9EQUF5QjtBQUV6QixzRkFBaUY7QUFFakYsZ0JBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUViLHNEQUErQztBQUMvQyxNQUFNLE1BQU0sR0FBRyxJQUFBLDZCQUFZLEVBQUMsY0FBYyxDQUFDLENBQUM7QUFDNUMsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBRWQsS0FBSyxVQUFVLFdBQVcsQ0FBQyxTQUFxQjtJQUNuRCxJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztJQUMxQyxLQUFJLElBQUksTUFBTSxJQUFJLFNBQVMsSUFBRSxFQUFFLEVBQUM7UUFDNUIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNuRSxXQUFXLEdBQUcsTUFBTSxJQUFBLGtEQUFpQixFQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckUsSUFBRyxDQUFDLFdBQVcsRUFBQztZQUNaLE1BQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLENBQUMsQ0FBQztTQUNwRTtRQUNELE1BQU0sSUFBQSwwQ0FBUyxFQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQTtRQUMzQyxJQUFJO1lBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sbUJBQW1CLEdBQVMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUE7WUFDekUsSUFB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