'use client';

import { useEffect, useRef } from 'react';

export default function InteractiveMesh() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            // Calculate normalized coordinates (-0.5 to 0.5)
            const x = (clientX / innerWidth) - 0.5;
            const y = (clientY / innerHeight) - 0.5;

            // Apply smooth movement to the mesh orbs
            const orbs = container.querySelectorAll('.mesh-orb');
            orbs.forEach((orb, index) => {
                const speed = 20 + (index * 10);
                const tx = x * speed;
                const ty = y * speed;
                (orb as HTMLElement).style.transform = `translate(${tx}px, ${ty}px)`;
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Soft, large reactive mesh orbs */}
            <div
                className="mesh-orb absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-[0.08]"
                style={{
                    background: 'radial-gradient(circle, var(--text-muted) 0%, transparent 70%)',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            />
            <div
                className="mesh-orb absolute bottom-[-15%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-[0.06]"
                style={{
                    background: 'radial-gradient(circle, var(--text-secondary) 0%, transparent 75%)',
                    transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            />
            <div
                className="mesh-orb absolute top-[20%] right-[10%] w-[35vw] h-[35vw] rounded-full blur-[90px] opacity-[0.04]"
                style={{
                    background: 'radial-gradient(circle, var(--text-primary) 0%, transparent 80%)',
                    transition: 'transform 1.5s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
            />
        </div>
    );
}
