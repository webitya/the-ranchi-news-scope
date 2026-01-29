'use client';

import Link from 'next/link';

export default function CategorySection({ category, articles }) {
    if (!articles || articles.length === 0) return null;

    const getCategoryColor = (cat) => {
        const colors = {
            'Politics': 'var(--color-politics)',
            'Business': 'var(--color-business)',
            'Sports': 'var(--color-sports)',
            'Entertainment': 'var(--color-entertainment)',
            'Technology': 'var(--color-technology)',
            'Health': 'var(--color-health)'
        };
        return colors[cat] || 'var(--color-primary)';
    };

    return (
        <section className="section-sm" id={category.toLowerCase()}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                        color: 'var(--color-text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-md)'
                    }}>
                        <span style={{
                            width: '4px',
                            height: '32px',
                            background: getCategoryColor(category),
                            borderRadius: '0'
                        }} />
                        {category}
                    </h2>

                    <Link href={`#${category.toLowerCase()}`} style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: getCategoryColor(category),
                        textDecoration: 'none',
                        transition: 'opacity var(--transition-fast)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.7';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                        }}>
                        View All →
                    </Link>
                </div>

                <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-lg)',
                    overflowX: 'auto',
                    scrollbarWidth: 'thin',
                    paddingBottom: 'var(--spacing-md)',
                    scrollBehavior: 'smooth'
                }}>
                    {articles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/article/${article.id}`}
                            style={{
                                textDecoration: 'none',
                                minWidth: '280px',
                                maxWidth: '280px',
                                flexShrink: 0
                            }}
                        >
                            <div className="card" style={{
                                cursor: 'pointer',
                                height: '100%'
                            }}>
                                {/* Image */}
                                <div style={{
                                    position: 'relative',
                                    width: '100%',
                                    paddingTop: '60%',
                                    overflow: 'hidden',
                                    borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0'
                                }}>
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="img-cover"
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'transform var(--transition-slow)'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'scale(1)';
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="card-body">
                                    <h3 className="line-clamp-2" style={{
                                        fontSize: '1.125rem',
                                        fontFamily: 'var(--font-heading)',
                                        marginBottom: 'var(--spacing-sm)',
                                        color: 'var(--color-text-primary)',
                                        fontWeight: '700'
                                    }}>
                                        {article.title}
                                    </h3>

                                    <p className="line-clamp-2" style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--color-text-secondary)',
                                        marginBottom: 'var(--spacing-md)'
                                    }}>
                                        {article.excerpt}
                                    </p>

                                    <div style={{
                                        fontSize: '0.75rem',
                                        color: 'var(--color-text-tertiary)',
                                        display: 'flex',
                                        gap: 'var(--spacing-sm)'
                                    }}>
                                        <span>{article.readTime}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
