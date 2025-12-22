'use client';

import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const services = [
    {
        id: 1,
        title: 'Business Data Analyst',
        description: 'Transform raw data into actionable insights that drive business decisions. I help businesses leverage their data through comprehensive analysis, visualization, and strategic recommendations that lead to measurable improvements.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
        )
    },
    {
        id: 2,
        title: 'Business Website',
        description: 'Professional websites that establish your online presence and attract customers. From e-commerce platforms to corporate sites, I create responsive, SEO-optimized websites that convert visitors into clients.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        )
    },
    {
        id: 3,
        title: 'Portfolio Sites',
        description: 'Stunning portfolios that showcase your work and make you stand out. Perfect for creatives, freelancers, and professionals who want to make a lasting impression with a unique, personalized online presence.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    },
    {
        id: 4,
        title: 'Landing Pages',
        description: 'High-converting pages designed to capture leads and drive action. Using proven design principles and A/B testing strategies, I create landing pages that maximize your marketing ROI.',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
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
