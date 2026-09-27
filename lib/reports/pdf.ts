// FILE: lib/reports/pdf.ts
// PURPOSE: Vertex Studio Works — Client PDF Report Generator
// Rebuilt with explicit page layout to prevent blank pages and broken table pagination.
// Requires: pdfkit, @types/pdfkit

import PDFDocument from "pdfkit";

import {
  ClientReport,
  ClientReportType,
  formatCurrency,
  formatDate,
  formatMonth,
  formatNumber,
  formatPercent,
  getProjectionLabel,
  getReportSubtitle,
  getReportTitle,
} from "./client-report";

type RGB = [number, number, number];

const COLORS: Record<string, RGB> = {
  ink: [24, 24, 32],
  muted: [100, 100, 112],
  lightMuted: [145, 145, 158],
  border: [225, 225, 232],
  surface: [247, 247, 250],
  accent: [99, 75, 210],
  accentSoft: [239, 235, 252],
  white: [255, 255, 255],
  success: [28, 145, 88],
  warning: [190, 125, 25],
};

const PAGE = {
  width: 595.28,
  height: 841.89,
  margin: 42,
  contentTop: 106,
  contentBottom: 770,
};

function money(value: number) {
  return formatCurrency(value, "USD");
}

function fill(doc: PDFKit.PDFDocument, color: RGB) {
  doc.fillColor(color);
}

function stroke(doc: PDFKit.PDFDocument, color: RGB) {
  doc.strokeColor(color);
}

function drawRoundedCard(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  height: number,
  fillColor: RGB = COLORS.white,
  strokeColor: RGB = COLORS.border
) {
  doc
    .save()
    .roundedRect(x, y, width, height, 8)
    .fillAndStroke(fillColor, strokeColor)
    .restore();
}

function drawHeader(doc: PDFKit.PDFDocument) {
  const width = PAGE.width - PAGE.margin * 2;

  fill(doc, COLORS.accent);
  doc.roundedRect(PAGE.margin, 34, 34, 34, 8).fill();

  fill(doc, COLORS.white);
  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .text("V", PAGE.margin + 10, 42, { width: 14, align: "center" });

  fill(doc, COLORS.ink);
  doc
    .font("Helvetica-Bold")
    .fontSize(11)
    .text("VERTEX STUDIO WORKS", PAGE.margin + 46, 36);

  fill(doc, COLORS.muted);
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .text("Business OS • Client Reporting", PAGE.margin + 46, 52);

  stroke(doc, COLORS.border);
  doc
    .moveTo(PAGE.margin, 82)
    .lineTo(PAGE.margin + width, 82)
    .stroke();
}

function drawFooter(doc: PDFKit.PDFDocument) {
  // Keep footer inside PDFKit's bottom margin so it never triggers an automatic blank page.
  const y = PAGE.height - 55;

  stroke(doc, COLORS.border);
  doc
    .moveTo(PAGE.margin, y - 10)
    .lineTo(PAGE.width - PAGE.margin, y - 10)
    .stroke();

  fill(doc, COLORS.lightMuted);
  doc
    .font("Helvetica")
    .fontSize(7)
    .text(
      "Vertex Studio Works • Confidential Client Report",
      PAGE.margin,
      y,
      { width: PAGE.width - PAGE.margin * 2 - 60 }
    );

  doc.text("Vertex Studio Works", PAGE.width - PAGE.margin - 120, y, {
    width: 120,
    align: "right",
  });
}

function addPage(doc: PDFKit.PDFDocument) {
  doc.addPage({
    size: "A4",
    margin: PAGE.margin,
  });
  drawHeader(doc);
  drawFooter(doc);
}

function startContentPage(doc: PDFKit.PDFDocument) {
  addPage(doc);
  return PAGE.contentTop;
}

function drawSectionTitle(
  doc: PDFKit.PDFDocument,
  title: string,
  subtitle?: string,
  y = PAGE.contentTop
) {
  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(16).text(title, PAGE.margin, y);

  if (subtitle) {
    fill(doc, COLORS.muted);
    doc
      .font("Helvetica")
      .fontSize(8.5)
      .text(subtitle, PAGE.margin, y + 22, {
        width: PAGE.width - PAGE.margin * 2,
      });
    return y + 48;
  }

  return y + 30;
}

function drawMetricCard(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  label: string,
  value: string,
  helper?: string
) {
  const height = helper ? 78 : 68;

  drawRoundedCard(doc, x, y, width, height);

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(8).text(label, x + 12, y + 12, {
    width: width - 24,
  });

  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(16).text(value, x + 12, y + 30, {
    width: width - 24,
  });

  if (helper) {
    fill(doc, COLORS.lightMuted);
    doc.font("Helvetica").fontSize(7).text(helper, x + 12, y + 54, {
      width: width - 24,
    });
  }
}

function drawKeyValueRows(
  doc: PDFKit.PDFDocument,
  rows: Array<[string, string]>,
  x: number,
  y: number,
  width: number
) {
  let cursor = y;

  for (const [label, value] of rows) {
    fill(doc, COLORS.muted);
    doc.font("Helvetica").fontSize(8.5).text(label, x, cursor, {
      width: width * 0.42,
    });

    fill(doc, COLORS.ink);
    doc
      .font("Helvetica-Bold")
      .fontSize(8.5)
      .text(value, x + width * 0.42, cursor, {
        width: width * 0.58,
        align: "right",
      });

    stroke(doc, COLORS.border);
    doc
      .moveTo(x, cursor + 17)
      .lineTo(x + width, cursor + 17)
      .stroke();

    cursor += 24;
  }

  return cursor;
}

function drawProgressBar(
  doc: PDFKit.PDFDocument,
  x: number,
  y: number,
  width: number,
  percent: number
) {
  const safe = Math.max(0, Math.min(100, percent));

  doc.roundedRect(x, y, width, 7, 3.5).fill(COLORS.border);

  if (safe > 0) {
    doc
      .roundedRect(x, y, width * (safe / 100), 7, 3.5)
      .fill(COLORS.accent);
  }
}

function drawBarChart(
  doc: PDFKit.PDFDocument,
  values: Array<{ label: string; value: number }>,
  x: number,
  y: number,
  width: number,
  height: number,
  color: RGB = COLORS.accent,
  emptyMessage = "No data available for this period."
) {
  if (!values.length || values.every((item) => item.value === 0)) {
    drawRoundedCard(doc, x, y, width, height, COLORS.surface, COLORS.border);
    fill(doc, COLORS.muted);
    doc
      .font("Helvetica")
      .fontSize(8)
      .text(emptyMessage, x + 15, y + height / 2 - 5, {
        width: width - 30,
        align: "center",
      });
    return;
  }

  drawRoundedCard(doc, x, y, width, height, COLORS.white);

  const chartX = x + 16;
  const chartY = y + 18;
  const chartWidth = width - 32;
  const chartHeight = height - 48;
  const max = Math.max(...values.map((item) => item.value), 1);
  const gap = Math.max(3, Math.min(8, chartWidth / Math.max(values.length * 5, 1)));
  const barWidth = Math.max(
    4,
    Math.min(20, (chartWidth - gap * Math.max(values.length - 1, 0)) / values.length)
  );

  stroke(doc, COLORS.border);
  doc
    .moveTo(chartX, chartY + chartHeight)
    .lineTo(chartX + chartWidth, chartY + chartHeight)
    .stroke();

  values.forEach((item, index) => {
    const barHeight = Math.max(2, (item.value / max) * (chartHeight - 10));
    const barX = chartX + index * (barWidth + gap);
    const barY = chartY + chartHeight - barHeight;

    doc
      .roundedRect(barX, barY, barWidth, barHeight, 2)
      .fill(color);

    fill(doc, COLORS.lightMuted);
    doc
      .font("Helvetica")
      .fontSize(values.length > 12 ? 4.8 : 5.5)
      .text(item.label, barX - 5, chartY + chartHeight + 7, {
        width: barWidth + 10,
        align: "center",
        ellipsis: true,
      });
  });
}

function drawHorizontalBars(
  doc: PDFKit.PDFDocument,
  values: Array<{ label: string; value: number }>,
  x: number,
  y: number,
  width: number,
  rowHeight = 34,
  color: RGB = COLORS.accent
) {
  if (!values.length) {
    fill(doc, COLORS.muted);
    doc.font("Helvetica").fontSize(8).text("No data available.", x, y);
    return y + 25;
  }

  const max = Math.max(...values.map((item) => item.value), 1);
  let cursor = y;

  for (const item of values) {
    fill(doc, COLORS.muted);
    doc.font("Helvetica").fontSize(7).text(item.label, x, cursor, {
      width: 105,
      ellipsis: true,
    });

    const barX = x + 112;
    const barWidth = width - 165;

    doc.roundedRect(barX, cursor + 2, barWidth, 9, 4.5).fill(COLORS.border);

    if (item.value > 0) {
      doc
        .roundedRect(
          barX,
          cursor + 2,
          Math.max(4, barWidth * (item.value / max)),
          9,
          4.5
        )
        .fill(color);
    }

    fill(doc, COLORS.ink);
    doc
      .font("Helvetica-Bold")
      .fontSize(7)
      .text(formatNumber(item.value), x + width - 48, cursor, {
        width: 48,
        align: "right",
      });

    cursor += rowHeight;
  }

  return cursor;
}

type TableColumn = {
  label: string;
  width: number;
  align?: "left" | "right" | "center";
};

function drawTable(
  doc: PDFKit.PDFDocument,
  columns: TableColumn[],
  rows: string[][],
  x: number,
  y: number,
  rowHeight = 24
) {
  const totalWidth = columns.reduce((sum, column) => sum + column.width, 0);
  let cursor = y;

  const drawTableHeader = () => {
    doc.rect(x, cursor, totalWidth, rowHeight).fill(COLORS.accent);

    let columnX = x;
    for (const column of columns) {
      fill(doc, COLORS.white);
      doc
        .font("Helvetica-Bold")
        .fontSize(7)
        .text(column.label, columnX + 7, cursor + 8, {
          width: column.width - 14,
          align: column.align ?? "left",
          ellipsis: true,
        });
      columnX += column.width;
    }

    cursor += rowHeight;
  };

  const ensurePage = () => {
    if (cursor + rowHeight <= PAGE.contentBottom) return;

    addPage(doc);
    cursor = PAGE.contentTop;
    drawTableHeader();
  };

  drawTableHeader();

  rows.forEach((row, rowIndex) => {
    ensurePage();

    if (rowIndex % 2 === 0) {
      doc.rect(x, cursor, totalWidth, rowHeight).fill(COLORS.surface);
    }

    let columnX = x;
    row.forEach((cell, cellIndex) => {
      const column = columns[cellIndex];
      if (!column) return;

      fill(doc, COLORS.ink);
      doc
        .font("Helvetica")
        .fontSize(7)
        .text(cell || "—", columnX + 7, cursor + 8, {
          width: column.width - 14,
          align: column.align ?? "left",
          ellipsis: true,
        });

      columnX += column.width;
    });

    stroke(doc, COLORS.border);
    doc
      .moveTo(x, cursor + rowHeight)
      .lineTo(x + totalWidth, cursor + rowHeight)
      .stroke();

    cursor += rowHeight;
  });

  return cursor;
}

function drawCover(doc: PDFKit.PDFDocument, report: ClientReport) {
  const clientName = report.client.company || report.client.name;

  fill(doc, COLORS.accent);
  doc.roundedRect(PAGE.margin, 48, 54, 54, 12).fill();

  fill(doc, COLORS.white);
  doc.font("Helvetica-Bold").fontSize(25).text("V", PAGE.margin + 16, 61);

  fill(doc, COLORS.ink);
  doc
    .font("Helvetica-Bold")
    .fontSize(26)
    .text(getReportTitle(report.reportType), PAGE.margin, 145, {
      width: PAGE.width - PAGE.margin * 2,
    });

  fill(doc, COLORS.muted);
  doc
    .font("Helvetica")
    .fontSize(11)
    .text(getReportSubtitle(report.reportType), PAGE.margin, 180, {
      width: PAGE.width - PAGE.margin * 2,
    });

  drawRoundedCard(
    doc,
    PAGE.margin,
    235,
    PAGE.width - PAGE.margin * 2,
    132,
    COLORS.surface
  );

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(8).text("PREPARED FOR", PAGE.margin + 20, 255);

  fill(doc, COLORS.ink);
  doc
    .font("Helvetica-Bold")
    .fontSize(19)
    .text(clientName, PAGE.margin + 20, 275);

  fill(doc, COLORS.muted);
  doc
    .font("Helvetica")
    .fontSize(9)
    .text(report.client.email || "—", PAGE.margin + 20, 304);

  if (report.client.company && report.client.name) {
    doc.text(report.client.name, PAGE.margin + 20, 320);
  }

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(8).text("REPORT PERIOD", PAGE.margin + 320, 255);

  fill(doc, COLORS.ink);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(report.period.label, PAGE.margin + 320, 275, {
      width: 130,
      align: "right",
    });

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(8).text("GENERATED", PAGE.margin + 320, 310);

  fill(doc, COLORS.ink);
  doc
    .font("Helvetica-Bold")
    .fontSize(9)
    .text(formatDate(report.generatedAt), PAGE.margin + 320, 328, {
      width: 130,
      align: "right",
    });

  fill(doc, COLORS.muted);
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .text(
      "This report summarizes client-specific website performance, project activity, billing activity, and historical payment data available in Vertex Studio Works Business OS.",
      PAGE.margin,
      420,
      {
        width: PAGE.width - PAGE.margin * 2,
        lineGap: 3,
      }
    );

  fill(doc, COLORS.lightMuted);
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .text(
      "Financial figures represent amounts invoiced to and payments received by Vertex Studio Works. They do not represent the client's business revenue.",
      PAGE.margin,
      500,
      {
        width: PAGE.width - PAGE.margin * 2,
        lineGap: 3,
      }
    );

  fill(doc, COLORS.accent);
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .text("VERTEX STUDIO WORKS", PAGE.margin, PAGE.height - 100);
}

function drawExecutiveSummary(doc: PDFKit.PDFDocument, report: ClientReport) {
  let y = startContentPage(doc);

  y = drawSectionTitle(
    doc,
    "Executive Summary",
    "A high-level view of the selected client's current activity.",
    y
  );

  const gap = 10;
  const cardWidth = (PAGE.width - PAGE.margin * 2 - gap) / 2;

  drawMetricCard(
    doc,
    PAGE.margin,
    y,
    cardWidth,
    "Website Visitors",
    formatNumber(report.websiteAnalytics.visitors),
    report.period.label
  );

  drawMetricCard(
    doc,
    PAGE.margin + cardWidth + gap,
    y,
    cardWidth,
    "Page Views",
    formatNumber(report.websiteAnalytics.pageViews),
    `${formatNumber(report.websiteAnalytics.sessions)} sessions`
  );

  drawMetricCard(
    doc,
    PAGE.margin,
    y + 90,
    cardWidth,
    "Projects",
    formatNumber(report.projectSummary.total),
    `${formatPercent(report.projectSummary.averageProgress)} average progress`
  );

  drawMetricCard(
    doc,
    PAGE.margin + cardWidth + gap,
    y + 90,
    cardWidth,
    "Balance Remaining",
    money(report.billing.outstanding),
    `${formatPercent(report.billing.collectionRate)} payment progress`
  );

  const snapshotY = y + 190;
  drawRoundedCard(
    doc,
    PAGE.margin,
    snapshotY,
    PAGE.width - PAGE.margin * 2,
    155
  );

  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(12).text("Client Snapshot", PAGE.margin + 14, snapshotY + 14);

  drawKeyValueRows(
    doc,
    [
      ["Client", report.client.name || "—"],
      ["Company", report.client.company || "—"],
      ["Company Type", report.client.companyType || "—"],
      ["Status", report.client.status || "—"],
      ["Websites", String(report.websiteSummary.total)],
    ],
    PAGE.margin + 14,
    snapshotY + 40,
    PAGE.width - PAGE.margin * 2 - 28
  );

  const interpretationY = 575;
  drawRoundedCard(
    doc,
    PAGE.margin,
    interpretationY,
    PAGE.width - PAGE.margin * 2,
    125,
    COLORS.accentSoft,
    COLORS.accentSoft
  );

  fill(doc, COLORS.accent);
  doc.font("Helvetica-Bold").fontSize(10).text(
    "Report Interpretation",
    PAGE.margin + 16,
    interpretationY + 16
  );

  fill(doc, COLORS.ink);
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .text(
      "This report separates website performance from Vertex Studio Works billing activity. Website metrics describe tracked activity for the selected client. Billing figures describe invoices and payments between the client and Vertex Studio Works.",
      PAGE.margin + 16,
      interpretationY + 40,
      {
        width: PAGE.width - PAGE.margin * 2 - 32,
        lineGap: 3,
      }
    );
}

function drawWebsiteSection(doc: PDFKit.PDFDocument, report: ClientReport) {
  let y = startContentPage(doc);

  y = drawSectionTitle(
    doc,
    "Website Performance",
    "Client-linked website analytics for the selected reporting period.",
    y
  );

  const gap = 10;
  const cardWidth = (PAGE.width - PAGE.margin * 2 - gap * 2) / 3;

  drawMetricCard(doc, PAGE.margin, y, cardWidth, "Visitors", formatNumber(report.websiteAnalytics.visitors));
  drawMetricCard(doc, PAGE.margin + cardWidth + gap, y, cardWidth, "Sessions", formatNumber(report.websiteAnalytics.sessions));
  drawMetricCard(doc, PAGE.margin + (cardWidth + gap) * 2, y, cardWidth, "Page Views", formatNumber(report.websiteAnalytics.pageViews));

  const chartY = y + 100;
  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(10).text("Daily Website Activity", PAGE.margin, chartY);

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(7).text(
    "Client-linked visitors and page views for the selected period.",
    PAGE.margin,
    chartY + 17
  );

  drawBarChart(
    doc,
    report.websiteAnalytics.dailyPageViews.slice(-24).map((item) => ({
      label: item.date.slice(5),
      value: item.value,
    })),
    PAGE.margin,
    chartY + 34,
    PAGE.width - PAGE.margin * 2,
    175,
    COLORS.accent,
    "No client-linked website activity was recorded for this period."
  );

  const topY = chartY + 235;
  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(12).text("Top Pages", PAGE.margin, topY);

  const pageRows = report.websiteAnalytics.topPages.slice(0, 8).map((page) => [
    page.page,
    formatNumber(page.views),
  ]);

  drawTable(
    doc,
    [
      { label: "Page", width: 390 },
      { label: "Views", width: 100, align: "right" },
    ],
    pageRows.length ? pageRows : [["No page-view data", "0"]],
    PAGE.margin,
    topY + 24,
    24
  );
}

function drawWebsitesList(doc: PDFKit.PDFDocument, report: ClientReport) {
  let y = startContentPage(doc);

  y = drawSectionTitle(
    doc,
    "Website Portfolio",
    "Current websites connected to this client.",
    y
  );

  if (!report.websites.length) {
    fill(doc, COLORS.muted);
    doc.font("Helvetica").fontSize(9).text(
      "No websites are currently linked to this client.",
      PAGE.margin,
      y
    );
    return;
  }

  const rows = report.websites.map((website) => [
    website.name,
    website.domain || website.websiteUrl || "—",
    website.status,
    website.maintenanceStatus,
    website.hostingProvider || "—",
  ]);

  drawTable(
    doc,
    [
      { label: "Website", width: 125 },
      { label: "Domain / URL", width: 155 },
      { label: "Status", width: 80 },
      { label: "Maintenance", width: 85 },
      { label: "Hosting", width: 80 },
    ],
    rows,
    PAGE.margin,
    y,
    28
  );
}

function drawProjectSection(doc: PDFKit.PDFDocument, report: ClientReport) {
  let y = startContentPage(doc);

  y = drawSectionTitle(
    doc,
    "Project Performance",
    "Project progress, status, value, and delivery information.",
    y
  );

  const gap = 10;
  const cardWidth = (PAGE.width - PAGE.margin * 2 - gap * 2) / 3;

  drawMetricCard(doc, PAGE.margin, y, cardWidth, "Projects", String(report.projectSummary.total));
  drawMetricCard(doc, PAGE.margin + cardWidth + gap, y, cardWidth, "Average Progress", formatPercent(report.projectSummary.averageProgress));
  drawMetricCard(doc, PAGE.margin + (cardWidth + gap) * 2, y, cardWidth, "Project Value", money(report.projectSummary.totalProjectValue));

  y += 100;

  if (!report.projects.length) {
    fill(doc, COLORS.muted);
    doc.font("Helvetica").fontSize(9).text(
      "No projects are currently linked to this client.",
      PAGE.margin,
      y
    );
    return;
  }

  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(12).text("Project Delivery", PAGE.margin, y);
  y += 24;

  for (const project of report.projects) {
    if (y + 88 > PAGE.contentBottom) {
      y = startContentPage(doc);
    }

    drawRoundedCard(doc, PAGE.margin, y, PAGE.width - PAGE.margin * 2, 76);

    fill(doc, COLORS.ink);
    doc.font("Helvetica-Bold").fontSize(9.5).text(project.name, PAGE.margin + 14, y + 13, { width: 250 });

    fill(doc, COLORS.muted);
    doc.font("Helvetica").fontSize(7).text(`${project.category} • ${project.status}`, PAGE.margin + 14, y + 29);

    fill(doc, COLORS.ink);
    doc.font("Helvetica-Bold").fontSize(8).text(`${project.progress}%`, PAGE.margin + 14, y + 48);

    drawProgressBar(doc, PAGE.margin + 48, y + 51, 170, project.progress);

    fill(doc, COLORS.muted);
    doc.font("Helvetica").fontSize(7).text(`Value: ${money(project.value)}`, PAGE.margin + 275, y + 18, { width: 105, align: "right" });
    doc.text(`Due: ${formatDate(project.dueDate)}`, PAGE.margin + 275, y + 35, { width: 105, align: "right" });

    y += 88;
  }
}

function drawBillingSection(doc: PDFKit.PDFDocument, report: ClientReport) {
  let y = startContentPage(doc);

  y = drawSectionTitle(
    doc,
    "Billing Report",
    "Invoices and payments between the client and Vertex Studio Works.",
    y
  );

  const gap = 10;
  const cardWidth = (PAGE.width - PAGE.margin * 2 - gap * 2) / 3;

  drawMetricCard(doc, PAGE.margin, y, cardWidth, "Total Invoiced", money(report.billing.totalInvoiced));
  drawMetricCard(doc, PAGE.margin + cardWidth + gap, y, cardWidth, "Payments Received", money(report.billing.totalPaid));
  drawMetricCard(doc, PAGE.margin + (cardWidth + gap) * 2, y, cardWidth, "Balance Remaining", money(report.billing.outstanding));

  const overviewY = y + 92;
  drawRoundedCard(doc, PAGE.margin, overviewY, PAGE.width - PAGE.margin * 2, 116);

  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(10).text("Payment Progress", PAGE.margin + 14, overviewY + 14);

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(8).text(
    `${formatPercent(report.billing.collectionRate)} of invoiced value has been received.`,
    PAGE.margin + 14,
    overviewY + 34
  );

  drawProgressBar(doc, PAGE.margin + 14, overviewY + 57, PAGE.width - PAGE.margin * 2 - 28, report.billing.collectionRate);

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(7).text("Period invoiced", PAGE.margin + 14, overviewY + 78);
  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(8).text(money(report.billing.rangeInvoiced), PAGE.margin + 14, overviewY + 92);

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(7).text("Period paid", PAGE.margin + 280, overviewY + 78);
  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(8).text(money(report.billing.rangePaid), PAGE.margin + 280, overviewY + 92);

  const invoiceY = overviewY + 145;
  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(12).text("Invoice History", PAGE.margin, invoiceY);

  const invoiceRows = report.invoices.map((invoice) => [
    invoice.invoiceNumber,
    invoice.project?.name ?? "—",
    invoice.status,
    formatDate(invoice.issueDate),
    money(invoice.total),
  ]);

  drawTable(
    doc,
    [
      { label: "Invoice", width: 105 },
      { label: "Project", width: 165 },
      { label: "Status", width: 85 },
      { label: "Issue Date", width: 85 },
      { label: "Total", width: 50, align: "right" },
    ],
    invoiceRows.length ? invoiceRows : [["No invoices", "—", "—", "—", "$0.00"]],
    PAGE.margin,
    invoiceY + 24,
    28
  );
}

function drawPaymentHistory(doc: PDFKit.PDFDocument, report: ClientReport) {
  let y = startContentPage(doc);

  y = drawSectionTitle(
    doc,
    "Payment History",
    "Recorded payments received by Vertex Studio Works.",
    y
  );

  const rows = report.payments.map((payment) => {
    const invoice = report.invoices.find((item) => item.id === payment.invoiceId);

    return [
      payment.paymentReference,
      invoice?.invoiceNumber ?? "—",
      payment.installment?.description ?? "—",
      formatDate(payment.paymentDate),
      payment.paymentMethod,
      payment.status,
      money(payment.amount),
    ];
  });

  y = drawTable(
    doc,
    [
      { label: "Reference", width: 95 },
      { label: "Invoice", width: 72 },
      { label: "Installment", width: 90 },
      { label: "Date", width: 65 },
      { label: "Method", width: 62 },
      { label: "Status", width: 55 },
      { label: "Amount", width: 51, align: "right" },
    ],
    rows.length ? rows : [["No payments", "—", "—", "—", "—", "—", "$0.00"]],
    PAGE.margin,
    y,
    28
  );

  const totalY = Math.min(y + 28, PAGE.contentBottom - 30);

  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(11).text("Payments Received", PAGE.margin, totalY);

  fill(doc, COLORS.accent);
  doc
    .font("Helvetica-Bold")
    .fontSize(15)
    .text(money(report.billing.totalPaid), PAGE.margin + 350, totalY - 2, {
      width: 160,
      align: "right",
    });
}

function drawForecastSection(doc: PDFKit.PDFDocument, report: ClientReport) {
  let y = startContentPage(doc);

  y = drawSectionTitle(
    doc,
    "Financial Projection",
    "A historical-data-based projection of future payments.",
    y
  );

  drawRoundedCard(
    doc,
    PAGE.margin,
    y,
    PAGE.width - PAGE.margin * 2,
    112,
    COLORS.accentSoft,
    COLORS.accentSoft
  );

  fill(doc, COLORS.accent);
  doc.font("Helvetica-Bold").fontSize(10).text("Projection Method", PAGE.margin + 15, y + 15);

  fill(doc, COLORS.ink);
  doc.font("Helvetica").fontSize(8).text(report.billing.projection.method, PAGE.margin + 15, y + 35);
  doc.text(`Historical months used: ${report.billing.projection.monthsUsed}`, PAGE.margin + 15, y + 52);
  doc.text(`Projected monthly average: ${money(report.billing.projection.monthlyAverage)}`, PAGE.margin + 15, y + 69);

  fill(doc, COLORS.muted);
  doc.font("Helvetica").fontSize(7).text(getProjectionLabel(report), PAGE.margin + 15, y + 88, {
    width: PAGE.width - PAGE.margin * 2 - 30,
  });

  const chartY = y + 140;

  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(11).text("Historical Paid Amounts", PAGE.margin, chartY);

  const historical = report.billing.monthlyPayments.slice(-8).map((item) => ({
    label: formatMonth(item.month),
    value: item.value,
  }));

  drawBarChart(
    doc,
    historical,
    PAGE.margin,
    chartY + 22,
    PAGE.width - PAGE.margin * 2,
    150,
    COLORS.accent,
    "No historical payments are available for projection."
  );

  const projectedY = chartY + 195;
  fill(doc, COLORS.ink);
  doc.font("Helvetica-Bold").fontSize(11).text("Projected Payments", PAGE.margin, projectedY);

  const projected = report.billing.projection.projectedMonths.map((item) => ({
    label: `Month +${item.monthOffset}`,
    value: item.value,
  }));

  drawBarChart(
    doc,
    projected,
    PAGE.margin,
    projectedY + 22,
    PAGE.width - PAGE.margin * 2,
    135,
    COLORS.success,
    "No projected payment values are available."
  );

  fill(doc, COLORS.lightMuted);
  doc
    .font("Helvetica")
    .fontSize(7)
    .text(
      "Projection is an estimate derived from historical payments recorded in Vertex Studio Works Business OS. It is not a guarantee of future payments, future sales, or the client's business revenue.",
      PAGE.margin,
      735,
      {
        width: PAGE.width - PAGE.margin * 2,
        lineGap: 3,
      }
    );
}

function drawReportTypeSections(doc: PDFKit.PDFDocument, report: ClientReport) {
  switch (report.reportType) {
    case "website":
      drawWebsiteSection(doc, report);
      drawWebsitesList(doc, report);
      break;
    case "project":
      drawProjectSection(doc, report);
      break;
    case "billing":
      drawBillingSection(doc, report);
      drawPaymentHistory(doc, report);
      drawForecastSection(doc, report);
      break;
    case "combined":
    default:
      drawExecutiveSummary(doc, report);
      drawWebsiteSection(doc, report);
      drawWebsitesList(doc, report);
      drawProjectSection(doc, report);
      drawBillingSection(doc, report);
      drawPaymentHistory(doc, report);
      drawForecastSection(doc, report);
      break;
  }
}

export function createClientReportPdf(report: ClientReport): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    const doc = new PDFDocument({
      size: "A4",
      margins: {
        top: PAGE.margin,
        bottom: PAGE.margin,
        left: PAGE.margin,
        right: PAGE.margin,
      },
      info: {
        Title: getReportTitle(report.reportType),
        Author: "Vertex Studio Works",
        Subject: `${report.client.company || report.client.name} — Client Report`,
        Creator: "Vertex Studio Works Business OS",
        Keywords: "Vertex Studio Works, client report, analytics, projects, billing",
      },
    });

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    try {
      drawCover(doc, report);
      drawReportTypeSections(doc, report);
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}

export function getClientReportPdfFilename(report: ClientReport) {
  const company = report.client.company || report.client.name || "client";

  const safeCompany = company
    .replace(/[^a-z0-9]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  const generated = new Date(report.generatedAt);

  const date = Number.isNaN(generated.getTime())
    ? "report"
    : [
        generated.getFullYear(),
        String(generated.getMonth() + 1).padStart(2, "0"),
        String(generated.getDate()).padStart(2, "0"),
      ].join("-");

  return `vertex-studio-${safeCompany || "client"}-${date}.pdf`;
}

export function getPdfReportDescription(type: ClientReportType) {
  switch (type) {
    case "website":
      return "Client-facing website performance PDF.";
    case "project":
      return "Client-facing project performance PDF.";
    case "billing":
      return "Client-facing billing and payment PDF.";
    case "combined":
    default:
      return "Client-facing combined performance PDF.";
  }
}
