// FILE: lib/reports/excel.ts
// PURPOSE: Vertex Studio Works — Client Excel Report Generator
// Uses @office-kit/xlsx for native XLSX charts and workbook generation.
//
// Workbook:
// 1. Executive Summary — dashboard-style client overview
// 2. Website Analytics — detailed website data + native chart
// 3. Project — project delivery data + native chart
// 4. Financial — invoices/payments + native chart
// 5. Forecast — historical/projected payments + native chart
//
// IMPORTANT:
// - @office-kit/xlsx is ESM-only and runs on Node 22+.
// - generateClientReportExcel is async because the XLSX writer is async.

import {
  addWorksheet,
  createWorkbook,
} from "@office-kit/xlsx/workbook";
import {
  appendRow,
  mergeCells,
  setCell,
  setFreezePanes,
  setColumnWidths,
} from "@office-kit/xlsx/worksheet";
import {
  makeBarChart,
  makeBarSeries,
  makeChartSpace,
} from "@office-kit/xlsx/chart";
import { addChartAt } from "@office-kit/xlsx/drawing";
import {
  makeColor,
  makeFont,
  makePatternFill,
  registerCellStyle,
  setCellAsCurrency,
  setCellAsPercent,
} from "@office-kit/xlsx/styles";
import { workbookToBuffer } from "@office-kit/xlsx/node";

import {
  ClientReport,
  ClientReportType,
  formatDate,
  formatNumber,
  formatPercent,
  getReportTitle,
  getProjectionLabel,
} from "./client-report";

type ExcelCell = string | number | boolean | null;

function safeCell(value: unknown): ExcelCell {
  if (value === null || value === undefined) return "";
  if (typeof value === "number" || typeof value === "boolean") return value;
  return String(value);
}

function cellRef(
  row: number,
  col: number
) {
  let n = col;
  let letters = "";

  while (n > 0) {
    const remainder = (n - 1) % 26;
    letters = String.fromCharCode(65 + remainder) + letters;
    n = Math.floor((n - 1) / 26);
  }

  return `${letters}${row}`;
}

function applyCurrency(
  wb: ReturnType<typeof createWorkbook>,
  ws: Parameters<typeof setCell>[0],
  row: number,
  col: number,
  value: number,
  styleId?: number
) {
  const cell = setCell(ws, row, col, Number(value || 0), styleId);
  setCellAsCurrency(wb, cell);
  return cell;
}

function applyPercent(
  wb: ReturnType<typeof createWorkbook>,
  ws: Parameters<typeof setCell>[0],
  row: number,
  col: number,
  value: number,
  styleId?: number
) {
  const cell = setCell(ws, row, col, Number(value || 0) / 100, styleId);
  setCellAsPercent(wb, cell);
  return cell;
}

function makeStyles(wb: ReturnType<typeof createWorkbook>) {
  const white = makeColor({ rgb: "FFFFFFFF" });
  const muted = makeColor({ rgb: "FF64748B" });
  const blue = makeColor({ rgb: "FF2563EB" });
  const dark = makeColor({ rgb: "FF0F172A" });
  const softBlue = makeColor({ rgb: "FFEFF6FF" });
  const softSlate = makeColor({ rgb: "FFF8FAFC" });
  const sectionBlue = makeColor({ rgb: "FF2563EB" });
  const headerSlate = makeColor({ rgb: "FF334155" });
  const whiteFill = makeColor({ rgb: "FFFFFFFF" });

  const title = registerCellStyle(wb, {
    font: makeFont({
      bold: true,
      size: 16,
      color: white,
    }),
    fill: makePatternFill({
      patternType: "solid",
      fgColor: dark,
    }),
  });

  const subtitle = registerCellStyle(wb, {
    font: makeFont({
      bold: true,
      size: 11,
      color: blue,
    }),
    fill: makePatternFill({
      patternType: "solid",
      fgColor: softBlue,
    }),
  });

  const section = registerCellStyle(wb, {
    font: makeFont({
      bold: true,
      size: 10,
      color: white,
    }),
    fill: makePatternFill({
      patternType: "solid",
      fgColor: sectionBlue,
    }),
  });

  const label = registerCellStyle(wb, {
    font: makeFont({
      bold: true,
      color: muted,
    }),
    fill: makePatternFill({
      patternType: "solid",
      fgColor: softSlate,
    }),
  });

  const header = registerCellStyle(wb, {
    font: makeFont({
      bold: true,
      color: white,
    }),
    fill: makePatternFill({
      patternType: "solid",
      fgColor: headerSlate,
    }),
  });

  const body = registerCellStyle(wb, {
    fill: makePatternFill({
      patternType: "solid",
      fgColor: whiteFill,
    }),
  });

  const note = registerCellStyle(wb, {
    font: makeFont({
      size: 9,
      color: muted,
    }),
  });

  const metricLabel = registerCellStyle(wb, {
    font: makeFont({
      bold: true,
      size: 9,
      color: muted,
    }),
  });

  const metricValue = registerCellStyle(wb, {
    font: makeFont({
      bold: true,
      size: 15,
      color: dark,
    }),
  });

  const metricHelper = registerCellStyle(wb, {
    font: makeFont({
      size: 8,
      color: muted,
    }),
  });

  return {
    title,
    subtitle,
    section,
    label,
    header,
    body,
    note,
    metricLabel,
    metricValue,
    metricHelper,
  };
}

function setDashboardMetric(
  wb: ReturnType<typeof createWorkbook>,
  ws: Parameters<typeof setCell>[0],
  styles: ReturnType<typeof makeStyles>,
  label: string,
  value: ExcelCell,
  helper: string,
  row: number,
  col: number,
  currency = false,
  percent = false
) {
  setCell(ws, row, col, label, styles.metricLabel);

  if (currency && typeof value === "number") {
    applyCurrency(wb, ws, row + 1, col, value, styles.metricValue);
  } else if (percent && typeof value === "number") {
    applyPercent(wb, ws, row + 1, col, value, styles.metricValue);
  } else {
    setCell(ws, row + 1, col, safeCell(value), styles.metricValue);
  }

  setCell(ws, row + 2, col, helper, styles.metricHelper);

  mergeCells(ws, `${cellRef(row, col)}:${cellRef(row, col + 1)}`);
  mergeCells(ws, `${cellRef(row + 1, col)}:${cellRef(row + 1, col + 1)}`);
  mergeCells(ws, `${cellRef(row + 2, col)}:${cellRef(row + 2, col + 1)}`);
}

function addChart(
  ws: Parameters<typeof addChartAt>[0],
  sheetName: string,
  anchor: string,
  title: string,
  categoryRange: string,
  series: Array<{
    idx: number;
    name: string;
    valueRange: string;
  }>,
  widthPx = 500,
  heightPx = 300
) {
  const chart = makeBarChart({
    barDir: "col",
    grouping: "clustered",
    series: series.map((item) =>
      makeBarSeries({
        idx: item.idx,
        tx: {
          kind: "literal",
          value: item.name,
        },
        cat: {
          ref: `${sheetName}!${categoryRange}`,
        },
        val: {
          ref: `${sheetName}!${item.valueRange}`,
        },
      })
    ),
  });

  const space = makeChartSpace({
    plotArea: {
      chart,
    },
    title,
    legend: {
      position: "r",
    },
  });

  addChartAt(
    ws,
    anchor,
    { space },
    {
      widthPx,
      heightPx,
    }
  );
}

function createExecutiveSummary(
  wb: ReturnType<typeof createWorkbook>,
  report: ClientReport,
  styles: ReturnType<typeof makeStyles>
) {
  const ws = addWorksheet(wb, "Executive Summary");
  const company = report.client.company || report.client.name || "Client";

  setCell(ws, 1, 1, "VERTEX STUDIO WORKS", styles.title);
  setCell(ws, 2, 1, getReportTitle(report.reportType), styles.subtitle);
  setCell(ws, 3, 1, "Client", styles.label);
  setCell(ws, 3, 2, company);
  setCell(ws, 3, 4, "Report Period", styles.label);
  setCell(ws, 3, 5, report.period.label);
  setCell(ws, 4, 1, "Generated", styles.label);
  setCell(ws, 4, 2, formatDate(report.generatedAt));

  mergeCells(ws, "A1:E1");
  mergeCells(ws, "A2:E2");

  setCell(ws, 7, 1, "CLIENT INFORMATION", styles.section);
  mergeCells(ws, "A7:E7");

  const clientInfo = [
    ["Client", report.client.name, "Company", report.client.company],
    ["Email", report.client.email, "Phone", report.client.phone],
    [
      "Company Type",
      report.client.companyType,
      "Status",
      report.client.status,
    ],
  ] as const;

  clientInfo.forEach((row, index) => {
    const r = 8 + index;
    setCell(ws, r, 1, row[0], styles.label);
    setCell(ws, r, 2, row[1]);
    setCell(ws, r, 4, row[2], styles.label);
    setCell(ws, r, 5, row[3]);
  });

  setCell(ws, 13, 1, "PERFORMANCE OVERVIEW", styles.section);
  mergeCells(ws, "A13:E13");

  setDashboardMetric(
    wb,
    ws,
    styles,
    "Website Visitors",
    report.websiteAnalytics.visitors,
    "Selected period",
    14,
    1
  );

  setDashboardMetric(
    wb,
    ws,
    styles,
    "Page Views",
    report.websiteAnalytics.pageViews,
    "Selected period",
    14,
    4
  );

  setDashboardMetric(
    wb,
    ws,
    styles,
    "Projects",
    report.projectSummary.total,
    "Total linked projects",
    21,
    1
  );

  setDashboardMetric(
    wb,
    ws,
    styles,
    "Avg. Project Progress",
    report.projectSummary.averageProgress,
    "Across linked projects",
    21,
    4,
    false,
    true
  );

  setDashboardMetric(
    wb,
    ws,
    styles,
    "Total Invoiced",
    report.billing.totalInvoiced,
    "Vertex Studio billing",
    28,
    1,
    true
  );

  setDashboardMetric(
    wb,
    ws,
    styles,
    "Payments Received",
    report.billing.totalPaid,
    "Received by Vertex Studio",
    28,
    4,
    true
  );

  setDashboardMetric(
    wb,
    ws,
    styles,
    "Balance Remaining",
    report.billing.outstanding,
    "Remaining balance on issued invoices",
    35,
    1,
    true
  );

  setDashboardMetric(
    wb,
    ws,
    styles,
    "Payment Progress",
    report.billing.collectionRate,
    "Amount received / total invoiced",
    35,
    4,
    false,
    true
  );

  setCell(ws, 43, 1, "OPERATIONAL SNAPSHOT", styles.section);
  mergeCells(ws, "A43:E43");

  const operationalRows: ExcelCell[][] = [
    ["Websites", report.websiteSummary.total, "Live", report.websiteSummary.live],
    [
      "In Development",
      report.websiteSummary.development,
      "In Review",
      report.websiteSummary.review,
    ],
    [
      "Maintenance",
      report.websiteSummary.maintenance,
      "Maintenance Enrolled",
      report.websiteSummary.maintenanceEnrolled,
    ],
    [
      "Active Projects",
      report.projectSummary.active,
      "Completed Projects",
      report.projectSummary.completed,
    ],
    [
      "On Hold Projects",
      report.projectSummary.onHold,
      "Total Project Value",
      report.projectSummary.totalProjectValue,
    ],
  ];

  operationalRows.forEach((row, index) => {
    const r = 44 + index;
    setCell(ws, r, 1, row[0], styles.label);
    setCell(ws, r, 2, row[1]);
    setCell(ws, r, 4, row[2], styles.label);

    if (typeof row[3] === "number" && row[2] === "Total Project Value") {
      applyCurrency(wb, ws, r, 5, row[3]);
    } else {
      setCell(ws, r, 5, row[3]);
    }
  });

  setCell(ws, 51, 1, "FINANCIAL SNAPSHOT", styles.section);
  mergeCells(ws, "A51:E51");

  const financialRows: ExcelCell[][] = [
    [
      "Invoices",
      report.billing.invoiceCount,
      "Paid Transactions",
      report.billing.paidPaymentCount,
    ],
    [
      "Period Invoiced",
      report.billing.rangeInvoiced,
      "Period Paid",
      report.billing.rangePaid,
    ],
    [
      "Cancelled",
      report.billing.cancelled,
      "Payment Progress",
      report.billing.collectionRate,
    ],
  ];

  financialRows.forEach((row, index) => {
    const r = 52 + index;
    setCell(ws, r, 1, row[0], styles.label);

    if (row[0] === "Period Invoiced" || row[0] === "Cancelled") {
      applyCurrency(wb, ws, r, 2, Number(row[1] || 0));
    } else {
      setCell(ws, r, 2, row[1]);
    }

    setCell(ws, r, 4, row[2], styles.label);

    if (row[2] === "Period Paid") {
      applyCurrency(wb, ws, r, 5, Number(row[3] || 0));
    } else if (row[2] === "Payment Progress") {
      applyPercent(wb, ws, r, 5, Number(row[3] || 0));
    } else {
      setCell(ws, r, 5, row[3]);
    }
  });

  setCell(ws, 57, 1, "FORECAST", styles.section);
  mergeCells(ws, "A57:E57");

  setCell(ws, 58, 1, "Projection Method", styles.label);
  setCell(ws, 58, 2, report.billing.projection.method);
  setCell(ws, 58, 4, "Historical Months", styles.label);
  setCell(ws, 58, 5, report.billing.projection.monthsUsed);

  setCell(ws, 59, 1, "Projected Monthly Average", styles.label);
  applyCurrency(
    wb,
    ws,
    59,
    2,
    report.billing.projection.monthlyAverage
  );
  setCell(ws, 59, 4, "Projected Next 3 Months", styles.label);
  applyCurrency(
    wb,
    ws,
    59,
    5,
    report.billing.projection.next3Months
  );

  setCell(ws, 61, 1, "Projection Note", styles.label);
  setCell(ws, 61, 2, getProjectionLabel(report), styles.note);
  mergeCells(ws, "B61:E61");

  setColumnWidths(ws, [25, 24, 4, 25, 24]);
  setFreezePanes(ws, "A5");

  return ws;
}

function createWebsiteAnalytics(
  wb: ReturnType<typeof createWorkbook>,
  report: ClientReport,
  styles: ReturnType<typeof makeStyles>
) {
  const ws = addWorksheet(wb, "Website Analytics");

  setCell(ws, 1, 1, "Website Analytics", styles.title);
  setCell(ws, 2, 1, report.client.company || report.client.name, styles.subtitle);
  setCell(ws, 3, 1, "Period", styles.label);
  setCell(ws, 3, 2, report.period.label);

  mergeCells(ws, "A1:D1");
  mergeCells(ws, "A2:D2");

  setCell(ws, 5, 1, "CORE METRICS", styles.section);
  mergeCells(ws, "A5:D5");

  const coreMetrics: Array<[string, number]> = [
    ["Visitors", report.websiteAnalytics.visitors],
    ["Sessions", report.websiteAnalytics.sessions],
    ["Page Views", report.websiteAnalytics.pageViews],
    ["Average Pages / Session", report.websiteAnalytics.averagePagesPerSession],
    ["Tracked Events", report.websiteAnalytics.trackedEvents],
  ];

  coreMetrics.forEach(([label, value], index) => {
    const row = 6 + index;
    setCell(ws, row, 1, label, styles.label);
    setCell(ws, row, 2, value);
  });

  let row = 13;

  setCell(ws, row, 1, "TOP PAGES", styles.section);
  mergeCells(ws, `A${row}:B${row}`);
  row += 1;

  setCell(ws, row, 1, "Page", styles.header);
  setCell(ws, row, 2, "Views", styles.header);
  row += 1;

  const topPages = report.websiteAnalytics.topPages.length
    ? report.websiteAnalytics.topPages
    : [{ page: "No page-view data", views: 0 }];

  topPages.forEach((page) => {
    setCell(ws, row, 1, page.page, styles.body);
    setCell(ws, row, 2, page.views, styles.body);
    row += 1;
  });

  row += 1;
  setCell(ws, row, 1, "TRAFFIC SOURCES", styles.section);
  mergeCells(ws, `A${row}:B${row}`);
  row += 1;

  setCell(ws, row, 1, "Source", styles.header);
  setCell(ws, row, 2, "Events", styles.header);
  row += 1;

  const sources = Object.entries(report.websiteAnalytics.sourceCounts)
    .sort(([, a], [, b]) => b - a);

  if (sources.length === 0) {
    setCell(ws, row, 1, "No source data", styles.body);
    setCell(ws, row, 2, 0, styles.body);
    row += 1;
  } else {
    for (const [source, count] of sources) {
      setCell(ws, row, 1, source, styles.body);
      setCell(ws, row, 2, count, styles.body);
      row += 1;
    }
  }

  row += 1;
  setCell(ws, row, 1, "EVENT TYPES", styles.section);
  mergeCells(ws, `A${row}:B${row}`);
  row += 1;

  setCell(ws, row, 1, "Event", styles.header);
  setCell(ws, row, 2, "Count", styles.header);
  row += 1;

  const events = Object.entries(report.websiteAnalytics.eventCounts)
    .sort(([, a], [, b]) => b - a);

  if (events.length === 0) {
    setCell(ws, row, 1, "No event data", styles.body);
    setCell(ws, row, 2, 0, styles.body);
    row += 1;
  } else {
    for (const [event, count] of events) {
      setCell(ws, row, 1, event, styles.body);
      setCell(ws, row, 2, count, styles.body);
      row += 1;
    }
  }

  row += 2;
  setCell(ws, row, 1, "CHART DATA — WEBSITE PERFORMANCE", styles.section);
  mergeCells(ws, `A${row}:B${row}`);
  row += 1;

  setCell(ws, row, 1, "Metric", styles.header);
  setCell(ws, row, 2, "Value", styles.header);
  const chartHeaderRow = row;
  row += 1;

  const chartData = [
    ["Visitors", report.websiteAnalytics.visitors],
    ["Sessions", report.websiteAnalytics.sessions],
    ["Page Views", report.websiteAnalytics.pageViews],
  ];

  chartData.forEach(([label, value]) => {
    setCell(ws, row, 1, label, styles.body);
    setCell(ws, row, 2, Number(value), styles.body);
    row += 1;
  });

  addChart(
    ws,
    "Website Analytics",
    "D5",
    "Website Performance",
    `$A$${chartHeaderRow + 1}:$A$${row - 1}`,
    [
      {
        idx: 0,
        name: "Value",
        valueRange: `$B$${chartHeaderRow + 1}:$B$${row - 1}`,
      },
    ],
    520,
    320
  );

  setCell(
    ws,
    row + 1,
    1,
    "NOTE",
    styles.label
  );
  setCell(
    ws,
    row + 1,
    2,
    report.websiteAnalytics.note,
    styles.note
  );

  setColumnWidths(ws, [34, 20, 4, 24, 20]);
  setFreezePanes(ws, "A4");

  return ws;
}

function createProjectSheet(
  wb: ReturnType<typeof createWorkbook>,
  report: ClientReport,
  styles: ReturnType<typeof makeStyles>
) {
  const ws = addWorksheet(wb, "Project");

  setCell(ws, 1, 1, "Projects", styles.title);
  setCell(ws, 2, 1, report.client.company || report.client.name, styles.subtitle);
  setCell(ws, 3, 1, "Period", styles.label);
  setCell(ws, 3, 2, report.period.label);
  mergeCells(ws, "A1:H1");
  mergeCells(ws, "A2:H2");

  const headerRow = 5;

  const headers = [
    "Project",
    "Category",
    "Status",
    "Progress",
    "Value",
    "Start Date",
    "Due Date",
    "Last Activity",
  ];

  headers.forEach((header, index) => {
    setCell(ws, headerRow, index + 1, header, styles.header);
  });

  const projectStartRow = headerRow + 1;

  if (report.projects.length === 0) {
    setCell(ws, projectStartRow, 1, "No projects", styles.body);
    setCell(ws, projectStartRow, 4, 0, styles.body);
    setCell(ws, projectStartRow, 5, 0, styles.body);
  } else {
    report.projects.forEach((project, index) => {
      const row = projectStartRow + index;

      setCell(ws, row, 1, project.name, styles.body);
      setCell(ws, row, 2, project.category, styles.body);
      setCell(ws, row, 3, project.status, styles.body);
      setCell(ws, row, 4, Number(project.progress || 0) / 100, styles.body);
      setCell(ws, row, 5, Number(project.value || 0), styles.body);
      setCell(ws, row, 6, formatDate(project.startDate), styles.body);
      setCell(ws, row, 7, formatDate(project.dueDate), styles.body);
      setCell(ws, row, 8, formatDate(project.lastActivity), styles.body);

      applyPercent(wb, ws, row, 4, Number(project.progress || 0));
      applyCurrency(wb, ws, row, 5, Number(project.value || 0));
    });
  }

  const chartDataStart = Math.max(
    projectStartRow,
    projectStartRow + report.projects.length
  ) + 2;

  setCell(ws, chartDataStart, 1, "CHART DATA — PROJECT PROGRESS", styles.section);
  mergeCells(ws, `A${chartDataStart}:B${chartDataStart}`);

  setCell(ws, chartDataStart + 1, 1, "Project", styles.header);
  setCell(ws, chartDataStart + 1, 2, "Progress", styles.header);

  const chartProjects = report.projects.length
    ? report.projects
    : [{ name: "No projects", progress: 0 } as ClientReport["projects"][number]];

  chartProjects.forEach((project, index) => {
    const row = chartDataStart + 2 + index;
    setCell(ws, row, 1, project.name, styles.body);
    setCell(ws, row, 2, Number(project.progress || 0), styles.body);
  });

  addChart(
    ws,
    "Project",
    "J5",
    "Project Progress",
    `$A$${chartDataStart + 2}:$A$${chartDataStart + 1 + chartProjects.length}`,
    [
      {
        idx: 0,
        name: "Progress %",
        valueRange: `$B$${chartDataStart + 2}:$B$${chartDataStart + 1 + chartProjects.length}`,
      },
    ],
    520,
    340
  );

  const summaryRow = chartDataStart + chartProjects.length + 3;

  setCell(ws, summaryRow, 1, "SUMMARY", styles.section);
  mergeCells(ws, `A${summaryRow}:H${summaryRow}`);

  const summary = [
    ["Total Projects", report.projectSummary.total],
    ["Active Projects", report.projectSummary.active],
    ["Completed Projects", report.projectSummary.completed],
    ["On Hold", report.projectSummary.onHold],
    ["Average Progress", report.projectSummary.averageProgress],
    ["Total Project Value", report.projectSummary.totalProjectValue],
  ] as const;

  summary.forEach(([label, value], index) => {
    const r = summaryRow + 1 + index;
    setCell(ws, r, 1, label, styles.label);

    if (label === "Average Progress") {
      applyPercent(wb, ws, r, 2, Number(value));
    } else if (label === "Total Project Value") {
      applyCurrency(wb, ws, r, 2, Number(value));
    } else {
      setCell(ws, r, 2, value);
    }
  });

  setColumnWidths(ws, [32, 20, 18, 14, 18, 16, 16, 20, 4, 24, 20]);
  setFreezePanes(ws, "A6");

  return ws;
}

function createFinancialSheet(
  wb: ReturnType<typeof createWorkbook>,
  report: ClientReport,
  styles: ReturnType<typeof makeStyles>
) {
  const ws = addWorksheet(wb, "Financial");

  setCell(ws, 1, 1, "Financial Report", styles.title);
  setCell(ws, 2, 1, report.client.company || report.client.name, styles.subtitle);
  setCell(ws, 3, 1, "Period", styles.label);
  setCell(ws, 3, 2, report.period.label);

  mergeCells(ws, "A1:H1");
  mergeCells(ws, "A2:H2");

  setCell(ws, 5, 1, "INVOICE SUMMARY", styles.section);
  mergeCells(ws, "A5:H5");

  const invoiceHeaderRow = 6;
  [
    "Invoice Number",
    "Project",
    "Status",
    "Issue Date",
    "Due Date",
    "Subtotal",
    "Tax",
    "Total",
  ].forEach((header, index) => {
    setCell(ws, invoiceHeaderRow, index + 1, header, styles.header);
  });

  const invoiceStartRow = invoiceHeaderRow + 1;

  if (report.invoices.length === 0) {
    setCell(ws, invoiceStartRow, 1, "No invoices", styles.body);
  } else {
    report.invoices.forEach((invoice, index) => {
      const row = invoiceStartRow + index;

      setCell(ws, row, 1, invoice.invoiceNumber, styles.body);
      setCell(ws, row, 2, invoice.project?.name ?? "", styles.body);
      setCell(ws, row, 3, invoice.status, styles.body);
      setCell(ws, row, 4, formatDate(invoice.issueDate), styles.body);
      setCell(ws, row, 5, formatDate(invoice.dueDate), styles.body);
      applyCurrency(wb, ws, row, 6, invoice.subtotal, styles.body);
      applyCurrency(wb, ws, row, 7, invoice.tax, styles.body);
      applyCurrency(wb, ws, row, 8, invoice.total, styles.body);
    });
  }

  const paymentSectionRow =
    invoiceStartRow + Math.max(report.invoices.length, 1) + 2;

  setCell(ws, paymentSectionRow, 1, "PAYMENT HISTORY", styles.section);
  mergeCells(ws, `A${paymentSectionRow}:H${paymentSectionRow}`);

  const paymentHeaderRow = paymentSectionRow + 1;

  [
    "Payment Reference",
    "Invoice",
    "Installment",
    "Payment Date",
    "Method",
    "Status",
    "Amount",
    "Notes",
  ].forEach((header, index) => {
    setCell(ws, paymentHeaderRow, index + 1, header, styles.header);
  });

  const paymentStartRow = paymentHeaderRow + 1;

  if (report.payments.length === 0) {
    setCell(ws, paymentStartRow, 1, "No payments", styles.body);
  } else {
    report.payments.forEach((payment, index) => {
      const row = paymentStartRow + index;
      const invoice = report.invoices.find(
        (item) => item.id === payment.invoiceId
      );

      setCell(ws, row, 1, payment.paymentReference, styles.body);
      setCell(ws, row, 2, invoice?.invoiceNumber ?? "", styles.body);
      setCell(
        ws,
        row,
        3,
        payment.installment?.description ?? "",
        styles.body
      );
      setCell(ws, row, 4, formatDate(payment.paymentDate), styles.body);
      setCell(ws, row, 5, payment.paymentMethod, styles.body);
      setCell(ws, row, 6, payment.status, styles.body);
      applyCurrency(wb, ws, row, 7, payment.amount, styles.body);
      setCell(ws, row, 8, payment.notes, styles.body);
    });
  }

  const chartDataRow =
    paymentStartRow + Math.max(report.payments.length, 1) + 2;

  setCell(ws, chartDataRow, 1, "CHART DATA — FINANCIAL OVERVIEW", styles.section);
  mergeCells(ws, `A${chartDataRow}:B${chartDataRow}`);

  setCell(ws, chartDataRow + 1, 1, "Metric", styles.header);
  setCell(ws, chartDataRow + 1, 2, "Amount", styles.header);

  const financialChartData = [
    ["Total Invoiced", report.billing.totalInvoiced],
    ["Payments Received", report.billing.totalPaid],
    ["Balance Remaining", report.billing.outstanding],
  ] as const;

  financialChartData.forEach(([label, value], index) => {
    const row = chartDataRow + 2 + index;
    setCell(ws, row, 1, label, styles.body);
    applyCurrency(wb, ws, row, 2, Number(value), styles.body);
  });

  addChart(
    ws,
    "Financial",
    "J5",
    "Financial Overview",
    `$A$${chartDataRow + 2}:$A$${chartDataRow + 4}`,
    [
      {
        idx: 0,
        name: "Amount",
        valueRange: `$B$${chartDataRow + 2}:$B$${chartDataRow + 4}`,
      },
    ],
    520,
    340
  );

  const totalsRow = chartDataRow + 7;

  setCell(ws, totalsRow, 1, "FINANCIAL TOTALS", styles.section);
  mergeCells(ws, `A${totalsRow}:H${totalsRow}`);

  const totals = [
    ["Total Invoiced", report.billing.totalInvoiced],
    ["Payments Received", report.billing.totalPaid],
    ["Balance Remaining", report.billing.outstanding],
    ["Cancelled", report.billing.cancelled],
    ["Payment Progress", report.billing.collectionRate],
    ["Period Invoiced", report.billing.rangeInvoiced],
    ["Period Paid", report.billing.rangePaid],
  ] as const;

  totals.forEach(([label, value], index) => {
    const row = totalsRow + 1 + index;
    setCell(ws, row, 1, label, styles.label);

    if (label === "Payment Progress") {
      applyPercent(wb, ws, row, 2, Number(value));
    } else {
      applyCurrency(wb, ws, row, 2, Number(value));
    }
  });

  const methodsRow = totalsRow + totals.length + 3;

  setCell(ws, methodsRow, 1, "PAYMENT METHODS", styles.section);
  mergeCells(ws, `A${methodsRow}:B${methodsRow}`);
  setCell(ws, methodsRow + 1, 1, "Method", styles.header);
  setCell(ws, methodsRow + 1, 2, "Payments Received", styles.header);

  const methods = Object.entries(report.billing.paymentMethodTotals)
    .sort(([, a], [, b]) => b - a);

  if (methods.length === 0) {
    setCell(ws, methodsRow + 2, 1, "No paid transactions", styles.body);
    setCell(ws, methodsRow + 2, 2, 0, styles.body);
  } else {
    methods.forEach(([method, amount], index) => {
      const row = methodsRow + 2 + index;
      setCell(ws, row, 1, method, styles.body);
      applyCurrency(wb, ws, row, 2, Number(amount), styles.body);
    });
  }

  setColumnWidths(ws, [24, 28, 18, 16, 16, 16, 16, 38, 4, 24, 20]);
  setFreezePanes(ws, "A7");

  return ws;
}

function createForecastSheet(
  wb: ReturnType<typeof createWorkbook>,
  report: ClientReport,
  styles: ReturnType<typeof makeStyles>
) {
  const ws = addWorksheet(wb, "Forecast");

  setCell(ws, 1, 1, "Financial Projection", styles.title);
  setCell(ws, 2, 1, report.client.company || report.client.name, styles.subtitle);
  setCell(ws, 3, 1, "Period Used", styles.label);
  setCell(ws, 3, 2, report.period.label);

  mergeCells(ws, "A1:D1");
  mergeCells(ws, "A2:D2");

  setCell(ws, 5, 1, "PROJECTION METHODOLOGY", styles.section);
  mergeCells(ws, "A5:D5");

  const methodology = [
    ["Method", report.billing.projection.method],
    ["Historical Months Used", report.billing.projection.monthsUsed],
    ["Historical Monthly Average", report.billing.projection.monthlyAverage],
    ["Projected Next 3 Months", report.billing.projection.next3Months],
  ] as const;

  methodology.forEach(([label, value], index) => {
    const row = 6 + index;
    setCell(ws, row, 1, label, styles.label);

    if (
      label === "Historical Monthly Average" ||
      label === "Projected Next 3 Months"
    ) {
      applyCurrency(wb, ws, row, 2, Number(value));
    } else {
      setCell(ws, row, 2, value);
    }
  });

  setCell(ws, 11, 1, "HISTORICAL MONTHLY PAYMENTS", styles.section);
  mergeCells(ws, "A11:B11");
  setCell(ws, 12, 1, "Month", styles.header);
  setCell(ws, 12, 2, "Paid Amount", styles.header);

  const historicalStartRow = 13;

  const historical = report.billing.monthlyPayments.length
    ? report.billing.monthlyPayments
    : [{ month: "No historical data", value: 0 }];

  historical.forEach((item, index) => {
    const row = historicalStartRow + index;
    setCell(ws, row, 1, item.month, styles.body);
    applyCurrency(wb, ws, row, 2, Number(item.value), styles.body);
  });

  const projectedSectionRow =
    historicalStartRow + historical.length + 2;

  setCell(ws, projectedSectionRow, 1, "PROJECTED MONTHLY PAYMENTS", styles.section);
  mergeCells(
    ws,
    `A${projectedSectionRow}:B${projectedSectionRow}`
  );

  setCell(ws, projectedSectionRow + 1, 1, "Month", styles.header);
  setCell(ws, projectedSectionRow + 1, 2, "Projected Amount", styles.header);

  const projectedStartRow = projectedSectionRow + 2;

  const projected = report.billing.projection.projectedMonths.length
    ? report.billing.projection.projectedMonths
    : [
        { monthOffset: 1, value: 0 },
        { monthOffset: 2, value: 0 },
        { monthOffset: 3, value: 0 },
      ];

  projected.forEach((item, index) => {
    const row = projectedStartRow + index;
    setCell(ws, row, 1, `Month +${item.monthOffset}`, styles.body);
    applyCurrency(wb, ws, row, 2, Number(item.value), styles.body);
  });

  const chartDataRow = projectedStartRow + projected.length + 2;

  setCell(ws, chartDataRow, 1, "CHART DATA — HISTORICAL VS PROJECTED", styles.section);
  mergeCells(ws, `A${chartDataRow}:C${chartDataRow}`);

  setCell(ws, chartDataRow + 1, 1, "Period", styles.header);
  setCell(ws, chartDataRow + 1, 2, "Historical", styles.header);
  setCell(ws, chartDataRow + 1, 3, "Projected", styles.header);

  const chartRows: Array<[string, number, number]> = [];

  historical.forEach((item) => {
    chartRows.push([
      String(item.month),
      Number(item.value || 0),
      0,
    ]);
  });

  projected.forEach((item) => {
    chartRows.push([
      `Month +${item.monthOffset}`,
      0,
      Number(item.value || 0),
    ]);
  });

  chartRows.forEach(([period, actual, projectedValue], index) => {
    const row = chartDataRow + 2 + index;
    setCell(ws, row, 1, period, styles.body);
    applyCurrency(wb, ws, row, 2, actual, styles.body);
    applyCurrency(wb, ws, row, 3, projectedValue, styles.body);
  });

  addChart(
    ws,
    "Forecast",
    "E5",
    "Historical vs Projected Payments",
    `$A$${chartDataRow + 2}:$A$${chartDataRow + 1 + chartRows.length}`,
    [
      {
        idx: 0,
        name: "Historical",
        valueRange: `$B$${chartDataRow + 2}:$B$${chartDataRow + 1 + chartRows.length}`,
      },
      {
        idx: 1,
        name: "Projected",
        valueRange: `$C$${chartDataRow + 2}:$C$${chartDataRow + 1 + chartRows.length}`,
      },
    ],
    560,
    360
  );

  const noteRow = chartDataRow + chartRows.length + 3;
  setCell(ws, noteRow, 1, "IMPORTANT", styles.section);
  mergeCells(ws, `A${noteRow}:D${noteRow}`);
  setCell(
    ws,
    noteRow + 1,
    1,
    "Projected figures are estimates based on historical paid amounts. They are not guaranteed future revenue or client business revenue.",
    styles.note
  );
  mergeCells(ws, `A${noteRow + 1}:D${noteRow + 1}`);

  setColumnWidths(ws, [34, 24, 24, 24, 24, 20]);
  setFreezePanes(ws, "A4");

  return ws;
}

export function createClientReportWorkbook(report: ClientReport) {
  const wb = createWorkbook();
  const styles = makeStyles(wb);

  createExecutiveSummary(wb, report, styles);
  createWebsiteAnalytics(wb, report, styles);
  createProjectSheet(wb, report, styles);
  createFinancialSheet(wb, report, styles);
  createForecastSheet(wb, report, styles);

  return wb;
}

export async function generateClientReportExcel(
  report: ClientReport
): Promise<Buffer> {
  const workbook = createClientReportWorkbook(report);
  return workbookToBuffer(workbook);
}

export function getClientReportExcelFilename(
  report: ClientReport
) {
  const company =
    report.client.company ||
    report.client.name ||
    "client";

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

  return `vertex-studio-${safeCompany || "client"}-${date}.xlsx`;
}

export function getExcelReportDescription(
  type: ClientReportType
) {
  switch (type) {
    case "website":
      return "Website analytics and performance workbook.";

    case "project":
      return "Project progress and delivery workbook.";

    case "billing":
      return "Invoices, payments, balances, and projections workbook.";

    case "combined":
    default:
      return "Combined website, project, and financial client workbook.";
  }
}

export { formatNumber };
