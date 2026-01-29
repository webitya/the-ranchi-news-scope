'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
    const pathname = usePathname();

    const navItems = [
        {
            id: 'home',
            name: 'Home',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            ),
            href: '/'
        },
        {
            id: 'magazine',
            name: 'Magazine',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
            ),
            href: '/magazine'
        },
        {
            id: 'epaper',
            name: 'E-Paper',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="12" y1="18" x2="12" y2="12" />
                    <polyline points="9 15 12 18 15 15" />
                </svg>
            ),
            href: '/epaper'
        },
        {
            id: 'bookmarks',
            name: 'Saved',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
            ),
            href: '/saved'
        }
    ];

    return (
        <nav
            className="hide-desktop"
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'var(--color-bg-primary)',
                borderTop: '1px solid var(--color-border)',
                boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
                zIndex: 'var(--z-fixed)',
                paddingBottom: 'env(safe-area-inset-bottom)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)'
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                padding: '0.5rem 0',
                maxWidth: '100%'
            }}>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.25rem',
                                padding: '0.5rem 0.75rem',
                                textDecoration: 'none',
                                color: isActive ? 'var(--color-secondary)' : 'var(--color-text-tertiary)',
                                transition: 'all var(--transition-fast)',
                                position: 'relative',
                                flex: 1,
                                minWidth: 0
                            }}
                        >
                            {/* Icon */}
                            <div style={{
                                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                                transition: 'transform var(--transition-fast)'
                            }}>
                                {item.icon}
                            </div>

                            {/* Label */}
                            <span style={{
                                fontSize: '0.625rem',
                                fontWeight: isActive ? '700' : '500',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
                            }}>
                                {item.name}
                            </span>

                            {/* Active Indicator */}
                            {isActive && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '32px',
                                    height: '3px',
                                    background: 'var(--color-secondary)',
                                    borderRadius: '0',
                                    animation: 'slideDown 0.3s ease-out'
                                }} />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
