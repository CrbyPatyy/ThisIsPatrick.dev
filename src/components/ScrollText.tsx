'use client';

import { useRef, useEffect, useState } from 'react';

interface ScrollTextProps {
    children: React.ReactNode;
    className?: string;
}

export default function ScrollText({ children, className = '' }: ScrollTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0, scale: 0.95, y: 30 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;

            // Calculate progress based on distance from center
            const distanceFromCenter = elementCenter - viewportCenter;
            const maxDistance = windowHeight * 0.6;

            // Normalize to -1 (above center) to 1 (below center)
            const normalizedDistance = distanceFromCenter / maxDistance;

            // Calculate opacity - peak at center
            const opacity = Math.max(0, 1 - Math.abs(normalizedDistance) * 0.8);

            // Calculate scale - slightly smaller when far from center
            const scale = 0.95 + (1 - Math.abs(normalizedDistance)) * 0.05;

            // Calculate Y offset - moves up as it scrolls
            const y = normalizedDistance * 30;

            setStyle({ opacity, scale, y });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={ref}
            className={`section-screen ${className}`}
            style={{
                opacity: style.opacity,
                transform: `scale(${style.scale}) translateY(${style.y}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        >
            <div className="container">
                <div className="scroll-text">
                    {children}
                </div>
            </div>
        </div>
    );
}

// Variant for statement text with highlighted words
export function ScrollStatement({
    primary,
    secondary
}: {
    primary: string;
    secondary?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0, scale: 0.95, y: 30 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;

            const distanceFromCenter = elementCenter - viewportCenter;
            const maxDistance = windowHeight * 0.6;
            const normalizedDistance = distanceFromCenter / maxDistance;

            const opacity = Math.max(0, 1 - Math.abs(normalizedDistance) * 0.8);
            const scale = 0.95 + (1 - Math.abs(normalizedDistance)) * 0.05;
            const y = normalizedDistance * 30;

            setStyle({ opacity, scale, y });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={ref}
            className="section-screen"
            style={{
                opacity: style.opacity,
                transform: `scale(${style.scale}) translateY(${style.y}px)`,
                transition: 'transform 0.1s ease-out',
            }}
        >
            <div className="container">
                <p className="scroll-text">
                    {primary}
                    {secondary && (
                        <span className="text-[var(--text-muted)]"> {secondary}</span>
                    )}
                </p>
            </div>
        </div>
    );
}
