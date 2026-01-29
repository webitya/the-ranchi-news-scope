'use client';

import Link from 'next/link';
import NewsGrid from '@/components/NewsGrid';
import NewsletterSection from '@/components/NewsletterSection';
import { newsArticles } from '@/data/newsData';

export default function MagazinePage() {
    // Filter for "long-form" style articles or featured ones
    const featuredArticles = newsArticles.slice(0, 3);
    const regularArticles = newsArticles.slice(3, 9);

    return (
        <div style={{ background: 'var(--color-bg-primary)', paddingTop: '160px' }}>
            {/* Magazine Header */}
            <header className="container" style={{ marginBottom: 'var(--spacing-4xl)', textAlign: 'center' }}>
                <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '800',
                    color: 'var(--color-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '3px',
                    display: 'block',
                    marginBottom: 'var(--spacing-md)'
                }}>
                    The Digital Edition
                </span>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    margin: 0,
                    color: 'var(--color-text-primary)',
                    lineHeight: '0.9',
                    letterSpacing: '-2px'
                }}>
                    THE <span style={{ color: 'var(--color-secondary)' }}>RNS</span> MAGAZINE
                </h1>
                <div style={{
                    width: '60px',
                    height: '4px',
                    background: 'var(--color-secondary)',
                    margin: 'var(--spacing-xl) auto',
                }} />
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.6',
                    fontStyle: 'italic'
                }}>
                    Exploring the intersection of culture, politics, and technology in Jharkhand and beyond through deep-dives and narrative storytelling.
                </p>
            </header>

            {/* Featured Story */}
            <section className="container" style={{ marginBottom: 'var(--spacing-4xl)' }}>
                <Link href={`/article/${featuredArticles[0].id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spacing-3xl)',
                        alignItems: 'center',
                        background: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-3xl)',
                        overflow: 'hidden',
                        padding: 'var(--spacing-2xl)',
                        border: '1px solid var(--color-border)',
                        transition: 'transform 0.4s ease',
                        cursor: 'pointer'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        <div style={{ position: 'relative', height: '400px', borderRadius: 'var(--radius-2xl)', overflow: 'hidden' }}>
                            <img src={featuredArticles[0].image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                            <span className="badge" style={{ background: 'var(--color-secondary)', color: 'white', marginBottom: 'var(--spacing-lg)' }}>
                                Featured Long-Read
                            </span>
                            <h2 style={{
                                fontFamily: 'var(--font-heading)',
                                fontSize: 'clamp(2rem, 4vw, 3rem)',
                                marginBottom: 'var(--spacing-md)',
                                color: 'var(--color-text-primary)',
                                lineHeight: '1.1'
                            }}>
                                {featuredArticles[0].title}
                            </h2>
                            <p style={{
                                fontSize: '1.125rem',
                                color: 'var(--color-text-secondary)',
                                marginBottom: 'var(--spacing-xl)',
                                lineHeight: '1.8'
                            }}>
                                {featuredArticles[0].excerpt}... This week, we go behind the headlines to bring you an exclusive look at the evolving landscape of our region.
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '0', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>
                                    {featuredArticles?.[0]?.author?.charAt(0) || 'M'}
                                </div>
                                <span style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{featuredArticles[0].author}</span>
                                <span style={{ color: 'var(--color-text-tertiary)' }}>• 12 min read</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* Editorial Mix */}
            <section style={{ background: 'var(--color-primary)', padding: 'var(--spacing-4xl) 0', color: 'white', marginBottom: 'var(--spacing-4xl)' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: 'var(--spacing-3xl)', textAlign: 'center' }}>
                        Editorial Deep Dives
                    </h2>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: 'var(--spacing-2xl)'
                    }}>
                        {featuredArticles.slice(1).map(article => (
                            <Link key={article.id} href={`/article/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ height: '250px', marginBottom: 'var(--spacing-lg)', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                                        <img src={article.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                                            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                        />
                                    </div>
                                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: 'var(--spacing-sm)' }}>
                                        {article.title}
                                    </h3>
                                    <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        By {article.author}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Regular Grid */}
            <div className="container" style={{ paddingBottom: 'var(--spacing-4xl)' }}>
                <NewsGrid articles={regularArticles} title="From the Archives" />
            </div>

            <NewsletterSection />

            <style jsx>{`
                header h1 {
                    text-shadow: 2px 2px 0px rgba(0,0,0,0.05);
                }
                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 var(--spacing-lg);
                }
            `}</style>
        </div>
    );
}
