import sizes from "./image-sizes.json";

export type Img = { n: number; alt: string; caption?: string; blend?: boolean };
export type Row = { type: "full" | "two" | "three" | "stack"; imgs: Img[] };
export type Section = { label?: string; rows: Row[] };
export type Project = {
  slug: string;
  group: "Brand & Campaign" | "Web & UI";
  label: string;
  title: string;
  outcome: string;
  intro: string;
  client: string;
  role: string;
  year?: string;
  deliverables: string;
  credits?: string;
  link?: { href: string; text: string };
  panel: string;
  cover: { n: number; fit: "contain" | "cover"; pos?: "center"; blend?: boolean; alt: string };
  sections: Section[];
};

export const imgSize = (slug: string, n: number): [number, number] =>
  (sizes as unknown as Record<string, [number, number]>)[`${slug}/${String(n).padStart(2, "0")}`] ?? [1600, 1000];
export const imgSizeRaw = (slug: string): [number, number] | undefined =>
  (sizes as unknown as Record<string, [number, number]>)[`${slug}/card`];
export const imgSrc = (slug: string, n: number) => `/work/${slug}/${String(n).padStart(2, "0")}.webp`;

const i = (n: number, alt: string, caption?: string, blend?: boolean): Img => ({ n, alt, caption, blend });
const full = (...imgs: Img[]): Row => ({ type: "full", imgs });
const two = (...imgs: Img[]): Row => ({ type: "two", imgs });
const three = (...imgs: Img[]): Row => ({ type: "three", imgs });
const stack = (...imgs: Img[]): Row => ({ type: "stack", imgs });

export const projects: Project[] = [
  {
    slug: "pronto-rebrand",
    group: "Brand & Campaign",
    label: "BRAND · IDENTITY",
    title: "Pronto Rebrand",
    outcome: "A refreshed identity for Havas' global project-management SaaS.",
    intro:
      "A new identity for Pronto, the project-management platform used across Havas in 30+ countries — taken from first concepts through development to the final brand system.",
    client: "Havas · Pronto",
    role: "Lead Designer",
    year: "2024–2025",
    deliverables: "Brand concepts, identity system, brand applications",
    panel: "#E60000",
    cover: { n: 6, fit: "cover", alt: "The final Pronto lockup with the Havas wordmark on Pronto red" },
    sections: [
      { label: "Concept", rows: [full(i(1, "Initial Pronto logo concept with a gradient bolt mark, shown in light and dark mode", "Initial logo concept, light and dark mode."))] },
      {
        label: "Development",
        rows: [
          two(
            i(2, "Pronto login screen showing the new logo over a purple gradient background", "Login screen, first development pass."),
            i(3, "Pronto login screen with a revised gradient wave background", "Login screen, second development pass."),
          ),
        ],
      },
      {
        label: "Final",
        rows: [
          two(
            i(4, "Final Pronto and Havas lockup on white", "Final lockup, light."),
            i(5, "Final Pronto and Havas lockup reversed on near-black", "Final lockup, dark."),
          ),
          full(i(6, "Final Pronto lockup reversed to white on Pronto red", "Final lockup on Pronto red.")),
        ],
      },
    ],
  },
  {
    slug: "now-switch",
    group: "Brand & Campaign",
    label: "CAMPAIGN · WEB · SOCIAL",
    title: "Now Switch!",
    outcome: "A Nintendo Switch giveaway that got Australians switching hosts.",
    intro:
      "A Nintendo Switch giveaway campaign encouraging Australians to move their web hosting to VentraIP — landing page, social ads and device mockups.",
    client: "VentraIP Australia",
    role: "UI & Digital Designer",
    year: "2021",
    deliverables: "Landing page, social ads, device mockups",
    panel: "#E8322A",
    cover: { n: 1, fit: "contain", alt: "Now Switch! landing page on a desktop monitor" },
    sections: [
      {
        rows: [
          full(i(1, "Now Switch! landing page on a desktop monitor")),
          full(i(2, "Now Switch! landing page on a laptop")),
          two(
            i(3, "Concept board for the Now Switch! campaign with Nintendo imagery"),
            i(4, "Second concept board for the Now Switch! campaign"),
          ),
          two(
            i(5, "Now Switch! landing page hero with the Nintendo Switch and a three-step explainer"),
            i(6, "Now Switch! landing page showing review scores and the three-step explainer"),
          ),
          two(
            i(7, "Now Switch! landing page hero at desktop width"),
            i(8, "Now Switch! landing page review and steps section at desktop width"),
          ),
          full(i(9, "Now Switch! campaign shown across phone and desktop devices")),
          three(
            i(10, "Facebook post showing the Now Switch! ad in a comment thread"),
            i(11, "Facebook feed ad: switch your web hosting to us and win a Nintendo Switch", "Social ad."),
            i(12, "Mobile landing page hero: turn your hosting around, Now Switch!"),
          ),
          three(
            i(13, "Mobile landing page with the three-step explainer and review scores"),
            i(14, "Mobile comparison table of customer review scores"),
            i(15, "Mobile landing page closing call to action with illustrated mascot"),
          ),
        ],
      },
    ],
  },
  {
    slug: "free-au-domains",
    group: "Brand & Campaign",
    label: "CAMPAIGN · ILLUSTRATION",
    title: "10,000 Free .au Domains",
    outcome: "An outback-illustrated giveaway of 10,000 free domains.",
    intro:
      "An Australia-wide giveaway of 10,000 free .au domain names for new customers — an illustrated landing page, domain search and social ads.",
    client: "VentraIP Australia",
    role: "UI & Digital Designer",
    year: "2021",
    deliverables: "Campaign landing page, domain search, social ads",
    panel: "#C9733A",
    cover: { n: 1, fit: "contain", alt: "Two phones showing the 10,000 free .au domains campaign" },
    sections: [
      {
        rows: [
          full(i(1, "Two phones showing the 10,000 free .au domains campaign")),
          full(i(2, "Campaign landing page on a tablet")),
          full(i(3, "Illustrated outback landing page with the 10,000 free domains headline")),
          two(
            i(4, "Landing page domain search with illustrated outback scene"),
            i(5, "Domain search results listing .com.au, .id.au, .net.au, .org.au and .asn.au options", "Domain search."),
          ),
          two(
            i(6, "Mobile hero with the 10,000 free Australian domain names headline"),
            i(7, "Mobile message explaining the giveaway, with a we're online chat button"),
          ),
          three(
            i(8, "Facebook post: a whose flag quiz alongside the 10,000 free domains ad"),
            i(9, "Facebook feed ad with kangaroo illustration: free .com.au domain name"),
            i(10, "Second Facebook feed ad variation for the free domains giveaway", "Social ads."),
          ),
        ],
      },
    ],
  },
  {
    slug: "papparich",
    group: "Brand & Campaign",
    label: "CAMPAIGN · PRINT · SOCIAL",
    title: "PappaRich Brands",
    outcome: "Marketing for three dessert brands across 20+ franchises.",
    intro:
      "All marketing design for Hokkaido Baked Cheese Tart, PAFU and Kurimu. I also led the Chadstone and Coorparoo store-launch campaigns, including art direction and product photography.",
    client: "PappaRich Australia",
    role: "Design & Marketing Executive",
    year: "2018–2019",
    deliverables:
      "Promo posters, digital menu screens, social content, menus, packaging, store hoardings, product photography",
    panel: "#FFE14D",
    cover: { n: 1, fit: "cover", pos: "center", alt: "Hokkaido Baked Cheese Tart logo on yellow" },
    sections: [
      {
        label: "Hokkaido Baked Cheese Tart",
        rows: [
          full(i(1, "Hokkaido Baked Cheese Tart logo on yellow")),
          three(
            i(2, "Christmas promo poster: 8 original mini tarts for $15", "Promo poster, December 2018."),
            i(3, "Promo poster for a cheese tart and iced coffee combo", "Promo poster, January 2019."),
            i(4, "Promo poster: purchase regular tarts, get mini tarts free", "Promo poster, January 2019."),
          ),
          two(
            i(5, "Promo poster for the new soft serve range with flavour cups", "Promo poster, October 2018."),
            i(6, "Promo poster: $1 soft serves all day, every day", "Promo poster, April 2019."),
          ),
          three(
            i(7, "Digital screen: smores soft serve", "Digital screens, soft serve range, October 2018."),
            i(8, "Digital screen: popping candy soft serve"),
            i(9, "Digital screen: berry soft serve"),
          ),
          full(i(10, "Store hoarding strips with the Baking Soon message", "Store hoarding, Chadstone Shopping Centre.")),
          two(
            i(11, "Instagram post for the smores soft serve flavour", "Instagram post, October 2018."),
            i(12, "Instagram post for the Christmas mini tarts promo", "Instagram post, December 2018."),
          ),
          two(
            i(13, "Christmas gift boxes of tarts with festive illustrated packaging", "Christmas box packaging, December 2018."),
            i(14, "Facebook post thanking customers for their support, with tart in box", "Facebook post, December 2018."),
          ),
          two(
            i(15, "Facebook post for the Designer Ice Pops launch at QV Melbourne", "Facebook post, March 2019."),
            i(16, "Facebook post for blueberry tarts at Southern Cross Station", "Facebook post, February 2019."),
          ),
          two(
            i(17, "Hokkaido box packaging with an orange watercolour pattern", "Box packaging, autumn/winter 2019."),
            i(18, "Hokkaido box packaging shown from a second angle"),
          ),
        ],
      },
      {
        label: "PAFU",
        rows: [
          full(i(19, "PAFU logo on coral red")),
          two(
            i(20, "PAFU menu listing puff pastries", "Menu, October 2018."),
            i(21, "PAFU promo poster for strawberry and apple puffs", "Promo poster, January 2019."),
          ),
          three(
            i(22, "Digital screen: Coffee Pan launch at Chatswood Interchange", "Digital screens, 2019."),
            i(23, "Digital screen: strawberry and apple puffs"),
            i(24, "Digital screen: coffee and chocolate puff launch"),
          ),
          full(i(25, "PAFU store hoarding with apples and puff pastries", "Store hoarding, Box Hill Central.")),
          two(
            i(26, "Instagram post for the Ribena Lychee Ice Pop launch", "Instagram posts, 2019."),
            i(27, "Instagram post for the Designer Ice Pops launch at Melbourne Central"),
          ),
          two(
            i(28, "Instagram post for the Coorparoo Square outlet launch"),
            i(29, "Instagram post showing apple puffs on a plate"),
          ),
          full(i(30, "PAFU kiosk at Melbourne Central", "Facebook post, Melbourne Central outlet launch.")),
          full(i(31, "PAFU and Hokkaido store hoarding strips for Chadstone", "Store hoarding, Chadstone Shopping Centre.")),
          three(
            i(32, "Instagram profile feed for @pafuaus, first screen", "Instagram coordination, @pafuaus."),
            i(33, "Instagram feed grid for @pafuaus"),
            i(34, "Instagram feed grid for @pafuaus, continued"),
          ),
        ],
      },
      {
        label: "Kurimu",
        rows: [
          full(i(35, "Kurimu Japanese Cream Choux logo on navy")),
          two(
            i(36, "Product photography of cream choux on a pale blue surface", "Product photography, Kurimu brand launch."),
            i(37, "Cream choux with a jug of milk and an egg on a navy background"),
          ),
          two(
            i(38, "Four cream choux arranged on a light blue background"),
            i(39, "Two cream choux on a dark background"),
          ),
        ],
      },
    ],
  },
  {
    slug: "pronto-website",
    group: "Web & UI",
    label: "WEB · UI",
    title: "Pronto Marketing Website",
    outcome: "The Pronto brand, extended into a responsive marketing site.",
    intro:
      "The Pronto marketing site, extending the Havas Pronto brand into responsive layouts and interaction patterns, with full design specs for engineering.",
    client: "Havas · Pronto",
    role: "Lead Designer",
    deliverables: "Responsive website design, design specs",
    link: { href: "https://www.pronto.biz/", text: "Visit pronto.biz ↗" },
    panel: "#1E1E1E",
    cover: { n: 1, fit: "cover", alt: "The live Pronto marketing site homepage" },
    sections: [
      {
        rows: [
          full(i(7, "Design specification sheet with numbered annotations for the Pronto hero", "Design specs for engineering.")),
          full(i(1, "The live Pronto marketing site at desktop width", "Live site, desktop.")),
          three(
            i(4, "The live Pronto marketing site on mobile: hero and trusted-by logos", "Live site, mobile."),
            i(5, "The live Pronto marketing site on mobile: key features"),
            i(6, "The live Pronto marketing site on mobile: feature list continued"),
          ),
        ],
      },
    ],
  },
  {
    slug: "ventraip-hosting",
    group: "Web & UI",
    label: "WEB · PRODUCT MARKETING",
    title: "VentraIP Hosting Pages",
    outcome: "Illustrated landing pages for Business, cPanel and WordPress hosting.",
    intro:
      "Landing pages for Business, cPanel, WordPress and custom hosting, built on a systemised visual language with reusable pricing and review components.",
    client: "VentraIP Australia",
    role: "UI & Digital Designer",
    year: "2021",
    deliverables: "Landing pages, illustration, pricing and review components",
    panel: "#4B2BB5",
    cover: { n: 1, fit: "contain", alt: "Three phones showing the VentraIP WordPress, cPanel and Business hosting landing pages" },
    sections: [
      {
        rows: [
          full(i(1, "Three phones showing the VentraIP WordPress, cPanel and Business hosting landing pages")),
          two(
            i(2, "Two phones showing the VentraIP hosting landing pages"),
            i(3, "VentraIP enterprise hosting page on a monitor"),
          ),
          full(i(5, "Business hosting landing page at desktop width with pricing plans")),
          full(i(6, "WordPress hosting landing page with an illustrated purple hero")),
          full(i(7, "Hosting page section about servers and network infrastructure")),
          two(
            i(4, "VentraIP hosting page on a tablet"),
            i(8, "Hosting landing page section at desktop width"),
          ),
          three(
            i(9, "Business hosting hero with rocket illustration and plans and pricing call to action"),
            i(10, "Business hosting pricing page with a plan comparison toggle"),
            i(11, "Custom cPanel hosting hero with build a plan call to action"),
          ),
          three(
            i(12, "WordPress hosting hero: fast, secure and scalable"),
            i(13, "WordPress hosting plan with review scores and tabs"),
            i(14, "Custom web hosting hero with outlined rocket illustration"),
          ),
          three(
            i(15, "Managed WordPress hosting hero with support contact bar"),
            i(16, "cPanel and WordPress toolkit add-on with illustration"),
            i(17, "Pricing component showing Freedom+ and Premier+ plans"),
          ),
          two(
            i(19, "Illustration of a shop front and delivery boxes"),
            i(20, "Review component showing a 4.9 out of 5 rating and testimonial"),
          ),
        ],
      },
    ],
  },
  {
    slug: "mercury",
    group: "Web & UI",
    label: "UI · THEMING",
    title: "Mercury White-Label",
    outcome: "One platform, many reseller brands.",
    intro:
      "A semantic white-label UI system and theming layer that let reseller agencies map their own typography and colour across live platforms, while maintaining WCAG AA compliance.",
    client: "VentraIP Australia",
    role: "UI & Digital Designer",
    deliverables: "White-label UI system, theming layer",
    panel: "#4F46E5",
    cover: { n: 1, fit: "contain", alt: "Mercury reseller domain management console" },
    sections: [
      {
        rows: [
          full(i(1, "Mercury reseller domain management console with DNS records")),
          full(i(2, "High-fidelity payment, invoice, cart and two-factor authentication components")),
          two(
            i(3, "One Active Services card rendered in nine reseller colour schemes", "One component, nine brand colour schemes."),
            i(4, "Figma semantic colour variables with a mode per brand theme", "Semantic colour variables with a mode per theme."),
          ),
          three(
            i(5, "Mobile domain search results"),
            i(6, "Mobile domain search screen"),
            i(7, "Mobile cart totals"),
          ),
          three(
            i(8, "Mobile account navigation menu"),
            i(9, "Mobile dashboard summary cards"),
            i(10, "Mobile 301 Moved Permanently notice"),
          ),
        ],
      },
    ],
  },
  {
    slug: "pronto-visual-system",
    group: "Web & UI",
    label: "DESIGN SYSTEM · UI",
    title: "Pronto Visual System",
    outcome: "The visual foundation behind every Pronto screen.",
    intro:
      "The colour, type scale, grid, tokens and component library behind Pronto's enterprise SaaS platform, aligned with engineering teams across 30+ countries.",
    client: "Havas · Pronto",
    role: "Lead Designer",
    deliverables: "Colour, type scale, grid, tokens, component library",
    panel: "#E60000",
    cover: { n: 1, fit: "cover", alt: "Pronto design system overview" },
    sections: [
      {
        rows: [
          full(i(1, "Pronto design system overview showing tokens and components")),
          full(i(2, "The five consolidated button variants in every state", "Five levels of emphasis, primary through anchor.")),
          full(i(3, "Pronto Project Wizard summary view built from published components")),
          full(i(4, "Storybook implementation of the token-based component library", "Storybook implementation.")),
          three(
            i(5, "Text styles panel showing the single type scale", "One type scale for hierarchy."),
            i(6, "Brand and neutral colour swatches with hex values", "Eight neutral steps, three brand steps."),
            i(7, "A Pronto dashboard screen built with the space, radius and stroke tokens", "Space, radius, stroke and control tokens."),
          ),
          three(
            i(8, "Figma Variables panel split into Primitives and Semantics", "Primitives and semantics."),
            i(9, "Semantic variables each pointing at a primitive colour value"),
            i(10, "Selection colours panel listing semantic tokens on a component"),
          ),
        ],
      },
    ],
  },
  {
    slug: "circular-media-group",
    group: "Web & UI",
    label: "WEB",
    title: "Circular Media Group",
    outcome: "A website for a Melbourne media group, designed as part of a three-person team.",
    intro: "Website design for Circular Media Group, created with Lead Designer Brady Russell and Illustrator Lachlan Davies.",
    client: "Circular Media Group",
    role: "Designer",
    year: "2022",
    deliverables: "Website design",
    credits: "Brady Russell (Lead Designer), Lachlan Davies (Illustrator)",
    panel: "#1F5C55",
    cover: { n: 1, fit: "cover", alt: "Circular Media Group homepage" },
    sections: [
      {
        rows: [
          stack(
            i(1, "Circular Media Group homepage: hero and services", "Homepage, desktop."),
            i(2, "Circular Media Group homepage: team and work sections"),
            i(3, "Circular Media Group homepage: closing call to action and footer"),
          ),
          full(i(4, "Circular Media Group website design and build enquiry page", "Enquiry page.")),
          three(
            i(5, "Circular Media Group mobile homepage, top", "Mobile."),
            i(6, "Circular Media Group mobile homepage, middle"),
            i(7, "Circular Media Group mobile homepage, bottom"),
          ),
        ],
      },
    ],
  },
];

export const groups = ["Brand & Campaign", "Web & UI"] as const;
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const capabilities = [
  { title: "Brand", items: ["Identity", "Brand systems and guidelines", "Campaign key visuals", "Art direction"] },
  { title: "Web", items: ["Marketing websites", "Landing pages", "Responsive UI", "Design specs"] },
  { title: "Campaign", items: ["Social and paid ads", "EDM", "Digital screens", "Print collateral and packaging"] },
  { title: "Build", items: ["Figma tokens and component libraries", "HTML/CSS", "Tailwind", "React", "Claude Code"] },
];

export const clients = [
  "Havas", "Pronto", "VentraIP Australia", "PappaRich", "Hokkaido Baked Cheese Tart",
  "PAFU", "Kurimu", "Circular Media Group", "NAB", "NTT",
];

export const alsoBuilt = [
  { name: "Picturesque Productions", href: "https://picturesqueproductions.com.au/" },
  { name: "vPossible", href: "https://www.vpossible.com.au/" },
  { name: "Sparx Solutions", href: "https://sparxsol.com.au/" },
];

export const career = [
  { role: "Lead Designer", org: "Havas (Pronto)", years: "2022–2026" },
  { role: "UI & Digital Designer", org: "VentraIP Australia", years: "2019–2022" },
  { role: "Design & Marketing Executive", org: "PappaRich Australia", years: "2018–2019" },
  { role: "UX/UI Designer", org: "NAB", years: "2018" },
  { role: "Graphic Designer & Brand Specialist", org: "NTT", years: "2016–2018" },
  { role: "Independent Design Practice", org: "", years: "2024–present" },
  { role: "Bachelor of Communication Design", org: "Monash University", years: "" },
];

export const aboutCopy = [
  "I'm a Melbourne-based digital designer with 10 years' experience turning brands into high-craft digital work — websites, landing pages, campaigns, social and digital ads, and product marketing visuals.",
  "I design in Figma and Adobe CC, and I build what I design with Claude Code and Tailwind, so work reaches production fast and stays on brand.",
];
