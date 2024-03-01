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
    it('Update README', async () => {
        const capacityJsonOriginal = require('../../../capacity.json');
        const readmeOriginal = fs_1.default.readFileSync('./README.md', 'utf8');
        fs_1.default.writeFileSync('./capacity.json', JSON.stringify(JSON.parse(fs_1.default.readFileSync('./Kexa/__tests__/filesForTest/capacity.json', 'utf8'))));
        const capacityJson = require('../../../capacity.json');
        (0, updateCapability_service_1.updateREADME)();
        const readme = fs_1.default.readFileSync('./README.md', 'utf8');
        const tab = '    ';
        Object.keys(capacityJson).forEach((key) => {
            let sentence = `<details>\n<summary>✅ ${key.charAt(0).toUpperCase() + key.slice(1)} check in:</summary>\n\n`;
            expect((readme.match(new RegExp(sentence, "g")) || []).length).to.equal(1);
            capacityJson[key]['resources'].forEach((resource) => {
                sentence = `- ✅ ${resource}\n`;
                expect(readme.match(new RegExp(sentence, "g")) || []).not.to.be.empty;
            });
        });
        expect((readme.match(new RegExp("<div class='spliter_code'></div>", "g")) || []).length).to.equal(2);
        fs_1.default.writeFileSync('./capacity.json', JSON.stringify(capacityJsonOriginal, null, 4));
        fs_1.default.writeFileSync('./README.md', readmeOriginal);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlQ2FwYWJpbGl0eS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9zZXJ2aWNlcy91cGRhdGVDYXBhYmlsaXR5LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsc0ZBQXNGO0FBQ3RGLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbkMsUUFBUSxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRTtJQUN2QyxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDNUIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDO1FBQzVCLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDbEYsTUFBTSxlQUFlLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0QsWUFBRSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDM0MsSUFBQSx3Q0FBYSxHQUFFLENBQUM7UUFDaEIsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELFlBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQy9DLFlBQUUsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxlQUFlLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDM0IsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUMvRCxNQUFNLGNBQWMsR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5RCxZQUFFLENBQUMsYUFBYSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFFLENBQUMsWUFBWSxDQUFDLDZDQUE2QyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hJLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ3ZELElBQUEsdUNBQVksR0FBRSxDQUFDO1FBQ2YsTUFBTSxNQUFNLEdBQUcsWUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDO1FBQ25CLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDOUMsSUFBSSxRQUFRLEdBQUcseUJBQXlCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUM7WUFDN0csTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFnQixFQUFFLEVBQUU7Z0JBQ3hELFFBQVEsR0FBRyxPQUFPLFFBQVEsSUFBSSxDQUFBO2dCQUM5QixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JHLFlBQUUsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixZQUFFLENBQUMsYUFBYSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyxDQUFDIn0=