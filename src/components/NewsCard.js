'use client';

import Link from 'next/link';
import { useBookmarks } from '@/context/BookmarksContext';
import { useToast } from '@/context/ToastContext';

export default function NewsCard({ article, featured = false, variant = 'default' }) {
    const { toggleBookmark, isBookmarked } = useBookmarks();
    const { showToast } = useToast();

    if (!article) return null;

    const bookmarked = isBookmarked(article.id);

    const handleAction = (e, callback) => {
        e.preventDefault();
        e.stopPropagation();
        callback();
    };

    const handleSave = () => {
        toggleBookmark(article.id);
        showToast(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks', 'success');
    };

    const handleShare = () => {
        console.log('Share clicked for:', article.title);
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: `${window.location.origin}/article/${article.id}`,
            })
                .then(() => showToast('Shared successfully!', 'success'))
                .catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for browsers that don't support native share
            navigator.clipboard.writeText(`${window.location.origin}/article/${article.id}`);
            showToast('Link copied to clipboard!', 'success');
        }
    };

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

    if (variant === 'featured') {
        return (
            <Link href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{
                    position: 'relative',
                    height: '500px',
                    overflow: 'hidden',
                    cursor: 'pointer'
                }}>
                    {/* Background Image */}
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

                    {/* Gradient Overlay */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)'
                    }} />

                    {/* Content */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        padding: 'var(--spacing-xl) 0',
                        color: 'white'
                    }}>
                        <span className="badge" style={{
                            background: getCategoryColor(article.category),
                            color: 'white',
                            marginBottom: 'var(--spacing-md)',
                            display: 'inline-block'
                        }}>
                            {article.category}
                        </span>

                        <h2 style={{
                            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                            fontFamily: 'var(--font-heading)',
                            marginBottom: 'var(--spacing-md)',
                            color: 'white'
                        }}>
                            {article.title}
                        </h2>

                        <p style={{
                            fontSize: '1.125rem',
                            marginBottom: 'var(--spacing-md)',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: '1.6'
                        }}>
                            {article.excerpt}
                        </p>

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-md)',
                            fontSize: '0.875rem',
                            color: 'rgba(255,255,255,0.8)'
                        }}>
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link href={`/article/${article.id}`} style={{ textDecoration: 'none' }}>
            <div className="card" style={{
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
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

                    {/* Category Badge */}
                    <span className="badge" style={{
                        position: 'absolute',
                        top: 'var(--spacing-md)',
                        left: 'var(--spacing-md)',
                        background: getCategoryColor(article.category),
                        color: 'white'
                    }}>
                        {article.category}
                    </span>
                </div>

                {/* Content */}
                <div className="card-body" style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <h3 className="line-clamp-2" style={{
                        fontSize: 'clamp(1.125rem, 2vw, 1.375rem)',
                        fontFamily: 'var(--font-heading)',
                        marginBottom: 'var(--spacing-sm)',
                        color: 'var(--color-text-primary)',
                        fontWeight: '700'
                    }}>
                        {article.title}
                    </h3>

                    <p className="line-clamp-3" style={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-secondary)',
                        marginBottom: 'var(--spacing-md)',
                        flex: 1
                    }}>
                        {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: 'var(--spacing-md)',
                        borderTop: '1px solid var(--color-border)',
                        fontSize: '0.8125rem',
                        color: 'var(--color-text-tertiary)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--spacing-sm)'
                        }}>
                            <span>{article.author}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                        </div>

                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-sm)'
                        }}>
                            {/* Bookmark Icon */}
                            <button
                                onClick={(e) => handleAction(e, () => toggleBookmark(article.id))}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    color: bookmarked ? 'var(--color-secondary)' : 'var(--color-text-tertiary)',
                                    transition: 'all var(--transition-fast)',
                                    transform: bookmarked ? 'scale(1.1)' : 'scale(1)'
                                }}
                                aria-label={bookmarked ? "Remove Bookmark" : "Bookmark"}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill={bookmarked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                            </button>

                            {/* Share Icon */}
                            <button
                                onClick={(e) => handleAction(e, handleShare)}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '0.25rem',
                                    color: 'var(--color-text-tertiary)',
                                    transition: 'color var(--transition-fast)'
                                }}
                                aria-label="Share">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
