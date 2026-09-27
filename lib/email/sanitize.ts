export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function textToHtml(value: string) {
  const normalized = value.replace(/\r\n?/g, "\n").trim();

  if (!normalized) return "";

  return normalized
    .split(/\n{2,}/)
    .map((paragraph) => {
      const lines = paragraph
        .split("\n")
        .map((line) => escapeHtml(line));

      return `<p>${lines.join("<br />")}</p>`;
    })
    .join("\n");
}

export function sanitizeEmailHtml(value: string) {
  return value
    // Remove HTML comments
    .replace(/<!--[\s\S]*?-->/g, "")

    // Remove dangerous/unsupported elements
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[^>]*>/gi, "")

    // Remove inline JavaScript event handlers
    .replace(
      /\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi,
      ""
    )

    // Remove javascript: URLs with quotes
    .replace(
      /\s(href|src)\s*=\s*("|')\s*javascript:[\s\S]*?\2/gi,
      ""
    )

    // Remove unquoted javascript: URLs
    .replace(
      /\s(href|src)\s*=\s*javascript:[^\s>]+/gi,
      ""
    )

    // Remove metadata and external stylesheet elements
    .replace(/<meta[^>]*>/gi, "")
    .replace(/<link[^>]*>/gi, "")

    // Remove forms
    .replace(/<form[\s\S]*?<\/form>/gi, "");
}