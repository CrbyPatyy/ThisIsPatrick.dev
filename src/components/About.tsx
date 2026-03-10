'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';
import MagneticText from './MagneticText';
import StaggerText from './StaggerText';

export default function About() {
    const [ref, visible] = useScrollReveal<HTMLDivElement>();

    const stack = [
        { category: 'Analysis', items: ['Excel', 'SQL', 'Python', 'R'] },
        { category: 'Visualization', items: ['Power BI', 'Tableau', 'Recharts'] },
        { category: 'Tools', items: ['Git', 'Jira', 'SPSS', 'Google Sheets', 'Jupyter'] },
    ];

    return (
        <section id="about" className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
            <div className="container max-w-6xl">
                <div ref={ref} className={`grid lg:grid-cols-12 gap-12 lg:gap-20 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                    <div className="lg:col-span-7">
                        <p className="section-label mb-6">About Me</p>
                        <h2 className="heading-subsection mb-8">
                            {visible ? <StaggerText text="Data-driven problem solver " delay={0} /> : "Data-driven problem solver "}
                            <span className="text-[var(--text-muted)]">
                                {visible ? <StaggerText text="with a passion for" delay={400} /> : "with a passion for"}
                            </span>{' '}
                            {visible ? <StaggerText text="uncovering meaningful insights." delay={600} /> : "uncovering meaningful insights."}
                        </h2>
                        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-12">
                            With a Computer Engineering background and hands-on experience as a Data Analyst, I specialize in transforming raw, messy data into clear, actionable insights. From cleaning and validating large-scale datasets to building interactive dashboards that tell compelling stories — I thrive on making data work for businesses. <em className="text-[var(--text-primary)] not-italic">"What does the data actually tell us?"</em> is the question that drives me every day. When I&apos;m not crunching numbers, you&apos;ll find me chasing mountains or diving into the ocean.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#contact" className="btn btn-primary !p-0">
                                <MagneticText text="Work with me" className="!px-8 !py-4" />
                            </a>
                        </div>
                    </div>
                    <div className="lg:col-span-5">
                        <div className="lg:pl-8 lg:border-l border-[var(--border)]">
                            <p className="section-label mb-8">Tech Stack</p>
                            <div className="space-y-8">
                                {stack.map((group, groupIdx) => (
                                    <div key={group.category} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${300 + groupIdx * 100}ms` }}>
                                        <p className="text-sm text-[var(--text-muted)] font-medium mb-4">{group.category}</p>
                                        <div className="flex flex-wrap gap-3">
                                            {group.items.map((item) => (
                                                <span key={item} className="px-4 py-2 text-sm bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-full hover:border-[var(--border-hover)] hover:bg-[var(--bg-hover)] transition-all duration-300 cursor-default">{item}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
