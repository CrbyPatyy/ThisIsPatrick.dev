'use client';

import { useState, useEffect, useRef } from 'react';

// Note: Using framer-motion here for easier follow-physics if the user has it, 
// but I'll stick to raw CSS/Spring if they don't. 
// Checking package.json... they don't have framer-motion.
// I'll implement with raw React/CSS for performance and no extra dependencies.

interface ProjectHoverPreviewProps {
    activeId: number | null;
    projects: any[];
}

export default function ProjectHoverPreview({ activeId, projects }: ProjectHoverPreviewProps) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Offset to position relative to cursor
            setPosition({ x: e.clientX + 20, y: e.clientY + 20 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const activeProject = projects.find(p => p.id === activeId);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[8888] overflow-hidden"
        >
            <div
                ref={previewRef}
                className="absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    opacity: activeId ? 1 : 0,
                    scale: activeId ? 1 : 0.8,
                }}
            >
                <div className="w-64 h-40 bg-neutral-900 rounded-xl overflow-hidden shadow-2xl border border-white/10 flex items-center justify-center relative">
                    {/* If we had images, we'd put them here. For now, a stylish placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900" />
                    <div className="z-10 text-white/20 font-bebas text-4xl uppercase tracking-widest">
                        {activeProject?.title?.split(' ')[0]}
                    </div>
                    {/* Subtle glow effect */}
                    <div className="absolute -inset-1 bg-white/5 blur-lg" />
                </div>
            </div>
        </div>
    );
}
