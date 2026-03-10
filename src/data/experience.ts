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
        role: "Data Analyst",
        company: "Accendion",
        period: "2025 (6 Months)",
        description: "Performed data cleaning, validation, and quality assurance for large-scale datasets from major European companies. Ensured data accuracy and consistency across multiple sources using Excel, internal SPM tools, and Jira for workflow tracking. Delivered high-quality, analysis-ready outputs that supported downstream reporting and decision-making processes.",
        technologies: ["Data Cleaning", "Excel", "SQL", "Jira", "SPM", "Data Validation"]
    },
    {
        id: 2,
        role: "Intern — Data & Internal Tools",
        company: "Hytec Power Inc.",
        period: "Internship",
        description: "Co-developed an internal catalog system organizing industrial machine data for staff and company tours. Built search and filter functionality to enable quick data retrieval, structured machine profile pages for consistent data presentation, and assisted in testing and quality assurance to ensure data integrity across the platform.",
        technologies: ["Data Management", "Internal Tools", "QA Testing", "Documentation"]
    }
];
