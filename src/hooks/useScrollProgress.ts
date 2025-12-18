'use client';

import { useEffect, useState, useRef, RefObject } from 'react';

interface ScrollProgress {
    progress: number; // 0 to 1, how far through the section
    isInView: boolean;
    opacity: number; // Calculated opacity based on position
    scale: number; // Calculated scale based on position
}

/**
 * Hook for scroll-driven animations
 * Returns progress (0-1), opacity, and scale based on element position in viewport
 */
export function useScrollProgress<T extends HTMLElement>(
    options: {
        fadeIn?: boolean;
        fadeOut?: boolean;
        scaleRange?: [number, number]; // [start, end] scale values
    } = {}
): [RefObject<T | null>, ScrollProgress] {
    const ref = useRef<T>(null);
    const [progress, setProgress] = useState<ScrollProgress>({
        progress: 0,
        isInView: false,
        opacity: 0,
        scale: options.scaleRange?.[0] ?? 1,
    });

    const { fadeIn = true, fadeOut = true, scaleRange = [0.95, 1] } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate how far the element is through the viewport
            // 0 = just entering from bottom, 0.5 = centered, 1 = leaving from top
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = windowHeight / 2;

            // Progress from 0 (bottom of viewport) to 1 (top of viewport)
            const rawProgress = 1 - (rect.top / windowHeight);
            const clampedProgress = Math.max(0, Math.min(1, rawProgress));

            // Is element in view?
            const isInView = rect.bottom > 0 && rect.top < windowHeight;

            // Calculate opacity based on position
            let opacity = 1;
            if (fadeIn && fadeOut) {
                // Fade in as it enters, fade out as it leaves
                const distanceFromCenter = Math.abs(elementCenter - viewportCenter) / (windowHeight / 2);
                opacity = Math.max(0, 1 - distanceFromCenter * 0.8);
            } else if (fadeIn) {
                // Just fade in
                opacity = Math.min(1, rawProgress * 2);
            } else if (fadeOut) {
                // Just fade out
                opacity = Math.max(0, 1 - (rawProgress - 0.5) * 2);
            }

            // Calculate scale
            const scaleProgress = Math.min(1, rawProgress * 1.5);
            const scale = scaleRange[0] + (scaleRange[1] - scaleRange[0]) * scaleProgress;

            setProgress({
                progress: clampedProgress,
                isInView,
                opacity: Math.max(0, Math.min(1, opacity)),
                scale: Math.max(scaleRange[0], Math.min(scaleRange[1], scale)),
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [fadeIn, fadeOut, scaleRange]);

    return [ref, progress];
}

/**
 * Hook for text that animates based on scroll position
 * Perfect for large statement text in full-screen sections
 */
export function useScrollText<T extends HTMLElement>(): [RefObject<T | null>, { opacity: number; y: number }] {
    const ref = useRef<T>(null);
    const [style, setStyle] = useState({ opacity: 0, y: 50 });

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const handleScroll = () => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start animating when element is 80% from bottom of viewport
            const triggerPoint = windowHeight * 0.8;
            const progress = (triggerPoint - rect.top) / (triggerPoint * 0.5);
            const clampedProgress = Math.max(0, Math.min(1, progress));

            // Fade out when leaving top
            const fadeOutProgress = rect.top / (windowHeight * 0.3);
            const fadeOut = fadeOutProgress < 0 ? Math.max(0, 1 + fadeOutProgress) : 1;

            setStyle({
                opacity: clampedProgress * fadeOut,
                y: 50 * (1 - clampedProgress),
            });
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return [ref, style];
}
