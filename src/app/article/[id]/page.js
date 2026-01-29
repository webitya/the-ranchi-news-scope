'use client';

import React, { useState, useEffect } from 'react';
import { useBookmarks } from '@/context/BookmarksContext';
import { useToast } from '@/context/ToastContext';
import { newsArticles } from '@/data/newsData';
import NewsGrid from '@/components/NewsGrid';
import NewsletterSection from '@/components/NewsletterSection';
import Link from 'next/link';
import Image from 'next/image';

export default function ArticlePage({ params }) {
    const unwrappedParams = React.use(params);
    const { id } = unwrappedParams;
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const { showToast } = useToast();
    const [scrolled, setScrolled] = useState(0);

    const article = newsArticles.find(a => a.id === parseInt(id));

    useEffect(() => {
        const handleScroll = () => {
            const h = document.documentElement,
                b = document.body,
                st = 'scrollTop',
                sh = 'scrollHeight';
            const progress = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
            setScrolled(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article?.title,
                text: article?.excerpt,
                url: window.location.href,
            })
                .then(() => showToast('Article shared!', 'success'))
                .catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            showToast('Link copied to clipboard!', 'success');
        }
    };

    if (!article) {
        return (
            <div className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)', textAlign: 'center', paddingTop: '160px' }}>
                <h1 style={{ fontFamily: 'var(--font-heading)' }}>Article Not Found</h1>
                <p>Sorry, the article you are looking for does not exist.</p>
                <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', marginTop: 'var(--spacing-md)' }}>Back to Home</Link>
            </div>
        );
    }

    const relatedArticles = newsArticles
        .filter(a => a.category === article.category && a.id !== article.id)
        .slice(0, 3);

    const getCategoryColor = (category) => {
        const colors = {
            'Politics': 'var(--color-politics)',
            'Business': 'var(--color-business)',
            'Sports': 'var(--color-sports)',
            'Entertainment': 'var(--color-entertainment)',
            'Technology': 'var(--color-technology)',
            'Health': 'var(--color-health)'
        };
        return colors[category] || 'var(--color-primary)';
    };

    return (
        <div style={{ background: 'var(--color-bg-primary)', paddingTop: '160px', position: 'relative' }}>
            {/* Reading Progress Bar */}
            <div style={{
                position: 'fixed',
                top: '0',
                left: 0,
                width: '100%',
                height: '4px',
                background: 'rgba(var(--color-secondary-rgb), 0.1)',
                zIndex: 2000
            }}>
                <div style={{
                    width: `${scrolled}%`,
                    height: '100%',
                    background: 'var(--color-secondary)',
                    transition: 'width 0.2s ease-out',
                    boxShadow: '0 0 10px var(--color-secondary)'
                }} />
            </div>

            <article className="container" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: 'var(--spacing-4xl)' }}>
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        fontSize: 'var(--font-sm)',
                        marginBottom: 'var(--spacing-lg)'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    Back
                </button>

                {/* Article Header */}
                <header style={{ marginBottom: 'var(--spacing-2xl)' }}>
                    <span className="badge" style={{
                        background: getCategoryColor(article.category),
                        color: 'white',
                        marginBottom: 'var(--spacing-md)',
                        display: 'inline-block'
                    }}>
                        {article.category}
                    </span>
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        lineHeight: 1.1,
                        marginBottom: 'var(--spacing-md)',
                        color: 'var(--color-text-primary)'
                    }}>
                        {article.title}
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--spacing-xl)',
                        lineHeight: 1.6
                    }}>
                        {article.excerpt}
                    </p>

                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-lg)',
                        padding: 'var(--spacing-md) 0',
                        borderTop: '1px solid var(--color-border)',
                        borderBottom: '1px solid var(--color-border)',
                        marginBottom: 'var(--spacing-xl)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '0',
                                background: 'var(--color-bg-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                color: 'var(--color-secondary)'
                            }}>
                                {article.author.charAt(0)}
                            </div>
                            <div>
                                <div style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{article.author}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>{article.date} • {article.readTime}</div>
                            </div>
                        </div>

                        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--spacing-md)' }}>
                            <button
                                onClick={handleShare}
                                aria-label="Share Article"
                                className="share-btn"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div style={{
                    width: '100%',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    marginBottom: 'var(--spacing-2xl)',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <img
                        src={article.image}
                        alt={article.title}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                </div>

                {/* Article Content */}
                <div className="article-content" style={{
                    fontSize: '1.125rem',
                    lineHeight: '1.8',
                    color: 'var(--color-text-primary)'
                }}>
                    <p>
                        <strong>RANCHI:</strong> {article.content || "In a significant development that promises to reshape the local landscape, officials today announced a major step forward for the region. The move comes after months of deliberation and planning aimed at improving infrastructure and quality of life for residents."}
                    </p>
                    <p>
                        The initiative, which has gained widespread support from various stakeholders, focuses on key areas such as sustainability, digital transformation, and community empowerment. According to representatives involved in the project, the primary goal is to create a more resilient and forward-looking environment that can meet the challenges of the future.
                    </p>
                    <h3 style={{ margin: 'var(--spacing-xl) 0 var(--spacing-md)', fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>Impact on Jharkhand</h3>
                    <p>
                        Experts suggest that the impact of this project will be felt for years to come. "This is more than just a surface-level change," said one analyst. "It represents a fundamental shift in how we approach development in Jharkhand. By prioritizing long-term goals over short-term gains, we are setting a new standard for progress."
                    </p>
                    <p>
                        As the project moves into its next phase, the community is encouraged to stay engaged and provide feedback. Transparent communication and inclusive participation will be crucial to its ultimate success. The Ranchi News Scope will continue to provide updates as these developments unfold.
                    </p>
                </div>

                {/* Tags/Categories */}
                <div style={{ marginTop: 'var(--spacing-2xl)', marginBottom: 'var(--spacing-3xl)' }}>
                    <h4 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-text-primary)' }}>Topics</h4>
                    <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexWrap: 'wrap' }}>
                        <span className="badge" style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>Ranchi</span>
                        <span className="badge" style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>Jharkhand</span>
                        <span className="badge" style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>Development</span>
                        <span className="badge" style={{ background: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}>{article.category}</span>
                    </div>
                </div>

                {/* Related Articles */}
                {relatedArticles.length > 0 && (
                    <section style={{
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: 'var(--spacing-3xl)',
                        marginBottom: 'var(--spacing-3xl)'
                    }}>
                        <h2 style={{ fontFamily: 'var(--font-heading)', marginBottom: 'var(--spacing-xl)', color: 'var(--color-text-primary)' }}>Related Articles</h2>
                        <div className="news-grid">
                            {relatedArticles.map(a => (
                                <NewsCard key={a.id} article={a} />
                            ))}
                        </div>
                    </section>
                )}
            </article>

            <NewsletterSection />

            <style jsx>{`
        .share-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid var(--color-border);
          background: var(--color-bg-primary);
          color: var(--color-text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        .share-btn:hover {
          background: var(--color-secondary);
          color: white;
          border-color: var(--color-secondary);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        .article-content p {
          margin-bottom: var(--spacing-lg);
        }
      `}</style>
        </div>
    );
}
