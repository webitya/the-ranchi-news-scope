'use client';

import { useParams } from 'next/navigation';
import { newsArticles } from '@/data/newsData';
import NewsGrid from '@/components/NewsGrid';
import NewsletterSection from '@/components/NewsletterSection';

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug;

    // Convert slug back to title case for filtering
    const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
    const articles = newsArticles.filter(a => a.category.toLowerCase() === slug.toLowerCase());

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
        <div style={{ background: 'var(--color-bg-primary)', paddingTop: '160px' }}>
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
                        background: getCategoryColor(categoryName),
                        borderRadius: 'var(--radius-full)'
                    }} />
                    <h1 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        margin: 0,
                        color: 'var(--color-text-primary)'
                    }}>
                        {categoryName}
                    </h1>
                </div>
                <p style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '800px',
                    lineHeight: '1.6'
                }}>
                    Stay updated with the latest {categoryName.toLowerCase()} news, deep-dives, and trends from Ranchi, Jharkhand, and across the nation.
                </p>
            </header>

            <div className="container" style={{ minHeight: '60vh', paddingBottom: 'var(--spacing-3xl)' }}>
                {articles.length > 0 ? (
                    <NewsGrid articles={articles} title={`All ${categoryName} Coverage`} />
                ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl) 0' }}>
                        <h2 style={{ color: 'var(--color-text-primary)' }}>No articles found in this category yet.</h2>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Check back later for more updates.</p>
                    </div>
                )}
            </div>

            <NewsletterSection />
        </div>
    );
}
