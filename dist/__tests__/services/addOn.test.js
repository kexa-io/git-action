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
const tslog_1 = require("tslog");
const addOn_service_1 = require("../../services/addOn.service");
const { expect } = require('chai');
const fs = require('fs');
const mainFolder = 'Kexa';
let logger = new tslog_1.Logger({ minLevel: Number(process.env.DEBUG_MODE) ?? 4, type: "pretty", name: "globalLogger" });
describe('Add On', function () {
    const addOnPath = '../../services/addOn';
    const files = fs.readdirSync("./" + mainFolder + "/services/addOn");
    this.timeout(5000);
    this.retries(4);
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
                    const moduleExports = require(`${addOnPath}/display/${addOnName}Display.service.ts`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRkT24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9fX3Rlc3RzX18vc2VydmljZXMvYWRkT24udGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQStCO0FBQy9CLGdFQUE4RDtBQUU5RCxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUM7QUFDMUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxjQUFNLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFFL0csUUFBUSxDQUFDLFFBQVEsRUFBRTtJQUNmLE1BQU0sU0FBUyxHQUFHLHNCQUFzQixDQUFDO0lBQ3pDLE1BQU0sS0FBSyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3BFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVoQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUU7UUFDM0IsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLEVBQUU7WUFDdkMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxVQUFVLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRTtnQkFDakMsRUFBRSxDQUFDLFFBQVEsSUFBSSxvREFBb0QsRUFBRSxLQUFLLElBQUksRUFBRTs7b0JBQzVFLE1BQU0sYUFBYSxHQUFHLFlBQWEsR0FBRyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEVBQUUsMERBQUMsQ0FBQztvQkFDOUUsTUFBTSxhQUFhLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQztvQkFDaEQsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUM5QyxDQUFDLENBQUMsQ0FBQztnQkFFSCxFQUFFLENBQUMsbUJBQW1CLFNBQVMsZUFBZSxFQUFFLEtBQUssSUFBSSxFQUFFO29CQUN2RCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxTQUFTLFlBQVksU0FBUyxvQkFBb0IsQ0FBQyxDQUFDO29CQUNyRixNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsY0FBYyxDQUFDO29CQUMvQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQzFDLENBQUMsQ0FBQyxDQUFDO2dCQUVILEVBQUUsQ0FBQyxRQUFRLElBQUksZ0NBQWdDLEVBQUUsS0FBSyxJQUFJLEVBQUU7b0JBQ3hELElBQUksTUFBTSxHQUFHLElBQUEsOEJBQWMsRUFBQyxLQUFLLFVBQVUsbUJBQW1CLElBQUksRUFBRSxDQUFDLENBQUM7b0JBQ3RFLE1BQU0sQ0FBQyxPQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyJ9