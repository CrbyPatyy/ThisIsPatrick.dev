'use client';

import { useEffect, useRef, useState } from 'react';

const skillCategories = [
    {
        title: 'Frontend',
        skills: [
            { name: 'React / Next.js', icon: '⚛️' },
            { name: 'TypeScript', icon: '📘' },
            { name: 'Tailwind CSS', icon: '🎨' },
            { name: 'Framer Motion', icon: '✨' },
        ],
    },
    {
        title: 'Backend',
        skills: [
            { name: 'Node.js', icon: '🟢' },
            { name: 'Python', icon: '🐍' },
            { name: 'PostgreSQL', icon: '🐘' },
            { name: 'REST APIs', icon: '🔌' },
        ],
    },
    {
        title: 'Tools & Other',
        skills: [
            { name: 'Git / GitHub', icon: '📂' },
            { name: 'Docker', icon: '🐳' },
            { name: 'Figma', icon: '🎭' },
            { name: 'VS Code', icon: '💻' },
        ],
    },
];

const marqueeSkills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Tailwind', 'Docker', 'Git', 'Figma'];

export default function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => entry.isIntersecting && setVisible(true),
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="skills" ref={sectionRef} className="py-32 relative overflow-hidden">
            {/* Marquee Background */}
            <div className="absolute inset-0 flex items-center opacity-[0.03] pointer-events-none">
                <div className="marquee-container w-full">
                    <div className="marquee-content">
                        {[...marqueeSkills, ...marqueeSkills].map((skill, i) => (
                            <span key={i} className="text-[12rem] font-bold uppercase mx-8 whitespace-nowrap">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container relative z-10">
                {/* Header */}
                <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <span className="tag tag-glow mb-4">Skills & Tools</span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Technologies I <span className="gradient-text">Master</span>
                    </h2>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {skillCategories.map((category, catIndex) => (
                        <div
                            key={category.title}
                            className={`bento-card p-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                                }`}
                            style={{ transitionDelay: `${200 + catIndex * 100}ms` }}
                        >
                            <h3 className="text-lg font-semibold mb-6 gradient-text">{category.title}</h3>
                            <div className="space-y-3">
                                {category.skills.map((skill, i) => (
                                    <div
                                        key={skill.name}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-elevated)] border border-transparent hover:border-[var(--border-hover)] transition-all duration-300 group cursor-default"
                                    >
                                        <span className="text-xl group-hover:scale-110 transition-transform">{skill.icon}</span>
                                        <span className="text-sm text-[var(--text-secondary)] group-hover:text-white transition-colors">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Extra Skills */}
                <div className={`mt-12 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-[var(--text-muted)] mb-4">And always learning more...</p>
                    <div className="flex justify-center gap-3 flex-wrap">
                        {['GraphQL', 'AWS', 'Redis', 'MongoDB', 'Firebase', 'Prisma'].map((tech) => (
                            <span key={tech} className="tag">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
