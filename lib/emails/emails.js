"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emails = void 0;
const levelAlert = ["info", "warning", "error", "critical"];
exports.Emails = {
    OneAlert: (receiver, rule, identification, color = "#4f5660") => {
        return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=3Dedge">
      <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=3DUTF-8">
    <style type="text/css">
      #outlook a { padding: 0; }
      .ReadMsgBody { width: 100%; }
      .ExternalClass { width: 100%; }
      .ExternalClass * { line-height:100%; }
      body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      p { display: block; margin: 13px 0; }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .outlook-group-fix {
        width:100% !important;
      }
    </style>
    <![endif]-->
    
    <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
    
            @import url(https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700);
    
        </style>
      <!--<![endif]--><style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
      }
    </style>
    </head>
    <body style="background: #F9F9F9;">
      <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]-->
      <style type="text/css">
        html, body, * {
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        }
        a {
          color:#1EB0F4;
          text-decoration:none;
        }
        a:hover {
          text-decoration:underline;
        }
      </style>
    <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:138px;"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
      <h2 style="font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">
    
        Hi 
        ` + receiver + `
    
    
    </h2>
    <p>
    
    
      Kexa have detected an alert on your server, please check the code below to know more about the alert.
    
    
    </p>
    
              </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px;" align="center"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f2f3f4;background-color:#f2f3f4;width:100%">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center" colspan="4">
                      <div style="font-family:Poppins,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:24px;font-weight:bold;line-height:36px;text-align:center;color:` + color + `"> ` + identification + ` </div>
                    </td>
                  </tr>
                </tbody>
                </table>
        
        </td>
      </tr>
      <tr>
        <td>
          <table>
            <tbody>
              <tr>
              <td style="direction:ltr;;padding:20px 0;text-align:center"  colspan="1">
                Name :` + rule.name + `
              </td>
              <td style="direction:ltr;;padding:20px 0;text-align:center"  colspan="3">
                Info :` + ((rule.notification) ?? rule.description) + `
              </td>
            </tr>
          </tbody>
        </table>
        </td>
      </tr>
      <tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#747F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:16px;text-align:left;">
    <p style="direction:ltr;;padding:20px 0;text-align:center">Thank you, for using Kexa</p>
    
    </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]=
    >
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
          4urcloud - 2023
        </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#000000;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:22px;text-align:left;">
        </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></div>
    </html>`;
    },
    GlobalAlert: (receiver, compteError, allScanRenderTable, alert) => {
        return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=3Dedge">
      <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=3DUTF-8">
    <style type="text/css">
      #outlook a { padding: 0; }
      .ReadMsgBody { width: 100%; }
      .ExternalClass { width: 100%; }
      .ExternalClass * { line-height:100%; }
      body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      p { display: block; margin: 13px 0; }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .outlook-group-fix {
        width:100% !important;
      }
    </style>
    <![endif]-->
    
    <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
    
            @import url(https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700);
    
        </style>
      <!--<![endif]--><style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
      }
    </style>
    </head>
    <body style="background: #F9F9F9;">
      <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]-->
      <style type="text/css">
        html, body, * {
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        }
        a {
          color:#1EB0F4;
          text-decoration:none;
        }
        a:hover {
          text-decoration:underline;
        }
      </style>
    <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:138px;"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
      <h2 style="font-family: Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-weight: 500;font-size: 20px;color: #4F545C;letter-spacing: 0.27px;">
    
        Hi 
        ` + receiver + `
    
    
    </h2>
    <p>
    
    
      Kexa have done a scan on your server, please check the code below to know more about the render.
    
    
    </p>
    
              </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px;" align="center"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f2f3f4;background-color:#f2f3f4;width:100%">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center" colspan="4">
                      <div style="font-family:Poppins,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:24px;font-weight:bold;line-height:36px;text-align:center;color:#4f5660"> ` + (alert.name ?? 'Uname global alert') + ` </div>
                    </td>
                  </tr>
                </tbody>
                </table>
        
        </td>
      </tr>
      <tr>
        <td>
          <table>
            <tbody>
            ` +
            compteError.map((compte, index) => {
                return `
                  <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center"  colspan="1">
                      ` + levelAlert[index] + ` :
                    </td>
                    <td style="direction:ltr;padding:20px 0;text-align:center"  colspan="3">
                      ` + compte + `
                    </td>
                  </tr>
                `;
            }).join('')
            + `
            </tbody>
          </table>
        </td>
      </tr>
      ` +
            allScanRenderTable
            + `
      <tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#747F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:16px;text-align:left;">
    <p style="direction:ltr;;padding:20px 0;text-align:center">Thank you, for using Kexa</p>
    
    </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]=
    >
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
          4urcloud - 2023
        </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#000000;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:22px;text-align:left;">
        </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></div>
    </html>`;
    },
    Recap: (compteError, allScanRenderTable, alert) => {
        return `<!doctype html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <title></title>
      <!--[if !mso]><!-- -->
      <meta http-equiv="X-UA-Compatible" content="IE=3Dedge">
      <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=3DUTF-8">
    <style type="text/css">
      #outlook a { padding: 0; }
      .ReadMsgBody { width: 100%; }
      .ExternalClass { width: 100%; }
      .ExternalClass * { line-height:100%; }
      body { margin: 0; padding: 0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
      table, td { border-collapse:collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
      img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
      p { display: block; margin: 13px 0; }
    </style>
    <!--[if !mso]><!-->
    <style type="text/css">
      @media only screen and (max-width:480px) {
        @-ms-viewport { width:320px; }
        @viewport { width:320px; }
      }
    </style>
    <!--<![endif]-->
    <!--[if mso]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .outlook-group-fix {
        width:100% !important;
      }
    </style>
    <![endif]-->
    
    <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700" rel="stylesheet" type="text/css">
        <style type="text/css">
    
            @import url(https://fonts.googleapis.com/css?family=3DUbuntu:300,400,500,700);
    
        </style>
      <!--<![endif]--><style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100, * [aria-labelledby="mj-column-per-100"] { width:100%!important; }
      }
    </style>
    </head>
    <body style="background: #F9F9F9;">
      <div style="background-color:#F9F9F9;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]-->
      <style type="text/css">
        html, body, * {
          -webkit-text-size-adjust: none;
          text-size-adjust: none;
        }
        a {
          color:#1EB0F4;
          text-decoration:none;
        }
        a:hover {
          text-decoration:underline;
        }
      </style>
    <div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 0px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0px;" align="center" border="0"><tbody><tr><td style="width:138px;"></td></tr></tbody></table></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--><div style="max-width:640px;margin:0 auto;box-shadow:0px 1px 5px rgba(0,0,0,0.1);border-radius:4px;overflow:hidden"><div style="margin:0px auto;max-width:640px;background:#ffffff;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:#ffffff;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:40px 50px;"><!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--><div aria-labelledby="mj-column-per-100" class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%;"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#737F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:16px;line-height:24px;text-align:left;">
    <p>
    
    
      Kexa have done a scan on your server, please check the code below to know more about the render.
    
    
    </p>
    
              </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:10px 25px;padding-top:20px;" align="center"><table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#f2f3f4;background-color:#f2f3f4;width:100%">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center" colspan="4">
                      <div style="font-family:Poppins,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;font-size:24px;font-weight:bold;line-height:36px;text-align:center;color:#4f5660"> ` + (alert.name ?? 'Uname global alert') + ` </div>
                    </td>
                  </tr>
                </tbody>
                </table>
        
        </td>
      </tr>
      <tr>
        <td>
          <table>
            <tbody>
            ` +
            compteError.map((compte, index) => {
                return `
                  <tr>
                    <td style="direction:ltr;padding:20px 0;text-align:center"  colspan="1">
                      ` + levelAlert[index] + ` :
                    </td>
                    <td style="direction:ltr;padding:20px 0;text-align:center"  colspan="3">
                      ` + compte + `
                    </td>
                  </tr>
                `;
            }).join('')
            + `
            </tbody>
          </table>
        </td>
      </tr>
      ` +
            allScanRenderTable
            + `
      <tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#747F8D;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:16px;text-align:left;">
    <p style="direction:ltr;;padding:20px 0;text-align:center">Thank you, for using Kexa</p>
    
    </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]-->
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0" width="640" align="center" style="width:640px;">
            <tr>
              <td style="line-height:0px;font-size:0px;mso-line-height-rule:e=
    xactly;">
          <![endif]--></div><div style="margin:0px auto;max-width:640px;background:transparent;"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0px;width:100%;background:transparent;" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0px;padding:20px 0px;"><!--[if mso | IE]=
    >
          <table role="presentation" border="0" cellpadding="0" cellspaci=
    ng="0"><tr><td style="vertical-align:top;width:640px;">
          <![endif]--></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="center"><div style="cursor:auto;color:#99AAB5;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:12px;line-height:24px;text-align:center;">
          4urcloud - 2023
        </div></td></tr><tr><td style="word-break:break-word;font-size:0px;padding:0px;" align="left"><div style="cursor:auto;color:#000000;font-family:Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif;font-size:13px;line-height:22px;text-align:left;">
        </div></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]>
          </td></tr></table>
          <![endif]--></div>
    </html>`;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VtYWlscy9lbWFpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztBQUUvQyxRQUFBLE1BQU0sR0FBRztJQUNsQixRQUFRLEVBQUcsQ0FBQyxRQUFlLEVBQUUsSUFBVyxFQUFFLGNBQXFCLEVBQUUsUUFBZSxTQUFTLEVBQUUsRUFBRTtRQUFFLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpR2pHLEdBQUUsUUFBUSxHQUFFOzs7Ozs7Ozs7Ozs7Ozs7O3dMQWdCbUssR0FBRSxLQUFLLEdBQUUsS0FBSyxHQUFFLGNBQWMsR0FBRTs7Ozs7Ozs7Ozs7Ozs7dUJBY2pNLEdBQUUsSUFBSSxDQUFDLElBQUksR0FBRTs7O3VCQUdiLEdBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQWlDdEQsQ0FBQTtJQUNWLENBQUM7SUFDRCxXQUFXLEVBQUcsQ0FBQyxRQUFlLEVBQUUsV0FBcUIsRUFBRSxrQkFBMEIsRUFBRSxLQUF3QixFQUFFLEVBQUU7UUFBRSxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBaUdqSCxHQUFFLFFBQVEsR0FBRTs7Ozs7Ozs7Ozs7Ozs7OztrTUFnQjZLLEdBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFFLG9CQUFvQixDQUFDLEdBQUU7Ozs7Ozs7Ozs7OzthQVkzTjtZQUNDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2hDLE9BQU87Ozt1QkFHQSxHQUFFLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRTs7O3VCQUdyQixHQUFHLE1BQU0sR0FBRzs7O2lCQUdsQixDQUFBO1lBQUEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztjQUNiOzs7OztPQUtSO1lBQ0Msa0JBQWtCO2NBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUEyQkssQ0FBQTtJQUNWLENBQUM7SUFDRCxLQUFLLEVBQUcsQ0FBQyxXQUFxQixFQUFFLGtCQUEwQixFQUFFLEtBQXdCLEVBQUUsRUFBRTtRQUFFLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a01BMEcrRixHQUFFLENBQUMsS0FBSyxDQUFDLElBQUksSUFBRSxvQkFBb0IsQ0FBQyxHQUFFOzs7Ozs7Ozs7Ozs7YUFZM047WUFDQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNoQyxPQUFPOzs7dUJBR0EsR0FBRSxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUU7Ozt1QkFHckIsR0FBRyxNQUFNLEdBQUc7OztpQkFHbEIsQ0FBQTtZQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Y0FDYjs7Ozs7T0FLUjtZQUNDLGtCQUFrQjtjQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lBMkJLLENBQUE7SUFDVixDQUFDO0NBQ0YsQ0FBQSJ9