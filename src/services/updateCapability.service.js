import { jsonStringify } from '../helpers/jsonStringify';

function updateVersion(){
    const fs = require("fs");
    let packageJson = require("../../package.json");
    let version = fs.readFileSync("./VERSION", "utf8");
    packageJson.version = version.split("\n")[0];
    fs.writeFileSync("./package.json", jsonStringify(packageJson, 4));
}

if (require.main === module) {
    updateVersion();
}