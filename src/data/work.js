// Work, projects, and skills, taken from the résumé and the previous site.
// Skills links each skill to the entries in `sources` that show it in use.

export const experience = {
    title: "Web & Marketing Systems Specialist",
    company: "Franchise Focused Marketing",
    location: "Santa Ana, CA",
    dates: "Dec 2025 – Present",
    stats: [
        { value: "20+", label: "landing pages for fitness & boutique brands" },
        { value: "5+", label: "client & internal sites maintained" },
    ],
    highlights: [
        "Develop and maintain responsive production websites and landing pages in HTML, CSS, and JavaScript.",
        "Customize WordPress with custom and child themes, PHP functions, and JavaScript for animation and interactivity.",
        "Integrate lead-generation forms with CRMs using REST APIs, JSON payloads, webhooks, and Zapier workflows.",
        "Build automated lead routing that validates and syncs data across CRMs, internal systems, and Google Sheets.",
        "Improve performance with frontend optimizations such as deferred video loading.",
    ],
};

export const clientSites = [
    {
        id: "knowlific",
        name: "Knowlific",
        sector: "Education",
        description:
            "A responsive WordPress website for Knowlific, an online platform offering engaging children’s learning materials.",
        stack: ["WordPress", "HTML", "JavaScript", "CSS"],
        liveUrl: "https://knowlific.reachsites.co/",
    },
    {
        id: "kommunity",
        name: "Kommunity",
        sector: "Fitness",
        description:
            "A custom website for Kommunity Fitness, giving a growing fitness brand a professional online presence.",
        stack: ["WordPress", "HTML", "JavaScript", "CSS"],
        liveUrl: "https://kommunityfitness.com/",
    },
];

export const personalProjects = [
    {
        id: "nutrition",
        name: "Food Nutrition Tracker",
        stack: ["React", "Node", "Express", "SQLite"],
        summary:
            "Senior capstone. A full-stack app for logging and tracking daily calories, similar to MyFitnessPal.",
        highlights: [
            "Responsive React frontend built with hooks and state management.",
            "RESTful Node.js/Express API for authentication and calorie data.",
            "Relational SQLite schema for data integrity.",
        ],
        repoUrl: "https://github.com/seannooh/TrackIt",
    },
    {
        id: "movies",
        name: "Movie Search App",
        stack: ["React", "OMDb API"],
        summary:
            "Search films by title and view detailed information, using real-time data from the OMDb API.",
        highlights: [
            "Search and dynamic rendering of results.",
            "Debounced API requests for faster, lighter lookups.",
        ],
        liveUrl: "https://seannooh.github.io/moviesearchapp/",
        repoUrl: "https://github.com/seannooh/moviesearchapp",
    },
];

export const sources = {
    ffm: "Franchise Focused Marketing",
    knowlific: "Knowlific",
    kommunity: "Kommunity",
    nutrition: "Food Nutrition Tracker",
    movies: "Movie Search App",
};

const web = ["ffm", "knowlific", "kommunity", "movies"];

export const skillGroups = [
    {
        name: "Languages",
        skills: [
            { name: "JavaScript (ES6+)", usedIn: [...web, "nutrition"] },
            { name: "HTML5", usedIn: web },
            { name: "CSS3", usedIn: web },
            { name: "PHP", usedIn: ["ffm"] },
            { name: "Java", usedIn: [] },
            { name: "Kotlin", usedIn: [] },
            { name: "Python", usedIn: [] },
        ],
    },
    {
        name: "Frontend",
        skills: [
            { name: "React", usedIn: ["nutrition", "movies"] },
            { name: "Responsive web", usedIn: ["ffm", "knowlific", "kommunity", "nutrition"] },
            { name: "DOM manipulation", usedIn: ["ffm"] },
        ],
    },
    {
        name: "Backend & APIs",
        skills: [
            { name: "Node.js", usedIn: ["nutrition"] },
            { name: "Express.js", usedIn: ["nutrition"] },
            { name: "REST APIs", usedIn: ["ffm", "nutrition", "movies"] },
            { name: "JSON", usedIn: ["ffm"] },
            { name: "Webhooks", usedIn: ["ffm"] },
        ],
    },
    {
        name: "Databases",
        skills: [
            { name: "SQLite", usedIn: ["nutrition"] },
            { name: "MySQL", usedIn: [] },
        ],
    },
    {
        name: "Platforms & tools",
        skills: [
            { name: "WordPress", usedIn: ["ffm", "knowlific", "kommunity"] },
            { name: "Zapier", usedIn: ["ffm"] },
            { name: "Google Ads", usedIn: ["ffm"] },
            { name: "Meta Pixel", usedIn: ["ffm"] },
            { name: "Git & GitHub", usedIn: ["nutrition", "movies"] },
            { name: "Chrome DevTools", usedIn: ["ffm"] },
        ],
    },
];
