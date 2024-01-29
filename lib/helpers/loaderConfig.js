"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const fs = require('fs');
const core = require('@actions/core');
function getConfig() {
    if (core.getInput("SPECIALCONFIG")) {
        return JSON.parse(fs.readFileSync(core.getInput("SPECIALCONFIG")));
    }
    else {
        return require('node-config-ts').config;
    }
}
exports.getConfig = getConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGVyQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvbG9hZGVyQ29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFdEMsU0FBZ0IsU0FBUztJQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLEVBQUU7UUFDaEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEU7U0FBTTtRQUNILE9BQU8sT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsTUFBTSxDQUFDO0tBQzNDO0FBQ0wsQ0FBQztBQU5ELDhCQU1DIn0=