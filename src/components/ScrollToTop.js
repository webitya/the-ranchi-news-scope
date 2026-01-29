'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrollPos = window.pageYOffset;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollPos / scrollHeight) * 100;

            setProgress(scrollPercent);
            setIsVisible(scrollPos > 300);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            style={{
                position: 'fixed',
                bottom: '100px', // Above mobile nav
                right: '25px',
                width: '50px',
                height: '50px',
                borderRadius: '0',
                background: 'var(--color-bg-primary)',
                color: 'var(--color-secondary)',
                border: 'none',
                boxShadow: 'var(--shadow-lg)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 'var(--z-fixed)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isVisible ? '1' : '0',
                transform: isVisible ? 'scale(1)' : 'scale(0.5)',
                padding: 0
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
            }}
        >
            <svg width="50" height="50" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
                <circle
                    cx="25"
                    cy="25"
                    r={radius}
                    fill="transparent"
                    stroke="var(--color-border)"
                    strokeWidth="3"
                    style={{ opacity: 0.2 }}
                />
                <circle
                    cx="25"
                    cy="25"
                    r={radius}
                    fill="transparent"
                    stroke="var(--color-secondary)"
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    style={{
                        strokeDashoffset,
                        transition: 'stroke-dashoffset 0.1s linear'
                    }}
                />
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" style={{ position: 'relative', zIndex: 1 }}>
                <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
        </button>
    );
}
