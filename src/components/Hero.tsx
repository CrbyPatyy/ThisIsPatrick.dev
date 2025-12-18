'use client';

import { useEffect, useState, useRef } from 'react';
import InteractiveMesh from './InteractiveMesh';
import MagneticText from './MagneticText';
import StaggerText from './StaggerText';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setLoaded(true);

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.5)));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <section ref={sectionRef} className="min-h-[150vh] relative">
            {/* Dynamic Mesh Background */}
            <InteractiveMesh />

            {/* Fixed content that animates on scroll */}
            <div
                className="sticky top-0 min-h-screen flex items-center justify-center"
                style={{
                    opacity: 1 - scrollProgress * 1.5,
                    transform: `scale(${1 - scrollProgress * 0.1}) translateY(${scrollProgress * -50}px)`,
                }}
            >
                <div className="container text-center">
                    {/* Status Badge */}
                    <div
                        className={`inline-flex items-center gap-3 mb-10 px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-black/5 shadow-sm transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        style={{ transitionDelay: '0.3s' }}
                    >
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <span className="text-xs uppercase tracking-[0.2em] text-neutral-600 font-medium">
                            Open for opportunities
                        </span>
                    </div>

                    <div className="overflow-hidden mb-2">
                        <h1
                            className={`text-[clamp(5rem,20vw,16rem)] uppercase tracking-[-0.02em] leading-[0.85] cursor-invert-target ${loaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            style={{
                                transitionDelay: '0.4s',
                                fontFamily: 'var(--font-bebas), sans-serif',
                            }}
                        >
                            <span className="text-neutral-900">
                                {loaded ? <StaggerText text="Patrick" delay={400} /> : "Patrick"}
                            </span>
                            <span className="text-neutral-300">.</span>
                        </h1>
                    </div>

                    {/* Role with accent styling */}
                    <div className="overflow-hidden mb-6">
                        <p
                            className={`text-xl md:text-2xl lg:text-3xl text-neutral-500 font-light tracking-tight transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                                }`}
                            style={{ transitionDelay: '0.5s' }}
                        >
                            <span className="font-medium text-neutral-800">Creative</span> Developer
                        </p>
                    </div>

                    {/* Brief tagline with better styling */}
                    <p
                        className={`text-neutral-500 max-w-lg mx-auto mb-14 text-lg leading-relaxed transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        style={{ transitionDelay: '0.6s' }}
                    >
                        Full-stack developer crafting digital experiences
                        <br className="hidden sm:block" />
                        that blend <span className="text-neutral-700 font-medium">form</span> with <span className="text-neutral-700 font-medium">function</span>.
                    </p>

                    {/* CTA Buttons with improved styling */}
                    <div
                        className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        style={{ transitionDelay: '0.7s' }}
                    >
                        <a href="#projects" className="btn btn-primary !p-0 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/15 transition-shadow">
                            <MagneticText text="View projects" className="!px-8 !py-4" />
                        </a>
                        <a href="#contact" className="group flex items-center gap-2">
                            <MagneticText text="Get in touch" className="!px-0 !py-0 text-sm text-neutral-600 hover:text-neutral-900" />
                            <span className="text-neutral-400 group-hover:translate-x-1 transition-transform">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - enhanced */}
            <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500"
                style={{ opacity: loaded && scrollProgress < 0.3 ? 1 : 0 }}
            >
                <div className="flex flex-col items-center gap-3 text-neutral-400">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
                    <div className="w-5 h-8 rounded-full border border-neutral-300 flex items-start justify-center p-1.5">
                        <div className="w-1 h-2 bg-neutral-400 rounded-full animate-bounce" />
                    </div>
                </div>
            </div>
        </section>
    );
}

