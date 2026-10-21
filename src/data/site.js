// Shared site content: chapter order for navigation and external links.

export const chapters = [
    { id: "about", label: "About" },
    { id: "projects", label: "Work" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

export const links = {
    email: "sean.oh0899@gmail.com",
    phone: "(714) 514-0899",
    linkedin: "https://www.linkedin.com/in/sean-oh-0ba2042ab/",
    github: "https://github.com/seannooh",
    resume: `${process.env.PUBLIC_URL}/Sean-Oh-Resume.pdf`,
};

export const externalLinks = [
    { label: "LinkedIn", href: links.linkedin },
    { label: "GitHub", href: links.github },
    { label: "Résumé", href: links.resume },
];
