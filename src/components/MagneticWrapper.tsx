'use client';

import { useRef, useState, useCallback, ReactNode } from 'react';

interface MagneticWrapperProps {
    children: ReactNode;
    strength?: number;
    className?: string;
}

export default function MagneticWrapper({
    children,
    strength = 1.0,
    className = ""
}: MagneticWrapperProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };

        const x = (clientX - (left + width / 2)) * strength;
        const y = (clientY - (top + height / 2)) * strength;

        setPosition({ x, y });
    }, [strength]);

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`
            }}
        >
            {children}
        </div>
    );
}
