const fs = require('fs');
const core = require('@actions/core');

export function getConfig(){
    if (core.getInput("SPECIALCONFIG")) {
        return JSON.parse(fs.readFileSync(core.getInput("SPECIALCONFIG")));
    } else {
        return require('node-config-ts').config;
    }
}