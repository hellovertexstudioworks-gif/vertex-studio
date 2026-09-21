/**
 * Vertex Intelligence Engine — Heavy Discovery / Sales Context Edition
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
  | "personalPortfolio"
  | "ecommerce"
  | "seo"
  | "analytics"
  | "booking"
  | "chatbot"
  | "leads"
  | "crm"
  | "automation"
  | "businessSystems"
  | "clinicOperations"
  | "integrations"
  | "startup"
  | "budget"
  | "platform"
  | "math"
  | "promotion"
  | "platformPricing"
  | "capabilities"
  | "customRequest"
  | "discovery"
  | "general"
  | "unknown";

type BusinessProfile = {
  businessType?: string;
  goal?: string;
  budget?: string;
  selectedPackage?: "launch" | "scale" | "enterprise";
  requestedService?: string;
  productType?: string;
  productCount?: string;
  targetCustomer?: string;
  businessVertical?: BusinessVertical;
  desiredCustomerAction?: string;
  needsEcommerce?: boolean;
  needsSEO?: boolean;
  needsAnalytics?: boolean;
  needsBooking?: boolean;
  needsLeads?: boolean;
  needsCRM?: boolean;
  needsAutomation?: boolean;
  needsIntegrations?: boolean;
  needsChatbot?: boolean;
  needsClinicOperations?: boolean;
};

type ConversationState = {
  profile: BusinessProfile;
  lastIntent?: Intent;
  turnCount: number;
  discoveryStep?: number;
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
    .replace(/[^\w\s$.\-+*/()×÷%]/g, " ")
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
    .replace(/\berpsonal\b/g, "personal")
    .replace(/\bperosnal\b/g, "personal")
    .replace(/\beleavte\b/g, "elevate")
    .replace(/\beleavate\b/g, "elevate")
    .replace(/\beleavte\b/g, "elevate")
    .replace(/\bcaoching\b/g, "coaching")
    .replace(/\bcoahcing\b/g, "coaching")
    .replace(/\behlp\b/g, "help")
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

  // Keep percent and simple discount questions inside the local math path.
  if (/^\$?\d+(?:\.\d+)?%?\s*(?:percent|%)\s+of\s+\$?\d+(?:\.\d+)?\??$/.test(cleaned)) {
    return true;
  }

  if (/^\$?\d+(?:\.\d+)?\s*(?:dollars?\s*)?off\s*\$?\d+(?:\.\d+)?\??$/.test(cleaned)) {
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
   SERVICE / CAPABILITY DISCOVERY
   ---------------------------------------------------------
   Vertex is not an e-commerce-only studio. These helpers let
   the assistant recognize a wider range of requests and, when
   the request is vague, ask practical business questions
   instead of guessing.
========================================================= */


/* =========================================================
   BUSINESS / INDUSTRY DISCOVERY MATRIX
========================================================= */

type BusinessVertical =
  | "personalPortfolio" | "coaching" | "clinic" | "dental"
  | "restaurant" | "construction" | "realEstate" | "ecommerce"
  | "hotel" | "beauty" | "wellness" | "saas"
  | "professionalServices" | "localBusiness";

const BUSINESS_VERTICALS: Record<BusinessVertical, {
  label: string;
  terms: string[];
  goals: string[];
  questions: string[];
  features: string[];
}> = {
  personalPortfolio: {
    label: "Personal Portfolio",
    terms: ["personal website","personal portfolio","portfolio website","my portfolio","personal brand","resume website","cv website","freelancer portfolio","creator portfolio"],
    goals: ["showcase work","build credibility","get clients","get inquiries","get bookings"],
    questions: ["What kind of work or services do you want to showcase?","Who do you want the portfolio to attract — employers, clients, customers, or collaborators?","Should visitors contact you, book a call, hire you, or simply view your work?"],
    features: ["about/profile","services or skills","portfolio/case studies","testimonials","contact","booking","SEO","analytics"],
  },
  coaching: {
    label: "Coaching / Consulting",
    terms: ["coach","coaching","consultant","consulting","mentor","mentoring","life coach","business coach","career coach","executive coach"],
    goals: ["book consultations","generate leads","sell programs","build authority"],
    questions: ["What type of coaching or consulting do you provide?","Who is your ideal client?","Should visitors book a call, apply for a program, purchase a program, or contact you first?"],
    features: ["program pages","coach profile","testimonials","case studies","booking","lead capture","email follow-up","SEO","analytics"],
  },
  clinic: {
    label: "Clinic / Healthcare",
    terms: ["clinic","medical clinic","health clinic","healthcare","doctor","physician","medical practice","therapy clinic","physio clinic","patient","patients","medical patients"],
    goals: ["get appointments","explain services","build trust","generate inquiries"],
    questions: ["What type of clinic or healthcare service is it?","What services or treatments should be highlighted?","Should visitors request appointments, call, or use an existing booking system?"],
    features: ["services/treatments","provider profiles","appointment CTA","location/hours","contact","trust sections","SEO","analytics"],
  },
  dental: {
    label: "Dental Practice",
    terms: ["dentist","dental","dental clinic","dental practice","orthodontist","orthodontic","brightsmile","bright smile"],
    goals: ["get new patients","book consultations","show treatments","build trust"],
    questions: ["Which dental services or treatments matter most?","Should new patients book directly or request an appointment?","Do you need treatment, provider, or location pages?"],
    features: ["treatment pages","dentist profiles","appointment CTA","reviews","location","local SEO","analytics"],
  },
  restaurant: {
    label: "Restaurant / Food Business",
    terms: ["restaurant","cafe","café","bar","food business","food truck","bakery","bistro","diner","catering"],
    goals: ["get reservations","take orders","show menu","drive visits"],
    questions: ["What type of restaurant or food business is it?","Do you want online ordering, reservations, or both?","Do you already use a delivery or ordering platform?"],
    features: ["menu","ordering","reservations","location/hours","gallery","promotions","local SEO","analytics"],
  },
  construction: {
    label: "Construction / Contractor",
    terms: ["construction","contractor","builder","construction company","general contractor","renovation","remodeling","remodelling","home builder"],
    goals: ["generate quote requests","show projects","generate leads","build trust"],
    questions: ["What construction or contracting services do you provide?","What type of projects do you want to attract?","Should visitors request a quote, book a consultation, or call?"],
    features: ["project portfolio","service pages","quote form","project galleries","testimonials","local SEO","lead tracking"],
  },
  realEstate: {
    label: "Real Estate",
    terms: ["real estate","realty","realtor","real estate agent","property listings","real estate website","brokerage","real estate broker"],
    goals: ["generate buyer leads","generate seller leads","show listings","book consultations"],
    questions: ["Are you an individual agent, broker, or real estate company?","Do you need property listings on the site?","Are you targeting buyers, sellers, renters, or investors?"],
    features: ["property listings","property details","search/filtering","lead capture","agent profiles","booking","local SEO","analytics"],
  },
  ecommerce: {
    label: "E-Commerce / Online Store",
    terms: ["ecommerce","e-commerce","e commerce","online store","online shop","sell online","selling products","product store","shop online"],
    goals: ["sell products","take orders","grow product sales","build a product brand"],
    questions: ["What products are you selling?","Roughly how many products or SKUs will you have?","Are they physical products, digital products, services, or a mix?"],
    features: ["catalog","product pages","cart","checkout","payments","orders","inventory","customer accounts","analytics","SEO"],
  },
  hotel: {
    label: "Hotel / Hospitality",
    terms: ["hotel","resort","hospitality","inn","motel","guesthouse","bed and breakfast","bnb","accommodation"],
    goals: ["get direct bookings","show rooms","promote amenities","generate inquiries"],
    questions: ["What type of property is it and how many rooms or units?","Do you want visitors to book directly?","Do you already use a booking or property-management system?"],
    features: ["room pages","booking","availability","amenities","gallery","location","local SEO","analytics"],
  },
  beauty: {
    label: "Beauty / Salon / Spa",
    terms: ["salon","beauty salon","spa","barbershop","barber","nail salon","beauty business","aesthetic clinic","lashes","hair salon"],
    goals: ["get bookings","show services","promote treatments","generate local leads"],
    questions: ["What services or treatments do you offer?","Do you want customers to book appointments online?","Do you have multiple staff schedules to manage?"],
    features: ["service menu","booking","staff profiles","gallery","reviews","location/hours","local SEO","product sales"],
  },
  wellness: {
    label: "Wellness / Fitness",
    terms: ["gym","fitness","fitness studio","yoga","pilates","wellness","wellness center","personal trainer","trainer","nutritionist"],
    goals: ["get memberships","book sessions","sell programs","generate leads"],
    questions: ["What services, classes, or programs do you offer?","Do customers need to book sessions or classes?","Do you sell memberships or digital programs?"],
    features: ["class/program pages","booking","membership","payments","trainer profiles","lead capture","analytics","SEO"],
  },
  saas: {
    label: "SaaS / Software",
    terms: ["saas","software company","software product","web app","tech startup","technology startup","software startup"],
    goals: ["generate signups","explain the product","book demos","generate leads"],
    questions: ["What does the software do and who is it for?","Is the website mainly for marketing, signups, demos, or the application itself?","Do you need pricing, onboarding, accounts, or product integration?"],
    features: ["product pages","feature pages","pricing","demo booking","lead capture","signup CTA","analytics","application integration"],
  },
  professionalServices: {
    label: "Professional Services",
    terms: ["agency","marketing agency","law firm","lawyer","accountant","accounting","bookkeeping","financial advisor","consulting firm","professional services","service business"],
    goals: ["generate leads","book consultations","show expertise","collect inquiries"],
    questions: ["What service do you provide?","Who is your ideal client?","Should visitors book a consultation, request a quote, or submit an inquiry?"],
    features: ["service pages","case studies","testimonials","lead forms","booking","SEO","analytics","CRM"],
  },
  localBusiness: {
    label: "Local Business",
    terms: ["local business","small business","shop","store","local shop","brick and mortar","brick-and-mortar"],
    goals: ["get local customers","drive calls","get bookings","generate inquiries"],
    questions: ["What does the business sell or provide?","Where is the business located?","Should visitors call, book, visit, order, or request a quote?"],
    features: ["location/hours","service/product pages","contact","booking","local SEO","analytics","lead capture"],
  },
};

function detectBusinessVertical(text: string): BusinessVertical | undefined {
  const lower = text.toLowerCase();
  const order: BusinessVertical[] = [
    "dental","clinic","coaching","ecommerce","realEstate","restaurant",
    "construction","hotel","beauty","wellness","saas","professionalServices",
    "personalPortfolio","localBusiness",
  ];

  for (const key of order) {
    if (BUSINESS_VERTICALS[key].terms.some((term) => lower.includes(term))) {
      return key;
    }
  }
  return undefined;
}

function verticalDiscoveryResponse(
  vertical: BusinessVertical,
  state: ConversationState
): string {
  const data = BUSINESS_VERTICALS[vertical];
  const packageName = state.profile.selectedPackage
    ? state.profile.selectedPackage === "launch"
      ? "Launch"
      : state.profile.selectedPackage === "scale"
        ? "Scale"
        : "Enterprise"
    : null;

  return `Absolutely — I can help with a **${data.label}** website. 🤝

${packageName ? `You're currently looking at **${packageName}**, so I'll keep that context while we figure out the scope.` : ""}

The website should be built around the business goal, not just a template.

Common goals for this type of business:
• ${data.goals.join("\n• ")}

Before I recommend the pages and features, I want to understand the business:

1. ${data.questions[0]}
2. ${data.questions[1]}
3. ${data.questions[2]}

Then I can map the customer journey, sales/booking flow, important pages, and what makes sense to build now versus later.`;
}

function portfolioReferenceResponse(text: string): string | null {
  const mentions = hasAny(text, [
    "elevate coaching",
    "elevate coaching website",
    "your portfolio",
    "the portfolio",
    "portfolio example",
    "example website",
  ]);

  if (!mentions) return null;

  if (hasAny(text, [
    "personal website",
    "personal portfolio",
    "my portfolio",
    "my personal website",
  ])) {
    return `Absolutely. We can use **Elevate Coaching** as a reference for the style or structure you like, but your personal website would still be built around **you**, your work, your audience, and your goals.

For your personal site, I'd ask:
1. What work or services are you showcasing?
2. Who do you want to attract?
3. Should visitors contact you, book a call, hire you, or simply view your work?

That lets us use the portfolio project as inspiration without assuming your personal site should be identical to Elevate Coaching.`;
  }

  return `Yes — **Elevate Coaching** is one of the portfolio examples. If you want something similar, tell me what your business does, who you want to attract, and the main action you want visitors to take. I'll build the recommendation around your actual business.`;
}

const VERTEX_CAPABILITIES = {
  website: {
    label: "Websites",
    terms: [
      "website", "web site", "web design", "web development",
      "landing page", "business site", "company website",
      "corporate website", "service website",
    ],
    questions: [
      "What does your business do?",
      "What do you want the website to accomplish?",
    ],
  },
  ecommerce: {
    label: "E-Commerce",
    terms: [
      "ecommerce", "e-commerce", "e commerce", "online store",
      "online shop", "sell online", "sell products", "shopping cart",
      "checkout", "product catalog", "online orders",
    ],
    questions: [
      "What products are you selling?",
      "Roughly how many products or SKUs will you have?",
      "Do you already know which payment method or checkout flow you want?",
    ],
  },
  seo: {
    label: "SEO",
    terms: [
      "seo", "google ranking", "rank on google", "search engine",
      "search visibility", "organic traffic", "search traffic",
    ],
    questions: [
      "What does your business offer?",
      "What locations or search terms are most important to you?",
    ],
  },
  analytics: {
    label: "Analytics",
    terms: [
      "analytics", "google analytics", "search console",
      "track visitors", "website stats", "tracking", "reporting",
      "dashboard",
    ],
    questions: [
      "What do you want to measure?",
      "Are you mainly tracking traffic, leads, sales, or customer activity?",
    ],
  },
  booking: {
    label: "Booking",
    terms: [
      "booking", "bookings", "appointment", "appointments",
      "schedule", "scheduling", "reservation", "calendly",
    ],
    questions: [
      "What kind of appointments or services are customers booking?",
      "Do you already use a booking tool such as Calendly?",
    ],
  },
  leads: {
    label: "Lead Generation",
    terms: [
      "lead", "leads", "lead generation", "more customers",
      "more clients", "get customers", "sales", "prospects",
      "cold email", "outreach", "follow up", "follow-up",
    ],
    questions: [
      "Who are you trying to attract?",
      "Where do your leads currently come from?",
      "What should happen after someone submits an inquiry?",
    ],
  },
  crm: {
    label: "CRM / Lead Tracking",
    terms: [
      "crm", "customer relationship", "lead tracking",
      "customer tracking", "pipeline", "sales pipeline",
      "contact management",
    ],
    questions: [
      "What information do you need to track for each customer or lead?",
      "Who on your team will use the system?",
    ],
  },
  automation: {
    label: "Automation",
    terms: [
      "automation", "automate", "workflow", "workflows",
      "automatic", "automatically", "follow-up automation",
      "marketing automation",
    ],
    questions: [
      "What process are you trying to automate?",
      "What should trigger the automation and what should happen afterward?",
    ],
  },
  integrations: {
    label: "Custom Integrations",
    terms: [
      "integration", "integrations", "api", "connect",
      "connect with", "sync", "synchronise", "synchronize",
      "third party", "third-party",
    ],
    questions: [
      "Which tools or platforms do you need to connect?",
      "What information needs to move between them?",
    ],
  },
  chatbot: {
    label: "Chatbot / Assistant",
    terms: [
      "chatbot", "chat bot", "ai assistant", "assistant",
      "website assistant", "customer support bot",
    ],
    questions: [
      "What should the assistant help visitors do?",
      "Should it answer questions, collect leads, recommend products, or help with booking?",
    ],
  },
  clinicOperations: {
    label: "Clinic / Patient Management",
    terms: [
      "patient", "patients", "patient management", "patient records",
      "medical records", "patient count", "number of patients",
      "track patients", "patient tracking", "patient history",
      "billing", "bills", "invoice", "invoices", "payment tracking",
      "payments", "outstanding balance", "balances", "clinic dashboard",
      "staff dashboard", "treatment records", "appointment records",
    ],
    questions: [
      "What patient information do you need to manage?",
      "Do you need appointments, patient records, billing/payment tracking, or all of those?",
      "Who should have access — the owner, dentists/providers, reception staff, or other team members?",
    ],
  },
  businessSystems: {
    label: "Business Systems",
    terms: [
      "business system", "business systems", "internal system",
      "admin dashboard", "dashboard", "portal", "customer portal",
      "staff portal", "employee portal", "management system",
      "custom platform", "web app", "web application",
    ],
    questions: [
      "Who will use the system?",
      "What are the main tasks the system needs to handle?",
      "What information should the dashboard track?",
    ],
  },
  care: {
    label: "Website Care",
    terms: [
      "care", "maintenance", "website maintenance",
      "monthly support", "website support", "updates",
      "ongoing support",
    ],
    questions: [
      "Do you need ongoing updates, maintenance, or support?",
    ],
  },
} as const;

type CapabilityKey = keyof typeof VERTEX_CAPABILITIES;

function detectRequestedCapabilities(text: string): CapabilityKey[] {
  const matches: CapabilityKey[] = [];

  for (const [key, capability] of Object.entries(VERTEX_CAPABILITIES) as [
    CapabilityKey,
    (typeof VERTEX_CAPABILITIES)[CapabilityKey]
  ][]) {
    if (hasAny(text, [...capability.terms])) {
      matches.push(key);
    }
  }

  return matches;
}

function detectProductType(text: string): string | undefined {
  const productGroups: Array<[string, string[]]> = [
    ["clothing / fashion", ["clothing", "clothes", "apparel", "fashion", "shoes", "footwear"]],
    ["beauty / cosmetics", ["beauty products", "cosmetics", "makeup", "skincare", "skin care", "hair products"]],
    ["electronics", ["electronics", "gadgets", "phones", "computers", "laptops", "accessories"]],
    ["food / beverages", ["food", "restaurant products", "groceries", "grocery", "coffee", "drinks", "beverages"]],
    ["furniture / home goods", ["furniture", "home goods", "home decor", "home products", "decor"]],
    ["digital products", ["digital products", "ebooks", "e-books", "courses", "templates", "downloads", "software"]],
    ["services", ["services", "consulting", "coaching", "appointments", "bookings"]],
    ["handmade / custom products", ["handmade", "custom products", "crafts", "artisanal"]],
    ["general physical products", ["products", "items", "merchandise", "inventory", "sku", "skus"]],
  ];

  for (const [label, terms] of productGroups) {
    if (hasAny(text, terms)) return label;
  }

  return undefined;
}

function detectProductCount(text: string): string | undefined {
  const range = text.match(
    /(?:about|around|roughly|approximately|have|with)\s+(\d+(?:\s*-\s*\d+)?|\d+\+)\s*(?:products?|items?|skus?)/i
  );

  if (range) return range[1];

  const direct = text.match(/(\d+(?:\s*-\s*\d+)?|\d+\+)\s*(?:products?|items?|skus?)/i);
  if (direct) return direct[1];

  if (hasAny(text, ["few products", "small catalog", "small catalogue"])) {
    return "small catalog";
  }

  if (hasAny(text, ["many products", "large catalog", "large catalogue"])) {
    return "large catalog";
  }

  return undefined;
}

function detectSelectedPackage(text: string): "launch" | "scale" | "enterprise" | undefined {
  if (hasAny(text, ["enterprise", "custom quote", "custom project"])) {
    return "enterprise";
  }

  if (
    hasAny(text, [
      "scale",
      "$50",
      "50 dollar",
      "50 usd",
      "scale package",
      "scale plan",
    ])
  ) {
    return "scale";
  }

  if (
    hasAny(text, [
      "launch",
      "$25",
      "25 dollar",
      "25 usd",
      "launch package",
      "launch plan",
    ])
  ) {
    return "launch";
  }

  return undefined;
}

function hasPackageSelection(text: string): boolean {
  return Boolean(detectSelectedPackage(text));
}

function mentionsCombination(text: string): boolean {
  return (
    hasAny(text, [
      "with",
      "plus",
      "and",
      "combined",
      "combine",
      "add",
      "include",
      "including",
      "along with",
      "together with",
    ]) &&
    detectRequestedCapabilities(text).length > 0
  );
}

function isBookingConversationTrigger(text: string): boolean {
  return hasAny(text, [
    "i would like to discuss",
    "i'd like to discuss",
    "i would like to talk",
    "i'd like to talk",
    "i want to discuss",
    "i want to talk",
    "i would like to speak",
    "i'd like to speak",
    "i want to speak",
    "discuss this further",
    "discuss further",
    "talk about this further",
    "talk further",
    "speak further",
    "learn more",
    "hear more",
    "move forward",
    "ready to move forward",
    "ready to get started",
    "ready to start",
    "ready to proceed",
    "i'm interested",
    "im interested",
    "i am interested",
    "interested in getting started",
    "interested in working",
    "let's talk",
    "lets talk",
    "let us talk",
    "can we talk",
    "can we discuss",
    "can i talk to someone",
    "can i speak to someone",
    "talk with someone",
    "speak with someone",
    "contact someone",
    "i have more questions",
    "i have some questions",
    "can i ask more questions",
    "i want to ask more questions",
  ]);
}

function hasStrongBookingIntent(
  text: string,
  state: ConversationState
): boolean {
  if (isBookingConversationTrigger(text)) return true;

  if (
    state.profile.selectedPackage &&
    hasAny(text, [
      "yes",
      "yep",
      "yeah",
      "sure",
      "okay",
      "ok",
      "sounds good",
      "i would",
      "i'd",
      "i want",
      "i need",
      "i like",
    ]) &&
    hasAny(text, [
      "call",
      "meeting",
      "contact",
      "talk",
      "speak",
      "discuss",
      "next step",
    ])
  ) {
    return true;
  }

  return false;
}

function isVagueCustomRequest(text: string): boolean {
  return (
    hasAny(text, [
      "can you build",
      "can vertex build",
      "do you build",
      "can you make",
      "can vertex make",
      "can you create",
      "can vertex create",
      "i need a system",
      "i need something",
      "i want something",
      "i need a platform",
      "i want a platform",
      "i need an app",
      "i want an app",
      "can you help me build",
    ]) &&
    detectRequestedCapabilities(text).length === 0
  );
}

function discoveryQuestionFor(
  capability: CapabilityKey,
  profile: BusinessProfile
): string {
  const capabilityData = VERTEX_CAPABILITIES[capability];

  if (capability === "ecommerce") {
    if (!profile.productType) {
      return "What products are you planning to sell?";
    }

    if (!profile.productCount) {
      return "Roughly how many products or SKUs will the store have?";
    }

    return "Do you already know which payment method or checkout flow you want, or would you like us to help you work that out?";
  }

  if (capability === "clinicOperations") {
    if (!profile.businessType) {
      return "What kind of clinic or healthcare business is this?";
    }

    return "Do you need appointments, patient records, patient counts, billing/payment tracking, staff access, or a combination of those?";
  }

  if (capability === "businessSystems") {
    if (!profile.businessType) {
      return "What kind of business will use the system?";
    }

    return capabilityData.questions[Math.min(
      profile.targetCustomer ? 2 : 0,
      capabilityData.questions.length - 1
    )];
  }

  if (capability === "leads") {
    if (!profile.businessType) {
      return "What kind of business are you trying to generate leads for?";
    }

    return profile.targetCustomer
      ? "What should happen after a new lead comes in — email follow-up, a sales pipeline, a booking, or something else?"
      : "Who are you trying to attract as customers?";
  }

  if (capability === "automation") {
    return "What process are you trying to automate?";
  }

  if (capability === "integrations") {
    return "Which tools or platforms do you need to connect?";
  }

  return capabilityData.questions[0];
}

function productOwnershipClarification(text: string): string | null {
  const asksVertexToSell =
    hasAny(text, [
      "do you sell",
      "does vertex sell",
      "can i buy from vertex",
      "can i purchase from vertex",
      "do you have products",
      "what products do you sell",
    ]) && !hasAny(text, [
      "website",
      "ecommerce",
      "e-commerce",
      "online store",
      "build",
      "create",
    ]);

  if (asksVertexToSell) {
    return `Vertex Studio Works is the service provider — we build digital experiences, websites, e-commerce stores, business systems, and related solutions for clients.

If you're asking whether we can **build a website or store for your products**, absolutely. Tell me what you're selling and what you want customers to be able to do.`;
  }

  return null;
}

function buildCapabilityOverview(): string {
  return `Yes — and e-commerce is only one part of what Vertex can build. 🤝

Depending on the business and project, Vertex can help with:
• Websites and landing pages
• E-commerce and online stores
• SEO and search visibility
• Analytics and reporting
• Lead generation and lead tracking
• CRM / customer management
• Booking and appointment flows
• Chatbot / assistant experiences
• Marketing and follow-up automation
• Custom integrations and APIs
• Business systems and dashboards
• Ongoing website care

You don't need to know which service you need yet. Tell me what your business does and what you're trying to accomplish, and I'll ask the right questions from there.`;
}

function buildDiscoveryResponse(
  text: string,
  state: ConversationState,
  capability?: CapabilityKey
): string {
  const capabilities = detectRequestedCapabilities(text);
  const detectedVertical = detectBusinessVertical(text);

  if (detectedVertical && !capability && capabilities.length === 0) {
    return verticalDiscoveryResponse(detectedVertical, state);
  }

  if (
    state.profile.businessVertical &&
    !capability &&
    capabilities.length === 0 &&
    hasAny(text, ["same", "same with", "same for", "like that", "similar"])
  ) {
    return verticalDiscoveryResponse(state.profile.businessVertical, state);
  }
  const selectedCapability =
    capability ??
    capabilities[0] ??
    (state.profile.needsEcommerce ? "ecommerce" : undefined);

  if (!selectedCapability) {
    return `Absolutely — I can help you figure that out.

Let's start with two things:
1. What does your business do?
2. What do you want the website or system to accomplish?

You don't need to use technical terms. Just describe what you want in normal language and I'll work from there.`;
  }

  const question = discoveryQuestionFor(
    selectedCapability,
    state.profile
  );

  const packageLine = state.profile.selectedPackage
    ? `\n\nYou currently have **${state.profile.selectedPackage === "scale" ? "Scale" : state.profile.selectedPackage === "launch" ? "Launch" : "Enterprise"}** in mind, so I'll keep that context while we figure out the exact scope.`
    : "";

  return `Absolutely. We can look at **${VERTEX_CAPABILITIES[selectedCapability].label}** without assuming you need a huge system.${packageLine}

${question}

Once I know that, I can help map out the right approach and explain what would fit the current package versus what may need a custom scope.`;
}

function buildCombinedPackageResponse(
  state: ConversationState,
  capability: CapabilityKey
): string {
  const selectedPackage = state.profile.selectedPackage;

  if (selectedPackage === "scale" && capability === "ecommerce") {
    const productLine = state.profile.productType
      ? `You mentioned **${state.profile.productType}**.`
      : "We can build the store around whatever products you plan to sell.";

    const countLine = state.profile.productCount
      ? `You’re looking at roughly **${state.profile.productCount}** products/SKUs.`
      : "";

    return `Absolutely. 🛒 We can combine **Scale + E-Commerce**.

**Scale — $50 one-time** is the starting package, with **4 months of complimentary Vertex Care**.

${productLine}
${countLine}

For the store itself, we can discuss the pieces you actually need — product pages, catalog structure, cart/checkout, payments, orders, inventory, customer handling, analytics, SEO, and admin functionality.

I don't want to automatically promise that every advanced commerce feature is included in the $50 package. If you need custom checkout logic, complex inventory, third-party integrations, subscriptions, a larger customer portal, or a broader business platform, we can scope those separately.

And you don't have to build everything on day one. You can start with the core store and add more capabilities later as the business grows.

🎁 If the **$10 OFF** promotion applies to your first Vertex service, the $50 starting package would be **$40**.

${discoveryQuestionFor("ecommerce", state.profile)}`;
  }

  if (selectedPackage === "launch" && capability === "ecommerce") {
    return `Yes — we can discuss **Launch + E-Commerce**, but I'd want to understand the store requirements before saying exactly what is included.

Launch is **$25 one-time** and is designed as a strong starting website package. A simple commerce experience may be possible depending on the scope, while more advanced store functionality may need a custom project.

🎁 If the $10 OFF promotion applies to your first Vertex service, Launch would be **$15**.

${discoveryQuestionFor("ecommerce", state.profile)}`;
  }

  return buildDiscoveryResponse("", state, capability);
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
      "deal",
      "10 off",
      "$10 off",
      "10 dollar offer",
      "$10 dollar offer",
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

  // Direct plan/package questions should win before generic promotion intent.
  if (
    hasAny(text, [
      "scale", "$50", "50 dollar",
      "launch", "$25", "25 dollar",
    ]) &&
    hasAny(text, [
      "package", "plan", "include", "includes", "offer",
      "features", "what do i get", "what does it have",
      "what is included", "what's included",
    ])
  ) {
    if (hasAny(text, ["scale", "$50", "50 dollar"])) return "scale";
    return "launch";
  }

  // Specific competitor-price questions must win before generic Vertex pricing.
  if (hasAny(text, ["what is care", "what's care", "care pricing", "care plans", "vertex care"])) {
    return "care";
  }

  if (hasAny(text, ["what is launch", "what's launch", "launch package", "launch plan"])) {
    return "launch";
  }

  if (hasAny(text, ["what is scale", "what's scale", "scale package", "scale plan"])) {
    return "scale";
  }

  if (hasAny(text, ["what is enterprise", "what's enterprise", "enterprise package", "enterprise plan"])) {
    return "enterprise";
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
      "how much",
      "how much does",
      "price",
      "pricing",
      "cost",
      "package",
      "packages",
      "plans",
      "how much is",
      "how much are",
    ])
  ) {
    if (hasAny(text, ["launch", "$25", "25 dollar"])) return "launch";
    if (hasAny(text, ["scale", "$50", "50 dollar"])) return "scale";
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
      "personal portfolio",
      "personal website",
      "portfolio website",
      "my portfolio",
      "resume website",
      "cv website",
      "freelancer portfolio",
      "personal brand website",
      "photography portfolio",
      "designer portfolio",
      "developer portfolio",
      "artist portfolio",
      "personal",
    ]) ||
    (hasAny(text, ["portfolio", "resume", "cv"]) &&
      hasAny(text, ["personal", "my", "website", "site"]))
  ) {
    return "personalPortfolio";
  }

  if (
    hasAny(text, [
      "online store",
      "online shop",
      "ecommerce",
      "e-commerce",
      "e commerce",
      "sell online",
      "sell products",
      "online orders",
      "take orders",
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
      "meet the owner",
      "meet owner",
      "meet the creator",
      "meet creator",
      "talk to the owner",
      "talk to the creator",
      "speak to the owner",
      "speak to the creator",
      "meet someone",
      "meeting",
      "meet with you",
      "talk to you",
    ]) ||
    isBookingConversationTrigger(text)
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
      "what else can you do",
      "what other services",
      "what other things",
      "other products",
      "other services",
      "what can vertex build",
      "what can vertex make",
      "what can vertex create",
      "what all can you build",
      "what do you build",
      "what does vertex offer",
      "what services do you have",
    ])
  ) {
    return "capabilities";
  }

  const capabilityMatches = detectRequestedCapabilities(text);

  if (
    isVagueCustomRequest(text) ||
    hasAny(text, [
      "custom website",
      "custom system",
      "custom platform",
      "custom web app",
      "something custom",
      "something different",
    ])
  ) {
    return "customRequest";
  }

  if (
    capabilityMatches.includes("clinicOperations") &&
    !hasAny(text, ["price", "pricing", "cost", "how much"])
  ) {
    return "clinicOperations";
  }

  if (
    capabilityMatches.includes("crm") &&
    !hasAny(text, ["price", "pricing", "cost", "how much"])
  ) {
    return "crm";
  }

  if (
    capabilityMatches.includes("automation") &&
    !hasAny(text, ["price", "pricing", "cost", "how much"])
  ) {
    return "automation";
  }

  if (
    capabilityMatches.includes("integrations") &&
    !hasAny(text, ["price", "pricing", "cost", "how much"])
  ) {
    return "integrations";
  }

  if (
    capabilityMatches.includes("businessSystems") &&
    !hasAny(text, ["price", "pricing", "cost", "how much"])
  ) {
    return "businessSystems";
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
    ["personal portfolio", ["personal portfolio", "personal website", "portfolio website", "my portfolio", "resume website", "cv website", "personal brand"]],
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
  const selectedPackage = detectSelectedPackage(text);
  const capabilities = detectRequestedCapabilities(text);
  const productType = detectProductType(text);
  const productCount = detectProductCount(text);
  const businessVertical = detectBusinessVertical(text);

  const profile: BusinessProfile = {
    ...state.profile,
    ...(businessType ? { businessType } : {}),
    ...(goal ? { goal } : {}),
    ...(budget ? { budget } : {}),
    ...(selectedPackage ? { selectedPackage } : {}),
    ...(capabilities[0]
      ? { requestedService: VERTEX_CAPABILITIES[capabilities[0]].label }
      : {}),
    ...(productType ? { productType } : {}),
    ...(productCount ? { productCount } : {}),
    ...(businessVertical ? { businessVertical } : {}),
    ...(hasAny(text, [
      "ecommerce",
      "e-commerce",
      "online store",
      "sell online",
      "sell products",
    ])
      ? { needsEcommerce: true }
      : {}),
    ...(hasAny(text, [
      "seo",
      "google ranking",
      "rank on google",
      "search visibility",
    ])
      ? { needsSEO: true }
      : {}),
    ...(hasAny(text, [
      "analytics",
      "track visitors",
      "search console",
      "reporting",
    ])
      ? { needsAnalytics: true }
      : {}),
    ...(hasAny(text, [
      "booking",
      "appointment",
      "appointments",
      "calendly",
      "reservation",
    ])
      ? { needsBooking: true }
      : {}),
    ...(hasAny(text, [
      "lead",
      "leads",
      "customers",
      "sales",
      "cold email",
      "outreach",
    ])
      ? { needsLeads: true }
      : {}),
    ...(hasAny(text, [
      "crm",
      "customer relationship",
      "pipeline",
      "lead tracking",
    ])
      ? { needsCRM: true }
      : {}),
    ...(hasAny(text, [
      "automation",
      "automate",
      "workflow",
      "workflows",
    ])
      ? { needsAutomation: true }
      : {}),
    ...(hasAny(text, [
      "integration",
      "integrations",
      "api",
      "connect with",
      "sync",
    ])
      ? { needsIntegrations: true }
      : {}),
    ...(hasAny(text, [
      "chatbot",
      "chat bot",
      "ai assistant",
      "website assistant",
    ])
      ? { needsChatbot: true }
      : {}),
    ...(hasAny(text, [
      "patient",
      "patients",
      "patient management",
      "patient records",
      "medical records",
      "patient count",
      "track patients",
      "billing",
      "bills",
      "invoice",
      "invoices",
      "payment tracking",
      "outstanding balance",
      "clinic dashboard",
    ])
      ? { needsClinicOperations: true }
      : {}),
  };

  return {
    ...state,
    profile,
    turnCount: state.turnCount + 1,
    discoveryStep:
      capabilities.length > 0 || selectedPackage
        ? (state.discoveryStep ?? 0) + 1
        : state.discoveryStep,
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
    needsClinicOperations,
    businessVertical,
    selectedPackage,
  } = profile;

  if (businessVertical === "dental" || businessVertical === "clinic") {
    const packageName =
      selectedPackage === "scale"
        ? "Scale"
        : selectedPackage === "launch"
          ? "Launch"
          : selectedPackage === "enterprise"
            ? "Enterprise"
            : undefined;

    return `For a ${businessVertical === "dental" ? "dental practice" : "clinic"}, I'd structure the project in two layers:

**Public website**
• Services/treatments
• Provider or dentist profiles
• Reviews and trust-building content
• Appointment calls to action
• Location and contact information
• Local SEO and analytics

**Private clinic side**
If you also need patient management, appointments, patient counts, billing, payments, staff access, or reporting, that becomes a more custom business-system scope.

${packageName ? `You're currently looking at **${packageName}**, so I'll keep that package in context while we define the scope.` : "We can start with the website and add the private system later if the clinic needs it."}

Tell me what you want patients to be able to do and what you want your staff to manage.`;

  }

  if (needsClinicOperations) {
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

function futureExpansionMessage(): string {
  return `You can start with what the business needs today.

Later, if you need more sales tools, e-commerce, booking, automation, CRM, integrations, dashboards, or other custom functionality, Vertex can discuss expanding the system instead of forcing everything into the first version.

The idea is to build in stages when that makes business sense.`;
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

  const ownershipClarification = productOwnershipClarification(text);

  if (ownershipClarification) {
    const state = updateProfile(previousState, original);

    return {
      text: ownershipClarification,
      state: {
        ...state,
        lastIntent: "capabilities",
      },
    };
  }

  let intent = detectIntent(original);

  // Keep short follow-ups conversational instead of dropping to the generic reply.
  if (
    previousState.profile.businessVertical &&
    hasAny(text, ["same", "same with", "same for", "like that", "similar"])
  ) {
    intent = "discovery";
  }

  if (
    hasAny(text, ["personal", "personal portfolio", "my portfolio"]) &&
    (previousState.lastIntent === "personalPortfolio" ||
      previousState.profile.businessType === "personal portfolio")
  ) {
    intent = "personalPortfolio";
  }

  if (
    hasAny(text, [
      "i mean in scale", "i mean in the scale", "in scale", "in the scale", "what about scale",
      "scale package", "scale plan", "what does scale include",
      "what is in scale",
    ])
  ) {
    intent = "scale";
  }

  if (
    hasAny(text, [
      "send me the link", "send me the meeting link", "meeting link",
      "send the link", "link to the meeting", "link for the meeting",
      "where can i book", "where do i book",
    ])
  ) {
    intent = "booking";
  }

  if (
    hasAny(text, [
      "more about ecommerce", "more about e-commerce",
      "tell me more about ecommerce", "tell me more about e-commerce",
      "e commerce i want to know more",
    ])
  ) {
    intent = "ecommerce";
  }

  let state = updateProfile(previousState, original);

  // ---------------------------------------------------------------
  // CONTEXTUAL COMBINATION LOGIC
  // ---------------------------------------------------------------
  // If the visitor already selected a package and then adds a
  // capability, preserve the package instead of resetting to the
  // generic capability response.
  const currentCapabilities = detectRequestedCapabilities(text);
  const hasCurrentPackage = Boolean(state.profile.selectedPackage);
  const priorPackage = previousState.profile.selectedPackage;

  if (
    hasCurrentPackage &&
    currentCapabilities.length > 0 &&
    (mentionsCombination(text) ||
      priorPackage !== undefined ||
      hasAny(text, [
        "add",
        "plus",
        "with",
        "include",
        "including",
        "i want",
        "i need",
      ]))
  ) {
    if (currentCapabilities.includes("clinicOperations")) {
      intent = "clinicOperations";
    } else if (currentCapabilities.includes("ecommerce")) {
      intent = "ecommerce";
    } else if (currentCapabilities.includes("booking")) {
      intent = "booking";
    } else if (currentCapabilities.includes("seo")) {
      intent = "seo";
    } else if (currentCapabilities.includes("analytics")) {
      intent = "analytics";
    } else if (currentCapabilities.includes("leads")) {
      intent = "leads";
    } else if (currentCapabilities.includes("crm")) {
      intent = "crm";
    } else if (currentCapabilities.includes("automation")) {
      intent = "automation";
    } else if (currentCapabilities.includes("integrations")) {
      intent = "integrations";
    } else if (currentCapabilities.includes("businessSystems")) {
      intent = "businessSystems";
    } else if (currentCapabilities.includes("chatbot")) {
      intent = "chatbot";
    }
  }

  // If a visitor says something like "I want Scale" and then follows
  // with "I would love it" or "what about adding X", keep the package
  // context alive.
  if (
    previousState.profile.selectedPackage &&
    hasAny(text, [
      "i would love it",
      "i'd love it",
      "i would love that",
      "i'd love that",
      "sounds good",
      "that sounds good",
      "yes please",
      "i'm interested",
      "im interested",
      "i am interested",
      "i want it",
      "i'll take it",
      "ill take it",
    ])
  ) {
    intent = previousState.profile.selectedPackage;
  }

  // Strong conversational intent to speak with Vertex should trigger
  // the booking flow even when the visitor doesn't use the word
  // "booking", "meeting", or "Calendly".
  if (hasStrongBookingIntent(text, state)) {
    intent = "booking";
  }

  state = {
    ...state,
    lastIntent: intent,
  };

  const portfolioReference = portfolioReferenceResponse(text);

  if (portfolioReference) {
    return {
      text: portfolioReference,
      state,
    };
  }

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
      response = buildCapabilityOverview();
      break;

    case "capabilities":
      response = buildCapabilityOverview();
      break;

    case "customRequest":
      response = `Yes — custom projects are something Vertex can discuss. 🤝

We don't want to assume what you need just because the request doesn't fit neatly into a package.

Tell me:
• What does your business do?
• What are you trying to accomplish?
• Who will use the website, app, or system?
• What would you like customers or staff to be able to do?

From there, I can help separate what fits a standard website package from what would make more sense as a custom project.`;
      break;

    case "discovery":
      response = buildDiscoveryResponse(text, state);
      break;

    case "crm":
      response = `Yes — Vertex can discuss CRM and lead-tracking functionality.

That can range from a simple lead dashboard to a more custom customer-management system, depending on what you need.

What information do you want to track for each lead or customer, and who on your team will use it?`;
      break;

    case "automation":
      response = `Yes — we can discuss automation.

The important part is defining the workflow first rather than adding automation just because it sounds useful.

What process are you trying to automate? For example: lead follow-up, customer notifications, booking reminders, order handling, internal tasks, or something else?`;
      break;

    case "integrations":
      response = `Yes — custom integrations can be part of a Vertex project.

Tell me which tools or platforms you want to connect and what information should move between them. That will help determine whether it's a straightforward integration or a larger custom system.`;
      break;

    case "clinicOperations":
      if (state.profile.selectedPackage === "scale") {
        response = `Yes — and based on what you've described, this is starting to look like a **BrightSmile Dental website + private clinic management system**, not just a public website. 🦷

**Scale — $50 one-time** can be the website starting point. The public side can cover treatments, dentist/provider information, reviews, appointment calls to action, local SEO, analytics, and lead capture.

For the private clinic side, we can discuss functionality such as:
• Patient records and patient information
• Appointment scheduling and tracking
• Patient counts and reporting
• Billing, invoices, balances, and payment tracking
• Staff/reception access
• Clinic dashboards and reports

I would not automatically promise that all of those private healthcare workflows are included in the $50 website package. They are the kind of functionality we'd scope based on exactly how the clinic operates.

You can start with the website and then expand into the private system when you're ready.

What would you want staff to see and manage when they log into the clinic dashboard?`;
      } else {
        response = `Yes — Vertex can discuss clinic and patient-management systems.

For a dental or healthcare business, we can separate the public website from a private dashboard. The website can focus on treatments, trust, providers, appointments, SEO, and analytics, while the private system can be scoped around patient records, appointments, billing/payment tracking, staff access, and reporting.

The exact private functionality would depend on the clinic's workflow and would be scoped separately from a standard website package.

What would you want the clinic staff to manage inside the dashboard?`;
      }
      break;

    case "businessSystems":
      response = `Yes — Vertex can work on custom business systems and dashboards.

For example, a project could involve an admin dashboard, customer portal, staff workflow, lead management, reporting, or other business-specific functionality.

Who will use the system, and what are the main tasks you want it to handle?`;
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
      response = `Scale is **$50 one-time**.

🎁 If this is your first Vertex service and the promotion applies, the $10 OFF offer would make it **$40**.

Scale is the broader growth-focused package. It includes:
${formatFeatures(VERTEX.packages.scale.features.slice(1), 12)}

And you don't have to stop there. If your business later needs e-commerce, booking, stronger sales workflows, automation, custom integrations, a dashboard, a chatbot, or another business-specific capability, we can discuss adding or expanding the system as your needs grow.

I won't assume you need every feature on day one. The goal is to start with what is useful now and build outward when there's a real business reason for it.

What are you planning to build with Scale?`;
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

    case "personalPortfolio":
      response = `Absolutely — a personal portfolio is a great fit for Vertex.

We can build you a clean, professional site that showcases your work, experience, skills, projects, and contact information.

For a straightforward portfolio, Launch at $25 one-time is a good place to start. If you want more advanced features, SEO, lead generation, or other growth tools, we can build those in too.

If you tell me what kind of work you do, I can suggest what sections your portfolio should have.`;
      break;

    case "ecommerce":
      if (
        state.profile.selectedPackage &&
        (state.profile.selectedPackage === "scale" ||
          state.profile.selectedPackage === "launch")
      ) {
        response = buildCombinedPackageResponse(state, "ecommerce");
      } else {
        response = buildDiscoveryResponse(text, state, "ecommerce");
      }
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

    case "booking": {
      const packageLabel = state.profile.selectedPackage
        ? state.profile.selectedPackage === "scale"
          ? "Scale"
          : state.profile.selectedPackage === "launch"
            ? "Launch"
            : "Enterprise"
        : undefined;

      const contextLine = packageLabel
        ? `Since you've been looking at **${packageLabel}**, we can discuss the exact scope and how the features you want fit into the project.`
        : "We can discuss what you're looking to build, the scope, and the next steps.";

      response = `Absolutely. 🤝

${contextLine}

If you'd like to continue the conversation with the Vertex team, you can **[Book a call with Vertex](${CALENDLY_LINK})**.

On the call, we can discuss your website, booking flow, sales goals, e-commerce, integrations, automation, or any other functionality you're considering. You don't need to have everything figured out before the call — we can work through the requirements together.`;
      break;
    }

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
  if (
    state.profile.businessVertical &&
    hasAny(text, [
      "what should i include",
      "what should be on the website",
      "what pages",
      "what features",
      "what do i need",
      "what should i add",
      "help me plan",
      "plan the website",
    ])
  ) {
    return verticalDiscoveryResponse(state.profile.businessVertical, state);
  }

  if (
    hasAny(text, [
      "i would love it",
      "i'd love it",
      "i would love that",
      "i'd love that",
      "sounds good",
      "that sounds good",
      "yes please",
    ])
  ) {
    return `${futureExpansionMessage()}

If you'd like to talk through the next step with the Vertex team, you can book a call here:
${CALENDLY_LINK}`;
  }

  if (hasAny(text, ["what time", "time now"])) {
    return "I don't have access to a live clock in the free local version. But I can still help with the Vertex side of things.";
  }

  if (
    hasAny(text, [
      "what is vertex",
      "who is vertex",
      "tell me about vertex",
      "know vertex studio",
      "know more about vertex",
      "about vertex studio",
      "what is vertex studio",
      "tell me about vertex studio",
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
    const capability = detectRequestedCapabilities(text)[0];

    if (capability) {
      return buildDiscoveryResponse(text, state, capability);
    }

    return `Got it. Based on what you've told me, you're working with ${
      state.profile.businessType
        ? `a ${state.profile.businessType}`
        : "your business"
    }${
      state.profile.goal ? ` and your main goal is to ${state.profile.goal}` : ""
    }.

I wouldn't want to recommend a bunch of features you don't need. Tell me what you want the customer, client, or staff member to be able to do, and I'll help work backward from that.`;
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

What are you mainly trying to accomplish: get more customers, take bookings, sell products, improve Google visibility, automate a process, manage leads, or build a custom business system?`;
  }

  return `I can help. Tell me what you're trying to accomplish and I'll ask the right questions.

For example:
• "I own a restaurant and need online orders."
• "I'm starting a business and need a website."
• "I want more leads."
• "I need a booking system."
• "I want a dashboard for my staff."
• "I need to connect my website to another tool."
• "I want to sell clothing online."

You don't need to know the technical terms. Just describe the business problem or the experience you want to create.`;
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
        discoveryStep:
          typeof parsed.discoveryStep === "number"
            ? parsed.discoveryStep
            : undefined,
      };
    }
  } catch {
    // Ignore malformed local state and start clean.
  }

  return createInitialState();
}
