'use client';

import { useEffect, useRef, useState } from 'react';

interface StaggerTextProps {
    text: string;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
    delay?: number;
}

export default function StaggerText({
    text,
    className = '',
    tag: Tag = 'span',
    delay = 0
}: StaggerTextProps) {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    // Split into words to prevent word breaks
    const words = text.split(' ');
    let globalCharIndex = 0;

    return (
        <Tag
            ref={ref as React.RefObject<HTMLHeadingElement>}
            className={className}
            style={{ display: 'inline' }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {word.split('').map((char) => {
                        const charDelay = delay + globalCharIndex * 30;
                        globalCharIndex++;
                        return (
                            <span
                                key={`${wordIndex}-${globalCharIndex}`}
                                style={{
                                    display: 'inline-block',
                                    opacity: isVisible ? 1 : 0,
                                    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                                    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                                    transitionDelay: isVisible ? `${charDelay}ms` : '0ms',
                                }}
                            >
                                {char}
                            </span>
                        );
                    })}
                    {wordIndex < words.length - 1 && (
                        <span style={{
                            display: 'inline',
                            opacity: isVisible ? 1 : 0,
                            transition: 'opacity 0.4s ease-out',
                            transitionDelay: isVisible ? `${delay + globalCharIndex * 30}ms` : '0ms',
                        }}>&nbsp;</span>
                    )}
                </span>
            ))}
        </Tag>
    );
}


