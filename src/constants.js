export const navItems = [
  { id: "overview", label: "Overview" },
  { id: "builds", label: "Work" },
  { id: "timeline", label: "Experience" },
  { id: "lab", label: "Lab" },
  { id: "philosophy", label: "Notes" },
  { id: "beyond", label: "Beyond" },
  { id: "contact", label: "Contact" },
];

export const heroRoles = [
  "Full-stack engineer",
  "Interface builder",
  "Workflow automation",
  "Product-minded delivery",
];

export const heroSystemNodes = [
  {
    id: "frontend",
    label: "Frontend",
    angle: -72,
    radius: 36,
    metric: "React · TypeScript · UI craft",
    preview: "Interfaces, state, and interaction design.",
    section: "ecosystem",
  },
  {
    id: "backend",
    label: "Backend",
    angle: -18,
    radius: 35,
    metric: "Node · APIs · data layers",
    preview: "Services, persistence, and reliable flows.",
    section: "ecosystem",
  },
  {
    id: "automation",
    label: "Automation",
    angle: 42,
    radius: 34,
    metric: "Scripts · agents · tooling",
    preview: "Repeatable work removed from the loop.",
    section: "lab",
  },
  {
    id: "ai",
    label: "AI workflows",
    angle: 108,
    radius: 35,
    metric: "Planning · review · search",
    preview: "Faster cycles with clear human judgment.",
    section: "lab",
  },
  {
    id: "product",
    label: "Product",
    angle: 162,
    radius: 33,
    metric: "Scope · clarity · tradeoffs",
    preview: "What to build and what to leave out.",
    section: "overview",
  },
  {
    id: "hmi",
    label: "HMI",
    angle: 198,
    radius: 36,
    metric: "Industrial UI · reliability",
    preview: "Operational tools that stay readable.",
    section: "timeline",
  },
  {
    id: "motion",
    label: "Motion",
    angle: -138,
    radius: 34,
    metric: "Framer · transitions · feel",
    preview: "Motion that supports the interface.",
    section: "builds",
  },
];

export const overviewPillars = [
  {
    title: "Interfaces",
    body: "Responsive surfaces with clear hierarchy, resilient flows, and interaction states that hold up in production.",
    signal: "React, TypeScript, Tailwind, UX",
  },
  {
    title: "Full stack",
    body: "Work across frontend, backend, data, and deployment with an eye on performance and maintainability.",
    signal: "Node, Java, Python, MongoDB, SQL",
  },
  {
    title: "Acceleration",
    body: "Agent-assisted workflows for planning, review, and search—used to remove friction, not replace judgment.",
    signal: "Automation, tooling, SDLC support",
  },
];

export const techEcosystem = [
  {
    name: "React",
    area: "Interface",
    x: 20,
    y: 28,
    level: 94,
    projects: ["Volunteer App", "FWC Website", "ECE Website"],
    links: ["TypeScript", "Tailwind", "Node"],
  },
  {
    name: "TypeScript",
    area: "Interface",
    x: 45,
    y: 18,
    level: 82,
    projects: ["FWC Website", "Automation Tools"],
    links: ["React", "Node", "AI Agents"],
  },
  {
    name: "Tailwind",
    area: "Interface",
    x: 72,
    y: 30,
    level: 90,
    projects: ["Portfolio", "Volunteer App"],
    links: ["React", "Framer Motion"],
  },
  {
    name: "Framer Motion",
    area: "Motion",
    x: 84,
    y: 56,
    level: 78,
    projects: ["Portfolio", "Product Showcases"],
    links: ["React", "Tailwind"],
  },
  {
    name: "Node",
    area: "Backend",
    x: 56,
    y: 52,
    level: 88,
    projects: ["FWC Website", "Weather App"],
    links: ["Express", "MongoDB", "React"],
  },
  {
    name: "Express",
    area: "Backend",
    x: 32,
    y: 61,
    level: 82,
    projects: ["FWC Website", "ECE Website"],
    links: ["Node", "MongoDB"],
  },
  {
    name: "MongoDB",
    area: "Data",
    x: 17,
    y: 77,
    level: 78,
    projects: ["FWC Website", "ECE Website"],
    links: ["Express", "Node"],
  },
  {
    name: "Firebase",
    area: "Cloud",
    x: 66,
    y: 78,
    level: 80,
    projects: ["Volunteer App"],
    links: ["React Native", "Auth"],
  },
  {
    name: "Python",
    area: "AI",
    x: 42,
    y: 83,
    level: 84,
    projects: ["Automation Lab", "Search Tools"],
    links: ["AI Agents", "Java"],
  },
  {
    name: "Java",
    area: "Systems",
    x: 78,
    y: 82,
    level: 78,
    projects: ["Caterpillar Systems"],
    links: ["Python", "HMI"],
  },
  {
    name: "AI Agents",
    area: "AI",
    x: 50,
    y: 38,
    level: 86,
    projects: ["SDLC Automation", "Search Innovation"],
    links: ["Python", "TypeScript", "HMI"],
  },
  {
    name: "HMI",
    area: "Systems",
    x: 86,
    y: 18,
    level: 76,
    projects: ["Caterpillar Systems"],
    links: ["Java", "AI Agents"],
  },
];

export const projects = [
  {
    id: "volunteer",
    title: "Volunteer App",
    eyebrow: "Community platform",
    image: "/generated/project-volunteer.svg",
    problem: "A mobile-first way to find opportunities, track activity, and stay aligned with local events.",
    stack: ["React Native", "Expo", "Firebase", "React Navigation", "JavaScript"],
    architecture: ["Auth gateway", "Opportunity feed", "Event state", "Profile layer", "Notifications"],
    metrics: [
      { label: "Surface", value: "Mobile + web" },
      { label: "Flow", value: "Discover → profile" },
      { label: "Focus", value: "Community UX" },
    ],
    impact: "Unified scattered volunteering actions into one coherent product flow.",
    github: "https://github.com/PriyanshuDhasmana/VolunteerApp",
    webapp: "https://volunteer-app-henna.vercel.app/",
  },
  {
    id: "fwc",
    title: "FWC Official Website",
    eyebrow: "Service business site",
    image: "/generated/project-fwc.svg",
    problem: "A services company needed a scalable site that stayed consistent across dozens of pages.",
    stack: ["React", "Node.js", "MongoDB", "Express", "Styled Components"],
    architecture: ["Page system", "Reusable blocks", "Service routing", "Content modules", "Deploy pipeline"],
    metrics: [
      { label: "Pages", value: "40+" },
      { label: "Pattern", value: "Modular UI" },
      { label: "Goal", value: "Trust + clarity" },
    ],
    impact: "Shipped a maintainable multi-page platform with polished service discovery.",
    github: null,
    webapp: "https://www.fwc.co.in/",
  },
  {
    id: "ece",
    title: "ECE Department Website",
    eyebrow: "Academic hub",
    image: "/generated/project-ece.svg",
    problem: "Department info, resources, and faculty details needed a clearer digital structure.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
    architecture: ["Information model", "Faculty modules", "Student resources", "Admin content", "Responsive UI"],
    metrics: [
      { label: "Audience", value: "Students + faculty" },
      { label: "Mode", value: "Resource hub" },
      { label: "Priority", value: "Clarity" },
    ],
    impact: "Organized academic content into an easier-to-navigate experience.",
    github: "https://github.com/PriyanshuDhasmana/ECE-Dept-Website.git",
    webapp: "https://ece-dept-frontend.vercel.app/",
  },
  {
    id: "weather",
    title: "Weather App",
    eyebrow: "Realtime API UI",
    image: "/generated/project-weather.svg",
    problem: "Weather data should feel immediate and scannable across locations.",
    stack: ["React", "Node.js", "API", "JavaScript", "CSS"],
    architecture: ["Location input", "API resolver", "Forecast parser", "Weather state", "Responsive output"],
    metrics: [
      { label: "Data", value: "Realtime" },
      { label: "UX", value: "Location-first" },
      { label: "Layer", value: "API-driven" },
    ],
    impact: "Lightweight forecast experience with fast retrieval and simple reading.",
    github: "https://github.com/PriyanshuDhasmana/weatherApp",
    webapp: "https://weather-6fhdcajtq-priyanshudhasmanas-projects.vercel.app/",
  },
  {
    id: "ums",
    title: "University Management System",
    eyebrow: "C++ CLI system",
    image: "/generated/project-ums.svg",
    problem: "Student and faculty records needed structured persistence and predictable validation.",
    stack: ["C++", "OOP", "File Handling", "Templates", "CLI"],
    architecture: ["Entity models", "Template handlers", "File streams", "Validation layer", "Record ops"],
    metrics: [
      { label: "Core", value: "OOP" },
      { label: "Storage", value: "File streams" },
      { label: "Mode", value: "CLI" },
    ],
    impact: "Fundamentals-heavy system focused on data modeling and clean persistence.",
    github: "https://github.com/PriyanshuDhasmana/University-Management-System-using-File-Stream-and-OOPs-Concepts.git",
    webapp: null,
  },
];

export const experiences = [
  {
    id: "cat-associate",
    role: "Associate Engineer",
    company: "Caterpillar Inc.",
    date: "July 2025 – Present",
    signal: "Industrial interfaces",
    summary:
      "Building web applications for operational workflows, customer experience, and engineering velocity.",
    impact: [
      "HMI-oriented work with emphasis on usability and reliability.",
      "Agent-assisted SDLC tasks to cut repetitive engineering work.",
      "Feature design around workflow improvement and search.",
    ],
    systems: ["HMI", "Workflow", "Search", "JProfiler", "Java", "Node"],
  },
  {
    id: "cat-intern",
    role: "Associate Engineer Intern",
    company: "Caterpillar Inc.",
    date: "Jan 2025 – July 2025",
    signal: "Production practice",
    summary:
      "Full-stack delivery in an enterprise setting—debugging, optimization, and translating requirements into maintainable code.",
    impact: [
      "Hands-on fluency across the stack in a production environment.",
      "Stronger debugging through performance and reliability work.",
      "Clearer handoff from product requirements to implementation.",
    ],
    systems: ["JavaScript", "Node", "Java", "Protocols", "Debugging", "Performance"],
  },
  {
    id: "fwc-intern",
    role: "SDE Intern",
    company: "FWC IT Services Pvt. Ltd.",
    date: "Jan 2025 – July 2025",
    signal: "Client delivery",
    summary:
      "React and Node on the company website—features, UX fixes, and support for a large service-page system.",
    impact: [
      "Responsive production site with reusable frontend structure.",
      "Feature work, bug fixes, and UI polish under client constraints.",
      "Applied academic foundations to real product deadlines.",
    ],
    systems: ["React", "Node", "TypeScript", "Tailwind", "CSS", "UX"],
  },
];

export const labModules = [
  {
    title: "SDLC support",
    command: "plan → build → review",
    body: "Automation for planning, implementation support, review loops, and repetitive workflow compression.",
  },
  {
    title: "Search & discovery",
    command: "index → trace → refine",
    body: "Retrieval and interface thinking for faster discovery inside engineering tools.",
  },
  {
    title: "HMI clarity",
    command: "observe → simplify → ship",
    body: "Human-machine interfaces focused on intent, state, and dependable interaction.",
  },
  {
    title: "Performance",
    command: "profile → fix → measure",
    body: "Instrumentation around bottlenecks, profiling, and measurable UI or runtime gains.",
  },
];

export const philosophyStatements = [
  "Build for the person using it.",
  "Reduce friction before adding features.",
  "Good UX stays out of the way.",
  "Tools should speed up judgment, not replace it.",
];

export const beyondCode = [
  {
    title: "Workstation",
    image: "/generated/beyond-workstation.svg",
    body: "A calm setup built for long-form problem solving—clean signals, focused tooling.",
    tags: ["setup", "focus", "craft"],
  },
  {
    title: "Diagrams & notes",
    image: "/generated/beyond-notebook.svg",
    body: "Flows, state diagrams, API notes, and small architecture sketches before code.",
    tags: ["thinking", "architecture", "notes"],
  },
  {
    title: "Prototypes",
    image: "/generated/beyond-prototype.svg",
    body: "Late-night interface studies and rough ideas turned into interactive proofs.",
    tags: ["prototypes", "motion", "experiments"],
  },
];

export const contactCommands = [
  {
    label: "Role or hire",
    subject: "Engineering opportunity",
    message: "Hi Priyanshu, I'd like to discuss an engineering role or collaboration.",
  },
  {
    label: "Product build",
    subject: "Product collaboration",
    message: "Hi Priyanshu, I have a product idea and would like to explore building it together.",
  },
  {
    label: "Open chat",
    subject: "General conversation",
    message: "Hi Priyanshu, I'd like to connect and start a conversation.",
  },
];
