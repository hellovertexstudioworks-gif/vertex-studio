// FILE: lib/contracts/pdf.ts
// Vertex Studio Works — Premium Contract PDF Design
// Current version: polished, controlled 2-page standard contract.
// Do not modify app/globals.css.
//
// DESIGN GOALS
// - Premium Vertex Studio visual identity
// - Strong hierarchy and whitespace
// - Package / investment / client information cards
// - Professional deliverables grid
// - Clean payment schedule
// - Elegant terms + signature section
// - Exactly 2 pages for the standard contract
//
// NOTE:
// Long/custom contract pagination can be added as a separate renderer phase.
// This version intentionally keeps the standard agreement to exactly 2 pages.

import PDFDocument from "pdfkit";

type PaymentItem = {
  label?: string;
  percentage?: number | null;
  amount?: number;
  due?: string;
};

type ContractPdfData = {
  id: string;
  contractNumber: string;
  title: string;
  status: string;
  startDate?: string | null;
  endDate?: string | null;
  contractValue: number;
  scope: string;
  terms: string;
  clientSigned: boolean;
  clientSignedAt?: string | null;
  documentUrl?: string;
  notes?: string;
  creationMethod?: string;
  serviceCategory?: string;
  servicePackage?: string;
  paymentPlan?: string;
  paymentSchedule?: PaymentItem[];
  complimentaryCareMonths?: number;
  carePlan?: string;
  client?: {
    name?: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
  } | null;
  project?: {
    name?: string;
  } | null;
};

const W = 595.28;
const H = 841.89;
const M = 46;
const CW = W - M * 2;

const C = {
  navy: "#111C31",
  navy2: "#1B2942",
  blue: "#2563EB",
  blueDark: "#1D4ED8",
  blueSoft: "#EEF4FF",
  blueLine: "#CFE0FF",
  text: "#263246",
  muted: "#718096",
  faint: "#A0AABC",
  border: "#DCE3ED",
  panel: "#F7F9FC",
  white: "#FFFFFF",
  green: "#15803D",
  greenSoft: "#ECFDF3",
};

function s(value: unknown, fallback = "") {
  const valueString = String(value ?? "").trim();
  return valueString || fallback;
}

function money(value: unknown) {
  return `$${Number(value ?? 0).toFixed(2)}`;
}

function dateText(value?: string | null) {
  return value ? String(value).slice(0, 10) : "—";
}

function shorten(value: unknown, fallback = "—", max = 70) {
  const v = s(value, fallback);
  return v.length > max ? `${v.slice(0, max - 1)}…` : v;
}

function drawText(
  doc: PDFKit.PDFDocument,
  value: string,
  x: number,
  y: number,
  options: {
    size?: number;
    font?: string;
    color?: string;
    width?: number;
    align?: "left" | "center" | "right";
  } = {}
) {
  doc
    .font(options.font || "Helvetica")
    .fontSize(options.size || 8)
    .fillColor(options.color || C.text)
    .text(value, x, y, {
      width: options.width || CW,
      align: options.align || "left",
      lineBreak: false,
      continued: false,
    });
}

function rule(
  doc: PDFKit.PDFDocument,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  color = C.border,
  width = 0.7
) {
  doc.strokeColor(color).lineWidth(width).moveTo(x1, y1).lineTo(x2, y2).stroke();
}

function panel(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
  fill = C.panel,
  stroke = C.border,
  radius = 7
) {
  doc.fillColor(fill).roundedRect(x, y, width, height, radius).fill();

  if (stroke) {
    doc
      .strokeColor(stroke)
      .lineWidth(0.7)
      .roundedRect(x, y, width, height, radius)
      .stroke();
  }
}

function pill(
  doc: PDFKit.PDFDocument,
  value: string,
  x: number,
  y: number,
  width: number,
  fill = C.blueSoft,
  color = C.blue
) {
  doc.fillColor(fill).roundedRect(x, y, width, 20, 10).fill();

  drawText(doc, value, x, y + 6, {
    size: 6.6,
    font: "Helvetica-Bold",
    color,
    width,
    align: "center",
  });
}

function label(
  doc: PDFKit.PDFDocument,
  value: string,
  x: number,
  y: number,
  width = 150
) {
  drawText(doc, value.toUpperCase(), x, y, {
    size: 6.1,
    font: "Helvetica-Bold",
    color: C.muted,
    width,
  });
}

function section(
  doc: PDFKit.PDFDocument,
  number: string,
  title: string,
  y: number,
  description?: string
) {
  doc.fillColor(C.blue).circle(M + 7, y + 5, 7).fill();

  drawText(doc, number, M, y + 1, {
    size: 5.8,
    font: "Helvetica-Bold",
    color: C.white,
    width: 14,
    align: "center",
  });

  drawText(doc, title, M + 20, y, {
    size: 10,
    font: "Helvetica-Bold",
    color: C.navy,
    width: 300,
  });

  if (description) {
    drawText(doc, description, M + 20, y + 16, {
      size: 6.7,
      color: C.muted,
      width: CW - 20,
    });
  }
}

function header(doc: PDFKit.PDFDocument, page: number) {
  // Top blue brand bar
  doc.fillColor(C.blue).rect(0, 0, W, 5).fill();

  // Vertex mark
  doc.fillColor(C.blue).roundedRect(M, 35, 34, 34, 8).fill();

  drawText(doc, "V", M, 41, {
    size: 18,
    font: "Helvetica-Bold",
    color: C.white,
    width: 34,
    align: "center",
  });

  drawText(doc, "VERTEX STUDIO", M + 47, 35, {
    size: 13.5,
    font: "Helvetica-Bold",
    color: C.navy,
    width: 220,
  });

  drawText(doc, "WEBSITES  /  SYSTEMS  /  DIGITAL GROWTH", M + 47, 53, {
    size: 6.2,
    color: C.muted,
    width: 270,
  });

  drawText(doc, `PAGE ${page} / 2`, W - M - 90, 48, {
    size: 6.5,
    color: C.muted,
    width: 90,
    align: "right",
  });

  rule(doc, M, 84, W - M, 84);
}

function footer(doc: PDFKit.PDFDocument) {
  rule(doc, M, H - 43, W - M, H - 43);

  drawText(doc, "Vertex Studio Works", M, H - 32, {
    size: 6.5,
    color: C.muted,
    width: 180,
  });

  drawText(doc, "Confidential • Client Agreement", W - M - 180, H - 32, {
    size: 6.5,
    color: C.muted,
    width: 180,
    align: "right",
  });
}

function packageItems(contract: ContractPdfData) {
  const pkg = s(contract.servicePackage).toLowerCase();

  if (pkg.includes("launch")) {
    return [
      "Up to 5 custom pages",
      "Premium custom design",
      "Mobile responsive",
      "Basic SEO setup",
      "Google Analytics setup",
      "Contact form integration",
      "Basic lead capture",
      "Conversion-focused layout",
      "Performance optimization",
      "Pre-launch website backup",
    ];
  }

  if (pkg.includes("scale")) {
    return [
      "Everything in Launch",
      "Unlimited standard pages",
      "CMS / blog integration",
      "Advanced SEO setup",
      "Premium animations",
      "Speed optimization",
      "Lead generation dashboard",
      "Lead capture & tracking",
      "Google Analytics + Search Console",
      "Basic CRM / lead tracking",
      "Chatbot integration",
      "E-commerce solutions",
      "Cold email campaign setup",
      "Lead funnel strategy",
    ];
  }

  if (pkg.includes("enterprise")) {
    return [
      "Unlimited pages",
      "Custom functionality",
      "Advanced e-commerce",
      "Booking systems",
      "API / CRM integrations",
      "Lead generation systems",
      "Advanced analytics",
      "Marketing automation",
      "Custom outreach systems",
      "Custom AI assistant",
      "Advanced business systems",
      "Custom care options",
    ];
  }

  const raw = s(contract.scope);

  if (raw) {
    const parsed = raw
      .replace(/\r/g, "")
      .split("\n")
      .map((item) => item.replace(/^[-•*]\s*/, "").trim())
      .filter(Boolean);

    if (parsed.length) return parsed.slice(0, 14);
  }

  return [
    "Agreed website or digital service deliverables",
    "Project implementation and configuration",
    "Review and approval process",
    "Final delivery according to agreed scope",
  ];
}

function terms(contract: ContractPdfData) {
  const pkg = s(contract.servicePackage, "selected");

  return [
    `Services — Vertex Studio Works will provide the ${pkg} services and deliverables described in this Agreement.`,
    "Scope changes — Requests outside the agreed scope may require a separate quotation, fee, or timeline adjustment.",
    "Client responsibilities — The client will provide required content, approvals, access, credentials, and information needed to complete the work.",
    "Payments — Project fees are due according to the payment schedule. Work may be paused while required payments remain outstanding.",
    "Reviews and revisions — Reasonable revisions are handled within the agreed scope. Material changes or new requirements may be quoted separately.",
    "Delivery — Final project files, access, or launch will be provided according to the agreed scope and applicable payment requirements.",
    "Vertex Care — Complimentary care covers only the services included in the selected Vertex Care offering and begins according to the project terms.",
    "Confidentiality — Each party will use reasonable care to protect confidential information received from the other party.",
    "Ownership — Rights in final deliverables are transferred or licensed as agreed, subject to payment of the applicable project fees.",
    "Termination — Either party may request termination. Approved work, completed services, outstanding fees, and other applicable obligations remain due.",
  ];
}

function paymentRows(contract: ContractPdfData) {
  const rows = Array.isArray(contract.paymentSchedule)
    ? contract.paymentSchedule.slice(0, 4)
    : [];

  return rows.length
    ? rows
    : [{ label: "Payment schedule as agreed", percentage: null, amount: contract.contractValue }];
}

export function createContractPdf(contract: ContractPdfData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const chunks: Buffer[] = [];

      // EXACTLY TWO PHYSICAL PAGES.
      const doc = new PDFDocument({
        size: "A4",
        autoFirstPage: false,
        margin: 0,
        bufferPages: false,
      });

      doc.on("data", (chunk: Buffer) => chunks.push(chunk));
      doc.on("error", reject);
      doc.on("end", () => resolve(Buffer.concat(chunks)));

      // ==========================================================
      // PAGE 1
      // ==========================================================

      doc.addPage({ size: "A4", margin: 0 });
      header(doc, 1);

      drawText(doc, "SERVICE", M, 108, {
        size: 24,
        font: "Helvetica",
        color: C.muted,
        width: 170,
      });

      drawText(doc, "AGREEMENT", M, 132, {
        size: 24,
        font: "Helvetica-Bold",
        color: C.navy,
        width: 260,
      });

      drawText(
        doc,
        shorten(contract.title, "Professional Services Agreement", 75),
        M,
        164,
        {
          size: 8.5,
          color: C.muted,
          width: 390,
        }
      );

      // Status / agreement number
      pill(
        doc,
        shorten(contract.status, "DRAFT", 16).toUpperCase(),
        W - M - 82,
        112,
        82,
        C.greenSoft,
        C.green
      );

      drawText(doc, "AGREEMENT", W - M - 160, 143, {
        size: 5.8,
        font: "Helvetica-Bold",
        color: C.muted,
        width: 160,
        align: "right",
      });

      drawText(doc, shorten(contract.contractNumber), W - M - 160, 155, {
        size: 8,
        font: "Helvetica-Bold",
        color: C.navy,
        width: 160,
        align: "right",
      });

      // Main summary card
      panel(doc, M, 199, CW, 88, C.navy, C.navy);

      label(doc, "Selected Package", M + 16, 216, 120);
      drawText(
        doc,
        shorten(contract.servicePackage || contract.serviceCategory, "Custom Service", 30),
        M + 16,
        232,
        {
          size: 11,
          font: "Helvetica-Bold",
          color: C.white,
          width: 155,
        }
      );

      label(doc, "Project Value", M + 205, 216, 100);
      drawText(doc, money(contract.contractValue), M + 205, 232, {
        size: 13,
        font: "Helvetica-Bold",
        color: C.white,
        width: 125,
      });

      label(doc, "Payment Plan", M + 345, 216, 100);
      drawText(doc, shorten(contract.paymentPlan, "Custom", 24), M + 345, 232, {
        size: 8.5,
        font: "Helvetica-Bold",
        color: C.white,
        width: 145,
      });

      drawText(doc, "Effective", M + 16, 259, {
        size: 6.1,
        font: "Helvetica-Bold",
        color: "#AFC0DA",
        width: 55,
      });

      drawText(doc, dateText(contract.startDate), M + 68, 259, {
        size: 7,
        color: C.white,
        width: 90,
      });

      drawText(doc, "End", M + 205, 259, {
        size: 6.1,
        font: "Helvetica-Bold",
        color: "#AFC0DA",
        width: 35,
      });

      drawText(doc, dateText(contract.endDate), M + 240, 259, {
        size: 7,
        color: C.white,
        width: 90,
      });

      drawText(doc, "Contract No.", M + 345, 259, {
        size: 6.1,
        font: "Helvetica-Bold",
        color: "#AFC0DA",
        width: 65,
      });

      drawText(doc, shorten(contract.contractNumber), M + 410, 259, {
        size: 7,
        color: C.white,
        width: 120,
      });

      // Parties
      section(doc, "01", "PARTIES", 311, "The parties entering into this service agreement.");

      panel(doc, M, 344, 245, 78, C.panel);
      panel(doc, M + 257, 344, 245, 78, C.panel);

      label(doc, "Service Provider", M + 15, 358);
      drawText(doc, "Vertex Studio Works", M + 15, 375, {
        size: 9.2,
        font: "Helvetica-Bold",
        color: C.navy,
        width: 210,
      });
      drawText(doc, "Digital services provider", M + 15, 393, {
        size: 6.7,
        color: C.muted,
        width: 210,
      });

      label(doc, "Client", M + 272, 358);
      drawText(
        doc,
        shorten(contract.client?.company || contract.client?.name, "Client", 34),
        M + 272,
        375,
        {
          size: 9.2,
          font: "Helvetica-Bold",
          color: C.navy,
          width: 210,
        }
      );
      drawText(doc, shorten(contract.client?.email, "", 44), M + 272, 393, {
        size: 6.7,
        color: C.muted,
        width: 210,
      });

      // Scope
      section(doc, "02", "DELIVERABLES", 448, "Included in the selected package or agreed scope.");

      panel(doc, M, 481, CW, 169, C.white);

      const items = packageItems(contract);
      const midpoint = Math.ceil(items.length / 2);
      const left = items.slice(0, midpoint);
      const right = items.slice(midpoint);

      function drawItems(itemsList: string[], x: number, width: number) {
        itemsList.slice(0, 8).forEach((item, index) => {
          const yy = 500 + index * 19;

          doc.fillColor(C.blue).circle(x + 2, yy + 4, 2).fill();

          drawText(doc, shorten(item, "", 56), x + 11, yy, {
            size: 6.9,
            color: C.text,
            width: width - 11,
          });
        });
      }

      drawItems(left, M + 16, 235);
      drawItems(right, M + 268, 220);

      // Care strip
      panel(doc, M, 664, CW, 37, C.blueSoft, C.blueLine);

      label(doc, "Vertex Care", M + 14, 675, 75);

      drawText(
        doc,
        contract.complimentaryCareMonths
          ? `${contract.complimentaryCareMonths} months complimentary care included`
          : shorten(contract.carePlan, "Care terms as selected in this Agreement.", 78),
        M + 90,
        675,
        {
          size: 7,
          font: "Helvetica-Bold",
          color: C.blueDark,
          width: 390,
        }
      );

      footer(doc);

      // ==========================================================
      // PAGE 2
      // ==========================================================

      doc.addPage({ size: "A4", margin: 0 });
      header(doc, 2);

      drawText(doc, "TERMS", M, 108, {
        size: 24,
        font: "Helvetica",
        color: C.muted,
        width: 130,
      });

      drawText(doc, "AND CONDITIONS", M, 132, {
        size: 24,
        font: "Helvetica-Bold",
        color: C.navy,
        width: 300,
      });

      drawText(
        doc,
        "These terms apply to the services, deliverables, payments, and responsibilities described in this Agreement.",
        M,
        165,
        {
          size: 7.5,
          color: C.muted,
          width: CW,
        }
      );

      // Terms card
      panel(doc, M, 193, CW, 365, C.white);

      const termItems = terms(contract);

      termItems.forEach((term, index) => {
        const yy = 212 + index * 34;

        doc.fillColor(C.blue).roundedRect(M + 14, yy - 1, 22, 22, 6).fill();

        drawText(doc, String(index + 1).padStart(2, "0"), M + 14, yy + 5, {
          size: 5.8,
          font: "Helvetica-Bold",
          color: C.white,
          width: 22,
          align: "center",
        });

        drawText(doc, term, M + 49, yy + 1, {
          size: 6.85,
          color: C.text,
          width: CW - 65,
        });

        if (index < termItems.length - 1) {
          rule(
            doc,
            M + 49,
            yy + 25,
            W - M - 16,
            yy + 25,
            "#E8EDF4"
          );
        }
      });

      // Investment / payment summary
      section(doc, "03", "INVESTMENT & PAYMENT SCHEDULE", 586);

      panel(doc, M, 613, CW, 82, C.panel);

      label(doc, "Total Project Value", M + 15, 627, 130);
      drawText(doc, money(contract.contractValue), M + 15, 645, {
        size: 12,
        font: "Helvetica-Bold",
        color: C.blue,
        width: 130,
      });

      label(doc, "Payment Plan", M + 175, 627, 100);
      drawText(doc, shorten(contract.paymentPlan, "Custom", 24), M + 175, 645, {
        size: 8,
        font: "Helvetica-Bold",
        color: C.navy,
        width: 120,
      });

      label(doc, "Schedule", M + 320, 627, 80);
      drawText(
        doc,
        paymentRows(contract)
          .map((row) =>
            row.percentage == null
              ? money(row.amount)
              : `${Number(row.percentage)}% ${money(row.amount)}`
          )
          .join("  •  "),
        M + 320,
        645,
        {
          size: 6.5,
          color: C.text,
          width: 165,
        }
      );

      // Signatures
      section(doc, "04", "AUTHORIZATION", 719);

      drawText(
        doc,
        "By signing below, both parties acknowledge that they have reviewed and accepted this Agreement.",
        M + 20,
        740,
        {
          size: 6.8,
          color: C.muted,
          width: CW - 20,
        }
      );

      // Signature boxes
      panel(doc, M, 765, 245, 55, C.panel);
      panel(doc, M + 257, 765, 245, 55, C.panel);

      label(doc, "Vertex Studio Works", M + 12, 775, 150);
      rule(doc, M + 12, 805, M + 232, 805, C.border);

      label(
        doc,
        shorten(contract.client?.company || contract.client?.name, "Client", 30),
        M + 269,
        775,
        170
      );
      rule(doc, M + 269, 805, M + 489, 805, C.border);

      footer(doc);

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export function getContractPdfFilename(contract: ContractPdfData) {
  const filename = `${s(contract.contractNumber, "contract")}-${s(
    contract.title,
    "vertex-agreement"
  )}`
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return `${filename || "vertex-contract"}.pdf`;
}
