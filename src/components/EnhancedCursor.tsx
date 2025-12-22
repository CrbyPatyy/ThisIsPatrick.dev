'use client';

import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

export default function EnhancedCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const mouse = useRef({ x: 0, y: 0 });

    // Memoized function to check if element is interactive
    const getInteractiveState = useCallback((target: HTMLElement) => {
        // Check for cursor text
        const cursorText = target.dataset.cursorText ||
            target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');

        // Check if it's a link or button
        const isLink = target.tagName === 'A' ||
            target.tagName === 'BUTTON' ||
            target.closest('a') ||
            target.closest('button') ||
            target.classList.contains('cursor-pointer') ||
            target.classList.contains('btn') ||
            target.closest('.btn');

        // Check if on dark background
        const isDark = target.classList.contains('btn-primary') ||
            target.closest('.btn-primary') ||
            target.classList.contains('bg-neutral-900') ||
            target.closest('.bg-neutral-900');

        // Check if on light background (white buttons)
        const isLight = target.dataset.lightBg === 'true' ||
            target.closest('[data-light-bg="true"]');

        return { cursorText, isLink, isDark, isLight };
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;
        const dot = dotRef.current;
        const text = textRef.current;
        const ring = ringRef.current;

        if (!cursor || !dot || !ring) return;

        // Use GSAP quickTo for smoother performance
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3.out" });
        const dotXTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "none" });
        const dotYTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "none" });

        // Track current state to prevent animation spam
        let currentState = 'default';
        let lastCheck = 0;
        const CHECK_INTERVAL = 50; // ms between state checks

        const handleMouseMove = (e: MouseEvent) => {
            // Update positions immediately
            xTo(e.clientX);
            yTo(e.clientY);
            dotXTo(e.clientX);
            dotYTo(e.clientY);

            // Throttle interactive state checks
            const now = Date.now();
            if (now - lastCheck < CHECK_INTERVAL) return;
            lastCheck = now;

            const target = e.target as HTMLElement;
            const { cursorText, isLink, isDark, isLight } = getInteractiveState(target);

            // Determine new state
            let newState = 'default';
            if (cursorText) newState = 'text:' + cursorText;
            else if (isLink) newState = 'link';

            // Only animate if state changed
            if (newState !== currentState) {
                currentState = newState;

                if (cursorText && text) {
                    text.textContent = cursorText;
                    gsap.to(ring, {
                        width: 80,
                        height: 80,
                        marginLeft: -40,
                        marginTop: -40,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    });
                    gsap.to(text, { opacity: 1, duration: 0.15, overwrite: 'auto' });
                    gsap.to(dot, { opacity: 0, duration: 0.15, overwrite: 'auto' });
                } else if (isLink) {
                    gsap.to(ring, {
                        width: 60,
                        height: 60,
                        marginLeft: -30,
                        marginTop: -30,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    });
                    if (text) gsap.to(text, { opacity: 0, duration: 0.15, overwrite: 'auto' });
                    gsap.to(dot, { opacity: 1, scale: 1.5, duration: 0.15, overwrite: 'auto' });
                } else {
                    gsap.to(ring, {
                        width: 40,
                        height: 40,
                        marginLeft: -20,
                        marginTop: -20,
                        duration: 0.3,
                        ease: 'power2.out',
                        overwrite: 'auto',
                    });
                    if (text) gsap.to(text, { opacity: 0, duration: 0.15, overwrite: 'auto' });
                    gsap.to(dot, { opacity: 1, scale: 1, duration: 0.15, overwrite: 'auto' });
                }
            }

            // Handle color mode separately (less often changes)
            if (isDark) {
                cursor.classList.add('inverted');
                dot.classList.add('inverted');
                cursor.classList.remove('light');
                dot.classList.remove('light');
            } else if (isLight) {
                cursor.classList.add('light');
                dot.classList.add('light');
                cursor.classList.remove('inverted');
                dot.classList.remove('inverted');
            } else {
                cursor.classList.remove('inverted', 'light');
                dot.classList.remove('inverted', 'light');
            }
        };

        const handleMouseDown = () => {
            gsap.to(ring, { scale: 0.8, duration: 0.1, ease: 'power2.out' });
            gsap.to(dot, { scale: 0.6, duration: 0.1, ease: 'power2.out' });
        };

        const handleMouseUp = () => {
            gsap.to(ring, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
            gsap.to(dot, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' });
        };

        const handleWindowLeave = () => {
            gsap.to([cursor, dot], { opacity: 0, duration: 0.2, overwrite: 'auto' });
        };

        const handleWindowEnter = () => {
            gsap.to([cursor, dot], { opacity: 1, duration: 0.2, overwrite: 'auto' });
        };

        // Initial setup
        gsap.set([cursor, dot], { opacity: 1 });

        // Event listeners with passive option for better performance
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseleave', handleWindowLeave);
        document.documentElement.addEventListener('mouseenter', handleWindowEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseleave', handleWindowLeave);
            document.documentElement.removeEventListener('mouseenter', handleWindowEnter);
        };
    }, [getInteractiveState]);

    return (
        <>
            {/* Cursor ring */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:flex items-center justify-center"
                style={{ opacity: 0 }}
            >
                <div
                    ref={ringRef}
                    className="cursor-ring w-10 h-10 -ml-5 -mt-5 rounded-full border border-white/40 flex items-center justify-center transition-colors duration-200"
                >
                    <span
                        ref={textRef}
                        className="text-[9px] font-semibold uppercase tracking-wider opacity-0"
                    />
                </div>
            </div>

            {/* Cursor dot */}
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
                style={{ opacity: 0 }}
            >
                <div className="cursor-dot w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-white transition-colors duration-200" />
            </div>

            <style jsx global>{`
                @media (min-width: 768px) {
                    * {
                        cursor: none !important;
                    }
                }

                .inverted .cursor-ring {
                    border-color: rgba(255, 255, 255, 0.6);
                    mix-blend-mode: difference;
                }

                .inverted .cursor-ring span {
                    color: white;
                }

                .inverted .cursor-dot {
                    background-color: white;
                    mix-blend-mode: difference;
                }

                .light .cursor-ring {
                    border-color: rgba(0, 0, 0, 0.8);
                }

                .light .cursor-ring span {
                    color: black;
                }

                .light .cursor-dot {
                    background-color: black;
                }
            `}</style>
        </>
    );
}
