import NewsCard from './NewsCard';

export default function HeroSection({ featuredArticles }) {
    if (!featuredArticles || featuredArticles.length === 0) return null;

    const mainFeatured = featuredArticles[0];

    return (
        <section className="section-sm" style={{
            paddingTop: 'calc(var(--header-height, 80px) + var(--spacing-lg))', // Account for header
            background: 'var(--color-bg-primary)'
        }}>
            <div className="container">
                <NewsCard article={mainFeatured} variant="featured" />
            </div>
        </section>
    );
}
