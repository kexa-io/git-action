"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const condition_enum_1 = require("../../enum/condition.enum");
const analyse_service_1 = require("../../services/analyse.service");
const { expect } = require('chai');
const mainFolderDev = 'src';
describe('analyse service', () => {
    describe('Gathering rules', () => {
        it('should return a multiple rules', async () => {
            const result = await (0, analyse_service_1.gatheringRules)("./" + mainFolderDev + "/__tests__/rules/test2", true);
            expect(result.length).to.be.above(1);
        });
        it('should return 0 rules', async () => {
            const result = await (0, analyse_service_1.gatheringRules)("./" + mainFolderDev + "/__tests__/rules/test3");
            expect(result.length).to.equal(0);
        });
    });
    describe("resultScan function", () => {
        describe("Equal Date", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkEqualDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_EQUAL, value: "01-01-2021", date: "DD-MM-YYYY" }, "01-01-2021");
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkEqualDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_EQUAL, value: "02-01-2021", date: "DD-MM-YYYY" }, "01-01-2021");
                expect(result).to.equal(false);
            });
        });
        describe("Interval Date", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkIntervalDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_INTERVAL, value: "01-01-2021 02-01-2021", date: "DD-MM-YYYY" }, "01-01-2021");
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkIntervalDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_INTERVAL, value: "01-01-2021 02-01-2021", date: "DD-MM-YYYY" }, "03-01-2021");
                expect(result).to.equal(false);
            });
        });
        describe("Interval", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkInterval)({ property: "date", condition: condition_enum_1.ConditionEnum.INTERVAL, value: "1 3" }, 1);
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkInterval)({ property: "date", condition: condition_enum_1.ConditionEnum.INTERVAL, value: "1 3" }, 4);
                expect(result).to.equal(false);
            });
        });
        describe("Greater than date", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkGreaterThanDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_SUP, value: "0 0 0 1", date: "DD-MM-YYYY" }, (0, analyse_service_1.generateDate)("0 0 0 0 1 0", false).format("DD-MM-YYYY"));
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkGreaterThanDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_SUP, value: "0 0 0 1", date: "DD-MM-YYYY" }, (0, analyse_service_1.generateDate)("0 0 0 0 1 0").format("DD-MM-YYYY"));
                expect(result).to.equal(false);
            });
        });
        describe("Less than date", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkLessThanDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_INF, value: "0 0 0 1", date: "DD-MM-YYYY" }, (0, analyse_service_1.generateDate)("0 0 0 0 1 0").format("DD-MM-YYYY"));
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkLessThanDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_INF, value: "0 0 0 1", date: "DD-MM-YYYY" }, (0, analyse_service_1.generateDate)("0 0 0 1 0 0", false).format("DD-MM-YYYY"));
                expect(result).to.equal(false);
            });
        });
        describe("Equal than date", () => {
            it("should return true", () => {
                //NOT WORKING
                const result = (0, analyse_service_1.checkEqualThanDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_INF_OR_EQUAL, value: "0 0 0 1", date: "DD-MM-YYYY" }, (0, analyse_service_1.generateDate)("0 0 0 1 0 0", false).format("DD-MM-YYYY"), false);
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkEqualThanDate)({ property: "date", condition: condition_enum_1.ConditionEnum.DATE_INF_OR_EQUAL, value: "0 0 0 1", date: "DD-MM-YYYY" }, (0, analyse_service_1.generateDate)("0 0 0 0 0 0").format("DD-MM-YYYY"), false);
                expect(result).to.equal(false);
            });
        });
        describe("Equal", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkEqual)({ property: "date", condition: condition_enum_1.ConditionEnum.EQUAL, value: 1 }, 1);
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkEqual)({ property: "date", condition: condition_enum_1.ConditionEnum.EQUAL, value: 1 }, 2);
                expect(result).to.equal(false);
            });
        });
        describe("Sup", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkGreaterThan)({ property: "date", condition: condition_enum_1.ConditionEnum.SUP, value: 1 }, 2);
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkGreaterThan)({ property: "date", condition: condition_enum_1.ConditionEnum.SUP, value: 1 }, 1);
                expect(result).to.equal(false);
            });
        });
        describe("Inf", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkLessThan)({ property: "date", condition: condition_enum_1.ConditionEnum.INF, value: 1 }, 0);
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkLessThan)({ property: "date", condition: condition_enum_1.ConditionEnum.INF, value: 1 }, 1);
                expect(result).to.equal(false);
            });
        });
        describe("Include", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkInclude)({ property: "date", condition: condition_enum_1.ConditionEnum.INCLUDE, value: "2" }, "1 2 3");
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkInclude)({ property: "date", condition: condition_enum_1.ConditionEnum.INCLUDE, value: "4" }, "1 2 3");
                expect(result).to.equal(false);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkInclude)({ property: "date", condition: condition_enum_1.ConditionEnum.STARTS_WITH, value: "A" }, "abc");
                expect(result).to.equal(false);
            });
        });
        describe("Starts with", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkStartsWith)({ property: "date", condition: condition_enum_1.ConditionEnum.STARTS_WITH, value: "1" }, "1 2 3");
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkStartsWith)({ property: "date", condition: condition_enum_1.ConditionEnum.STARTS_WITH, value: "4" }, "1 2 3");
                expect(result).to.equal(false);
            });
        });
        describe("Ends with", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkEndsWith)({ property: "date", condition: condition_enum_1.ConditionEnum.ENDS_WITH, value: "3" }, "1 2 3");
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkEndsWith)({ property: "date", condition: condition_enum_1.ConditionEnum.ENDS_WITH, value: "4" }, "1 2 3");
                expect(result).to.equal(false);
            });
        });
        describe("Include not sensitive", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkIncludeNS)({ property: "date", condition: condition_enum_1.ConditionEnum.INCLUDE_NOT_SENSITIVE, value: "2" }, "1 2 3");
                expect(result).to.equal(true);
            });
            it("should return true", () => {
                const result = (0, analyse_service_1.checkIncludeNS)({ property: "date", condition: condition_enum_1.ConditionEnum.INCLUDE_NOT_SENSITIVE, value: "A" }, "abc");
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkIncludeNS)({ property: "date", condition: condition_enum_1.ConditionEnum.INCLUDE_NOT_SENSITIVE, value: "4" }, "1 2 3");
                expect(result).to.equal(false);
            });
        });
        describe("Regex", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkRegex)({ property: "date", condition: condition_enum_1.ConditionEnum.REGEX, value: "^[a-z]+$" }, "abc");
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkRegex)({ property: "date", condition: condition_enum_1.ConditionEnum.REGEX, value: "/[0-9]/gm" }, "abc");
                expect(result).to.equal(false);
            });
        });
        describe("count", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkCount)({ property: "date", condition: condition_enum_1.ConditionEnum.COUNT, value: 3 }, [1, 2, 3]);
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkCount)({ property: "date", condition: condition_enum_1.ConditionEnum.COUNT, value: 3 }, [1, 2]);
                expect(result).to.equal(false);
            });
        });
        describe("count sup", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkGreaterThan)({ property: "date", condition: condition_enum_1.ConditionEnum.COUNT_SUP, value: 3 }, [1, 2, 3, 4].length);
                expect(result).to.equal(true);
            });
            it("should return true", () => {
                const result = (0, analyse_service_1.checkGreaterThan)({ property: "date", condition: condition_enum_1.ConditionEnum.COUNT_SUP, value: 3 }, [1, 2, 3].length);
                expect(result).to.equal(false);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkGreaterThan)({ property: "date", condition: condition_enum_1.ConditionEnum.COUNT_SUP, value: 3 }, [1, 2].length);
                expect(result).to.equal(false);
            });
        });
        describe("count inf", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkLessThan)({ property: "date", condition: condition_enum_1.ConditionEnum.COUNT_INF, value: 3 }, [1, 2].length);
                expect(result).to.equal(true);
            });
            it("should return true", () => {
                const result = (0, analyse_service_1.checkLessThan)({ property: "date", condition: condition_enum_1.ConditionEnum.COUNT_INF, value: 3 }, [1, 2, 3].length);
                expect(result).to.equal(false);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkLessThan)({ property: "date", condition: condition_enum_1.ConditionEnum.COUNT_INF, value: 3 }, [1, 2, 3, 4].length);
                expect(result).to.equal(false);
            });
        });
        describe("all", () => {
            it("should return true", () => {
                const result = (0, analyse_service_1.checkAll)({
                    property: "date",
                    condition: condition_enum_1.ConditionEnum.ALL,
                    value: [{
                            property: "a",
                            condition: condition_enum_1.ConditionEnum.EQUAL,
                            value: 1
                        }]
                }, [{ "a": 1 }, { "a": 1 }, { "a": 1 }]);
                expect(result).to.equal(true);
            });
            it("should return false", () => {
                const result = (0, analyse_service_1.checkAll)({
                    property: "date",
                    condition: condition_enum_1.ConditionEnum.ALL,
                    value: [{
                            property: "a",
                            condition: condition_enum_1.ConditionEnum.EQUAL,
                            value: 1
                        }]
                }, [{ "a": 2 }, { "a": 1 }, { "a": 1 }]);
                expect(result).to.equal(false);
            });
        });
    });
    describe("Some", () => {
        it("should return true", () => {
            const result = (0, analyse_service_1.checkSome)({
                property: "date",
                condition: condition_enum_1.ConditionEnum.ALL,
                value: [{
                        property: "a",
                        condition: condition_enum_1.ConditionEnum.EQUAL,
                        value: 1
                    }]
            }, [{ "a": 2 }, { "a": 3 }, { "a": 1 }]);
            expect(result).to.equal(true);
        });
        it("should return true", () => {
            const result = (0, analyse_service_1.checkSome)({
                property: "date",
                condition: condition_enum_1.ConditionEnum.ALL,
                value: [{
                        property: "a",
                        condition: condition_enum_1.ConditionEnum.EQUAL,
                        value: 1
                    }]
            }, [{ "a": 2 }, { "a": 3 }, { "a": 1 }]);
            expect(result).to.equal(true);
        });
        it("should return false", () => {
            const result = (0, analyse_service_1.checkSome)({
                property: "date",
                condition: condition_enum_1.ConditionEnum.ALL,
                value: [{
                        property: "a",
                        condition: condition_enum_1.ConditionEnum.EQUAL,
                        value: 1
                    }]
            }, [{ "a": 2 }, { "a": 3 }, { "a": 4 }]);
            expect(result).to.equal(false);
        });
    });
    describe("One", () => {
        it("should return true", () => {
            const result = (0, analyse_service_1.checkOne)({
                property: "date",
                condition: condition_enum_1.ConditionEnum.ALL,
                value: [{
                        property: "a",
                        condition: condition_enum_1.ConditionEnum.EQUAL,
                        value: 1
                    }]
            }, [{ "a": 2 }, { "a": 3 }, { "a": 1 }]);
            expect(result).to.equal(true);
        });
        it("should return false", () => {
            const result = (0, analyse_service_1.checkOne)({
                property: "date",
                condition: condition_enum_1.ConditionEnum.ALL,
                value: [{
                        property: "a",
                        condition: condition_enum_1.ConditionEnum.EQUAL,
                        value: 1
                    }]
            }, [{ "a": 2 }, { "a": 1 }, { "a": 1 }]);
            expect(result).to.equal(false);
        });
        it("should return false", () => {
            const result = (0, analyse_service_1.checkOne)({
                property: "date",
                condition: condition_enum_1.ConditionEnum.ALL,
                value: [{
                        property: "a",
                        condition: condition_enum_1.ConditionEnum.EQUAL,
                        value: 1
                    }]
            }, [{ "a": 2 }, { "a": 3 }, { "a": 4 }]);
            expect(result).to.equal(false);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9zZXJ2aWNlcy9hbmFseXNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4REFBMEQ7QUFFMUQsb0VBQStWO0FBRS9WLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkMsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBRTVCLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLEVBQUU7SUFDN0IsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtRQUM3QixFQUFFLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxJQUFJLEVBQUU7WUFDNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGdDQUFjLEVBQUMsSUFBSSxHQUFFLGFBQWEsR0FBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6RixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHVCQUF1QixFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxnQ0FBYyxFQUFDLElBQUksR0FBRSxhQUFhLEdBQUUsd0JBQXdCLENBQUMsQ0FBQztZQUNuRixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILFFBQVEsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUU7UUFFakMsUUFBUSxDQUFDLFlBQVksRUFBRSxHQUFHLEVBQUU7WUFDeEIsRUFBRSxDQUFDLG9CQUFv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