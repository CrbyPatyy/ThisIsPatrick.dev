export interface ExperienceItem {
    id: number;
    role: string;
    company: string;
    period: string;
    description: string;
    technologies: string[];
}

export const experience: ExperienceItem[] = [
    {
        id: 1,
        role: "IT Director",
        company: "SaniSolutions",
        period: "Present",
        description: "Manage IT operations, resolve technical issues, and oversee the development of client websites and digital solutions to ensure reliable systems and support business objectives.",
        technologies: ["IT Strategy", "Product Leadership", "Full Stack Development", "System Architecture"]
    },
    {
        id: 2,
        role: "Data Analyst",
        company: "Accendion",
        period: "2025 (6 Months)",
        description: "Performed data cleaning and validation for large datasets from major European companies using Excel, SPM, Jira, and internal company software, ensuring data accuracy, consistency, and high-quality outputs.",
        technologies: ["Data Analysis", "Excel", "SQL", "Visualization"]
    }
];
