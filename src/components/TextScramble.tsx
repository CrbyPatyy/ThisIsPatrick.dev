'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

interface TextScrambleProps {
    text: string;
    autostart?: boolean;
    duration?: number;
    className?: string;
    delay?: number;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';

export default function TextScramble({
    text,
    autostart = true,
    duration = 1.5,
    className = "",
    delay = 0
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const iteration = useRef(0);
    const rafRef = useRef<number | null>(null);

    const scramble = useCallback(() => {
        setIsAnimating(true);
        iteration.current = 0;

        const startTime = performance.now();
        const endTime = startTime + (duration * 1000);

        const update = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);

            const scrambled = text.split('').map((char, index) => {
                if (char === ' ') return ' ';
                if (index < progress * text.length) {
                    return text[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join('');

            setDisplayText(scrambled);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(update);
            } else {
                setIsAnimating(false);
            }
        };

        rafRef.current = requestAnimationFrame(update);
    }, [text, duration]);

    useEffect(() => {
        if (autostart) {
            const timer = setTimeout(scramble, delay);
            return () => {
                clearTimeout(timer);
                if (rafRef.current) cancelAnimationFrame(rafRef.current);
            }
        }
    }, [autostart, scramble, delay]);

    return (
        <span className={className}>
            {displayText}
        </span>
    );
}
