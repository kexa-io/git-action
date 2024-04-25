"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const addOn_service_1 = require("../../services/addOn.service");
const { expect } = require('chai');
const fs = require('fs');
const mainFolder = 'Kexa';
describe('Add On', function () {
    const addOnPath = '../../services/addOn';
    this.timeout(5000);
    this.retries(4);
    describe('Main Add On Folder', () => {
        const files = fs.readdirSync("./" + mainFolder + "/services/addOn");
        files.forEach((file) => {
            if (file.endsWith('Gathering.service.ts')) {
                let addOnName = file.split('Gathering.service.ts')[0];
                describe(`Add On ${addOnName}`, () => {
                    it(`File ${file} should contain an importable collectData function`, async () => {
                        var _a;
                        const moduleExports = await (_a = `${addOnPath}/${file.replace(".ts", "")}`, Promise.resolve().then(() => __importStar(require(_a))));
                        const collectDataFn = moduleExports.collectData;
                        expect(collectDataFn).to.be.a('function');
                    });
                    it(`Display part of ${addOnName} should be ok`, async () => {
                        const moduleExports = require(`${addOnPath}/display/${addOnName}Display.service`);
                        const displayFn = moduleExports.propertyToSend;
                        expect(displayFn).to.be.a('function');
                    });
                    it(`File ${file} should contain a valid header`, async () => {
                        let header = (0, addOn_service_1.hasValidHeader)(`./${mainFolder}/services/addOn/${file}`);
                        expect(typeof (header) !== "string").to.equal(true);
                    });
                });
            }
        });
    });
    describe('Secondary Add On Folder', () => {
        const noCheckFolders = ["display", "imports"];
        const folders = fs.readdirSync("./" + mainFolder + "/services/addOn").filter((folder) => !folder.endsWith('.ts'));
        folders.forEach((folder) => {
            if (noCheckFolders.some((noCheckFolder) => { return folder.includes(noCheckFolder); }))
                return;
            const files = fs.readdirSync("./" + mainFolder + "/services/addOn/" + folder);
            const folderName = folder.slice(0, 1).toUpperCase() + folder.slice(1);
            if (files.some((file) => file.endsWith(folderName + '.service.ts'))) {
                describe(`Add On ${folderName}`, () => {
                    let subAddons = (0, addOn_service_1.loadAddOnsCustomUtility)(folder, folder);
                    //Object.keys(subAddons).forEach((addOnName: string) => {
                    //    describe(`Add On ${addOnName} for ${folderName}`, () => {
                    //        it(`File ${addOnName}${folderName}.service should be load`, async () => {
                    //            expect(subAddons[addOnName]).to.be.a('function');
                    //        });
                    //    });
                    //});
                    files.forEach((file) => {
                        if (file.endsWith(folderName + '.service.ts')) {
                            let addOnName = file.split(folderName + '.service.ts')[0];
                            describe(`Add On ${addOnName} for ${folderName}`, () => {
                                it(`File ${file} should contain an importable function`, async () => {
                                    var _a;
                                    const moduleExports = await (_a = `${addOnPath}/${folder}/${file.replace(".ts", "").replace(".js", "")}`, Promise.resolve().then(() => __importStar(require(_a))));
                                    const exportFn = moduleExports[folder];
                                    expect(exportFn).to.be.a('function');
                                });
                            });
                        }
                    });
                    it('Number of subAddons should be equal to number of files', async () => {
                        expect(Object.keys(subAddons).length).to.be.equal(files.length);
                    });
                });
            }
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkT24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vc2VydmljZXMvYWRkT24udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0VBQXVGO0FBR3ZGLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkMsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pCLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQztBQUUxQixRQUFRLENBQUMsUUFBUSxFQUFFO0lBQ2YsTUFBTSxTQUFTLEdBQUcsc0JBQXNCLENBQUM7SUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWhCLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7UUFDaEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUcsVUFBVSxHQUFHLGlCQUFpQixDQUFDLENBQUM7UUFFcEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQVksRUFBRSxFQUFFO1lBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFO2dCQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RELFFBQVEsQ0FBQyxVQUFVLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRTtvQkFDakMsRUFBRSxDQUFDLFFBQVEsSUFBSSxvREFBb0QsRUFBRSxLQUFLLElBQUksRUFBRTs7d0JBQzVFLE1BQU0sYUFBYSxHQUFHLFlBQWEsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVB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