"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    let beginLink = "https://docs.google.com/document/d/";
    let endLink = "/edit?usp=drivesdk";
    let beginLinkHTML = `<a href="`;
    let endLinkHTML = `">`;
    let fullLink;
    fullLink = (isSms ? ' ' : beginLinkHTML) + beginLink + objectContent?.id + endLink + (isSms ? ' ' : endLinkHTML);
    switch (rule?.objectName) {
        case "files":
            return "Title : " + objectContent.name + (isSms ? "\n" : "</br>") + "Link : " + fullLink + (isSms ? "\n" : "</br>");
        default:
            return 'Drive Scan : Id : ' + objectContent.id;
    }
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlRHJpdmVEaXNwbGF5LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvYWRkT24vZGlzcGxheS9nb29nbGVEcml2ZURpc3BsYXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixjQUFjLENBQUMsSUFBVyxFQUFFLGFBQWtCLEVBQUUsUUFBZSxLQUFLO0lBQ2hGLElBQUksU0FBUyxHQUFHLHFDQUFxQyxDQUFDO0lBQ3RELElBQUksT0FBTyxHQUFHLG9CQUFvQixDQUFDO0lBQ25DLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQztJQUNoQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdkIsSUFBSSxRQUFRLENBQUM7SUFDYixRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsRUFBRSxFQUFFLEdBQUcsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pILFFBQVEsSUFBSSxFQUFFLFVBQVUsRUFBRTtRQUN0QixLQUFLLE9BQU87WUFDUixPQUFPLFVBQVUsR0FBRyxhQUFhLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFBLENBQUMsQ0FBQSxJQUFJLENBQUEsQ0FBQyxDQUFBLE9BQU8sQ0FBQyxHQUFHLFNBQVMsR0FBRyxRQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUEsQ0FBQyxDQUFBLElBQUksQ0FBQSxDQUFDLENBQUEsT0FBTyxDQUFDLENBQUM7UUFDaEg7WUFDSSxPQUFPLG9CQUFvQixHQUFHLGFBQWEsQ0FBQyxFQUFFLENBQUM7S0FDdEQ7QUFDTCxDQUFDO0FBYkQsd0NBYUMifQ==