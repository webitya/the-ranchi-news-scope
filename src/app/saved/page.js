'use client';

import { useBookmarks } from '@/context/BookmarksContext';
import { newsArticles } from '@/data/newsData';
import NewsGrid from '@/components/NewsGrid';
import NewsletterSection from '@/components/NewsletterSection';
import Link from 'next/link';

export default function SavedPage() {
    const { bookmarks } = useBookmarks();

    const savedArticles = newsArticles.filter(article => bookmarks.includes(article.id));

    return (
        <div style={{ background: 'var(--color-bg-primary)', paddingTop: '160px', minHeight: '100vh' }}>
            <header className="container" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-sm)'
                }}>
                    <span style={{
                        width: '8px',
                        height: '48px',
                        background: 'var(--color-secondary)',
                        borderRadius: 'var(--radius-full)'
                    }} />
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        margin: 0,
                        color: 'var(--color-text-primary)'
                    }}>
                        Saved Articles
                    </h1>
                </div>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '800px',
                    lineHeight: '1.6'
                }}>
                    Your personal library of curated news. Articles you save will appear here for quick access and offline reading.
                </p>
            </header>

            <div className="container" style={{ paddingBottom: 'var(--spacing-3xl)' }}>
                {savedArticles.length > 0 ? (
                    <NewsGrid articles={savedArticles} title="Your Reading List" />
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: 'var(--spacing-4xl) var(--spacing-lg)',
                        background: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-2xl)',
                        border: '2px dashed var(--color-border)'
                    }}>
                        <div style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-text-tertiary)' }}>
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                <line x1="12" y1="11" x2="12" y2="11.01" />
                            </svg>
                        </div>
                        <h2 style={{ color: 'var(--color-text-primary)', marginBottom: 'var(--spacing-sm)' }}>No saved articles yet</h2>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
                            Start bookmarking your favorite stories to build your personalized reading list.
                        </p>
                        <Link href="/" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                            Explore News
                        </Link>
                    </div>
                )}
            </div>

            <NewsletterSection />
        </div>
    );
}
