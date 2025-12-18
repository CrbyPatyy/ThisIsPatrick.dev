'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = window.scrollY;
            const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
            setProgress(progress);
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Page scroll progress"
        >
            <div
                className="h-full bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 transition-all duration-150 ease-out"
                style={{
                    width: `${progress}%`,
                    boxShadow: '0 0 10px rgba(0,0,0,0.3)'
                }}
            />
        </div>
    );
}
