"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.propertyToSend = void 0;
function propertyToSend(rule, objectContent, isSms = false) {
    let toRet;
    let link;
    if (isSms)
        link = `Resource : ` + rule?.objectName + ` : `;
    else
        link = `Resource : ` + rule?.objectName + ` : <a href="`;
    switch (rule?.objectName) {
        case "drive":
            toRet = link + `https://drive.google.com/drive/u/1/folders/` + objectContent?.id + (isSms ? ' ' : '">') + ' ' + objectContent?.name + (isSms ? `.` : `</a>`);
            break;
        case "calendar":
            toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Calendar : ' + objectContent?.id + ' Etag : ' + objectContent?.etag + (isSms ? `.` : `</a>`);
            break;
        case "file":
            toRet = link + objectContent?.webViewLink + (isSms ? ' ' : '">') + ' File : ' + objectContent?.name + ' Id : ' + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
        case "role":
            toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Role : ' + objectContent?.roleName + ' Id : ' + objectContent?.roleId + (isSms ? `.` : `</a>`);
            break;
        case "domain":
            toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Domain : ' + objectContent?.domainName + ' Etag : ' + objectContent?.domainInfos?.etag + (isSms ? `.` : `</a>`);
            break;
        case "user":
            toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' User Email : ' + objectContent?.primaryEmail + ' Id : ' + objectContent?.id + (isSms ? `.` : `</a>`);
            break;
        case "":
            toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Role : ' + objectContent?.roleName + ' Id : ' + objectContent?.roleId + (isSms ? `.` : `</a>`);
            break;
        default:
            toRet = link + `https://workspace.google.com/` + (isSms ? ' ' : '">') + ' Id: ' + objectContent?.id + ' Etag : ' + objectContent?.etag + (isSms ? `.` : `</a>`);
            break;
    }
    return toRet;
}
exports.propertyToSend = propertyToSend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlV29ya3NwYWNlRGlzcGxheS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2FkZE9uL2Rpc3BsYXkvZ29vZ2xlV29ya3NwYWNlRGlzcGxheS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLFNBQWdCLGNBQWMsQ0FBQyxJQUFXLEVBQUUsYUFBa0IsRUFBRSxRQUFlLEtBQUs7SUFDNUUsSUFBSSxLQUFjLENBQUM7SUFDbkIsSUFBSSxJQUFhLENBQUM7SUFDbEIsSUFBSSxLQUFLO1FBQ0QsSUFBSSxHQUFHLGFBQWEsR0FBRyxJQUFJLEVBQUUsVUFBVSxHQUFJLEtBQUssQ0FBQzs7UUFFakQsSUFBSSxHQUFHLGFBQWEsR0FBRyxJQUFJLEVBQUUsVUFBVSxHQUFHLGNBQWMsQ0FBQztJQUNqRSxRQUFRLElBQUksRUFBRSxVQUFVLEVBQUU7UUFDbEIsS0FBSyxPQUFPO1lBQ0osS0FBSyxHQUFHLElBQUksR0FBRyw2Q0FBNkMsR0FBRyxhQUFhLEVBQUUsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxhQUFhLEVBQUUsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQzVKLE1BQU07UUFDZCxLQUFLLFVBQVU7WUFDUCxLQUFLLEdBQUcsSUFBSSxHQUFHLCtCQUErQixHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLGNBQWMsR0FBRyxhQUFhLEVBQUUsRUFBRSxHQUFHLFVBQVUsR0FBRyxhQUFhLEVBQUUsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxD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