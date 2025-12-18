'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const cursorDotRef = useRef<HTMLDivElement>(null);
    const mousePos = useRef({ x: 0, y: 0 });
    const cursorPos = useRef({ x: 0, y: 0 });

    const updateCursor = useCallback(() => {
        // Higher quality smooth follow with lerp
        const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

        cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.12);
        cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.12);

        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
        }

        if (cursorDotRef.current) {
            cursorDotRef.current.style.transform = `translate(${mousePos.current.x}px, ${mousePos.current.y}px)`;
        }

        requestAnimationFrame(updateCursor);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY };
        };

        const handleMouseDown = () => {
            if (cursorRef.current) cursorRef.current.classList.add('cursor-active');
        };

        const handleMouseUp = () => {
            if (cursorRef.current) cursorRef.current.classList.remove('cursor-active');
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-pointer');

            // Check if hovering over dark element
            const isDarkElement =
                target.classList.contains('btn-primary') ||
                target.classList.contains('bg-neutral-900') ||
                target.classList.contains('bg-black') ||
                target.classList.contains('cursor-invert-target') ||
                target.closest('.btn-primary') ||
                target.closest('.cursor-invert-target') ||
                target.closest('[class*="bg-neutral-9"]') ||
                target.closest('[class*="bg-black"]');

            if (cursorRef.current && cursorDotRef.current) {
                const ringEl = cursorRef.current.querySelector('div') as HTMLElement;
                const dotEl = cursorDotRef.current.querySelector('div') as HTMLElement;

                if (isDarkElement) {
                    cursorRef.current.classList.add('cursor-invert');
                    if (ringEl) ringEl.style.borderColor = 'rgba(255, 255, 255, 0.6)';
                    if (dotEl) dotEl.style.backgroundColor = 'white';
                } else {
                    cursorRef.current.classList.remove('cursor-invert');
                    if (ringEl) ringEl.style.borderColor = 'rgba(0, 0, 0, 0.25)';
                    if (dotEl) dotEl.style.backgroundColor = 'rgb(23, 23, 23)';
                }

                if (isInteractive) {
                    cursorRef.current.classList.add('cursor-hover');
                } else {
                    cursorRef.current.classList.remove('cursor-hover');
                }
            }
        };

        const handleMouseLeave = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '0';
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.style.opacity = '0';
            }
        };

        const handleMouseEnter = () => {
            if (cursorRef.current) {
                cursorRef.current.style.opacity = '1';
            }
            if (cursorDotRef.current) {
                cursorDotRef.current.style.opacity = '1';
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        requestAnimationFrame(updateCursor);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [updateCursor]);

    return (
        <>
            {/* Main cursor ring */}
            <div
                ref={cursorRef}
                className="custom-cursor pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
                style={{ opacity: 0 }}
            >
                <div className="w-10 h-10 -ml-5 -mt-5 rounded-full border border-neutral-900/25 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
            </div>

            {/* Cursor dot */}
            <div
                ref={cursorDotRef}
                className="pointer-events-none fixed top-0 left-0 z-[9999] hidden md:block"
                style={{ opacity: 0 }}
            >
                <div className="w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-neutral-900 transition-colors duration-200" />
            </div>

            <style jsx global>{`
                @media (min-width: 768px) {
                    * {
                        cursor: none !important;
                    }
                }

                .custom-cursor.cursor-hover > div {
                    width: 4rem;
                    height: 4rem;
                    margin-left: -2rem;
                    margin-top: -2rem;
                    background-color: rgba(0, 0, 0, 0.05);
                    border-width: 0.5px;
                }

                .custom-cursor.cursor-active > div {
                    transform: scale(0.7);
                    background-color: rgba(0, 0, 0, 0.1);
                }

                .custom-cursor.cursor-invert.cursor-hover > div {
                    background-color: rgba(255, 255, 255, 0.15);
                }
                
                .custom-cursor.cursor-invert.cursor-active > div {
                    background-color: rgba(255, 255, 255, 0.25);
                }
            `}</style>
        </>
    );
}

