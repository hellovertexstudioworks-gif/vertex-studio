/**
 * Vertex Intelligence Engine
 * ----------------------------------------
 * Local, zero-API-cost conversation engine for Vertex Assistant.
 *
 * This file intentionally does NOT call OpenAI, Resend, or any external API.
 * It is designed to be the "brain" behind the existing Chatbot.tsx UI.
 */

export type VertexMessage = {
  sender: "user" | "bot";
  text: string;
};

type Intent =
  | "greeting"
  | "name"
  | "thanks"
  | "goodbye"
  | "services"
  | "pricing"
  | "launch"
  | "scale"
  | "enterprise"
  | "care"
  | "website"
  | "ecommerce"
  | "seo"
  | "analytics"
  | "booking"
  | "chatbot"
  | "leads"
  | "startup"
  | "budget"
  | "platform"
  | "math"
  | "promotion"
  | "platformPricing"
  | "general"
  | "unknown";

type BusinessProfile = {
  businessType?: string;
  goal?: string;
  budget?: string;
  needsEcommerce?: boolean;
  needsSEO?: boolean;
  needsAnalytics?: boolean;
  needsBooking?: boolean;
  needsLeads?: boolean;
};

type ConversationState = {
  profile: BusinessProfile;
  lastIntent?: Intent;
  turnCount: number;
};

const CALENDLY_LINK =
  "https://calendly.com/hello-vertexstudioworks/30min";

/* =========================================================
   VERTEX KNOWLEDGE
========================================================= */

const VERTEX = {
  name: "Vertex Studio Works",

  positioning:
    "Vertex Studio Works builds modern websites, e-commerce experiences, and custom business systems for startups, entrepreneurs, and growing businesses.",

  philosophy:
    "We Build. We Grow. Together.",

  packages: {
    launch: {
      price: "$25",
      billing: "one-time",
      description:
        "A professional starting point for businesses that need a strong website without building everything at once.",
      features: [
        "Up to 5 custom pages",
        "Premium custom design",
        "Mobile responsive design",
        "Basic SEO",
        "Google Analytics",
        "Contact form",
        "Basic lead capture",
        "Conversion-focused layout",
        "Performance optimization",
        "Backup",
        "2 months complimentary Vertex Care",
      ],
    },

    scale: {
      price: "$50",
      billing: "one-time",
      description:
        "A broader growth-focused website package for businesses that need more content, SEO, lead generation, and growth tools.",
      features: [
        "Everything in Launch",
        "Unlimited standard pages",
        "CMS / blog",
        "Advanced SEO",
        "Premium animations",
        "Speed optimization",
        "Lead generation dashboard",
        "Lead capture and tracking",
        "Conversion optimization",
        "Analytics and Search Console",
        "Basic CRM / lead tracking",
        "Cold email campaign setup",
        "Prospect and lead list structure",
        "Email outreach templates",
        "Lead follow-up system",
        "Website + lead funnel strategy",
        "Priority support",
        "4 months complimentary Vertex Care",
      ],
    },

    enterprise: {
      price: "Custom quote",
      billing: "project-based",
      description:
        "For businesses needing custom functionality, advanced integrations, e-commerce, automation, or larger business systems.",
      features: [
        "Unlimited pages",
        "Custom functionality",
        "Booking systems",
        "E-commerce solutions",
        "API / CRM integrations",
        "Lead generation systems",
        "Advanced analytics and dashboards",
        "Marketing automation",
        "Custom outreach systems",
        "Dedicated planning",
        "Priority development",
        "Custom website care options",
      ],
    },
  },

  care: {
    starter: "$5/month",
    growth: "$10/month",
    business: "$15/month",
  },

  promotion: {
    amount: 10,
    label: "$10 OFF",
    description:
      "A $10 discount is available for a customer's first Vertex service, subject to the promotion's applicable terms.",
    link: CALENDLY_LINK,
  },

  competitorReference: {
    lastChecked: "September 21, 2026",
    note:
      "Competitor prices are reference prices only. They can vary by country, billing cycle, promotions, taxes, and plan selection. Do not present them as permanent prices.",

    shopify: {
      basic:
        "$19 USD/month when billed yearly on Shopify's Philippines pricing page; monthly pricing can be higher.",
      focus:
        "E-commerce and commerce operations, including products, orders, inventory, payments, and sales channels.",
    },

    wix: {
      basic:
        "Wix pricing varies by location. The current official pricing page displays Light at $17.77/month, Core at $29.77/month, and Business at $39.77/month on annual billing on the page checked.",
      focus:
        "Website building plus business tools, with hosting, templates, marketing, scheduling, and e-commerce depending on plan.",
    },

    squarespace: {
      basic:
        "Current Squarespace reference pricing is location-dependent. Its current plan structure is Basic, Core, Plus, and Advanced; official materials show annual-billing monthly-equivalent pricing around $19/month starting in some markets.",
      focus:
        "Website/content platform with hosting, design tools, analytics, commerce, scheduling, and other built-in business features depending on plan.",
    },

    godaddy: {
      basic:
        "GoDaddy's current official website-builder pricing varies by market. The US page checked shows a Basic plan at $9.99/month with annual billing.",
      focus:
        "Website builder and business tools with templates, hosting, domain options, marketing, analytics, and other features depending on plan.",
    },

    highlevel: {
      basic:
        "HighLevel's official pricing page currently lists Starter at $97/month, Unlimited at $297/month, and Agency Pro at $497/month. Usage-based charges and optional add-ons can apply.",
      focus:
        "CRM, funnels, websites, booking, email/SMS marketing, automation, reporting, AI, and agency tools.",
    },

    wordpress: {
      basic:
        "WordPress.com currently lists Personal at $9/month when billed yearly, Premium at $18/month, Business at $40/month, and Commerce at $70/month on its pricing page. Longer billing cycles can reduce the monthly-equivalent price.",
      focus:
        "WordPress website publishing with hosting, themes, plugins, content tools, and higher-tier business or commerce features depending on plan.",
    },
  },

  services: [
    "Website design",
    "Web development",
    "E-commerce",
    "SEO",
    "Analytics",
    "Lead generation",
    "CRM and lead tracking",
    "Marketing automation",
    "Business systems",
    "Website care",
    "Custom integrations",
    "Chatbot / assistant experiences",
  ],

  platforms: {
    shopify:
      "Shopify is strongly focused on e-commerce and uses recurring platform plans.",
    wix:
      "Wix is a website and business platform with recurring plans and built-in tools.",
    squarespace:
      "Squarespace is a website platform with recurring plans and built-in website tools.",
    godaddy:
      "GoDaddy provides website-building and other business tools through recurring plans.",
    highlevel:
      "GoHighLevel is an all-in-one CRM, marketing, automation, funnel, booking, and agency platform with recurring plans.",
    wordpress:
      "WordPress.com provides hosted WordPress plans with recurring pricing, while self-hosted WordPress can involve separate hosting, themes, plugins, domains, and maintenance depending on the setup.",
    vertex:
      "Vertex currently focuses on custom-built project work with one-time website packages and optional Care afterward.",
  },
} as const;

/* =========================================================
   TEXT NORMALIZATION
========================================================= */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s$.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compact(text: string): string {
  return normalize(text).replace(/\s/g, "");
}

function hasAny(text: string, terms: string[]): boolean {
  return terms.some((term) => text.includes(term));
}

function hasWord(text: string, word: string): boolean {
  return new RegExp(`\\b${word}\\b`, "i").test(text);
}

/* =========================================================
   LIGHT TYPO / INFORMAL LANGUAGE SUPPORT
========================================================= */

function expandCommonTypos(text: string): string {
  return text
    .replace(/\bwhats\b/g, "what is")
    .replace(/\bwat\b/g, "what")
    .replace(/\bpls\b/g, "please")
    .replace(/\bplz\b/g, "please")
    .replace(/\bu\b/g, "you")
    .replace(/\bur\b/g, "your")
    .replace(/\br\b/g, "are")
    .replace(/\bya\b/g, "you")
    .replace(/\bwebsitee\b/g, "website")
    .replace(/\bwebstie\b/g, "website")
    .replace(/\bwebiste\b/g, "website")
    .replace(/\bshopifyy\b/g, "shopify")
    .replace(/\bprcing\b/g, "pricing")
    .replace(/\bpricee\b/g, "price")
    .replace(/\bbusines\b/g, "business")
    .replace(/\bbusness\b/g, "business")
    .replace(/\bseo\b/g, "seo");
}

/* =========================================================
   BASIC LOCAL MATH
   ---------------------------------------------------------
   Handles simple arithmetic and common discount questions
   without an external calculator or API.
========================================================= */

function looksLikeMath(text: string): boolean {
  const cleaned = normalize(text);

  if (
    hasAny(cleaned, [
      "what is",
      "calculate",
      "equals",
      "plus",
      "minus",
      "times",
      "divided by",
      "percent of",
      "percentage of",
    ]) &&
    /\d/.test(cleaned)
  ) {
    return true;
  }

  return /^\s*\d+(?:\.\d+)?\s*(?:[+\-*/x×])\s*\d+(?:\.\d+)?(?:\s*(?:[+\-*/x×])\s*\d+(?:\.\d+)?)*\s*$/.test(
    cleaned
  );
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "I couldn't calculate that.";

  return Number.isInteger(value)
    ? value.toLocaleString("en-US")
    : value.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      });
}

function basicArithmetic(expression: string): number | null {
  const normalized = expression
    .toLowerCase()
    .replace(/×/g, "*")
    .replace(/x/g, "*")
    .replace(/÷/g, "/")
    .replace(/\btimes\b/g, "*")
    .replace(/\bdivided by\b/g, "/")
    .replace(/\bplus\b/g, "+")
    .replace(/\bminus\b/g, "-")
    .replace(/[^0-9.+\-*/()\s]/g, "");

  if (!normalized || !/[+\-*/]/.test(normalized)) return null;

  const tokens = normalized.match(/\d+(?:\.\d+)?|[()+\-*/]/g);
  if (!tokens) return null;

  const values: number[] = [];
  const operators: string[] = [];

  const precedence = (operator: string) =>
    operator === "+" || operator === "-" ? 1 : 2;

  const applyTop = (): boolean => {
    const operator = operators.pop();
    const right = values.pop();
    const left = values.pop();

    if (
      operator === undefined ||
      right === undefined ||
      left === undefined
    ) {
      return false;
    }

    if (operator === "/" && right === 0) return false;

    switch (operator) {
      case "+":
        values.push(left + right);
        return true;
      case "-":
        values.push(left - right);
        return true;
      case "*":
        values.push(left * right);
        return true;
      case "/":
        values.push(left / right);
        return true;
      default:
        return false;
    }
  };

  let expectingNumber = true;

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];

    if (/^\d/.test(token)) {
      values.push(Number(token));
      expectingNumber = false;
      continue;
    }

    if (token === "(") {
      operators.push(token);
      expectingNumber = true;
      continue;
    }

    if (token === ")") {
      while (
        operators.length &&
        operators[operators.length - 1] !== "("
      ) {
        if (!applyTop()) return null;
      }

      if (operators.pop() !== "(") return null;
      expectingNumber = false;
      continue;
    }

    if ("+-*/".includes(token)) {
      // Support a leading negative number such as -25.
      if (token === "-" && expectingNumber) {
        const next = tokens[i + 1];

        if (next && /^\d/.test(next)) {
          values.push(-Number(next));
          i += 1;
          expectingNumber = false;
          continue;
        }

        return null;
      }

      while (
        operators.length &&
        operators[operators.length - 1] !== "(" &&
        precedence(operators[operators.length - 1]) >=
          precedence(token)
      ) {
        if (!applyTop()) return null;
      }

      operators.push(token);
      expectingNumber = true;
      continue;
    }

    return null;
  }

  while (operators.length) {
    if (operators[operators.length - 1] === "(") return null;
    if (!applyTop()) return null;
  }

  return values.length === 1 ? values[0] : null;
}

function solveMathQuestion(text: string): string | null {
  const normalized = normalize(text);

  // Percent-of questions: "20% of 100", "20 percent of 100".
  const percentMatch = normalized.match(
    /(\d+(?:\.\d+)?)\s*%?\s*(?:percent|%)\s+of\s+(\d+(?:\.\d+)?)/
  );

  if (percentMatch) {
    const percent = Number(percentMatch[1]);
    const total = Number(percentMatch[2]);
    const result = (percent / 100) * total;

    return `${formatNumber(percent)}% of ${formatNumber(total)} is ${formatNumber(result)}.`;
  }

  // Discount questions: "10 off 49", "$10 off $49".
  const discountMatch = normalized.match(
    /(?:\$?\s*(\d+(?:\.\d+)?)\s*(?:dollars?\s*)?off)\s*(?:\$?\s*)?(\d+(?:\.\d+)?)/i
  );

  if (discountMatch) {
    const discount = Number(discountMatch[1]);
    const original = Number(discountMatch[2]);
    const finalPrice = original - discount;

    return `$${formatNumber(original)} - $${formatNumber(discount)} = $${formatNumber(finalPrice)}.`;
  }

  // Common "what is 10 + 5" style questions.
  const expressionMatch = normalized.match(
    /(?:what is|calculate|equals|=)?\s*(\d+(?:\.\d+)?(?:\s*(?:[+\-*/x×])\s*\d+(?:\.\d+)?)+)\s*\??$/
  );

  if (expressionMatch) {
    const result = basicArithmetic(expressionMatch[1]);

    if (result !== null) {
      return `${expressionMatch[1]} = ${formatNumber(result)}.`;
    }
  }

  // Natural-language arithmetic such as "10 plus 5".
  const naturalMatch = normalized.match(
    /(?:what is|calculate|equals)?\s*(\d+(?:\.\d+)?)\s+(plus|minus|times|divided by)\s+(\d+(?:\.\d+)?)/
  );

  if (naturalMatch) {
    const expression = `${naturalMatch[1]} ${naturalMatch[2]} ${naturalMatch[3]}`;
    const result = basicArithmetic(expression);

    if (result !== null) {
      return `${naturalMatch[1]} ${naturalMatch[2]} ${naturalMatch[3]} = ${formatNumber(result)}.`;
    }
  }

  return null;
}

/* =========================================================
   INTENT DETECTION
========================================================= */

function detectIntent(rawMessage: string): Intent {
  const text = expandCommonTypos(normalize(rawMessage));
  const c = compact(text);

  if (
    hasAny(text, [
      "what is your name",
      "whats your name",
      "what's your name",
      "your name",
      "who are you",
    ])
  ) {
    return "name";
  }

  if (
    text === "hi" ||
    text === "hello" ||
    text === "hey" ||
    text === "hey bro" ||
    text === "hi bro" ||
    text === "hello bro" ||
    hasAny(text, ["good morning", "good afternoon", "good evening"])
  ) {
    return "greeting";
  }

  if (
    text === "thanks" ||
    text === "thank you" ||
    text === "thx" ||
    text === "ty" ||
    hasAny(text, ["thanks bro", "thank you bro"])
  ) {
    return "thanks";
  }

  if (
    text === "bye" ||
    text === "goodbye" ||
    hasAny(text, ["see you", "talk later", "catch you later"])
  ) {
    return "goodbye";
  }

  if (
    hasAny(text, [
      "discount",
      "promotion",
      "promo",
      "offer",
      "deal",
      "10 off",
      "$10 off",
      "ten dollars off",
      "first vertex",
      "first service",
      "first work",
    ])
  ) {
    return "promotion";
  }

  if (
    looksLikeMath(text)
  ) {
    return "math";
  }

  if (
    hasAny(text, [
      "how much",
      "how much does",
      "price",
      "pricing",
      "cost",
      "package",
      "packages",
      "how much is",
      "how much are",
    ])
  ) {
    if (hasAny(text, ["launch", "$25", "49 dollar"])) return "launch";
    if (hasAny(text, ["scale", "$50", "99 dollar"])) return "scale";
    return "pricing";
  }

  if (hasAny(text, ["enterprise", "custom quote", "custom system"])) {
    return "enterprise";
  }

  if (
    hasAny(text, [
      "care plan",
      "care plans",
      "maintenance",
      "website maintenance",
      "monthly support",
      "website support",
      "updates",
    ])
  ) {
    return "care";
  }

  if (
    hasAny(text, [
      "shopify price",
      "shopify cost",
      "wix price",
      "wix cost",
      "squarespace price",
      "squarespace cost",
      "godaddy price",
      "godaddy cost",
      "how much is shopify",
      "how much is wix",
      "how much is squarespace",
      "how much is godaddy",
      "which is cheaper",
      "cheaper than",
      "cheaper option",
      "compare prices",
      "compare pricing",
    ])
  ) {
    return "platformPricing";
  }

  if (
    hasAny(text, [
      "shopify",
      "wix",
      "squarespace",
      "godaddy",
      "go daddy",
      "compare",
      "comparison",
      "competitor",
      "alternative to",
    ])
  ) {
    return "platform";
  }

  if (
    hasAny(text, [
      "online store",
      "online shop",
      "ecommerce",
      "e-commerce",
      "sell online",
      "sell products",
      "shopping cart",
      "checkout",
      "products online",
    ])
  ) {
    return "ecommerce";
  }

  if (
    hasAny(text, [
      "seo",
      "google ranking",
      "rank on google",
      "search engine",
      "search traffic",
    ])
  ) {
    return "seo";
  }

  if (
    hasAny(text, [
      "analytics",
      "google analytics",
      "track visitors",
      "traffic",
      "search console",
      "website stats",
    ])
  ) {
    return "analytics";
  }

  if (
    hasAny(text, [
      "booking",
      "appointment",
      "appointments",
      "schedule",
      "calendly",
      "reservation",
    ])
  ) {
    return "booking";
  }

  if (
    hasAny(text, [
      "chatbot",
      "chat bot",
      "ai assistant",
      "ai chatbot",
      "assistant",
    ])
  ) {
    return "chatbot";
  }

  if (
    hasAny(text, [
      "lead",
      "leads",
      "customers",
      "more customers",
      "more clients",
      "sales",
      "marketing",
      "cold email",
      "outreach",
      "generate leads",
      "get customers",
    ])
  ) {
    return "leads";
  }

  if (
    hasAny(text, [
      "startup",
      "start up",
      "new business",
      "new company",
      "starting a business",
    ])
  ) {
    return "startup";
  }

  if (
    hasAny(text, [
      "budget",
      "affordable",
      "cheap",
      "expensive",
      "limited money",
      "don't have much",
      "dont have much",
      "only have",
      "can only spend",
    ])
  ) {
    return "budget";
  }

  if (
    hasAny(text, [
      "website",
      "web site",
      "web design",
      "web development",
      "landing page",
      "business website",
    ])
  ) {
    return "website";
  }

  if (
    hasAny(text, [
      "what can vertex do",
      "what does vertex do",
      "what services",
      "what do you offer",
      "services",
      "what do you do",
      "how can you help",
    ])
  ) {
    return "services";
  }

  if (c.length < 3) return "unknown";

  return "general";
}

/* =========================================================
   BUSINESS / NEED EXTRACTION
========================================================= */

function detectBusinessType(text: string): string | undefined {
  const businessMap: Array<[string, string[]]> = [
    ["restaurant", ["restaurant", "cafe", "café", "food business", "bar"]],
    ["dental clinic", ["dentist", "dental", "dental clinic", "clinic"]],
    ["real estate", ["real estate", "realtor", "property", "properties"]],
    ["coaching", ["coach", "coaching", "consulting", "consultant"]],
    ["construction", ["construction", "contractor", "builder"]],
    ["e-commerce", ["ecommerce", "e-commerce", "online store", "online shop"]],
    ["beauty", ["salon", "beauty", "spa", "barbershop", "barber"]],
    ["healthcare", ["doctor", "medical", "healthcare", "health clinic"]],
    ["hotel", ["hotel", "resort", "hospitality"]],
    ["agency", ["agency", "marketing agency", "creative agency"]],
    ["startup", ["startup", "start up", "new company"]],
    ["bookkeeping", ["bookkeeping", "accounting", "accountant"]],
  ];

  for (const [type, terms] of businessMap) {
    if (hasAny(text, terms)) return type;
  }

  return undefined;
}

function detectGoal(text: string): string | undefined {
  if (
    hasAny(text, [
      "sell online",
      "online orders",
      "take orders",
      "checkout",
      "sell products",
    ])
  ) {
    return "sell online";
  }

  if (
    hasAny(text, [
      "get customers",
      "more customers",
      "more clients",
      "get leads",
      "generate leads",
    ])
  ) {
    return "generate leads";
  }

  if (
    hasAny(text, [
      "book appointments",
      "take bookings",
      "schedule appointments",
      "appointments",
    ])
  ) {
    return "take bookings";
  }

  if (
    hasAny(text, [
      "rank on google",
      "seo",
      "get found on google",
      "search traffic",
    ])
  ) {
    return "improve search visibility";
  }

  if (
    hasAny(text, [
      "show my business",
      "online presence",
      "need a website",
      "business website",
    ])
  ) {
    return "build an online presence";
  }

  return undefined;
}

function detectBudget(text: string): string | undefined {
  const dollarMatch = text.match(/\$(\d+(?:\.\d+)?)/);
  if (dollarMatch) return `$${dollarMatch[1]}`;

  const numberMatch = text.match(
    /(?:only have|budget is|budget of|can spend|spend)\s+(\d+(?:\.\d+)?)/
  );

  if (numberMatch) return numberMatch[1];

  if (hasAny(text, ["low budget", "small budget", "limited budget"])) {
    return "limited";
  }

  return undefined;
}

function updateProfile(
  state: ConversationState,
  rawMessage: string
): ConversationState {
  const text = expandCommonTypos(normalize(rawMessage));
  const businessType = detectBusinessType(text);
  const goal = detectGoal(text);
  const budget = detectBudget(text);

  const profile = {
    ...state.profile,
    ...(businessType ? { businessType } : {}),
    ...(goal ? { goal } : {}),
    ...(budget ? { budget } : {}),
    ...(hasAny(text, ["ecommerce", "e-commerce", "online store", "sell online"])
      ? { needsEcommerce: true }
      : {}),
    ...(hasAny(text, ["seo", "google ranking", "rank on google"])
      ? { needsSEO: true }
      : {}),
    ...(hasAny(text, ["analytics", "track visitors", "search console"])
      ? { needsAnalytics: true }
      : {}),
    ...(hasAny(text, ["booking", "appointment", "calendly"])
      ? { needsBooking: true }
      : {}),
    ...(hasAny(text, ["lead", "leads", "customers", "sales", "cold email"])
      ? { needsLeads: true }
      : {}),
  };

  return {
    ...state,
    profile,
    turnCount: state.turnCount + 1,
  };
}

/* =========================================================
   RESPONSE HELPERS
========================================================= */

function formatFeatures(features: readonly string[], max = 7): string {
  return features
    .slice(0, max)
    .map((feature) => `• ${feature}`)
    .join("\n");
}

function recommendFromProfile(profile: BusinessProfile): string {
  const {
    businessType,
    goal,
    budget,
    needsEcommerce,
    needsLeads,
    needsBooking,
    needsSEO,
  } = profile;

  if (needsEcommerce) {
    return `For ${businessType ? `a ${businessType}` : "your business"} that wants to sell online, I'd look at a custom e-commerce solution. The exact scope depends on products, checkout, payments, orders, inventory, customers, and admin needs.

If it's a relatively simple launch, we can start smaller and expand the system later. If you need a more advanced store or business platform, that's something we'd scope as a custom project.`;
  }

  if (needsLeads || goal === "generate leads") {
    return `If your main goal is getting more leads, I'd focus on the website as a lead-generation system rather than just a brochure.

That can include conversion-focused pages, lead capture, analytics, SEO, follow-up structure, and—depending on the project—lead tracking and outreach systems.

For that kind of goal, Scale is the more relevant starting point because it includes more growth-focused features.`;
  }

  if (needsBooking || goal === "take bookings") {
    return `If the main goal is getting appointments, I'd build the website around the booking journey: clear services, trust-building content, strong calls to action, and a booking integration such as Calendly.

If you only need a straightforward website, Launch may be enough. If you also want lead tracking and growth tools, Scale gives you more room to build around that.`;
  }

  if (needsSEO || goal === "improve search visibility") {
    return `If getting found through Google is important, I'd make SEO part of the project from the beginning rather than treating it as an afterthought.

Launch includes basic SEO, while Scale includes more advanced SEO, analytics/Search Console, and additional growth features.`;
  }

  if (budget) {
    return `That's okay. You don't necessarily need to build everything at once.

Launch is currently $25 one-time and gives you a professional starting point. Scale is $50 one-time and adds more growth-focused features.

If you tell me what the business does and what you want the website to accomplish, I can help you decide what actually matters instead of pushing features you don't need.`;
  }

  return `You don't need to know exactly what you need yet.

Tell me:
1. What your business does
2. What you want the website to accomplish
3. Whether you need things like online selling, bookings, leads, or SEO

Then I can help you work backward from the goal.`;
}

function platformPricingResponse(): string {
  return `If your main goal is getting a professional website without taking on a large recurring platform cost, this is where Vertex is different.

Vertex is intentionally built around low one-time website pricing:

• Launch — $25 one-time
• Scale — $50 one-time
• Enterprise — Custom
• Vertex Care — from $5/month if you want ongoing care

For reference, current platform pricing includes:

• Shopify Basic — $19/month when billed yearly on Shopify's Philippines pricing page.
• Wix — the official page checked shows Light at $17.77/month, Core at $29.77/month, and Business at $39.77/month on annual billing; pricing varies by location.
• Squarespace — pricing varies by location and billing cycle; its current plans are Basic, Core, Plus, and Advanced, with official materials showing starting annual-billing monthly-equivalent pricing around $19/month in some markets.
• GoDaddy Website Builder — the US page checked shows Basic at $9.99/month with annual billing.
• GoHighLevel — Starter is $97/month, Unlimited is $297/month, and Agency Pro is $497/month; usage-based charges and optional add-ons can apply.
• WordPress.com — Personal is $9/month billed yearly, Premium is $18/month, Business is $40/month, and Commerce is $70/month; longer billing cycles can reduce the monthly-equivalent price.

The comparison is not simply about which platform has more features. The pricing model is different. Many of these providers charge recurring platform fees, while Vertex currently charges a one-time project price for the website itself, with optional Care afterward.

So if you are mainly looking for a professional website and want to keep your initial cost and ongoing platform commitment low, Vertex is specifically positioned for that use case.

You also don't have to buy everything at once. Start with what your business needs today and add more when you're ready. Our goal is to help you get meaningful value from what you invest rather than push you into a larger package than you need.

That does not mean Vertex is the right fit for every business. If you specifically need a large e-commerce ecosystem, extensive third-party apps, a full CRM/marketing platform, or a particular WordPress setup, another provider may make more sense. But for a professional website built around your business at a very low upfront price, that is where Vertex's pricing is positioned.`;
}

/* =========================================================
   MAIN LOCAL RESPONSE ENGINE
========================================================= */

export function createInitialState(): ConversationState {
  return {
    profile: {},
    turnCount: 0,
  };
}

export function getVertexResponse(
  rawMessage: string,
  previousState: ConversationState = createInitialState()
): {
  text: string;
  state: ConversationState;
} {
  const original = rawMessage.trim();

  if (!original) {
    return {
      text: "Sure — what would you like to know?",
      state: previousState,
    };
  }

  const text = expandCommonTypos(normalize(original));
  const intent = detectIntent(original);

  let state = updateProfile(previousState, original);
  state = {
    ...state,
    lastIntent: intent,
  };

  let response = "";

  switch (intent) {
    case "name":
      response = "I'm the Vertex Assistant 🤖";
      break;

    case "greeting":
      response =
        state.turnCount > 1
          ? "Hey again! 👋 What are you working on?"
          : "Hi! 👋 I'm the Vertex Assistant. How can I help?";
      break;

    case "thanks":
      response = "You're welcome! 🤖";
      break;

    case "goodbye":
      response = "Take care! 👋";
      break;

    case "services":
      response = `Vertex Studio Works helps businesses with websites, e-commerce, SEO, analytics, lead generation, business systems, automation, integrations, and website care.

You don't have to buy everything at once. We can start with what your business needs today and add more later.`;
      break;

    case "promotion":
      response = `🎁 We currently have a $10 OFF offer for your first Vertex service.

That means if your qualifying first service is:
• $25 Launch → $15 after the $10 discount
• $50 Scale → $40 after the $10 discount

The regular package prices remain $25 and $50. The $10 is a promotional discount for the first Vertex service, not a permanent package price.

Want to claim it? You can talk to Vertex here:
${CALENDLY_LINK}`;
      break;

    case "math": {
      const mathResponse = solveMathQuestion(text);

      response =
        mathResponse ??
        'I can handle basic arithmetic, percentages, and simple discount calculations. Try something like "10 + 5" or "$10 off $50".';
      break;
    }

    case "pricing":
      response = `Our current website packages are:

Launch — $25 one-time
${VERTEX.packages.launch.description}

Scale — $50 one-time
${VERTEX.packages.scale.description}

Enterprise — Custom quote
For more advanced or highly customized business systems.

Optional Vertex Care starts at $5/month.

🎁 There's also a $10 OFF promotion for your first Vertex service.

If you tell me what you're trying to build, I can help you figure out which level actually makes sense.`;
      break;

    case "launch":
      response = `Launch is $25 one-time.

🎁 If this is your first Vertex service and the promotion applies, the $10 OFF offer would make the project $15.

It includes:
${formatFeatures(VERTEX.packages.launch.features)}

It's designed as a strong starting point without requiring you to build everything at once.`;
      break;

    case "scale":
      response = `Scale is $50 one-time.

🎁 If this is your first Vertex service and the promotion applies, the $10 OFF offer would make the project $40.

It includes everything in Launch plus:
${formatFeatures(VERTEX.packages.scale.features.slice(1), 10)}

It's intended for businesses that want more room for growth, lead generation, SEO, analytics, and content.`;
      break;

    case "enterprise":
      response = `Enterprise is custom project-based pricing.

It's for businesses that need things like:
${formatFeatures(VERTEX.packages.enterprise.features, 9)}

The price depends on the actual system and scope, so we'd normally discuss the requirements first.`;
      break;

    case "care":
      response = `Vertex Care is optional ongoing maintenance and support.

Starter — $5/month
Growth — $10/month
Business — $15/month

The website itself can be a one-time project. Care is separate for businesses that want ongoing maintenance and support.`;
      break;

    case "ecommerce":
      response = recommendFromProfile(state.profile);
      break;

    case "seo":
      response = `Yes — SEO can be part of a Vertex project.

We can work on technical SEO foundations, search-friendly site structure, content structure, analytics, and Search Console.

Launch includes basic SEO, while Scale includes more advanced SEO.

SEO takes time, so we don't promise guaranteed rankings.`;
      break;

    case "analytics":
      response = `Yes. Analytics can help you understand things like visitors, traffic sources, leads, and website performance.

Launch includes Google Analytics, while Scale adds broader analytics and Search Console capabilities.`;
      break;

    case "booking":
      response = `Yes. We can integrate booking tools so customers can schedule appointments or consultations from your website.

Calendly is one option. If you already use another booking system, we can look at the integration requirements.`;
      break;

    case "chatbot":
      response = `Yes — Vertex can build chatbot and assistant experiences into websites.

They can be used for things like answering visitor questions, guiding customers, collecting leads, helping with product discovery, and directing people toward booking or contacting the business.

More advanced AI functionality depends on the project.`;
      break;

    case "leads":
      response = `If getting more leads is the goal, the website should be designed around the customer journey rather than just looking good.

That can include:
• Conversion-focused pages
• Lead capture
• Analytics
• SEO
• Lead tracking
• Follow-up systems
• Email outreach structure

Scale includes several growth and lead-generation features. More advanced outreach or automation can be scoped separately.`;
      break;

    case "startup":
      response = `Absolutely. Startups don't have to build the entire digital system on day one.

I'd usually start with the most important thing the business needs now—often a strong website, landing page, lead capture, booking flow, or simple e-commerce setup.

Then you can add more functionality as the business grows.

That's one of the ideas behind Vertex: start with what you need today and add more when you're ready.`;
      break;

    case "budget":
      response = recommendFromProfile(state.profile);
      break;

    case "platformPricing":
      response = platformPricingResponse();
      break;

    case "platform":
      response = `Sure. The biggest difference is the business model.

Shopify is strongly focused on e-commerce. Wix, Squarespace, GoDaddy, and WordPress.com provide website platforms with recurring plans and different built-in tools. GoHighLevel is more of an all-in-one CRM, marketing, automation, funnel, and agency platform.

Vertex takes a different approach: the website is treated as a project, with current Launch and Scale packages priced at $25 and $50 one-time, plus optional Care from $5/month.

If you're mainly trying to get a professional website built without starting with a large recurring platform commitment, Vertex is specifically designed around that need.

The other platforms can make sense when you specifically need their broader ecosystems or platform features. The goal isn't to claim that one tool is best for everyone — it's to match the cost and setup to what you actually need.`;
      break;

    case "website":
      response = recommendFromProfile(state.profile);
      break;

    case "general":
      response = answerGeneralQuestion(text, state);
      break;

    default:
      response = buildClarifyingResponse(state);
      break;
  }

  return {
    text: response,
    state,
  };
}

/* =========================================================
   GENERAL QUESTION HANDLING
   ---------------------------------------------------------
   This is deliberately conservative. It can answer simple
   everyday questions locally without pretending to be a
   full general-purpose LLM.
========================================================= */

function answerGeneralQuestion(
  text: string,
  state: ConversationState
): string {
  if (hasAny(text, ["what time", "time now"])) {
    return "I don't have access to a live clock in the free local version. But I can still help with the Vertex side of things.";
  }

  if (
    hasAny(text, [
      "what is vertex",
      "who is vertex",
      "tell me about vertex",
    ])
  ) {
    return `${VERTEX.name} helps startups, entrepreneurs, and growing businesses build modern websites, e-commerce experiences, and custom business systems.

The idea is simple: ${VERTEX.philosophy}`;
  }

  if (
    hasAny(text, [
      "is vertex free",
      "is the chatbot free",
      "is this free",
      "do i have to pay to chat",
    ])
  ) {
    return "Yep! 🤖 The Vertex Assistant chat itself is free to use.";
  }

  if (
    hasAny(text, [
      "do you build",
      "can you build",
      "can vertex build",
    ])
  ) {
    return recommendFromProfile(state.profile);
  }

  if (state.profile.businessType || state.profile.goal) {
    return `Got it. Based on what you've told me, you're working with ${
      state.profile.businessType
        ? `a ${state.profile.businessType}`
        : "your business"
    }${
      state.profile.goal ? ` and your main goal is to ${state.profile.goal}` : ""
    }.

I wouldn't want to recommend a bunch of features you don't need. Tell me the next thing you're trying to accomplish and I'll help you work through it.`;
  }

  const mathResponse = solveMathQuestion(text);

  if (mathResponse) {
    return mathResponse;
  }

  return `I can help with Vertex, websites, e-commerce, SEO, business systems, pricing, basic math, discounts, or growing a business.

If you're just exploring, tell me what you're trying to accomplish and I'll help you work backward from the goal.`;
}

function buildClarifyingResponse(state: ConversationState): string {
  if (state.profile.businessType) {
    return `Got it — you're working with a ${state.profile.businessType}.

What are you mainly trying to do with the website: get more customers, take bookings, sell online, improve Google visibility, or simply establish a professional online presence?`;
  }

  return `I can help. Tell me a little about what you're trying to do.

For example:
• "I own a restaurant and need online orders."
• "I'm starting a business and need a website."
• "I want more leads."
• "How much does a website cost?"

You don't need to know the technical terms. Just tell me what you're trying to accomplish.`;
}

/* =========================================================
   OPTIONAL SIMPLE MEMORY SERIALIZATION
   ---------------------------------------------------------
   Useful if the UI wants to keep state in localStorage later.
========================================================= */

export function serializeVertexState(state: ConversationState): string {
  return JSON.stringify(state);
}

export function deserializeVertexState(
  value: string | null
): ConversationState {
  if (!value) return createInitialState();

  try {
    const parsed = JSON.parse(value);

    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.profile &&
      typeof parsed.profile === "object"
    ) {
      return {
        profile: parsed.profile,
        lastIntent: parsed.lastIntent,
        turnCount:
          typeof parsed.turnCount === "number" ? parsed.turnCount : 0,
      };
    }
  } catch {
    // Ignore malformed local state and start clean.
  }

  return createInitialState();
}
