"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const condition_enum_1 = require("../../enum/condition.enum");
const analyse_service_1 = require("../../services/analyse.service");
const { expect } = require('chai');
describe('analyse service', () => {
    describe('Gathering rules', () => {
        it('should return a multiple rules', async () => {
            const result = await (0, analyse_service_1.gatheringRules)("./lib/__tests__/rules/test2", true);
            expect(result.length).to.be.above(1);
        });
        it('should return 0 rules', async () => {
            const result = await (0, analyse_service_1.gatheringRules)("./lib/__tests__/rules/test3");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5hbHlzZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL19fdGVzdHNfXy9zZXJ2aWNlcy9hbmFseXNlLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4REFBMEQ7QUFFMUQsb0VBQStWO0FBRS9WLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbkMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtJQUM3QixRQUFRLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFO1FBQzdCLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLElBQUksRUFBRTtZQUM1QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUEsZ0NBQWMsRUFBQyw2QkFBNkIsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6RSxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO1FBRUgsRUFBRSxDQUFDLHVCQUF1QixFQUFFLEtBQUssSUFBSSxFQUFFO1lBQ25DLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSxnQ0FBYyxFQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDbkUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO1FBRWpDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7Z0JBQzFCLE1BQU0sTUFBTSxHQUFHLElBQUEsZ0NBQWMsRUFBQyxFQUFDLFFBQVEsRUFBRSxN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