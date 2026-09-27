// FILE: app/admin/contracts/page.tsx
// PURPOSE: Vertex Studio Works — Contracts / Finance with Vertex package generator.
// SOURCE: Current Vertex pricing/content supplied by the user.
// NOTE: Generated scope/terms are editable templates and should be reviewed before client use.
// DO NOT modify app/globals.css.

"use client";

import {
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Download,
  Eye,
  FileSignature,
  Filter,
  Loader2,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useVertexTheme } from "../components/VertexThemeProvider";

type ContractStatus =
  | "Draft"
  | "Sent"
  | "Review"
  | "Signed"
  | "Active"
  | "Completed"
  | "Expired"
  | "Cancelled";

type CreationMethod = "Vertex Package" | "Manual";
type PaymentPlan = "2 Payments" | "3 Payments" | "4 Payments" | "Monthly" | "Custom";

type PackageKey =
  | "launch"
  | "scale"
  | "enterprise"
  | "care-starter"
  | "care-growth"
  | "care-business"
  | "custom";

type PaymentItem = {
  label: string;
  percentage: number | null;
  amount: number;
  due: string;
};

type AddOn = {
  id: string;
  name: string;
  price: number;
  description: string;
};

type PackageDefinition = {
  key: PackageKey;
  category: string;
  name: string;
  price: number | null;
  pricingLabel: string;
  description: string;
  perks: string[];
  careMonths: number;
  carePlan: string;
};

type Contract = {
  id: string;
  clientId: string;
  projectId: string | null;
  contractNumber: string;
  title: string;
  status: ContractStatus;
  startDate: string | null;
  endDate: string | null;
  contractValue: number;
  scope: string;
  terms: string;
  clientSigned: boolean;
  clientSignedAt: string | null;
  documentUrl: string;
  notes: string;
  creationMethod: CreationMethod;
  serviceCategory: string;
  servicePackage: string;
  paymentPlan: PaymentPlan;
  paymentSchedule: PaymentItem[];
  complimentaryCareMonths: number;
  carePlan: string;
  createdAt: string;
  updatedAt: string;
  client?: { id: string; name: string; company: string; email: string } | null;
  project?: { id: string; name: string } | null;
};

type Client = { id: string; name: string; company: string; email: string };
type Project = { id: string; name: string; clientId?: string; client_id?: string };

type ContractForm = {
  creationMethod: CreationMethod;
  serviceCategory: string;
  packageKey: PackageKey;
  servicePackage: string;
  clientId: string;
  projectId: string;
  contractNumber: string;
  title: string;
  status: ContractStatus;
  startDate: string;
  endDate: string;
  contractValue: string;
  paymentPlan: PaymentPlan;
  paymentSchedule: PaymentItem[];
  scope: string;
  terms: string;
  complimentaryCareMonths: number;
  carePlan: string;
  addOns: AddOn[];
  clientSigned: boolean;
  clientSignedAt: string;
  documentUrl: string;
  notes: string;
};

const STATUS_OPTIONS: ContractStatus[] = [
  "Draft", "Sent", "Review", "Signed", "Active", "Completed", "Expired", "Cancelled",
];

const PAYMENT_PLANS: Record<PaymentPlan, { label: string; description: string; percentages: number[] | null }> = {
  "2 Payments": { label: "2 Payments", description: "50% Deposit • 50% Final", percentages: [50, 50] },
  "3 Payments": { label: "3 Payments", description: "50% Deposit • 25% Midway • 25% Final", percentages: [50, 25, 25] },
  "4 Payments": { label: "4 Payments", description: "30% Deposit • 25% Development • 25% Review • 20% Final", percentages: [30, 25, 25, 20] },
  Monthly: { label: "Monthly", description: "Monthly recurring payment — ideal for Vertex Care", percentages: null },
  Custom: { label: "Custom", description: "Set your own amounts and stages", percentages: null },
};

const PACKAGE_DEFINITIONS: PackageDefinition[] = [
  {
    key: "launch",
    category: "Website Development",
    name: "Launch",
    price: 39,
    pricingLabel: "$39 one-time project",
    description: "For startups, entrepreneurs, and small businesses that need a professional website.",
    perks: [
      "Up to 5 Custom Pages",
      "Premium Custom Design",
      "Mobile Responsive",
      "Basic SEO Setup",
      "Google Analytics Setup",
      "Contact Form Integration",
      "Basic Lead Capture Setup",
      "Conversion-Focused Layout",
      "Performance Optimization",
      "Website Backup Before Launch",
      "2 Months Complimentary Vertex Care",
    ],
    careMonths: 2,
    carePlan: "Included complimentary Vertex Care",
  },
  {
    key: "scale",
    category: "Website Development",
    name: "Scale",
    price: 79,
    pricingLabel: "$79 one-time project",
    description: "For growing businesses that want growth tools, lead generation, customer engagement, and e-commerce capabilities.",
    perks: [
      "Everything in Launch",
      "Unlimited Standard Website Pages",
      "CMS / Blog Integration",
      "Advanced SEO Setup",
      "Premium Animations",
      "Speed Optimization",
      "Lead Generation Dashboard",
      "Lead Capture & Tracking",
      "Conversion Optimization",
      "Google Analytics + Search Console",
      "Basic CRM / Lead Tracking Setup",
      "Cold Email Campaign Setup",
      "Prospect & Lead List Structure",
      "Email Outreach Templates",
      "Lead Follow-Up System",
      "Website + Lead Funnel Strategy",
      "Chatbot Integration",
      "E-Commerce Solutions",
      "E-Commerce Pricing Based on Requirements",
      "4 Months Complimentary Vertex Care",
    ],
    careMonths: 4,
    carePlan: "Included complimentary Vertex Care",
  },
  {
    key: "enterprise",
    category: "Enterprise / Custom Development",
    name: "Enterprise",
    price: null,
    pricingLabel: "Custom Quote • Project-Based",
    description: "For advanced websites, custom functionality, e-commerce, integrations, automation, and business systems.",
    perks: [
      "Unlimited Pages",
      "Custom Functionality",
      "Advanced E-Commerce",
      "Custom E-Commerce Features",
      "Booking Systems",
      "API / CRM Integrations",
      "Lead Generation Systems",
      "Advanced Analytics & Dashboards",
      "Marketing Automation",
      "Custom Outreach Systems",
      "Custom Chatbot / AI Assistant",
      "Advanced Business Systems",
      "Flexible Development",
      "Custom Website Care Options",
    ],
    careMonths: 0,
    carePlan: "Custom Website Care Options",
  },
  {
    key: "care-starter",
    category: "Website Care",
    name: "Vertex Care — Starter",
    price: 5,
    pricingLabel: "$5 per month",
    description: "Simple ongoing website maintenance and support.",
    perks: ["Basic Website Maintenance", "Minor Content Updates", "Basic Website Support", "Simple Website Changes"],
    careMonths: 0,
    carePlan: "Starter",
  },
  {
    key: "care-growth",
    category: "Website Care",
    name: "Vertex Care — Growth",
    price: 10,
    pricingLabel: "$10 per month",
    description: "Regular website updates and continued support.",
    perks: ["Everything in Starter", "More Content Updates", "Basic Performance Checks", "Analytics Review", "Ongoing Website Improvements", "Support for Growth Updates"],
    careMonths: 0,
    carePlan: "Growth",
  },
  {
    key: "care-business",
    category: "Website Care",
    name: "Vertex Care — Business",
    price: 15,
    pricingLabel: "$15 per month",
    description: "More hands-on website support and ongoing improvements.",
    perks: ["Everything in Growth", "More Frequent Updates", "Performance Monitoring", "Website Improvements", "Business Support", "Ongoing Optimization"],
    careMonths: 0,
    carePlan: "Business",
  },
  {
    key: "custom",
    category: "Custom Service",
    name: "Custom Service",
    price: null,
    pricingLabel: "Custom Quote",
    description: "Build a contract around a custom scope, service, or negotiated project.",
    perks: [],
    careMonths: 0,
    carePlan: "",
  },
];

const ADD_ON_CATALOG: AddOn[] = [
  { id: "extra-page", name: "Extra Custom Page", price: 10, description: "Additional custom-designed website page." },
  { id: "advanced-seo", name: "Advanced SEO Setup", price: 25, description: "Expanded on-page SEO setup and optimization." },
  { id: "cms-blog", name: "CMS / Blog Integration", price: 20, description: "CMS or blog setup for ongoing content publishing." },
  { id: "chatbot", name: "Chatbot Integration", price: 30, description: "Website chatbot integration and basic configuration." },
  { id: "booking", name: "Booking System", price: 35, description: "Online booking or appointment scheduling integration." },
  { id: "crm", name: "CRM Integration", price: 35, description: "Basic CRM or lead-management integration." },
  { id: "api", name: "API Integration", price: 50, description: "Custom API integration based on requirements." },
  { id: "ecommerce", name: "E-Commerce Setup", price: 75, description: "E-commerce functionality and storefront setup." },
  { id: "custom-development", name: "Custom Development", price: 50, description: "Custom functionality priced from the base amount." },
  { id: "care-extension", name: "Additional Vertex Care Month", price: 5, description: "Adds one additional month of Vertex Care." },
];

const EMPTY_FORM: ContractForm = {
  creationMethod: "Vertex Package",
  serviceCategory: "Website Development",
  packageKey: "launch",
  servicePackage: "Launch",
  clientId: "",
  projectId: "",
  contractNumber: "",
  title: "Launch Website Development Agreement",
  status: "Draft",
  startDate: "",
  endDate: "",
  contractValue: "39",
  paymentPlan: "3 Payments",
  paymentSchedule: [],
  scope: "",
  terms: "",
  complimentaryCareMonths: 2,
  carePlan: "Included complimentary Vertex Care",
  addOns: [],
  clientSigned: false,
  clientSignedAt: "",
  documentUrl: "",
  notes: "",
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);
}

function formatDate(value: string | null) {
  if (!value) return "—";
  const date = new Date(`${value.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function normalizeDate(value: unknown) { return value ? String(value).slice(0, 10) : ""; }
function generateContractNumber() { return `CON-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`; }
function responseMessage(data: any, fallback: string) { return data?.message || data?.error || data?.details || fallback; }

function normalizeContract(row: any): Contract {
  const client = Array.isArray(row?.clients) ? row.clients[0] : row?.clients;
  const project = Array.isArray(row?.projects) ? row.projects[0] : row?.projects;
  return {
    id: String(row?.id ?? ""),
    clientId: String(row?.client_id ?? row?.clientId ?? client?.id ?? ""),
    projectId: row?.project_id || row?.projectId || project?.id ? String(row?.project_id ?? row?.projectId ?? project?.id) : null,
    contractNumber: String(row?.contract_number ?? row?.contractNumber ?? ""),
    title: String(row?.title ?? ""),
    status: (row?.status ?? "Draft") as ContractStatus,
    startDate: row?.start_date ?? row?.startDate ?? null,
    endDate: row?.end_date ?? row?.endDate ?? null,
    contractValue: Number(row?.contract_value ?? row?.contractValue ?? 0),
    scope: String(row?.scope ?? ""),
    terms: String(row?.terms ?? ""),
    clientSigned: Boolean(row?.client_signed ?? row?.clientSigned ?? false),
    clientSignedAt: row?.client_signed_at ?? row?.clientSignedAt ?? null,
    documentUrl: String(row?.document_url ?? row?.documentUrl ?? ""),
    notes: String(row?.notes ?? ""),
    creationMethod: (row?.creation_method ?? row?.creationMethod ?? "Manual") as CreationMethod,
    serviceCategory: String(row?.service_category ?? row?.serviceCategory ?? ""),
    servicePackage: String(row?.service_package ?? row?.servicePackage ?? ""),
    paymentPlan: (row?.payment_plan ?? row?.paymentPlan ?? "Custom") as PaymentPlan,
    paymentSchedule: Array.isArray(row?.payment_schedule ?? row?.paymentSchedule) ? (row?.payment_schedule ?? row?.paymentSchedule) : [],
    complimentaryCareMonths: Number(row?.complimentary_care_months ?? row?.complimentaryCareMonths ?? 0),
    carePlan: String(row?.care_plan ?? row?.carePlan ?? ""),
    createdAt: String(row?.created_at ?? row?.createdAt ?? ""),
    updatedAt: String(row?.updated_at ?? row?.updatedAt ?? ""),
    client: client ? { id: String(client.id ?? ""), name: String(client.name ?? ""), company: String(client.company ?? ""), email: String(client.email ?? "") } : null,
    project: project ? { id: String(project.id ?? ""), name: String(project.name ?? "") } : null,
  };
}

function getStatusClasses(status: ContractStatus) {
  if (status === "Signed" || status === "Active") return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
  if (status === "Completed") return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
  if (status === "Sent") return "border-blue-400/20 bg-blue-400/10 text-blue-300";
  if (status === "Review") return "border-amber-400/20 bg-amber-400/10 text-amber-300";
  if (status === "Expired" || status === "Cancelled") return "border-rose-400/20 bg-rose-400/10 text-rose-300";
  return "border-white/10 bg-white/5 text-white/55";
}

function buildPaymentSchedule(plan: PaymentPlan, total: number): PaymentItem[] {
  if (plan === "Monthly") return [{ label: "Monthly", percentage: null, amount: total, due: "Monthly" }];
  const percentages = PAYMENT_PLANS[plan].percentages;
  if (!percentages) return [{ label: "Custom", percentage: null, amount: total, due: "Custom" }];
  const labels = plan === "2 Payments" ? ["Deposit", "Final Payment"] : plan === "3 Payments" ? ["Deposit", "Midway", "Final Payment"] : ["Deposit", "Development", "Review", "Final Payment"];
  return percentages.map((percentage, index) => ({ label: labels[index], percentage, amount: Math.round(total * percentage) / 100, due: labels[index] }));
}

function buildScope(pkg: PackageDefinition, addOns: AddOn[] = []) {
  const lines = pkg.perks.length ? pkg.perks.map((item) => `• ${item}`).join("\n") : "• Custom scope and deliverables to be defined below.";
  const addOnLines = addOns.length
    ? `\n\nADDITIONAL SERVICES / ADD-ONS\n${addOns.map((item) => `• ${item.name} — ${formatCurrency(item.price)}${item.description ? `\n  ${item.description}` : ""}`).join("\n")}`
    : "";
  return `PROJECT SCOPE\n\nVertex Studio Works will provide the ${pkg.name} service under the ${pkg.category} category.\n\n${pkg.description}\n\nINCLUDED DELIVERABLES\n${lines}${addOnLines}\n\nAdditional requirements outside the listed scope may be quoted separately and must be approved before work is added.`;
}

function buildTerms(pkg: PackageDefinition, plan: PaymentPlan, schedule: PaymentItem[], total: number, addOns: AddOn[] = []) {
  const paymentLines = schedule.map((item) => `${item.label}${item.percentage !== null ? ` (${item.percentage}%)` : ""} — ${formatCurrency(item.amount)}`).join("\n");
  const addOnSummary = addOns.length ? `\nADDITIONAL SERVICES\n${addOns.map((item) => `• ${item.name} — ${formatCurrency(item.price)}`).join("\n")}\n` : "";
  const care = pkg.careMonths > 0
    ? `The package includes ${pkg.careMonths} month${pkg.careMonths === 1 ? "" : "s"} of complimentary Vertex Care after launch. Any paid care arrangement after the complimentary period is separate.`
    : pkg.key === "enterprise"
      ? "Website care is available through a custom arrangement where included in the approved proposal."
      : pkg.category === "Website Care"
        ? `The selected Vertex Care plan is ${pkg.carePlan} and is billed monthly.`
        : "Any ongoing maintenance or support not included in the selected package is quoted separately.";
  return `PAYMENT TERMS\n\nTotal contract value: ${pkg.price === null ? "Custom Quote" : formatCurrency(total)}\n${addOnSummary}\nPayment plan: ${PAYMENT_PLANS[plan].description}\n\n${paymentLines}\n\nPROJECT TERMS\n\n• Work outside the agreed scope requires approval and may require an additional quotation.\n• The client is responsible for providing required content, branding assets, credentials, feedback, and approvals needed for the project.\n• Project timing may change when required materials, feedback, or approvals are delayed.\n• Vertex Studio Works will move the project through the applicable discovery, planning, design, development, testing, and launch stages.\n• Final launch and handover are subject to completion of the agreed deliverables and applicable payments.\n• ${care}\n\nThis generated text is a working contract template. Review and customize it before sending or signing.`;
}

export default function ContractsPage() {
  useVertexTheme();
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ContractStatus>("All");
  const [clientFilter, setClientFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [form, setForm] = useState<ContractForm>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<Contract | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadData = async () => {
    setLoading(true); setError("");
    try {
      const response = await fetch("/api/admin/contracts", { cache: "no-store" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(responseMessage(data, "Unable to load contracts."));
      setContracts(Array.isArray(data.contracts) ? data.contracts.map(normalizeContract) : []);
      setClients(Array.isArray(data.clients) ? data.clients.map((c: any) => ({ id: String(c?.id ?? ""), name: String(c?.name ?? ""), company: String(c?.company ?? ""), email: String(c?.email ?? "") })) : []);
      setProjects(Array.isArray(data.projects) ? data.projects.map((p: any) => ({ id: String(p?.id ?? ""), name: String(p?.name ?? ""), clientId: p?.client_id ?? p?.clientId, client_id: p?.client_id })) : []);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to load contracts."); }
    finally { setLoading(false); }
  };

  useEffect(() => { void loadData(); }, []);
  useEffect(() => { if (!toast) return; const t = window.setTimeout(() => setToast(""), 3500); return () => window.clearTimeout(t); }, [toast]);

  const stats = useMemo(() => ({
    total: contracts.length,
    active: contracts.filter((c) => c.status === "Active" || c.status === "Signed").length,
    pending: contracts.filter((c) => ["Draft", "Sent", "Review"].includes(c.status)).length,
    value: contracts.reduce((sum, c) => sum + c.contractValue, 0),
  }), [contracts]);

  const filteredContracts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contracts.filter((c) => {
      const matchesSearch = !q || [c.contractNumber, c.title, c.client?.name, c.client?.company, c.project?.name, c.servicePackage].some((v) => String(v ?? "").toLowerCase().includes(q));
      return matchesSearch && (statusFilter === "All" || c.status === statusFilter) && (clientFilter === "All" || c.clientId === clientFilter);
    });
  }, [contracts, search, statusFilter, clientFilter]);

  const visibleProjects = useMemo(() => form.clientId ? projects.filter((p) => p.clientId === form.clientId || p.client_id === form.clientId) : projects, [projects, form.clientId]);
  const selectedPackage = useMemo(() => PACKAGE_DEFINITIONS.find((p) => p.key === form.packageKey) ?? PACKAGE_DEFINITIONS[0], [form.packageKey]);
  const addOnTotal = useMemo(() => form.addOns.reduce((sum, item) => sum + Number(item.price || 0), 0), [form.addOns]);
  const basePackagePrice = selectedPackage.price ?? 0;

  const availableAddOns = useMemo(() => {
    const allowedByPackage: Record<PackageKey, string[]> = {
      launch: ["extra-page", "advanced-seo", "cms-blog", "chatbot", "booking", "crm", "api", "ecommerce", "custom-development", "care-extension"],
      scale: ["booking", "api", "custom-development", "care-extension"],
      enterprise: [],
      "care-starter": [],
      "care-growth": [],
      "care-business": [],
      custom: [],
    };
    const allowed = new Set(allowedByPackage[selectedPackage.key] ?? []);
    return ADD_ON_CATALOG.filter((item) => allowed.has(item.id));
  }, [selectedPackage.key]);

  const applyPackage = (key: PackageKey, current = form) => {
    const pkg = PACKAGE_DEFINITIONS.find((p) => p.key === key) ?? PACKAGE_DEFINITIONS[0];
    const total = pkg.price ?? Number(current.contractValue || 0);
    const plan: PaymentPlan = pkg.category === "Website Care" ? "Monthly" : current.paymentPlan === "Monthly" ? "3 Payments" : current.paymentPlan;
    const schedule = buildPaymentSchedule(plan, total);
    setForm((f) => ({
      ...f,
      packageKey: key,
      serviceCategory: pkg.category,
      servicePackage: pkg.name,
      title: `${pkg.name} ${pkg.category} Agreement`,
      contractValue: pkg.price === null ? f.contractValue : String(pkg.price),
      addOns: [],
      scope: buildScope(pkg, []),
      terms: buildTerms(pkg, plan, schedule, total, []),
      paymentPlan: plan,
      paymentSchedule: schedule,
      complimentaryCareMonths: pkg.careMonths,
      carePlan: pkg.carePlan,
    }));
  };

  const toggleAddOn = (catalogItem: AddOn) => {
    setForm((f) => {
      const exists = f.addOns.some((item) => item.id === catalogItem.id);
      const nextAddOns = exists
        ? f.addOns.filter((item) => item.id !== catalogItem.id)
        : [...f.addOns, { ...catalogItem }];
      const base = selectedPackage.price ?? Number(f.contractValue || 0);
      const total = base + nextAddOns.reduce((sum, item) => sum + Number(item.price || 0), 0);
      const schedule = buildPaymentSchedule(f.paymentPlan, total);
      return {
        ...f,
        addOns: nextAddOns,
        contractValue: String(total),
        paymentSchedule: schedule,
        scope: buildScope(selectedPackage, nextAddOns),
        terms: buildTerms(selectedPackage, f.paymentPlan, schedule, total, nextAddOns),
      };
    });
  };

  const updateAddOn = (id: string, field: "name" | "price" | "description", value: string) => {
    setForm((f) => {
      const nextAddOns = f.addOns.map((item) => item.id === id
        ? { ...item, [field]: field === "price" ? Number(value) || 0 : value }
        : item
      );
      const base = selectedPackage.price ?? 0;
      const total = base + nextAddOns.reduce((sum, item) => sum + Number(item.price || 0), 0);
      const schedule = buildPaymentSchedule(f.paymentPlan, total);
      return {
        ...f,
        addOns: nextAddOns,
        contractValue: String(total),
        paymentSchedule: schedule,
        scope: buildScope(selectedPackage, nextAddOns),
        terms: buildTerms(selectedPackage, f.paymentPlan, schedule, total, nextAddOns),
      };
    });
  };

  const addCustomAddOn = () => {
    setForm((f) => {
      const nextAddOns = [...f.addOns, { id: `custom-${Date.now()}`, name: "Custom Service", price: 0, description: "" }];
      const total = (selectedPackage.price ?? 0) + nextAddOns.reduce((sum, item) => sum + Number(item.price || 0), 0);
      const schedule = buildPaymentSchedule(f.paymentPlan, total);
      return { ...f, addOns: nextAddOns, contractValue: String(total), paymentSchedule: schedule, scope: buildScope(selectedPackage, nextAddOns), terms: buildTerms(selectedPackage, f.paymentPlan, schedule, total, nextAddOns) };
    });
  };

  const removeAddOn = (id: string) => {
    setForm((f) => {
      const nextAddOns = f.addOns.filter((item) => item.id !== id);
      const total = (selectedPackage.price ?? 0) + nextAddOns.reduce((sum, item) => sum + Number(item.price || 0), 0);
      const schedule = buildPaymentSchedule(f.paymentPlan, total);
      return { ...f, addOns: nextAddOns, contractValue: String(total), paymentSchedule: schedule, scope: buildScope(selectedPackage, nextAddOns), terms: buildTerms(selectedPackage, f.paymentPlan, schedule, total, nextAddOns) };
    });
  };

  const changePaymentPlan = (plan: PaymentPlan) => {
    const total = Number(form.contractValue || 0);
    const schedule = buildPaymentSchedule(plan, Number.isFinite(total) ? total : 0);
    setForm((f) => ({ ...f, paymentPlan: plan, paymentSchedule: schedule, terms: buildTerms(selectedPackage, plan, schedule, Number.isFinite(total) ? total : 0, form.addOns) }));
  };

  const updateCustomPayment = (index: number, field: keyof PaymentItem, value: string) => {
    setForm((f) => {
      const next = [...f.paymentSchedule];
      const item = { ...next[index] };
      if (field === "amount") item.amount = Number(value) || 0;
      if (field === "percentage") item.percentage = value === "" ? null : Number(value);
      if (field === "label") item.label = value;
      if (field === "due") item.due = value;
      next[index] = item;
      return { ...f, paymentSchedule: next };
    });
  };

  const openCreate = () => {
    const initial = { ...EMPTY_FORM, contractNumber: generateContractNumber() };
    setEditingContract(null); setForm(initial); setError(""); setModalOpen(true);
    window.setTimeout(() => applyPackage("launch", initial), 0);
  };

  const openEdit = (contract: Contract) => {
    const key = PACKAGE_DEFINITIONS.find((p) => p.name === contract.servicePackage)?.key ?? "custom";
    setEditingContract(contract);
    setForm({
      creationMethod: contract.creationMethod,
      serviceCategory: contract.serviceCategory,
      packageKey: key,
      servicePackage: contract.servicePackage,
      clientId: contract.clientId,
      projectId: contract.projectId ?? "",
      contractNumber: contract.contractNumber,
      title: contract.title,
      status: contract.status,
      startDate: normalizeDate(contract.startDate),
      endDate: normalizeDate(contract.endDate),
      contractValue: String(contract.contractValue),
      paymentPlan: contract.paymentPlan,
      paymentSchedule: contract.paymentSchedule,
      scope: contract.scope,
      terms: contract.terms,
      complimentaryCareMonths: contract.complimentaryCareMonths,
      carePlan: contract.carePlan,
      addOns: [],
      clientSigned: contract.clientSigned,
      clientSignedAt: contract.clientSignedAt ? new Date(contract.clientSignedAt).toISOString().slice(0, 16) : "",
      documentUrl: contract.documentUrl,
      notes: contract.notes,
    });
    setError(""); setModalOpen(true);
  };

  const closeModal = () => { if (saving) return; setModalOpen(false); setEditingContract(null); setForm(EMPTY_FORM); setError(""); };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.clientId) return setError("Please select a client.");
    if (!form.contractNumber.trim()) return setError("Contract number is required.");
    if (!form.title.trim()) return setError("Contract title is required.");
    const contractValue = Number(form.contractValue);
    if (!Number.isFinite(contractValue) || contractValue < 0) return setError("Contract value must be a valid number.");
    if (form.paymentPlan !== "Custom" && form.paymentPlan !== "Monthly") {
      const total = form.paymentSchedule.reduce((sum, item) => sum + Number(item.amount || 0), 0);
      if (Math.abs(total - contractValue) > 0.02) return setError("Payment schedule does not equal the contract value.");
    }
    setSaving(true); setError("");
    const payload = {
      clientId: form.clientId,
      projectId: form.projectId || null,
      contractNumber: form.contractNumber.trim(),
      title: form.title.trim(),
      status: form.status,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
      contractValue,
      scope: form.scope.trim(),
      terms: form.terms.trim(),
      clientSigned: form.clientSigned,
      clientSignedAt: form.clientSignedAt ? new Date(form.clientSignedAt).toISOString() : null,
      documentUrl: form.documentUrl.trim(),
      notes: form.notes.trim(),
      creationMethod: form.creationMethod,
      serviceCategory: form.serviceCategory,
      servicePackage: form.servicePackage,
      paymentPlan: form.paymentPlan,
      paymentSchedule: form.paymentSchedule,
      complimentaryCareMonths: form.complimentaryCareMonths,
      carePlan: form.carePlan,
    };
    try {
      const response = await fetch("/api/admin/contracts", { method: editingContract ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(editingContract ? { id: editingContract.id, ...payload } : payload) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(responseMessage(data, editingContract ? "Unable to update contract." : "Unable to create contract."));
      setToast(editingContract ? "Contract updated successfully." : "Contract created successfully."); closeModal(); await loadData();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save contract."); }
    finally { setSaving(false); }
  };

  const previewContract = (contract: Contract) => {
    window.open(`/api/admin/contracts/pdf?id=${encodeURIComponent(contract.id)}`, "_blank", "noopener,noreferrer");
  };

  const downloadContract = async (contract: Contract) => {
    setError("");
    try {
      const response = await fetch(`/api/admin/contracts/pdf?id=${encodeURIComponent(contract.id)}&download=1`, { cache: "no-store" });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(responseMessage(data, "Unable to download contract PDF."));
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${contract.contractNumber}-${contract.title}`.replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() + ".pdf";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.URL.revokeObjectURL(url);
      setToast("Contract PDF downloaded.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to download contract PDF.");
    }
  };

  const deleteContract = async () => {
    if (!deleteTarget) return; setDeleting(true); setError("");
    try {
      const response = await fetch(`/api/admin/contracts?id=${encodeURIComponent(deleteTarget.id)}`, { method: "DELETE" });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(responseMessage(data, "Unable to delete contract."));
      setToast("Contract deleted successfully."); setDeleteTarget(null); await loadData();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to delete contract."); }
    finally { setDeleting(false); }
  };

  return (
    <main className="min-h-full px-4 py-5 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--vertex-bg)", color: "var(--vertex-text)" }}>
      <div className="mx-auto max-w-[1600px] space-y-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[11px] font-medium text-[var(--vertex-muted)]"><span>Finance</span><span>/</span><span>Contracts</span></div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border" style={{ borderColor: "var(--vertex-accent-soft)", backgroundColor: "var(--vertex-accent-soft)", color: "var(--vertex-accent)" }}><FileSignature size={20} /></div>
              <div><h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Contracts</h1><p className="mt-0.5 text-xs text-[var(--vertex-muted)]">Generate Vertex package agreements, manage terms, signatures, and payment schedules.</p></div>
            </div>
          </div>
          <button type="button" onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white shadow-lg transition hover:opacity-90" style={{ backgroundColor: "var(--vertex-accent)" }}><Plus size={16} />New Contract</button>
        </div>

        {error && !modalOpen && <div className="flex items-start gap-3 rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200"><span>!</span><div className="flex-1">{error}</div><button onClick={() => setError("")}><X size={16} /></button></div>}

        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[{ label: "Total Contracts", value: String(stats.total), icon: FileSignature }, { label: "Active / Signed", value: String(stats.active), icon: CheckCircle2 }, { label: "Pending", value: String(stats.pending), icon: ClipboardList }, { label: "Contract Value", value: formatCurrency(stats.value), icon: CalendarDays }].map((stat) => { const Icon = stat.icon; return <div key={stat.label} className="rounded-2xl border p-4" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface)" }}><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--vertex-muted)]">{stat.label}</p><p className="mt-2 text-xl font-semibold">{stat.value}</p></div><div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: "var(--vertex-accent-soft)", color: "var(--vertex-accent)" }}><Icon size={15} /></div></div></div>; })}
        </div>

        <div className="rounded-2xl border p-3" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface)" }}>
          <div className="flex flex-col gap-3 lg:flex-row"><div className="relative min-w-0 flex-1"><Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--vertex-muted)]" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search contracts, packages, clients, projects..." className="h-10 w-full rounded-xl border bg-transparent pl-9 pr-3 text-xs outline-none placeholder:text-white/25 focus:border-[var(--vertex-accent)]" style={{ borderColor: "var(--vertex-border)" }} /></div><div className="flex items-center gap-2"><Filter size={14} className="text-[var(--vertex-muted)]" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="h-10 rounded-xl border bg-[#0b1020] px-3 text-xs outline-none" style={{ borderColor: "var(--vertex-border)" }}><option value="All">All Statuses</option>{STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}</select><select value={clientFilter} onChange={(e) => setClientFilter(e.target.value)} className="h-10 max-w-[220px] rounded-xl border bg-[#0b1020] px-3 text-xs outline-none" style={{ borderColor: "var(--vertex-border)" }}><option value="All">All Clients</option>{clients.map((c) => <option key={c.id} value={c.id}>{c.company || c.name}</option>)}</select></div></div>
        </div>

        <div className="overflow-hidden rounded-2xl border" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface)" }}>
          {loading ? <div className="flex min-h-[300px] items-center justify-center text-xs text-[var(--vertex-muted)]"><Loader2 size={16} className="mr-2 animate-spin" />Loading contracts...</div> : filteredContracts.length === 0 ? <div className="flex min-h-[320px] flex-col items-center justify-center px-6 text-center"><div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: "var(--vertex-accent-soft)", color: "var(--vertex-accent)" }}><FileSignature size={21} /></div><h2 className="text-sm font-semibold">{contracts.length === 0 ? "No contracts yet" : "No contracts match your filters"}</h2><p className="mt-1 max-w-md text-xs text-[var(--vertex-muted)]">{contracts.length === 0 ? "Generate your first Vertex package agreement or create a manual contract." : "Try changing your search or filters."}</p>{contracts.length === 0 && <button onClick={openCreate} className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white" style={{ backgroundColor: "var(--vertex-accent)" }}><Plus size={15} />Create Contract</button>}</div> : <div className="overflow-x-auto"><table className="w-full min-w-[1200px] text-left"><thead><tr className="border-b text-[9px] font-semibold uppercase tracking-[0.14em] text-[var(--vertex-muted)]" style={{ borderColor: "var(--vertex-border)" }}><th className="px-5 py-3">Contract</th><th className="px-4 py-3">Client</th><th className="px-4 py-3">Package</th><th className="px-4 py-3">Payment</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Value</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody>{filteredContracts.map((c) => <tr key={c.id} className="border-b hover:bg-white/[0.025]" style={{ borderColor: "var(--vertex-border)" }}><td className="px-5 py-4"><p className="text-xs font-semibold">{c.title}</p><p className="mt-0.5 text-[10px] text-[var(--vertex-muted)]">{c.contractNumber}</p></td><td className="px-4 py-4"><p className="text-xs font-medium">{c.client?.company || c.client?.name || "—"}</p><p className="mt-0.5 text-[10px] text-[var(--vertex-muted)]">{c.project?.name || "No project"}</p></td><td className="px-4 py-4"><p className="text-xs">{c.servicePackage || "Custom"}</p><p className="mt-0.5 text-[10px] text-[var(--vertex-muted)]">{c.serviceCategory || "Manual"}</p></td><td className="px-4 py-4"><p className="text-xs">{c.paymentPlan}</p><p className="mt-0.5 text-[10px] text-[var(--vertex-muted)]">{c.paymentSchedule.length} stage{c.paymentSchedule.length === 1 ? "" : "s"}</p></td><td className="px-4 py-4"><span className={`inline-flex rounded-full border px-2.5 py-1 text-[9px] font-semibold ${getStatusClasses(c.status)}`}>{c.status}</span>{c.clientSigned && <p className="mt-1 flex items-center gap-1 text-[9px] text-emerald-300"><Check size={10} />Client signed</p>}</td><td className="px-4 py-4 text-right text-xs font-semibold">{formatCurrency(c.contractValue)}</td><td className="px-5 py-4"><div className="flex justify-end gap-1.5"><button onClick={() => previewContract(c)} className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white" title="Preview PDF"><Eye size={14} /></button><button onClick={() => void downloadContract(c)} className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white" title="Download PDF"><Download size={14} /></button><button onClick={() => openEdit(c)} className="rounded-lg p-2 text-white/40 hover:bg-white/5 hover:text-white" title="Edit"><Pencil size={14} /></button><button onClick={() => setDeleteTarget(c)} className="rounded-lg p-2 text-white/40 hover:bg-rose-400/10 hover:text-rose-300" title="Delete"><Trash2 size={14} /></button></div></td></tr>)}</tbody></table></div>}
        </div>
      </div>

      {modalOpen && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"><div className="max-h-[94vh] w-full max-w-6xl overflow-hidden rounded-2xl border shadow-2xl" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface)" }}>
        <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--vertex-border)" }}><div><h2 className="text-sm font-semibold">{editingContract ? "Edit Contract" : "Create Contract"}</h2><p className="mt-1 text-[10px] text-[var(--vertex-muted)]">Choose a Vertex package to auto-fill price, perks, scope, care, and payment terms — or switch to Manual.</p></div><button onClick={closeModal} className="rounded-lg p-2 text-white/45 hover:bg-white/5 hover:text-white"><X size={17} /></button></div>
        <form onSubmit={submit} className="max-h-[calc(94vh-76px)] overflow-y-auto"><div className="space-y-5 p-5">
          <section className="rounded-2xl border p-4" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface-2)" }}>
            <div className="mb-3 flex items-center gap-2"><Sparkles size={15} style={{ color: "var(--vertex-accent)" }} /><p className="text-xs font-semibold">Contract Builder</p></div>
            <div className="grid gap-3 lg:grid-cols-2"><button type="button" onClick={() => { setForm((f) => ({ ...f, creationMethod: "Vertex Package" })); applyPackage("launch"); }} className={`rounded-xl border p-4 text-left ${form.creationMethod === "Vertex Package" ? "border-[var(--vertex-accent)]" : ""}`} style={{ backgroundColor: form.creationMethod === "Vertex Package" ? "var(--vertex-accent-soft)" : "var(--vertex-surface)" }}><p className="text-xs font-semibold">✦ Use Vertex Package</p><p className="mt-1 text-[10px] text-[var(--vertex-muted)]">Generate from your current website pricing and perks.</p></button><button type="button" onClick={() => setForm((f) => ({ ...f, creationMethod: "Manual", packageKey: "custom", servicePackage: "", serviceCategory: "Custom Service", title: "", contractValue: "0", paymentPlan: "Custom", paymentSchedule: [{ label: "Custom Stage", percentage: 100, amount: 0, due: "Custom" }], scope: "", terms: "", complimentaryCareMonths: 0, carePlan: "" }))} className={`rounded-xl border p-4 text-left ${form.creationMethod === "Manual" ? "border-[var(--vertex-accent)]" : ""}`} style={{ backgroundColor: form.creationMethod === "Manual" ? "var(--vertex-accent-soft)" : "var(--vertex-surface)" }}><p className="text-xs font-semibold">✎ Manual Contract</p><p className="mt-1 text-[10px] text-[var(--vertex-muted)]">Build the scope, price, terms, and payment schedule yourself.</p></button></div>
          </section>

          {form.creationMethod === "Vertex Package" && <section className="rounded-2xl border p-4" style={{ borderColor: "var(--vertex-border)" }}><div className="mb-3 flex items-center justify-between"><div><p className="text-xs font-semibold">Vertex Product</p><p className="mt-1 text-[10px] text-[var(--vertex-muted)]">Selecting a package automatically loads its current price and perks.</p></div><ChevronDown size={15} className="text-[var(--vertex-muted)]" /></div><div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">{PACKAGE_DEFINITIONS.filter((p) => p.key !== "custom").map((pkg) => <button type="button" key={pkg.key} onClick={() => applyPackage(pkg.key)} className={`rounded-xl border p-3 text-left transition ${form.packageKey === pkg.key ? "ring-1" : ""}`} style={{ borderColor: form.packageKey === pkg.key ? "var(--vertex-accent)" : "var(--vertex-border)", backgroundColor: form.packageKey === pkg.key ? "var(--vertex-accent-soft)" : "var(--vertex-surface)" }}><p className="text-[11px] font-semibold">{pkg.name}</p><p className="mt-1 text-[10px] text-[var(--vertex-accent)]">{pkg.pricingLabel}</p><p className="mt-2 line-clamp-2 text-[9px] leading-4 text-[var(--vertex-muted)]">{pkg.description}</p></button>)}</div><div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.2fr]"><div><p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--vertex-muted)]">Included Perks</p><div className="grid gap-2 sm:grid-cols-2">{selectedPackage.perks.map((perk) => <div key={perk} className="flex gap-2 text-[10px] text-white/75"><Check size={12} className="mt-0.5 shrink-0 text-emerald-300" />{perk}</div>)}</div></div><div className="rounded-xl border p-4" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface-2)" }}><p className="text-[10px] uppercase tracking-wider text-[var(--vertex-muted)]">Package Summary</p><p className="mt-2 text-lg font-semibold">{selectedPackage.price === null ? "Custom Quote" : formatCurrency(selectedPackage.price)}{selectedPackage.price !== null && selectedPackage.category === "Website Care" ? <span className="text-xs text-[var(--vertex-muted)]"> / month</span> : ""}</p><p className="mt-1 text-[10px] text-[var(--vertex-muted)]">{selectedPackage.pricingLabel}</p>{selectedPackage.careMonths > 0 && <div className="mt-3 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-[10px] text-emerald-200">Includes {selectedPackage.careMonths} months complimentary Vertex Care.</div>}</div></div></section>}

          {form.creationMethod === "Vertex Package" && (
            <section className="rounded-2xl border p-4" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface)" }}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-[var(--vertex-accent)]" />
                    <p className="text-xs font-semibold">Additional Services / Add-ons</p>
                  </div>
                  <p className="mt-1 text-[10px] text-[var(--vertex-muted)]">Customize a Vertex package without switching to Manual. Selected add-ons are included in the scope and contract value.</p>
                </div>
                <button type="button" onClick={addCustomAddOn} className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-[10px] font-semibold" style={{ borderColor: "var(--vertex-border)", color: "var(--vertex-accent)" }}><Plus size={13} />Custom Add-on</button>
              </div>

              <div className="mt-3 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-[10px] leading-4 text-emerald-100/80">
                Only services that are <span className="font-semibold text-emerald-200">not already included</span> in the selected package appear below. Included package features are never presented as duplicate paid add-ons.
              </div>

              {availableAddOns.length > 0 ? (
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {availableAddOns.map((item) => {
                    const selected = form.addOns.some((addOn) => addOn.id === item.id);
                    return (
                      <button type="button" key={item.id} onClick={() => toggleAddOn(item)} className="rounded-xl border p-3 text-left transition" style={{ borderColor: selected ? "var(--vertex-accent)" : "var(--vertex-border)", backgroundColor: selected ? "var(--vertex-accent-soft)" : "var(--vertex-surface-2)" }}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex gap-2">
                            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border" style={{ borderColor: selected ? "var(--vertex-accent)" : "var(--vertex-border)", backgroundColor: selected ? "var(--vertex-accent)" : "transparent", color: "white" }}>{selected && <Check size={10} />}</span>
                            <div><p className="text-[10px] font-semibold">{item.name}</p><p className="mt-1 text-[9px] leading-4 text-[var(--vertex-muted)]">{item.description}</p></div>
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold text-[var(--vertex-accent)]">+{formatCurrency(item.price)}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mt-4 rounded-xl border p-4" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface-2)" }}>
                  <p className="text-[10px] font-semibold">No preset paid add-ons for this package.</p>
                  <p className="mt-1 text-[9px] leading-4 text-[var(--vertex-muted)]">For Enterprise and Vertex Care, use <span className="font-semibold text-[var(--vertex-accent)]">Custom Add-on</span> for work that is outside the selected package or requires a separate quote.</p>
                </div>
              )}

              {form.addOns.length > 0 && (
                <div className="mt-4 rounded-xl border p-3" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface-2)" }}>
                  <div className="mb-2 flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--vertex-muted)]">Selected Add-ons</p><p className="text-[10px] font-semibold">Add-ons: {formatCurrency(addOnTotal)}</p></div>
                  <div className="space-y-2">
                    {form.addOns.map((item) => (
                      <div key={item.id} className="grid gap-2 rounded-lg border p-2 sm:grid-cols-[1.2fr_.6fr_1.5fr_auto]" style={{ borderColor: "var(--vertex-border)" }}>
                        <input value={item.name} onChange={(e) => updateAddOn(item.id, "name", e.target.value)} className="field" placeholder="Service name" />
                        <input type="number" min="0" step="0.01" value={item.price} onChange={(e) => updateAddOn(item.id, "price", e.target.value)} className="field" placeholder="Price" />
                        <input value={item.description} onChange={(e) => updateAddOn(item.id, "description", e.target.value)} className="field" placeholder="Description" />
                        <button type="button" onClick={() => removeAddOn(item.id)} className="flex h-10 items-center justify-center rounded-lg border px-3 text-rose-300" style={{ borderColor: "var(--vertex-border)" }} title="Remove add-on"><Trash2 size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t pt-3" style={{ borderColor: "var(--vertex-border)" }}>
                    <span className="text-[10px] text-[var(--vertex-muted)]">Base package: {selectedPackage.price === null ? "Custom Quote" : formatCurrency(basePackagePrice)}</span>
                    <span className="text-sm font-semibold">Contract total: {formatCurrency(Number(form.contractValue || 0))}</span>
                  </div>
                </div>
              )}
            </section>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field label="Contract Number" required><input value={form.contractNumber} onChange={(e) => setForm((f) => ({ ...f, contractNumber: e.target.value }))} className="field" /></Field><Field label="Status"><select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ContractStatus }))} className="field dark-select">{STATUS_OPTIONS.map((s) => <option key={s}>{s}</option>)}</select></Field></div><Field label="Contract Title" required><input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="field" placeholder="Website Development Agreement" /></Field><div className="grid gap-4 sm:grid-cols-2"><Field label="Client" required><select value={form.clientId} onChange={(e) => setForm((f) => ({ ...f, clientId: e.target.value, projectId: "" }))} className="field dark-select"><option value="">Select client</option>{clients.map((c) => <option key={c.id} value={c.id}>{c.company || c.name}</option>)}</select></Field><Field label="Project"><select value={form.projectId} onChange={(e) => setForm((f) => ({ ...f, projectId: e.target.value }))} className="field dark-select"><option value="">No project</option>{visibleProjects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></Field></div><div className="grid gap-4 sm:grid-cols-3"><Field label="Contract Value"><input type="number" min="0" step="0.01" value={form.contractValue} onChange={(e) => { const value = e.target.value; const amount = Number(value) || 0; const schedule = buildPaymentSchedule(form.paymentPlan, amount); setForm((f) => ({ ...f, contractValue: value, paymentSchedule: schedule, terms: buildTerms(selectedPackage, f.paymentPlan, schedule, amount, f.addOns) })); }} className="field" /></Field><Field label="Start Date"><input type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} className="field" /></Field><Field label="End Date"><input type="date" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} className="field" /></Field></div><Field label="Document URL"><input type="url" value={form.documentUrl} onChange={(e) => setForm((f) => ({ ...f, documentUrl: e.target.value }))} className="field" placeholder="https://..." /></Field></div>

            <div className="space-y-4"><section className="rounded-xl border p-4" style={{ borderColor: "var(--vertex-border)" }}><div className="flex items-center justify-between"><div><p className="text-xs font-semibold">Payment Plan</p><p className="mt-1 text-[10px] text-[var(--vertex-muted)]">The schedule is saved with the contract so it can later feed invoice installments.</p></div></div><div className="mt-3 grid gap-2 sm:grid-cols-2">{(Object.keys(PAYMENT_PLANS) as PaymentPlan[]).map((plan) => <button type="button" key={plan} onClick={() => changePaymentPlan(plan)} className="rounded-xl border p-3 text-left" style={{ borderColor: form.paymentPlan === plan ? "var(--vertex-accent)" : "var(--vertex-border)", backgroundColor: form.paymentPlan === plan ? "var(--vertex-accent-soft)" : "var(--vertex-surface-2)" }}><p className="text-[10px] font-semibold">{PAYMENT_PLANS[plan].label}</p><p className="mt-1 text-[9px] text-[var(--vertex-muted)]">{PAYMENT_PLANS[plan].description}</p></button>)}</div><div className="mt-4 space-y-2">{form.paymentSchedule.map((item, index) => <div key={`${item.label}-${index}`} className="grid gap-2 sm:grid-cols-[1.2fr_.7fr_1fr_1fr]">{form.paymentPlan === "Custom" ? <input value={item.label} onChange={(e) => updateCustomPayment(index, "label", e.target.value)} className="field" placeholder="Stage" /> : <div className="field flex items-center">{item.label}</div>}{form.paymentPlan === "Custom" ? <input type="number" min="0" max="100" step="0.01" value={item.percentage ?? ""} onChange={(e) => updateCustomPayment(index, "percentage", e.target.value)} className="field" placeholder="%" /> : <div className="field flex items-center">{item.percentage === null ? "—" : `${item.percentage}%`}</div>}<div className="field flex items-center">{formatCurrency(item.amount)}</div>{form.paymentPlan === "Custom" ? <input value={item.due} onChange={(e) => updateCustomPayment(index, "due", e.target.value)} className="field" placeholder="Due" /> : <div className="field flex items-center">{item.due}</div>}</div>)}{form.paymentPlan === "Custom" && <button type="button" onClick={() => setForm((f) => ({ ...f, paymentSchedule: [...f.paymentSchedule, { label: "New Stage", percentage: 0, amount: 0, due: "Custom" }] }))} className="text-[10px] font-semibold text-[var(--vertex-accent)]">+ Add payment stage</button>}</div></section>
              {form.creationMethod === "Vertex Package" && <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4"><p className="text-xs font-semibold text-emerald-200">Vertex Care</p><p className="mt-1 text-[10px] text-emerald-100/70">{form.complimentaryCareMonths > 0 ? `${form.complimentaryCareMonths} months complimentary care included.` : form.carePlan || "No complimentary care included."}</p></div>}
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2"><Field label="Scope"><textarea value={form.scope} onChange={(e) => setForm((f) => ({ ...f, scope: e.target.value }))} className="field min-h-[260px] resize-y" placeholder="Generated package scope appears here. You can edit it before saving." /></Field><Field label="Terms"><textarea value={form.terms} onChange={(e) => setForm((f) => ({ ...f, terms: e.target.value }))} className="field min-h-[260px] resize-y" placeholder="Generated payment and project terms appear here. Review before sending." /></Field></div>
          <div className="grid gap-5 lg:grid-cols-2"><Field label="Internal Notes"><textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} className="field min-h-[100px] resize-y" placeholder="Internal notes..." /></Field><label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4" style={{ borderColor: "var(--vertex-border)" }}><input type="checkbox" checked={form.clientSigned} onChange={(e) => setForm((f) => ({ ...f, clientSigned: e.target.checked, clientSignedAt: e.target.checked ? f.clientSignedAt || new Date().toISOString().slice(0,16) : "" }))} className="mt-1 h-4 w-4" /><span><p className="text-xs font-medium">Client signed</p><p className="mt-1 text-[10px] text-[var(--vertex-muted)]">Mark the agreement as signed by the client.</p></span></label></div>
          {form.clientSigned && <Field label="Client Signed At"><input type="datetime-local" value={form.clientSignedAt} onChange={(e) => setForm((f) => ({ ...f, clientSignedAt: e.target.value }))} className="field" /></Field>}
          {error && <div className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-xs text-rose-200">{error}</div>}
        </div><div className="flex flex-col-reverse gap-2 border-t px-5 py-4 sm:flex-row sm:justify-end" style={{ borderColor: "var(--vertex-border)" }}><button type="button" onClick={closeModal} disabled={saving} className="rounded-xl border px-4 py-2.5 text-xs font-medium" style={{ borderColor: "var(--vertex-border)" }}>Cancel</button><button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white disabled:opacity-60" style={{ backgroundColor: "var(--vertex-accent)" }}>{saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}{saving ? "Saving..." : editingContract ? "Save Changes" : "Create Contract"}</button></div></form>
      </div></div>}

      {deleteTarget && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"><div className="w-full max-w-md rounded-2xl border p-5 shadow-2xl" style={{ borderColor: "var(--vertex-border)", backgroundColor: "var(--vertex-surface)" }}><div className="flex items-start gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-400/10 text-rose-300"><Trash2 size={17} /></div><div><h3 className="text-sm font-semibold">Delete contract?</h3><p className="mt-1 text-xs text-[var(--vertex-muted)]">This permanently removes {deleteTarget.contractNumber}.</p></div></div><div className="mt-5 flex justify-end gap-2"><button onClick={() => setDeleteTarget(null)} disabled={deleting} className="rounded-xl border px-4 py-2.5 text-xs" style={{ borderColor: "var(--vertex-border)" }}>Cancel</button><button onClick={deleteContract} disabled={deleting} className="inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-xs font-semibold text-white">{deleting && <Loader2 size={13} className="animate-spin" />}Delete Contract</button></div></div></div>}
      {toast && <div className="fixed bottom-5 right-5 z-[120] flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-[#0c1814] px-4 py-3 text-xs font-medium text-emerald-200 shadow-2xl"><CheckCircle2 size={15} />{toast}</div>}

      <style jsx>{`.field{width:100%;border:1px solid var(--vertex-border);border-radius:.75rem;background:var(--vertex-surface-2);color:var(--vertex-text);padding:.65rem .75rem;font-size:.75rem;line-height:1.2rem;outline:none}.field:focus{border-color:var(--vertex-accent);box-shadow:0 0 0 3px var(--vertex-accent-soft)}.field::placeholder{color:rgb(255 255 255 / .25)}.dark-select option{background:#0b1020;color:white}`}</style>
    </main>
  );
}

function Field({ label, required = false, children }: { label: string; required?: boolean; children: ReactNode }) {
  return <div><label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--vertex-muted)]">{label}{required && <span className="ml-1 text-rose-400">*</span>}</label>{children}</div>;
}
