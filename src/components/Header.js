'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { newsArticles } from '@/data/newsData';

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const searchResults = searchQuery.trim()
        ? newsArticles.filter(a =>
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.category.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 5)
        : [];

    const [weather, setWeather] = useState({ temp: 24.5, condition: 'Clear' });
    const [market, setMarket] = useState({ sensex: '72,431.5', change: '+0.45%' });

    useEffect(() => {
        // Handle scroll to update header style
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Initial theme setup
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
        }
    }, [setIsDarkMode]);

    // Handle body scroll locking when drawer is open and simulate real-time updates
    useEffect(() => {
        if (isDrawerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Simulating some real-time updates for weather
        const timer = setInterval(() => {
            setWeather(prev => ({ ...prev, temp: parseFloat((prev.temp + (Math.random() > 0.5 ? 0.1 : -0.1)).toFixed(1)) }));
        }, 10000);

        return () => {
            document.body.style.overflow = 'auto';
            clearInterval(timer);
        };
    }, [isDrawerOpen]);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);

        if (newMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isDrawerOpen) setIsDrawerOpen(false);
    };

    const toggleDrawer = (state) => {
        setIsDrawerOpen(state);
        if (state && isSearchOpen) setIsSearchOpen(false);
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Politics', href: '/category/politics' },
        { name: 'Magazine', href: '/magazine' },
        { name: 'E-Paper', href: '/epaper' },
        { name: 'Sports', href: '/category/sports' },
        { name: 'Technology', href: '/category/technology' },
        { name: 'Saved', href: '/saved' },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[1030] transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}
                style={{
                    background: isScrolled ? 'var(--color-bg-primary)' : 'var(--color-bg-primary)',
                    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
                    borderBottom: isScrolled ? '1px solid var(--color-border)' : 'none',
                    opacity: isScrolled ? 0.98 : 1
                }}
            >
                {/* Breaking News Ticker - Desktop Only */}
                <div className="hide-mobile" style={{
                    background: 'var(--color-secondary)',
                    color: 'white',
                    padding: '0.5rem 0',
                    overflow: 'hidden'
                }}>
                    <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span className="badge-breaking" style={{
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            background: 'white',
                            color: 'var(--color-secondary)',
                            borderRadius: '0'
                        }}>
                            BREAKING
                        </span>
                        <div style={{
                            display: 'flex',
                            overflow: 'hidden',
                            position: 'relative',
                            width: '100%'
                        }}>
                            <div style={{
                                display: 'flex',
                                gap: '2rem',
                                paddingRight: '2rem',
                                animation: 'scroll 40s linear infinite',
                                whiteSpace: 'nowrap',
                                minWidth: 'max-content'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
                                onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
                            >
                                {/* Original List */}
                                <span>Heavy rainfall alert issued for Ranchi and surrounding districts</span>
                                <span>•</span>
                                <span>Chief Minister announces new employment scheme for youth</span>
                                <span>•</span>
                                <span>Ranchi Airport to get international terminal by 2027</span>
                                <span>•</span>

                                {/* Duplicated List for Seamless Loop */}
                                <span>Heavy rainfall alert issued for Ranchi and surrounding districts</span>
                                <span>•</span>
                                <span>Chief Minister announces new employment scheme for youth</span>
                                <span>•</span>
                                <span>Ranchi Airport to get international terminal by 2027</span>
                                <span>•</span>
                            </div>
                        </div>
                        <div style={{
                            marginLeft: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1.25rem',
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            color: 'rgba(255,255,255,0.9)',
                            borderLeft: '1px solid rgba(255,255,255,0.2)',
                            paddingLeft: '1.25rem'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <circle cx="12" cy="12" r="5" />
                                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                                <span>RANCHI: {weather.temp.toFixed(1)}°C</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span style={{ color: 'rgba(255,255,255,0.7)' }}>SENSEX</span>
                                <span>{market.sensex}</span>
                                <span style={{ color: '#4CAF50' }}>{market.change}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Header Container */}
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.75rem 0',
                    gap: '1rem'
                }}>
                    {/* Logo Section */}
                    <Link href="/" style={{
                        display: 'flex',
                        alignItems: 'center',
                        textDecoration: 'none',
                        gap: '0.75rem',
                        transition: 'transform var(--transition-fast)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.02)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}>
                        <div style={{
                            position: 'relative',
                            width: '40px',
                            height: '40px',
                            flexShrink: 0
                        }}>
                            <Image
                                src="/logo-icon.png"
                                alt="RNS Logo"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.05rem'
                        }}>
                            <h1 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
                                fontWeight: '900',
                                color: 'var(--color-text-primary)',
                                lineHeight: '1',
                                margin: 0,
                                letterSpacing: '-0.5px'
                            }}>
                                <span style={{ color: 'var(--color-primary)' }}>RANCHI</span> NEWS <span style={{ color: 'var(--color-secondary)' }}>SCOPE</span>
                            </h1>
                            <p className="hide-mobile" style={{
                                fontSize: '0.55rem',
                                color: 'var(--color-text-tertiary)',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                fontWeight: '600',
                                margin: 0
                            }}>
                                Truth • Integrity • Excellence
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hide-mobile" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                        flex: 1,
                        justifyContent: 'center'
                    }}>
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    style={{
                                        fontSize: '0.9rem',
                                        fontWeight: isActive ? '800' : '600',
                                        color: isActive ? 'var(--color-secondary)' : 'var(--color-text-primary)',
                                        textDecoration: 'none',
                                        transition: 'all var(--transition-fast)',
                                        position: 'relative',
                                        padding: '0.5rem 0'
                                    }}
                                >
                                    {link.name}
                                    {isActive && (
                                        <span style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            height: '3px',
                                            background: 'var(--color-secondary)',
                                            borderRadius: 'var(--radius-full)',
                                            animation: 'scaleIn 0.2s ease-out'
                                        }} />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Actions / Mobile Menu Button */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        {/* Search Button */}
                        <button
                            onClick={toggleSearch}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label="Search"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </button>

                        {/* Dark Mode Toggle - Desktop Only */}
                        <button
                            className="hide-mobile"
                            onClick={toggleDarkMode}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label="Toggle dark mode"
                        >
                            {isDarkMode ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                </svg>
                            )}
                        </button>

                        {/* Hamburger Menu Button - Mobile Only */}
                        <button
                            className="hide-desktop"
                            onClick={() => toggleDrawer(true)}
                            style={{
                                background: 'var(--color-bg-secondary)',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.5rem',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            aria-label="Open menu"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="3" y1="12" x2="21" y2="12" />
                                <line x1="3" y1="6" x2="21" y2="6" />
                                <line x1="3" y1="18" x2="21" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Search Overlay */}
                {isSearchOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        right: 0,
                        background: 'var(--color-bg-primary)',
                        borderBottom: '1px solid var(--color-border)',
                        padding: '1rem',
                        boxShadow: 'var(--shadow-lg)',
                        animation: 'slideDown 0.3s ease-out',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}>
                        <div className="container" style={{ position: 'relative' }}>
                            <div style={{ position: 'relative', marginBottom: searchResults.length > 0 || searchQuery.trim() ? '1rem' : 0 }}>
                                <input
                                    type="text"
                                    placeholder="Search news, topics, or categories..."
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.5rem',
                                        paddingRight: '3.5rem',
                                        fontSize: '1.1rem',
                                        border: '2px solid var(--color-border)',
                                        borderRadius: 'var(--radius-xl)',
                                        background: 'var(--color-bg-secondary)',
                                        color: 'var(--color-text-primary)',
                                        outline: 'none',
                                        transition: 'border-color var(--transition-fast)'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                                    onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                                />
                                <button
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery('');
                                    }}
                                    style={{
                                        position: 'absolute',
                                        right: '1.25rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--color-text-tertiary)',
                                        cursor: 'pointer',
                                        padding: '0.5rem'
                                    }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            {/* Search Results */}
                            {searchQuery.trim() && (
                                <div style={{ animation: 'fadeIn 0.2s ease-out' }}>
                                    {searchResults.length > 0 ? (
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <p style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', letterSpacing: '1px', marginBottom: '0.5rem' }}>
                                                Quick Results
                                            </p>
                                            {searchResults.map(result => (
                                                <Link
                                                    key={result.id}
                                                    href={`/article/${result.id}`}
                                                    onClick={() => setIsSearchOpen(false)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '1rem',
                                                        padding: '0.75rem',
                                                        textDecoration: 'none',
                                                        borderRadius: 'var(--radius-lg)',
                                                        transition: 'background var(--transition-fast)',
                                                        background: 'var(--color-bg-secondary)'
                                                    }}
                                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                                                    onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-bg-secondary)'}
                                                >
                                                    <div style={{ width: '60px', height: '40px', position: 'relative', borderRadius: '4px', overflow: 'hidden', flexShrink: 0 }}>
                                                        <img src={result.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <h4 style={{ fontSize: '0.9rem', color: 'var(--color-text-primary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                            {result.title}
                                                        </h4>
                                                        <span style={{ fontSize: '0.7rem', color: 'var(--color-secondary)', fontWeight: '700' }}>
                                                            {result.category}
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    ) : (
                                        <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--color-text-tertiary)' }}>
                                            <p>No matches found for "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </header>

            {/* Side Drawer - Mobile Only */}
            <div
                className={`hide-desktop side-drawer-overlay ${isDrawerOpen ? 'active' : ''}`}
                onClick={() => toggleDrawer(false)}
            >
                <div
                    className="side-drawer"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div style={{
                        padding: '1.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '2rem'
                        }}>
                            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Menu</h2>
                            <button
                                onClick={() => toggleDrawer(false)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: 'var(--color-text-primary)',
                                    cursor: 'pointer'
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        <nav style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => toggleDrawer(false)}
                                    style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        color: 'var(--color-text-primary)',
                                        textDecoration: 'none',
                                        padding: '0.75rem 0',
                                        borderBottom: '1px solid var(--color-border)'
                                    }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                            <button
                                onClick={toggleDarkMode}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.75rem',
                                    padding: '1rem',
                                    background: 'var(--color-bg-secondary)',
                                    border: 'none',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--color-text-primary)',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >
                                {isDarkMode ? (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="5" />
                                            <line x1="12" y1="1" x2="12" y2="3" />
                                            <line x1="12" y1="21" x2="12" y2="23" />
                                        </svg>
                                        Light Mode
                                    </>
                                ) : (
                                    <>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                        </svg>
                                        Dark Mode
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
