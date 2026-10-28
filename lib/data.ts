export const SITE_URL = "https://om-thorat.vercel.app";

export const avatarQuotes = [
  {
    text: "As long as I live, there are infinite chances.",
    from: "Monkey D. Luffy",
  },
  {
    text: "If you don't take risks, you can't create a future!",
    from: "Monkey D. Luffy",
  },
  {
    text: "I'm gonna be the Pirate King!",
    from: "Monkey D. Luffy",
  },
  {
    text: "Power isn't determined by your size, but the size of your heart and dreams!",
    from: "Monkey D. Luffy",
  },
];

export const profile = {
  name: "Om Thorat",
  email: "omthorat1005@gmail.com",
  role: "Full stack engineer",
  subline: "B.Tech Computer Science, 2026",
  bio: "I build desktop tools, web apps, and backends, mostly in TypeScript and Python. I work from first principles and like building with AI as part of the process. My approach is to solve the problem first, then go back and optimize it.",
  links: [
    { label: "Email", href: "mailto:omthorat1005@gmail.com" },
    { label: "GitHub", href: "https://github.com/omthorat2004" },
    { label: "LinkedIn", href: "https://linkedin.com/in/omthoratcse" },
    { label: "LeetCode", href: "https://leetcode.com/u/mugiwara12345" },
    { label: "Codeforces", href: "https://codeforces.com/profile/RyujinOm" },
    { label: "Blogs", href: "/blog" },
  ],
};

export const stack = [
  {
    group: "Frontend",
    items: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind", "Electron"],
  },
  {
    group: "Backend",
    items: ["Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Alembic"],
  },
];

export const experience = [
  {
    role: "Full Stack Developer Intern",
    org: "SDLC Corp",
    period: "Jun 2026 to present",
    location: "Chhatrapati Sambhajinagar, Maharashtra · On-site",
  },
  {
    role: "Software Engineer Intern",
    org: "RSquareSoft Technologies",
    period: "Jan 2026 to Jun 2026",
    location: "Pimpri Chinchwad, Maharashtra · On-site",
  },
];

export const education = {
  school: "M.G.M's Jawaharlal Nehru College of Engineering",
  degree: "B.Tech, Computer Science",
  period: "Nov 2022 to 2026",
};

export const projects = [
  {
    slug: "dukaanbol",
    name: "DukaanBol",
    description:
      "A form-simple website builder for small Indian businesses. A shop owner fills in a short form, name, business, phone number, and gets a polished, shareable website. Trilingual: English, Hindi, and Marathi.",
    stack: ["Next.js", "FastAPI", "MongoDB", "Twilio"],
    href: "https://github.com/omthorat2004/DukaanBol",
    status: "building",
  },
  {
    slug: "kai",
    name: "Kai",
    description:
      "Desktop launcher for dev servers. Saved projects start with one click, live ANSI logs per app, sub-applications grouped under one project, and process-group kills so stopping a server never leaves its port bound.",
    stack: ["Electron", "React", "Vite"],
    href: "https://github.com/omthorat2004/Kai",
    live: "https://omthorat2004.github.io/Kai/",
  },
  {
    slug: "storely",
    name: "Storely",
    description:
      "Vlog archive that stores video in a Telegram channel instead of paid cloud storage. Recordings are split into parts to work around upload and fetch limits, uploaded one at a time under the rate limit, with progress tracked in SQLite so an interrupted upload resumes where it left off.",
    stack: ["React Native", "Expo", "TypeScript", "SQLite"],
    href: "https://github.com/omthorat2004/Storely",
  },
  {
    slug: "milo",
    name: "Milo",
    description:
      "Privacy-conscious resume analytics. Share a link instead of the file and see views, downloads, and time per page. Never who read it.",
    stack: ["Next.js", "Three.js", "FastAPI", "MongoDB"],
    href: "https://github.com/omthorat2004/Milo",
    live: "https://milo-nu-two.vercel.app/",
    status: "building",
  },
  {
    slug: "dock",
    name: "Dock",
    description:
      "Revision workspace: a space per lesson, topics as cards on a canvas, each opening a tutor scoped to that topic. Bring your own Gemini key behind a provider abstraction.",
    stack: ["Next.js", "FastAPI", "MongoDB"],
    href: "https://github.com/omthorat2004/dock",
    live: "https://dock-psi-drab.vercel.app/",
  },
];

type WinterArcEntry =
  | {
      title: string;
      type: "project";
      status?: string;
      date?: string; // e.g. "Oct 22"
      description: string;
      href: string; // GitHub repo, mandatory
      live?: string; // deployed link, optional
    }
  | {
      title: string;
      type: "blog" | "skill" | "read";
      status?: string;
      date?: string; // e.g. "Oct 22"
      description: string;
      href?: string;
    };

export const winterArc2026: WinterArcEntry[] = [
  {
    title: "Networking fundamentals",
    type: "read",
    date: "Oct 22",
    description:
      "Read through core networking concepts: how requests travel across the stack, client-server communication, and the basics underpinning everything built on top of HTTP.",
  },
  {
    title: "How JavaScript actually executes",
    type: "read",
    date: "Oct 22",
    description:
      "Went deeper on JavaScript internals: classes under the hood, how Promises resolve, and the call stack, event loop, and task queue that decide the order code actually runs in.",
  },
  {
    title: "Prompt engineering basics",
    type: "read",
    date: "Oct 23",
    description:
      "Covered the fundamentals of working with LLMs: tokens, context windows, and how conversation history shapes a model's responses, then read Anthropic's prompting best practices guide for Claude.",
  },
  {
    title: "Node.js fundamentals",
    type: "read",
    date: "Oct 26",
    description:
      "Read through Node's runtime and module system: how the environment differs from the browser, CommonJS vs. ES6 modules, and where Express fits in as a routing and middleware layer on top of Node's bare HTTP module rather than a separate runtime.",
  },
  {
    title: "Milo",
    type: "project",
    status: "building",
    date: "Oct 26",
    description: "Continued building out Milo's resume analytics flow.",
    href: "https://github.com/omthorat2004/Milo",
    live: "https://milo-nu-two.vercel.app/",
  },
  {
    title: "Qalam",
    type: "skill",
    date: "Oct 26",
    description:
      "Continued building Qalam (private repo for now).",
  },
  {
    title: "Milo",
    type: "project",
    status: "building",
    date: "Oct 27",
    description:
      "Shipped device/browser/OS breakdowns, an activity trend chart, and a top-links view in the analytics dashboard.",
    href: "https://github.com/omthorat2004/Milo",
    live: "https://milo-nu-two.vercel.app/",
  },
  {
    title: "Milo",
    type: "project",
    status: "building",
    date: "Oct 28",
    description:
      "Added a resume download button and a device-aware viewer, then hardened the link redirect backend: re-checked redirect targets for SSRF, guarded fetched content types, and fixed a verification upsert race.",
    href: "https://github.com/omthorat2004/Milo",
    live: "https://milo-nu-two.vercel.app/",
  },
  {
    title: "Qalam",
    type: "skill",
    date: "Oct 28",
    description:
      "Built out an about page and wired it into navigation and the sitemap, plus added skills covering backend engineering, backend security, and the poem editor/SEO workflow (private repo for now).",
  },
];

export const openSource = [
  {
    project: "OpenTelemetry Ecosystem Explorer",
    org: "CNCF",
    count: 3,
    detail:
      "3 pull requests merged: a collector component URL restructure, and the Java agent version as a query parameter.",
    href: "https://github.com/open-telemetry/opentelemetry-ecosystem-explorer/pulls?q=is%3Apr+author%3Aomthorat2004",
  },
  {
    project: "studio-json-schema",
    org: "ioflux",
    count: 1,
    detail:
      "1 pull request merged: parent and child navigation in the node popup, with the buttons rendering only when a node has one.",
    href: "https://github.com/ioflux-org/studio-json-schema/pulls?q=is%3Apr+author%3Aomthorat2004",
  },
  {
    project: "FuturamaAPI",
    org: null,
    count: 4,
    detail:
      "4 pull requests merged: the password reset flow, and a signup page with validation.",
    href: "https://github.com/koldakov/futuramaapi/pulls?q=is%3Apr+author%3Aomthorat2004",
  },
];
