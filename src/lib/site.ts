// Single source of truth for business details, services and price ranges.
// Edit prices and wording here — every page reads from this file.

export const site = {
  name: "Edwardsville Tech Solutions",
  shortName: "ETS",
  url: "https://www.edwardsvilletechsolutions.com",
  email: "EdwardsvilleTechSolutions@gmail.com",
  phone: "(518) 879-6827",
  phoneHref: "tel:+15188796827",
  city: "Edwardsville, IL",
  area: "Edwardsville, the Metro East and the St. Louis area",
};

export type LineItem = {
  name: string;
  plain: string; // what it is, in plain English
  range: string; // typical price range
  unit?: string; // e.g. "per month"
  alsoCalled?: string; // the technical name, for people who search for it
};

export type Service = {
  slug: string;
  order: string; // work-order number shown on the ticket
  title: string;
  short: string; // nav label
  complaint: string; // what the customer says
  fix: string; // what we do about it
  intro: string;
  from: string; // lowest one-off job price (monthly plans and hourly rates don't count)
  items: LineItem[];
  goodFor: string[];
  metaTitle: string;
  metaDescription: string;
};

export const services: Service[] = [
  {
    slug: "ai-helpers",
    order: "WO-101",
    title: "AI helpers & agents",
    short: "AI helpers",
    complaint: "“I spend my evenings answering the same questions and chasing follow-ups.”",
    fix: "A helper that answers, books and follows up for you — and hands off to a person when it should.",
    intro:
      "An AI agent is a helper that does a repeat job from start to finish: it reads the message, looks things up in your own information, and takes the next step. We build it around how your shop already runs, and you decide exactly what it is and isn’t allowed to do.",
    from: "$1,500",
    items: [
      {
        name: "Custom AI agent",
        plain:
          "A helper built for one job in your business — quoting, scheduling, order follow-ups, reminders — working inside the email, calendar and invoicing you already use.",
        range: "$2,500 – $10,000",
      },
      {
        name: "Website & text-message chatbot",
        plain:
          "Answers customer questions day and night using your own hours, prices and policies. Passes the conversation to you when it gets out of its depth.",
        range: "$1,500 – $5,000",
      },
      {
        name: "AI phone receptionist",
        plain:
          "Picks up when you can’t. Takes messages, answers the basics and books appointments, so a missed call isn’t a lost customer.",
        range: "$1,500 – $4,000",
        unit: "setup, plus $150 – $400 per month",
      },
      {
        name: "Ask-your-own-handbook assistant",
        plain:
          "Staff type a question and get the answer from your manuals, price sheets and procedures — instead of calling you on your day off.",
        range: "$2,000 – $7,500",
        alsoCalled: "knowledge assistant, RAG",
      },
      {
        name: "Helper care plan",
        plain:
          "Monthly check-ups: we read what the helper has been doing, fix what it gets wrong and update it when your business changes.",
        range: "$200 – $800",
        unit: "per month",
      },
    ],
    goodFor: [
      "Shops where the owner is also the receptionist",
      "Appointment-based businesses",
      "Anyone answering the same ten questions every day",
    ],
    metaTitle: "Custom AI Agents & Chatbots for Small Businesses",
    metaDescription:
      "Custom AI agents, chatbots and AI phone receptionists for owner-run businesses in Edwardsville, IL and the St. Louis area. Plain-English setup and straight price ranges.",
  },
  {
    slug: "ai-integrations",
    order: "WO-202",
    title: "AI hookups & automation",
    short: "Hookups & automation",
    complaint: "“We type the same thing into three different programs.”",
    fix: "Connect the software you already pay for, so information moves by itself and AI can work with it.",
    intro:
      "You probably don’t need new software. You need the software you have to talk to each other. We wire AI into the tools you already use and automate the hand-offs between them — with you in control of what is shared.",
    from: "$750",
    items: [
      {
        name: "AI inside the tools you already use",
        plain:
          "Put AI to work in Google Workspace, Microsoft 365, QuickBooks, Shopify, Square, HubSpot and similar — drafting replies, sorting email, filling in records.",
        range: "$1,000 – $5,000",
      },
      {
        name: "Workflow automation",
        plain:
          "When X happens, Y gets done without anyone touching it: a new order creates the invoice, texts the customer and updates the spreadsheet.",
        range: "$750 – $3,500",
        unit: "per workflow",
        alsoCalled: "n8n, Zapier, Make",
      },
      {
        name: "Safe data connector",
        plain:
          "A locked doorway that lets AI tools like ChatGPT, Claude or Copilot look things up in your business data — only the parts you allow, nothing else.",
        range: "$2,000 – $8,000",
        alsoCalled: "MCP server",
      },
      {
        name: "Private AI",
        plain:
          "For businesses with sensitive records. AI that runs on your own equipment or your own account, so client information stays where it belongs.",
        range: "$4,000 – $15,000",
        alsoCalled: "on-premise / self-hosted AI",
      },
    ],
    goodFor: [
      "Offices drowning in copy-and-paste",
      "Businesses with customer records they can’t risk leaking",
      "Owners already paying for software they barely use",
    ],
    metaTitle: "AI Integration & Workflow Automation",
    metaDescription:
      "AI integrations, workflow automation, MCP data connectors and private AI for small businesses near Edwardsville, IL and St. Louis. Make the software you already own work together.",
  },
  {
    slug: "websites",
    order: "WO-303",
    title: "Websites & upkeep",
    short: "Websites",
    complaint: "“Our website costs money every month and we can’t even change the hours on it.”",
    fix: "A fast site you actually own, kept up by someone you can call.",
    intro:
      "We build websites for small businesses and keep them running. Where it makes sense, we move you off pricey monthly website builders onto a site you own, so your cost stays low and nobody can hold it hostage.",
    from: "$400",
    items: [
      {
        name: "New website",
        plain:
          "A clean, quick site that shows up on Google and on phones, written so customers know what you do and how to reach you.",
        range: "$1,500 – $6,000",
      },
      {
        name: "Tune-up or redesign",
        plain: "Keep what works on your current site, fix what’s slow, broken or out of date.",
        range: "$750 – $3,000",
      },
      {
        name: "Cut-the-subscription move",
        plain:
          "Move your site off an expensive monthly builder to one you own outright, with hosting that costs little or nothing.",
        range: "$500 – $2,500",
      },
      {
        name: "Upkeep plan",
        plain: "We keep it online, secure and current. Need the menu or the hours changed? Send a text.",
        range: "$50 – $200",
        unit: "per month",
      },
      {
        name: "Get-found-locally setup",
        plain:
          "Google Business Profile, maps, and the behind-the-scenes details that help nearby customers find you.",
        range: "$400 – $1,500",
        alsoCalled: "local SEO",
      },
    ],
    goodFor: [
      "Businesses paying a monthly fee for a five-page site",
      "Sites nobody has touched in years",
      "New businesses that need to look established",
    ],
    metaTitle: "Small Business Websites & Website Upkeep",
    metaDescription:
      "Website design, redesign and low-cost upkeep for small businesses in Edwardsville, IL and the St. Louis area. Own your site instead of renting it.",
  },
  {
    slug: "custom-tools",
    order: "WO-404",
    title: "Custom business tools",
    short: "Custom tools",
    complaint: "“The whole business runs on one spreadsheet and only I understand it.”",
    fix: "A tool built around the way you work — not the other way round.",
    intro:
      "Off-the-shelf software makes you change how you work. We build small, sturdy tools that fit your business as it is: the quote sheet, the pull list, the inventory count, the schedule.",
    from: "$500",
    items: [
      {
        name: "Spreadsheet rescue",
        plain:
          "Untangle the spreadsheet everything depends on. Make it reliable, backed up and usable by more than one person.",
        range: "$500 – $2,500",
      },
      {
        name: "Dashboards & reports",
        plain: "One screen that shows sales, stock and what’s overdue, without anyone building it by hand each week.",
        range: "$1,500 – $6,000",
      },
      {
        name: "In-house apps",
        plain: "Scheduling, inventory, quoting, job tracking — a simple app your staff can use from a phone.",
        range: "$3,000 – $15,000",
      },
      {
        name: "Customer portals & online ordering",
        plain: "Let customers book, order, pay or check on their job without calling the shop.",
        range: "$3,000 – $12,000",
      },
    ],
    goodFor: [
      "Businesses that outgrew their spreadsheet",
      "Shops with an unusual way of doing things",
      "Owners tired of paying per-user software fees",
    ],
    metaTitle: "Custom Business Software & Tools",
    metaDescription:
      "Custom business tools, dashboards, internal apps and customer portals for owner-run businesses in Edwardsville, IL and the St. Louis area.",
  },
  {
    slug: "training",
    order: "WO-505",
    title: "Guidance & training",
    short: "Guidance & training",
    complaint: "“Everybody says I should be using AI. I don’t know where to start.”",
    fix: "A straight answer about where AI would help your business — and where it wouldn’t.",
    intro:
      "Not every problem needs AI, and we’ll say so. Start with a check-up, get your team comfortable with the tools, and set a few sensible rules so nobody pastes customer records somewhere they shouldn’t.",
    from: "$400",
    items: [
      {
        name: "AI readiness check-up",
        plain:
          "We sit down with you, watch how the work gets done, and hand you a short written list: what to automate first, what it should cost, and what to leave alone.",
        range: "$500 – $1,500",
      },
      {
        name: "Team workshop",
        plain: "A hands-on session using your own real tasks. No slides full of buzzwords.",
        range: "$400 – $1,200",
        unit: "per session",
      },
      {
        name: "AI house rules",
        plain:
          "A one-page policy your staff will actually read: which tools are fine, what never to type into them, and who to ask.",
        range: "$750 – $2,500",
        alsoCalled: "AI policy, security & governance",
      },
      {
        name: "Tech advice by the hour",
        plain: "A second opinion before you sign a software contract or hire a vendor.",
        range: "$100 – $175",
        unit: "per hour",
      },
    ],
    goodFor: [
      "Owners who want a plan before spending money",
      "Teams already using ChatGPT without any rules",
      "Anyone who has been burned by a tech vendor",
    ],
    metaTitle: "AI Consulting, Training & Readiness Audits",
    metaDescription:
      "AI readiness audits, team workshops, AI policies and hourly tech consulting for small businesses in Edwardsville, IL and the St. Louis area.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const priceNote =
  "Typical ranges. Small jobs land at the low end, bigger ones higher. You get a written estimate before any work starts.";

export const process = [
  {
    title: "Write-up",
    note: "free call",
    description: "You tell us what’s eating your time. We write it down in plain English.",
  },
  {
    title: "Estimate",
    note: "in writing",
    description: "You get the plan, the price and the timeline before anything is built.",
  },
  {
    title: "Build",
    note: "you see it early",
    description: "We build it in small steps and show you as we go, so nothing is a surprise.",
  },
  {
    title: "Upkeep",
    note: "if you want it",
    description: "We keep it running and change it as your business changes.",
  },
];

export const faqs = [
  {
    question: "Do I need to understand AI to work with you?",
    answer:
      "No. You know your business; that’s the hard part. We explain everything in plain English and you never have to learn the jargon.",
  },
  {
    question: "What will it cost?",
    answer:
      "Every service on this site lists a typical price range. After a free call you get a written estimate, and no work starts until you’ve agreed to it.",
  },
  {
    question: "Is AI going to replace my staff?",
    answer:
      "That’s not what we build. We take the repetitive work — the copying, the reminders, the same ten questions — off people’s plates so they can spend time with customers.",
  },
  {
    question: "Is my customer information safe?",
    answer:
      "We set things up so an AI tool can only reach the information you choose to share with it. For sensitive records we can build a private setup that keeps the data on your own equipment or account.",
  },
  {
    question: "How quickly can we get started?",
    answer: "Most projects kick off within a week of you approving the estimate.",
  },
  {
    question: "Can you work on the website I already have?",
    answer: "Yes. We fix, speed up, redesign and look after existing sites.",
  },
  {
    question: "Do you only work in Edwardsville?",
    answer:
      "We’re based in Edwardsville and work with businesses across the Metro East and the St. Louis area, in person or remotely.",
  },
];

// Illustrations of the kind of work we take on. These are examples, not client results.
export const exampleJobs = [
  {
    shop: "Comic book shop",
    complaint: "Pull lists live in a notebook and customers forget to pick up.",
    work: "A pull-list tool that texts each customer when their books arrive, and drafts the weekly new-release email.",
    category: "Custom tool + AI helper",
  },
  {
    shop: "Contractor",
    complaint: "Calls get missed on the job site and quotes go cold.",
    work: "A phone helper that takes the details, then follows up on open quotes after three days.",
    category: "AI phone receptionist",
  },
  {
    shop: "Small office",
    complaint: "New-client paperwork gets typed into three programs.",
    work: "One intake form that fills in all three and files the documents.",
    category: "Workflow automation",
  },
];
