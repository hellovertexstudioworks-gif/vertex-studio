import { sanitizeEmailHtml, textToHtml } from "./sanitize";

function attrsWithoutStyle(attrs: string) {
  return attrs
    .replace(/\sstyle\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/\sclass\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .trim();
}

function normalizeEditorBlocks(source: string) {
  return source
    .replace(/\r\n?/g, "\n")
    .replace(/<div\s*\/?>/gi, "<p>")
    .replace(/<\/div>/gi, "</p>")
    .replace(/<p\b([^>]*)>/gi, (_match, attrs) => {
      const clean = attrsWithoutStyle(String(attrs || ""));
      return `<p${clean ? ` ${clean}` : ""}>`;
    })
    .replace(
      /<p>\s*(?:<br\s*\/?>|&nbsp;|\s)*<\/p>/gi,
      '<p data-empty="true">&nbsp;</p>'
    );
}

function styleParagraphs(html: string) {
  return html.replace(/<p\b([^>]*)>/gi, (_match, attrs) => {
    const raw = String(attrs || "");
    const clean = attrsWithoutStyle(raw);
    const empty = /data-empty\s*=\s*["']true["']/i.test(raw);

    if (empty) {
      return `<p style="margin:0 0 8px 0;padding:0;line-height:1.45;">&nbsp;</p>`;
    }

    return `<p${
      clean ? ` ${clean}` : ""
    } style="margin:0 0 12px 0;padding:0;line-height:1.45;">`;
  });
}

function styleLinks(html: string) {
  return html.replace(/<a\b([^>]*)>/gi, (_match, attrs) => {
    const clean = attrsWithoutStyle(String(attrs || ""));

    return `<a${
      clean ? ` ${clean}` : ""
    } style="color:#2563eb;text-decoration:underline;">`;
  });
}

function styleLists(html: string) {
  return html
    .replace(/<ul\b([^>]*)>/gi, (_match, attrs) => {
      const clean = attrsWithoutStyle(String(attrs || ""));

      return `<ul${
        clean ? ` ${clean}` : ""
      } style="margin:0 0 12px 24px;padding:0;line-height:1.45;">`;
    })
    .replace(/<ol\b([^>]*)>/gi, (_match, attrs) => {
      const clean = attrsWithoutStyle(String(attrs || ""));

      return `<ol${
        clean ? ` ${clean}` : ""
      } style="margin:0 0 12px 24px;padding:0;line-height:1.45;">`;
    })
    .replace(/<li\b([^>]*)>/gi, (_match, attrs) => {
      const clean = attrsWithoutStyle(String(attrs || ""));

      return `<li${
        clean ? ` ${clean}` : ""
      } style="margin:0 0 3px 0;">`;
    });
}

function styleBlockquotes(html: string) {
  return html.replace(/<blockquote\b([^>]*)>/gi, (_match, attrs) => {
    const clean = attrsWithoutStyle(String(attrs || ""));

    return `<blockquote${
      clean ? ` ${clean}` : ""
    } style="margin:0 0 12px 0;padding:4px 0 4px 12px;border-left:3px solid #d1d5db;color:#4b5563;line-height:1.45;">`;
  });
}

/**
 * Extract the complete Vertex Studio signature before
 * normalizing normal editor <div> blocks.
 */
function extractSignature(html: string) {
  const startMatch = html.match(
    /<div\b[^>]*data-vertex-signature(?:\s*=\s*["'][^"']*["'])?[^>]*>/i
  );

  if (!startMatch || startMatch.index === undefined) {
    return {
      body: html,
      signature: "",
    };
  }

  const start = startMatch.index;

  const end = html.lastIndexOf("</div>");

  if (end <= start) {
    return {
      body: html,
      signature: "",
    };
  }

  const wrapper = html.slice(start, end + "</div>".length);

  let inner = wrapper
    .replace(/^<div\b[^>]*>/i, "")
    .replace(/<\/div>$/i, "")
    .trim();

  /*
   * Convert signature blocks into individual lines.
   */
  inner = inner
    .replace(/<div\b[^>]*>/gi, "")
    .replace(/<\/div>/gi, "\n")
    .replace(/<p\b[^>]*>/gi, "")
    .replace(/<\/p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n");

  const lines = inner
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return {
      body: html.slice(0, start),
      signature: "",
    };
  }

  /*
   * Compact signature lines.
   *
   * No fixed height.
   * No paragraph margins.
   */
  const renderedLines = lines
    .map(
      (line) =>
        `<div style="margin:0;padding:0;line-height:18px;">${line}</div>`
    )
    .join("");

  /*
   * Signature stays inside the same 75% content area.
   */
  const signature = `
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="100%"
      style="
        width:100%;
        border-collapse:collapse;
        margin:0;
        padding:0;
      "
    >
      <tr>
        <td
          style="
            padding:0;
            margin:0;
            border:0;
            font-family:Arial,Helvetica,sans-serif;
            font-size:14px;
            line-height:18px;
            color:#202124;
            text-align:left;
          "
        >
          ${renderedLines}
        </td>
      </tr>
    </table>`;

  return {
    body: html.slice(0, start),
    signature,
  };
}

export function buildEmailBodyHtml(
  htmlContent: string | null | undefined,
  fallbackText: string
) {
  /*
   * Use rich HTML content when available.
   * Otherwise convert plain text into HTML.
   */
  const original = htmlContent?.trim() || textToHtml(fallbackText);

  /*
   * Extract signature BEFORE sanitizing and normalizing.
   */
  const extracted = extractSignature(original);

  /*
   * Sanitize body and signature separately.
   */
  const sanitizedBody = sanitizeEmailHtml(extracted.body);

  const sanitizedSignature = extracted.signature
    ? sanitizeEmailHtml(extracted.signature)
    : "";

  /*
   * Normalize editor blocks.
   */
  let body = normalizeEditorBlocks(sanitizedBody);

  /*
   * Apply email-friendly formatting.
   */
  body = styleParagraphs(body);
  body = styleLists(body);
  body = styleBlockquotes(body);
  body = styleLinks(body);

  /*
   * IMPORTANT:
   *
   * The email content is intentionally limited to approximately
   * 75% of the available message width.
   *
   * This leaves roughly 25% empty space on the right while keeping
   * everything aligned to the left.
   */
  const content = `
    <table
      role="presentation"
      cellpadding="0"
      cellspacing="0"
      border="0"
      width="75%"
      style="
        width:75%;
        max-width:900px;
        min-width:0;
        border-collapse:collapse;
        margin:0;
        padding:0;
      "
    >
      <tr>
        <td
          style="
            padding:0;
            margin:0;
            border:0;
            text-align:left;
            vertical-align:top;
            font-family:Arial,Helvetica,sans-serif;
            font-size:14px;
            line-height:1.45;
            color:#202124;
          "
        >
          ${body}
          ${sanitizedSignature}
        </td>
      </tr>
    </table>`;

  return content.trim();
}