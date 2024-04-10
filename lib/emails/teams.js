"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teams = void 0;
const levelAlert = ["info", "warning", "error", "fatal"];
exports.Teams = {
    //https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/connectors-using?tabs=cURL
    OneTeams: (color, subject, url, description) => {
        return JSON.stringify({
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": color,
            "summary": subject,
            "sections": [
                {
                    "activityTitle": subject,
                    "activitySubtitle": description,
                    "activityImage": "https://kexa.io/kexa-no-background-color.png",
                    "markdown": true
                }
            ],
            "potentialAction": [
                {
                    "@type": "OpenUri",
                    "name": "Go to ressource",
                    "targets": [
                        {
                            "os": "default",
                            "uri": url
                        }
                    ]
                }
            ]
        });
    },
    GlobalTeams: (color, subject, text, errors) => {
        return JSON.stringify({
            "@type": "MessageCard",
            "@context": "http://schema.org/extensions",
            "themeColor": color,
            "summary": subject,
            "sections": [
                {
                    "activityTitle": subject,
                    "activitySubtitle": "Kexa by 4urcloud",
                    "activityImage": "https://kexa.io/kexa-no-background-color.png",
                    "text": text,
                    "facts": Object.entries(errors).map(([name, value]) => {
                        return {
                            "name": name,
                            "value": value.toString()
                        };
                    }),
                    "markdown": true
                }
            ]
        });
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVhbXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW1haWxzL3RlYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDNUMsUUFBQSxLQUFLLEdBQUc7SUFDakIscUhBQXFIO0lBQ3JILFFBQVEsRUFBRSxDQUFDLEtBQVksRUFBRSxPQUFjLEVBQUUsR0FBVSxFQUFFLFdBQWtCLEVBQUUsRUFBRTtRQUN2RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsT0FBTyxFQUFFLGFBQWE7WUFDdEIsVUFBVSxFQUFFLDhCQUE4QjtZQUMxQyxZQUFZLEVBQUUsS0FBSztZQUNuQixTQUFTLEVBQUUsT0FBTztZQUNsQixVQUFVLEVBQUU7Z0JBQ1I7b0JBQ0ksZUFBZSxFQUFFLE9BQU87b0JBQ3hCLGtCQUFrQixFQUFFLFdBQVc7b0JBQy9CLGVBQWUsRUFBRSw4Q0FBOEM7b0JBQy9ELFVBQVUsRUFBRSxJQUFJO2lCQUNuQjthQUNKO1lBQ0QsaUJBQWlCLEVBQUU7Z0JBQ2Y7b0JBQ0ksT0FBTyxFQUFFLFNBQVM7b0JBQ2xCLE1BQU0sRUFBRSxpQkFBaUI7b0JBQ3pCLFNBQVMsRUFBRTt3QkFDUDs0QkFDSSxJQUFJLEVBQUUsU0FBUzs0QkFDZixLQUFLLEVBQUUsR0FBRzt5QkFDYjtxQkFDSjtpQkFDSjthQUNKO1NBQ0osQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNELFdBQVcsRUFBRSxDQUFDLEtBQVksRUFBRSxPQUFjLEVBQUUsSUFBVyxFQUFFLE1BQStCLEVBQUUsRUFBRTtRQUN4RixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbEIsT0FBTyxFQUFFLGFBQWE7WUFDdEIsVUFBVSxFQUFFLDhCQUE4QjtZQUMxQyxZQUFZLEVBQUUsS0FBSztZQUNuQixTQUFTLEVBQUUsT0FBTztZQUNsQixVQUFVLEVBQUU7Z0JBQ1I7b0JBQ0ksZUFBZSxFQUFFLE9BQU87b0JBQ3hCLGtCQUFrQixFQUFFLGtCQUFrQjtvQkFDdEMsZUFBZSxFQUFFLDhDQUE4QztvQkFDL0QsTUFBTSxFQUFFLElBQUk7b0JBQ1osT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTt3QkFDbEQsT0FBTzs0QkFDSCxNQUFNLEVBQUUsSUFBSTs0QkFDWixPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRTt5QkFDNUIsQ0FBQztvQkFDTixDQUFDLENBQUM7b0JBQ0YsVUFBVSxFQUFFLElBQUk7aUJBQ25CO2FBQ0o7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0osQ0FBQyJ9