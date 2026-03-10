export interface Project {
    id: number;
    slug: string;
    title: string;
    category: string;
    year: string;
    description: string;
    longDescription: string;
    techStack: string[];
    features: string[];
    status: 'Completed' | 'In Progress' | 'Coming Soon';
    challenges?: string;
    solution?: string;
    liveUrl?: string;
    githubUrl?: string;
    images?: string[];
    metrics?: {
        label: string;
        value: string;
        description?: string;
    }[];
    techDecisions?: {
        technology: string;
        reason: string;
    }[];
}

export const projects: Project[] = [
    {
        id: 1,
        slug: 'sales-performance-dashboard',
        title: 'Sales Performance Dashboard',
        category: 'Data Visualization',
        year: '2025',
        description: 'Interactive dashboard analyzing sales KPIs, revenue trends, and regional performance patterns across multiple business units.',
        longDescription: 'A comprehensive sales analytics dashboard that transforms raw transaction data into actionable business intelligence. The dashboard provides real-time visibility into key sales metrics, enabling stakeholders to identify top-performing products, track revenue trends over time, and compare regional performance at a glance. Built with a focus on clarity and usability, every visualization is designed to answer specific business questions.',
        techStack: ['Excel', 'Power BI', 'SQL', 'DAX'],
        features: [
            'Revenue trend analysis with year-over-year comparisons',
            'Regional performance heatmaps with drill-down capabilities',
            'Product category breakdown with contribution analysis',
            'Monthly/quarterly/annual KPI scorecards',
            'Dynamic filters for date range, region, and product line',
            'Automated data refresh pipeline from source databases',
            'Top/bottom performer rankings with variance analysis',
            'Executive summary page with key insights highlighted'
        ],
        challenges: 'The primary challenge was consolidating sales data from multiple sources with inconsistent formats, naming conventions, and time zones. The raw data contained significant quality issues including duplicate entries, missing values, and mismatched product codes across regional systems. Additionally, stakeholders from different departments had conflicting requirements for how metrics should be calculated and displayed.',
        solution: 'Implemented a robust ETL pipeline using SQL to standardize and clean data from multiple sources before loading into Power BI. Created a comprehensive data model with proper relationships and calculated measures using DAX to ensure consistent metric calculations. Designed the dashboard with a layered approach — an executive summary for quick insights, detailed pages for deep dives, and interactive filters that allow users to explore data at their own pace.',
        githubUrl: 'https://github.com/CrbyPatyy',
        status: 'Completed',
        images: [
            '/sales-dashboard.png'
        ],
        metrics: [
            {
                label: 'Data Points',
                value: '50K+',
                description: 'Transaction records analyzed and visualized'
            },
            {
                label: 'KPIs Tracked',
                value: '12',
                description: 'Key performance indicators monitored'
            },
            {
                label: 'Regions',
                value: '5',
                description: 'Geographic regions compared'
            },
            {
                label: 'Refresh Rate',
                value: 'Daily',
                description: 'Automated daily data pipeline updates'
            }
        ],
        techDecisions: [
            {
                technology: 'Power BI',
                reason: 'Industry-standard BI tool with powerful DAX expressions, interactive visualizations, and seamless integration with SQL databases. Ideal for stakeholder-facing dashboards.'
            },
            {
                technology: 'SQL',
                reason: 'Used for data extraction, cleaning, and transformation. SQL provided the flexibility to handle complex joins across multiple source tables and implement business logic at the data layer.'
            },
            {
                technology: 'DAX',
                reason: 'Data Analysis Expressions enabled dynamic calculations like year-over-year growth, running totals, and weighted averages that update automatically with filter selections.'
            },
            {
                technology: 'Excel',
                reason: 'Used for initial data exploration, ad-hoc analysis, and creating supplementary reports that complement the main dashboard.'
            }
        ]
    },
    {
        id: 2,
        slug: 'customer-churn-analysis',
        title: 'Customer Churn Analysis',
        category: 'Exploratory Data Analysis',
        year: '2025',
        description: 'Exploratory data analysis identifying customer churn patterns, key risk factors, and data-driven retention strategies.',
        longDescription: 'An in-depth exploratory data analysis project focused on understanding why customers leave and what factors contribute most to churn. Using Python and statistical analysis techniques, this project uncovers hidden patterns in customer behavior data, segments at-risk customers, and provides actionable recommendations for improving retention rates. The analysis goes beyond surface-level metrics to identify the root causes of churn.',
        techStack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
        features: [
            'Customer segmentation analysis using behavioral metrics',
            'Churn rate analysis across different customer demographics',
            'Correlation analysis between service usage and churn likelihood',
            'Tenure-based survival analysis of customer retention',
            'Feature importance ranking for churn prediction factors',
            'Visual storytelling with annotated charts and insights',
            'Cohort analysis comparing customer groups over time',
            'Actionable retention recommendations backed by data'
        ],
        challenges: 'The dataset contained highly imbalanced classes with significantly more retained customers than churned ones, making pattern detection challenging. Many features had missing values and required careful imputation strategies. Additionally, translating statistical findings into clear, non-technical recommendations for business stakeholders required thoughtful communication.',
        solution: 'Applied systematic data cleaning and feature engineering to handle missing values and create meaningful derived metrics. Used stratified sampling and visualization techniques to ensure churn patterns were accurately represented despite class imbalance. Created a narrative-driven analysis that walks stakeholders through findings step-by-step, using annotated visualizations to connect data patterns to business actions.',
        githubUrl: 'https://github.com/CrbyPatyy',
        status: 'Completed',
        images: [
            '/churn-analysis.png'
        ],
        metrics: [
            {
                label: 'Records Analyzed',
                value: '7K+',
                description: 'Customer records with behavioral data'
            },
            {
                label: 'Features',
                value: '20+',
                description: 'Variables analyzed for churn correlation'
            },
            {
                label: 'Key Insights',
                value: '8',
                description: 'Actionable findings for retention strategy'
            },
            {
                label: 'Visualizations',
                value: '15+',
                description: 'Charts and plots in the final report'
            }
        ],
        techDecisions: [
            {
                technology: 'Python',
                reason: 'The most versatile language for data analysis, offering powerful libraries for statistical computing, data manipulation, and visualization all in one ecosystem.'
            },
            {
                technology: 'Pandas',
                reason: 'Essential for data manipulation, cleaning, and transformation. Pandas DataFrames made it easy to handle complex data operations and feature engineering.'
            },
            {
                technology: 'Seaborn / Matplotlib',
                reason: 'Combined for publication-quality statistical visualizations. Seaborn for high-level statistical plots, Matplotlib for fine-grained customization.'
            },
            {
                technology: 'Jupyter Notebook',
                reason: 'Interactive computing environment perfect for exploratory analysis, allowing code, visualizations, and narrative text to coexist in a single document.'
            }
        ]
    },
    {
        id: 3,
        slug: 'hr-analytics-report',
        title: 'HR Analytics Report',
        category: 'Business Intelligence',
        year: '2025',
        description: 'Employee attrition analysis with data visualization, identifying key drivers and strategic recommendations for retention.',
        longDescription: 'A comprehensive HR analytics project that examines employee attrition data to identify the key factors driving turnover. Through statistical analysis and interactive visualizations, this report helps HR teams understand which departments, roles, and employee profiles are most at risk. The project delivers clear, data-backed recommendations for targeted retention programs that can reduce attrition costs.',
        techStack: ['Excel', 'Power BI', 'SQL', 'Python'],
        features: [
            'Department-level attrition rate analysis and benchmarking',
            'Salary band analysis correlated with turnover rates',
            'Employee satisfaction scoring and sentiment mapping',
            'Tenure analysis identifying critical drop-off periods',
            'Work-life balance metrics and their impact on retention',
            'Manager effectiveness analysis using team attrition data',
            'Predictive risk scoring for current employees',
            'Cost-of-attrition calculator with financial impact modeling'
        ],
        challenges: 'HR data is inherently sensitive and multidimensional, requiring careful handling of personally identifiable information while still extracting meaningful patterns. The analysis needed to balance statistical rigor with practical applicability — findings that are statistically significant but not actionable provide little value to HR stakeholders.',
        solution: 'Anonymized and aggregated data at appropriate levels to protect individual privacy while preserving analytical value. Focused the analysis on actionable dimensions that HR teams can directly influence (training programs, compensation adjustments, work-life balance initiatives). Created a layered dashboard that allows HR managers to drill from department overviews down to role-specific insights.',
        githubUrl: 'https://github.com/CrbyPatyy',
        status: 'Completed',
        images: [
            '/hr-analytics.png'
        ],
        metrics: [
            {
                label: 'Employees',
                value: '1.4K+',
                description: 'Employee records in the analysis dataset'
            },
            {
                label: 'Attrition Factors',
                value: '15',
                description: 'Key variables analyzed for correlation'
            },
            {
                label: 'Departments',
                value: '6',
                description: 'Business units compared in the analysis'
            },
            {
                label: 'Recommendations',
                value: '5',
                description: 'Strategic retention actions proposed'
            }
        ],
        techDecisions: [
            {
                technology: 'Power BI',
                reason: 'Created an interactive dashboard for HR stakeholders to explore attrition patterns with visual filters and drill-through capabilities.'
            },
            {
                technology: 'Excel',
                reason: 'Used for initial data exploration, pivot table analysis, and creating supplementary statistical summaries for management reports.'
            },
            {
                technology: 'SQL',
                reason: 'Queried and joined multiple HR data tables (employee records, performance reviews, satisfaction surveys) into a unified analysis dataset.'
            },
            {
                technology: 'Python',
                reason: 'Applied for advanced statistical analysis, correlation testing, and generating the predictive risk scores used in the final recommendations.'
            }
        ]
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(p => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
    return projects.map(p => p.slug);
}
