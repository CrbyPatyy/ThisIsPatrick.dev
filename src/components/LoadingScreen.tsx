'use client';

import { useState, useEffect } from 'react';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Check if already loaded this session
        if (sessionStorage.getItem('loaded')) {
            setLoading(false);
            return;
        }

        // Wait for loading bar animation to complete (2s), then pause briefly, then fade out
        const timer = setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
                setLoading(false);
                sessionStorage.setItem('loaded', 'true');
            }, 600);
        }, 2800); // Wait for bar to finish (2.5s animation + 0.3s pause at 100%)

        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <div className="text-center">
                {/* Logo/Name */}
                <div className="overflow-hidden mb-4">
                    <h1
                        className={`text-4xl md:text-5xl font-normal tracking-tight transition-transform duration-700 ${fadeOut ? 'translate-y-full' : 'translate-y-0'
                            }`}
                    >
                        Patrick<span className="text-[var(--text-muted)]">.</span>
                    </h1>
                </div>

                {/* Loading bar */}
                <div className="w-48 h-0.5 bg-[var(--border)] rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[var(--accent)] rounded-full animate-loading-bar"
                    />
                </div>
            </div>
        </div>
    );
}
