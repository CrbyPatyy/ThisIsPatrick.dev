'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

interface ScrollTextProps {
    children: React.ReactNode;
    className?: string;
}

export default function ScrollText({ children, className = '' }: ScrollTextProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState({ opacity: 0, scale: 0.95, y: 30 });
    const lastStyleRef = useRef({ opacity: 0, scale: 0.95, y: 30 });
    const rafRef = useRef<number | null>(null);

    const handleScroll = useCallback(() => {
        const element = ref.current;
        if (!element) return;

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

        // Only update if values changed significantly
        const last = lastStyleRef.current;
        if (
            Math.abs(opacity - last.opacity) > 0.01 ||
            Math.abs(scale - last.scale) > 0.001 ||
            Math.abs(y - last.y) > 0.5
        ) {
            lastStyleRef.current = { opacity, scale, y };
            setStyle({ opacity, scale, y });
        }
    }, []);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(handleScroll);
        };

        handleScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleScroll]);

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
    const [isVisible, setIsVisible] = useState(false);
    const lastStyleRef = useRef({ opacity: 0, scale: 0.95, y: 30 });
    const rafRef = useRef<number | null>(null);

    const handleScroll = useCallback(() => {
        const element = ref.current;
        if (!element) return;

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

        // Trigger visibility when near center
        if (opacity > 0.5 && !isVisible) {
            setIsVisible(true);
        }

        // Only update if values changed significantly
        const last = lastStyleRef.current;
        if (
            Math.abs(opacity - last.opacity) > 0.01 ||
            Math.abs(scale - last.scale) > 0.001 ||
            Math.abs(y - last.y) > 0.5
        ) {
            lastStyleRef.current = { opacity, scale, y };
            setStyle({ opacity, scale, y });
        }
    }, [isVisible]);

    useEffect(() => {
        const onScroll = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(handleScroll);
        };

        handleScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [handleScroll]);

    // Split text into words for stagger effect (prevents word breaks)
    const renderStaggeredText = (text: string, delay: number = 0, muted: boolean = false) => {
        const words = text.split(' ');
        let charIndex = 0;

        return words.map((word, wordIndex) => (
            <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {word.split('').map((char) => {
                    const currentIndex = charIndex++;
                    return (
                        <span
                            key={currentIndex}
                            className={`inline-block ${muted ? 'text-[var(--text-muted)]' : ''}`}
                            style={{
                                opacity: isVisible ? 1 : 0,
                                transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                                transition: `opacity 0.5s ease, transform 0.5s ease`,
                                transitionDelay: `${delay + currentIndex * 25}ms`,
                            }}
                        >
                            {char}
                        </span>
                    );
                })}
                {wordIndex < words.length - 1 && (
                    <span style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.5s ease', transitionDelay: `${delay + charIndex++ * 25}ms` }}>&nbsp;</span>
                )}
            </span>
        ));
    };

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
                    {renderStaggeredText(primary)}
                    {secondary && (
                        <>
                            {' '}
                            {renderStaggeredText(secondary, primary.length * 25, true)}
                        </>
                    )}
                </p>
            </div>
        </div>
    );
}

