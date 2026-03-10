'use client';

import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
    {
        id: 1,
        title: 'Data Cleaning & Preparation',
        description: 'Transform messy, raw datasets into clean, structured, analysis-ready data. I handle missing values, duplicates, outliers, and inconsistencies — ensuring your data foundation is rock-solid before any analysis begins.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
        )
    },
    {
        id: 2,
        title: 'Data Analysis & Reporting',
        description: 'Deep-dive statistical analysis to uncover trends, correlations, and patterns hidden in your data. Deliver clear, automated reports that translate complex findings into recommendations your team can act on immediately.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        id: 3,
        title: 'Data Visualization & Dashboards',
        description: 'Create interactive dashboards and compelling visual stories that make complex data instantly understandable. From executive summaries to operational metrics — every chart is designed to drive clarity and action.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
        )
    },
    {
        id: 4,
        title: 'Business Intelligence & Strategy',
        description: 'Bridge the gap between data and decisions. I translate analytical findings into strategic, revenue-impacting recommendations that help businesses optimize operations, reduce costs, and identify growth opportunities.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        )
    },
];


export default function Services() {
    const [headerRef, headerVisible] = useScrollReveal<HTMLDivElement>();
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    return (
        <section id="services" className="py-24 lg:py-32 bg-[var(--bg-secondary)]">
            <div className="container max-w-6xl">
                {/* Header */}
                <div
                    ref={headerRef}
                    className={`pb-8 border-b border-[var(--border)] transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                >
                    <p className="section-label">What I Offer</p>
                </div>

                {/* Service list - stacked vertically with dividers */}
                <div className="divide-y divide-[var(--border)]">
                    {services.map((service, index) => (
                        <ServiceItem
                            key={service.id}
                            service={service}
                            index={index}
                            isHovered={hoveredId === service.id}
                            onHover={() => setHoveredId(service.id)}
                            onLeave={() => setHoveredId(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ServiceItemProps {
    service: typeof services[0];
    index: number;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}

function ServiceItem({ service, index, isHovered, onHover, onLeave }: ServiceItemProps) {
    const [ref, visible] = useScrollReveal<HTMLDivElement>();
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
        }
    }, []);

    return (
        <div
            ref={ref}
            className={`service-item py-6 lg:py-8 cursor-default transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            onTouchStart={onHover}
        >
            <div className="flex items-center gap-4 md:gap-6">
                {/* Icon + Number badge */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? 'bg-[var(--accent)] text-[var(--bg-primary)] border-[var(--accent)] scale-110 rotate-3' : 'bg-[var(--bg-primary)] text-[var(--text-muted)] border-[var(--border)]'}`}>
                        {service.icon}
                    </div>
                    <span className={`font-mono text-sm transition-all duration-500 ${isHovered ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'}`}>
                        {String(service.id).padStart(2, '0')}
                    </span>
                </div>

                {/* Title */}
                <span
                    className={`flex-1 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-tight transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? 'text-[var(--text-primary)] translate-x-2' : 'text-[var(--text-muted)]'}`}
                >
                    {service.title}
                </span>

                {/* Arrow indicator */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--bg-primary)]' : 'border-[var(--border)] text-[var(--text-muted)]'}`}>
                    <svg
                        className={`w-5 h-5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isHovered ? 'rotate-0' : 'rotate-180'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Expandable description - smooth slide down on hover */}
            <div
                className="overflow-hidden"
                style={{
                    maxHeight: isHovered ? `${contentHeight}px` : '0px',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(-8px)',
                    transition: 'all 700ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
            >
                <div ref={contentRef} className="pt-6 pl-[88px] md:pl-[100px]">
                    <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
                        {service.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
