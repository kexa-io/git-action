import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
    try {
        const message = core.getInput('message');
        core.setOutput('time', new Date().toTimeString());

        const payload = JSON.stringify(github.context.payload, undefined, 2);
        console.log(`The event payload: ${payload}`);

        core.info(`Message: ${message}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
