import NewsCard from './NewsCard';
import SkeletonCard from './SkeletonCard';

export default function NewsGrid({ articles, title, loading = false }) {
    return (
        <section style={{ marginBottom: 'var(--spacing-3xl)' }}>
            {title && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <div style={{
                        width: '4px',
                        height: '24px',
                        background: 'var(--color-secondary)',
                        borderRadius: '0'
                    }} />
                    <h2 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.75rem',
                        margin: 0,
                        color: 'var(--color-text-primary)'
                    }}>
                        {title}
                    </h2>
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                gap: '4px'
            }}>
                {loading ? (
                    Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                ) : (
                    articles.map((article) => (
                        <NewsCard key={article.id} article={article} />
                    ))
                )}
            </div>
        </section>
    );
}
