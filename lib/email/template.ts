import { buildEmailBodyHtml } from "./html";

export function buildVertexEmailHtml({
  htmlContent,
  textContent,
}: {
  htmlContent?: string | null;
  textContent: string;
}) {
  const body = buildEmailBodyHtml(htmlContent, textContent);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Vertex Studio Works</title>

    <style>
      @media only screen and (max-width: 680px) {
        .vertex-email-shell {
          padding: 20px 14px 28px 14px !important;
        }

        .vertex-email-content {
          width: 100% !important;
          max-width: 100% !important;
        }
      }
    </style>
  </head>

  <body
    style="
      margin:0;
      padding:0;
      background:#ffffff;
      width:100%;
      -webkit-text-size-adjust:100%;
      -ms-text-size-adjust:100%;
    "
  >
    <table
      role="presentation"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="
        width:100%;
        border-collapse:collapse;
        background:#ffffff;
        margin:0;
        padding:0;
      "
    >
      <tr>
        <td
          class="vertex-email-shell"
          align="left"
          valign="top"
          style="
            padding:28px 18px 36px 18px;
            text-align:left;
          "
        >
          <table
            role="presentation"
            width="82%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            class="vertex-email-content"
            style="
              width:82%;
              max-width:1100px;
              border-collapse:collapse;
              margin:0;
              padding:0;
            "
          >
            <tr>
              <td
                align="left"
                valign="top"
                style="
                  padding:0;
                  margin:0;
                  font-family:Arial,Helvetica,sans-serif;
                  font-size:14px;
                  line-height:1.45;
                  color:#202124;
                  text-align:left;
                  word-break:normal;
                  overflow-wrap:break-word;
                  mso-line-height-rule:exactly;
                "
              >
                ${body}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}