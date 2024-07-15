"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const updateCapability_service_1 = require("../../services/updateCapability.service");
const { expect } = require('chai');
describe('Update Capability Service', () => {
    it('Update Version', async () => {
        const testVersion = "1.0.0";
        const packageJsonOriginal = JSON.parse(fs_1.default.readFileSync('./package.json', 'utf8'));
        const versionOriginal = fs_1.default.readFileSync('./VERSION', 'utf8');
        fs_1.default.writeFileSync('./VERSION', testVersion);
        (0, updateCapability_service_1.updateVersion)();
        const packageJson = require('../../../package.json');
        expect(packageJson.version).to.equal(testVersion);
        fs_1.default.writeFileSync('./VERSION', versionOriginal);
        fs_1.default.writeFileSync('./package.json', JSON.stringify(packageJsonOriginal, null, 4));
    });
    //it('Update README', async () => {
    //    const capacityJsonOriginal = require('../../../capacity.json');
    //    const readmeOriginal = fs.readFileSync('./README.md', 'utf8');
    //    fs.writeFileSync('./capacity.json', JSON.stringify(JSON.parse(fs.readFileSync('./Kexa/__tests__/filesForTest/capacity.json', 'utf8'))));
    //    const capacityJson = require('../../../capacity.json');
    //    updateREADME();
    //    const readme = fs.readFileSync('./README.md', 'utf8');
    //    const tab = '    ';
    //    Object.keys(capacityJson).forEach((key: string) => {
    //        let sentence = `<details>\n<summary>✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:</summary>\n\n`;
    //        expect((readme.match(new RegExp(sentence, "g")) || []).length).to.equal(1);
    //        capacityJson[key]['resources'].forEach((resource: string) => {
    //            sentence = `- ✅ ${resource}\n`
    //            expect(readme.match(new RegExp(sentence, "g")) || []).not.to.be.empty;
    //        });
    //    });
    //    expect((readme.match(new RegExp("<div class='spliter_code'></div>", "g")) || []).length).to.equal(2);
    //    fs.writeFileSync('./capacity.json', JSON.stringify(capacityJsonOriginal, null, 4));
    //    fs.writeFileSync('./README.md', readmeOriginal);
    //});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FwYWJpbGl0eS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9zZXJ2aWNlcy91cGRhdGVDYXBhYmlsaXR5LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsc0ZBR2lEO0FBQ2pELE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN2QyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDNUIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQzVCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbEYsTUFBTSxlQUFlLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0QsWUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDM0MsSUFBQSx3Q0FBYSxHQUFFLENBQUM7UUFDaEIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELFlBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQy9DLFlBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDLENBQUMsQ0FBQztJQUVILG1DQUFtQztJQUNuQyxxRUFBcUU7SUFDckUsb0VBQW9FO0lBQ3BFLDhJQUE4STtJQUM5SSw2REFBNkQ7SUFDN0QscUJBQXFCO0lBQ3JCLDREQUE0RDtJQUM1RCx5QkFBeUI7SUFDekIsMERBQTBEO0lBQzFELHVIQUF1SDtJQUN2SCxxRkFBcUY7SUFDckYsd0VBQXdFO0lBQ3hFLDRDQUE0QztJQUM1QyxvRkFBb0Y7SUFDcEYsYUFBYTtJQUNiLFNBQVM7SUFDVCwyR0FBMkc7SUFDM0cseUZBQXlGO0lBQ3pGLHNEQUFzRDtJQUN0RCxLQUFLO0FBQ1QsQ0FBQyxDQUFDLENBQUMifQ==