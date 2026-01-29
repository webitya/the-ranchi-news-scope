'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        'Quick Links': [
            { name: 'Home', href: '/' },
            { name: 'About Us', href: '/' },
            { name: 'Contact', href: '/' },
            { name: 'Advertise', href: '/' }
        ],
        'Categories': [
            { name: 'Politics', href: '/category/politics' },
            { name: 'Magazine', href: '/magazine' },
            { name: 'E-Paper', href: '/epaper' },
            { name: 'Sports', href: '/category/sports' },
            { name: 'Technology', href: '/category/technology' }
        ],
        'Legal': [
            { name: 'Privacy Policy', href: '/' },
            { name: 'Terms of Service', href: '/' },
            { name: 'Cookie Policy', href: '/' },
            { name: 'Disclaimer', href: '/' }
        ]
    };

    const socialLinks = [
        {
            name: 'Facebook',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
            href: '#facebook'
        },
        {
            name: 'Twitter',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
            href: '#twitter'
        },
        {
            name: 'Instagram',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
            ),
            href: '#instagram'
        },
        {
            name: 'YouTube',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            ),
            href: '#youtube'
        }
    ];

    return (
        <footer style={{
            background: 'var(--color-primary)',
            color: 'white',
            paddingTop: 'var(--spacing-3xl)',
            paddingBottom: 'var(--spacing-xl)'
        }}>
            <div className="container">
                {/* Main Footer Content */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--spacing-2xl)',
                    marginBottom: 'var(--spacing-2xl)',
                    paddingBottom: 'var(--spacing-2xl)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    {/* Brand Section */}
                    <div style={{
                        gridColumn: 'span 1'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            marginBottom: 'var(--spacing-md)'
                        }}>
                            <div style={{
                                position: 'relative',
                                width: '32px',
                                height: '32px',
                                flexShrink: 0
                            }}>
                                <Image
                                    src="/logo-icon.png"
                                    alt="RNS Logo"
                                    fill
                                    style={{
                                        objectFit: 'contain',
                                        filter: 'brightness(0) invert(1)'
                                    }}
                                />
                            </div>
                            <h3 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.25rem',
                                fontWeight: '900',
                                margin: 0,
                                background: 'linear-gradient(135deg, white, rgba(255,255,255,0.7))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                letterSpacing: '-0.5px'
                            }}>
                                RANCHI NEWS <span style={{ color: 'var(--color-secondary)' }}>SCOPE</span>
                            </h3>
                        </div>
                        <p style={{
                            fontSize: '0.875rem',
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: '1.6',
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            Your trusted source for news and information from Ranchi and Jharkhand. Delivering truth, integrity, and excellence since 2026.
                        </p>

                        {/* Social Links */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)'
                        }}>
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: '40px',
                                        height: '40px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: 'var(--radius-md)',
                                        color: 'white',
                                        transition: 'all var(--transition-fast)',
                                        textDecoration: 'none'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'var(--color-secondary)';
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                        e.currentTarget.style.transform = 'translateY(0)';
                                    }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 style={{
                                fontSize: '1rem',
                                fontWeight: '700',
                                marginBottom: 'var(--spacing-md)',
                                color: 'white'
                            }}>
                                {title}
                            </h4>
                            <ul style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-sm)'
                            }}>
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            style={{
                                                fontSize: '0.875rem',
                                                color: 'rgba(255, 255, 255, 0.7)',
                                                textDecoration: 'none',
                                                transition: 'color var(--transition-fast)',
                                                display: 'inline-block'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.color = 'var(--color-accent)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                                            }}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Copyright */}
                <div style={{
                    textAlign: 'center',
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.6)'
                }}>
                    <p style={{ margin: 0 }}>
                        © {currentYear} The Ranchi News Scope. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
