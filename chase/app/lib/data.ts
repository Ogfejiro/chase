// ─────────────────────────────────────────────────────────────────────────────
// data.ts — Chase Portfolio Content
// Update this file with Chase's real details.
// NOTE: All components are self-contained so this file is for reference only.
// If you want to use it, import from "@/app/lib/data" in each component.
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: "Chase",
  handle: "@chase_web3",        // ← update
  email: "hello@chase.xyz",     // ← update
  twitter: "https://twitter.com/chase",    // ← update
  telegram: "https://t.me/chase",          // ← update
  linkedin: "https://linkedin.com/in/chase", // ← update
};

export const STATS = [
  { value: "50+",  label: "CAMPAIGNS LED" },
  { value: "3+",   label: "YEARS ACTIVE" },
  { value: "10K+", label: "COMMUNITY BUILT" },
  { value: "∞",    label: "WORDS WRITTEN" },
];

export const SKILLS = [
  { code: "SIG-01", title: "Ambassador Lead",   description: "Building and directing global ambassador programs that scale.", level: 92 },
  { code: "SIG-02", title: "Community Builder", description: "Turning cold wallets into loyal believers. High-trust communities with real culture.", level: 95 },
  { code: "SIG-03", title: "KOL & Influence",   description: "Key Opinion Leader with reach that moves markets.", level: 88 },
  { code: "SIG-04", title: "Masterful Writing",  description: "Threads, long-form, white papers — every word engineered for maximum signal.", level: 97 },
];

export const PROJECTS = [
  {
    id: "nft",
    code: "OP-01 // NFT",
    status: "COMPLETED",
    tags: ["Ambassador", "Community", "NFT"],
    name: "NFT Campaign Lead",
    description: "Spearheaded full ambassador & community strategy for a major NFT launch.",
    impact: "→ Drove secondary volume & sustained community post-mint.",
    link: "#contact",
  },
  {
    id: "defi",
    code: "OP-02 // DeFi",
    status: "COMPLETED",
    tags: ["DeFi", "KOL", "Content"],
    name: "DeFi Protocol Growth",
    description: "Acted as KOL and content strategist for an emerging DeFi protocol.",
    impact: "→ Grew TVL and credibility through sustained content ops.",
    link: "#contact",
  },
  {
    id: "dao",
    code: "OP-03 // DAO",
    status: "ONGOING",
    tags: ["DAO", "Writing", "Strategy"],
    name: "DAO Community Architecture",
    description: "Designed governance communication and onboarding content for a DAO.",
    impact: "→ Increased governance participation rate significantly.",
    link: "#contact",
  },
];

export const COLLABORATORS = [
  { id: "col-01", codename: "PHANTOM", name: "Alex Rivera",  role: "Protocol Founder", domain: "DeFi Infrastructure", signal: 94, status: "ACTIVE",    brief: "Co-led ambassador expansion across 4 chains. Built the community layer from zero to 8k holders.", link: "#" },
  { id: "col-02", codename: "CIPHER",  name: "Maya Chen",    role: "Growth Lead",       domain: "NFT Ecosystem",       signal: 88, status: "COMPLETED", brief: "Partnered on narrative strategy and KOL outreach. Secondary volume 3× post-launch.", link: "#" },
  { id: "col-03", codename: "VECTOR",  name: "Darius Obi",   role: "DAO Architect",     domain: "Governance",          signal: 91, status: "ONGOING",   brief: "Designing community governance frameworks together.", link: "#" },
  { id: "col-04", codename: "NEXUS",   name: "Sara Volkov",  role: "Brand Strategist",  domain: "Web3 Marketing",      signal: 85, status: "COMPLETED", brief: "Co-authored brand voice guide for a Tier-1 protocol.", link: "#" },
  { id: "col-05", codename: "HERALD",  name: "James Kwon",   role: "Content Director",  domain: "Crypto Media",        signal: 97, status: "ACTIVE",    brief: "Running a long-term content co-creation channel. Combined reach 120k+.", link: "#" },
  { id: "col-06", codename: "SIGNAL",  name: "Leila Nasser", role: "Community Lead",    domain: "Layer 2 Protocol",    signal: 79, status: "ONGOING",   brief: "Ambassador program design. Onboarded 300+ advocates across Discord and Telegram.", link: "#" },
];

export const TICKER_ITEMS = [
  "AMBASSADOR LEAD", "COMMUNITY ARCHITECT", "WEB3 STRATEGIST", "KOL",
  "MASTERFUL WRITER", "PROTOCOL GROWTH", "DAO BUILDER", "NARRATIVE ENGINEER",
  "INFLUENCE OPS", "ONCHAIN CULTURE", "HOLDER RETENTION", "SIGNAL OVER NOISE",
];