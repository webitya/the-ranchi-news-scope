'use client';

import Link from 'next/link';

export default function TrendingSection({ trendingArticles }) {
    if (!trendingArticles || trendingArticles.length === 0) return null;

    return (
        <aside style={{
            background: 'var(--color-bg-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--spacing-xl)',
            boxShadow: 'var(--shadow-card)',
            position: 'sticky',
            top: '140px'
        }}>
            <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.5rem',
                marginBottom: 'var(--spacing-lg)',
                color: 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
            }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                    <polyline points="17 6 23 6 23 12" />
                </svg>
                Trending Now
            </h3>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-lg)'
            }}>
                {trendingArticles.map((article, index) => (
                    <Link
                        key={article.id}
                        href={`#trending-${article.id}`}
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            paddingBottom: 'var(--spacing-lg)',
                            borderBottom: index < trendingArticles.length - 1 ? '1px solid var(--color-border)' : 'none',
                            transition: 'transform var(--transition-fast)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateX(4px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateX(0)';
                        }}
                    >
                        {/* Number */}
                        <div style={{
                            fontSize: '2rem',
                            fontFamily: 'var(--font-heading)',
                            fontWeight: '800',
                            color: 'var(--color-border-hover)',
                            lineHeight: '1',
                            minWidth: '40px'
                        }}>
                            {(index + 1).toString().padStart(2, '0')}
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1 }}>
                            <h4 className="line-clamp-2" style={{
                                fontSize: '0.9375rem',
                                fontWeight: '600',
                                color: 'var(--color-text-primary)',
                                marginBottom: 'var(--spacing-xs)',
                                lineHeight: '1.4'
                            }}>
                                {article.title}
                            </h4>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--spacing-sm)',
                                fontSize: '0.75rem',
                                color: 'var(--color-text-tertiary)'
                            }}>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.25rem'
                                }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    {article.views?.toLocaleString() || '0'}
                                </span>

                                {article.trend === 'up' && (
                                    <span style={{
                                        color: 'var(--color-success)',
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}>
                                        ↑
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </aside>
    );
}
