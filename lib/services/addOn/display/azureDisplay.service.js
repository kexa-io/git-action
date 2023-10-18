"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    if (isSms)
        return `Id : ` + objectContent?.id + `https://portal.azure.com/#@/resource/` + objectContent?.id;
    else
        return `Id : <a href="https://portal.azure.com/#@/resource/` + objectContent?.id + '">' + objectContent?.id + `</a>`;
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmVEaXNwbGF5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZGlzcGxheS9henVyZURpc3BsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixjQUFjLENBQUMsSUFBVyxFQUFFLGFBQWtCLEVBQUUsUUFBZSxLQUFLO0lBQ2hGLElBQUksS0FBSztRQUNMLE9BQU8sT0FBTyxHQUFFLGFBQWEsRUFBRSxFQUFFLEdBQUcsdUNBQXVDLEdBQUcsYUFBYSxFQUFFLEVBQUUsQ0FBQTs7UUFFL0YsT0FBTyxxREFBcUQsR0FBRyxhQUFhLEVBQUUsRUFBRSxHQUFHLElBQUksR0FBRyxhQUFhLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQTtBQUM1SCxDQUFDO0FBTEQsd0NBS0MifQ==