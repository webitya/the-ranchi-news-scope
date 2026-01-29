'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import NewsGrid from '@/components/NewsGrid';
import CategorySection from '@/components/CategorySection';
import TrendingSection from '@/components/TrendingSection';
import NewsletterSection from '@/components/NewsletterSection';
import { newsArticles, categories, trendingNews } from '@/data/newsData';

export default function Home() {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const featuredArticles = newsArticles.filter(article => article.featured);
  const latestArticles = newsArticles.filter(article => !article.featured).slice(0, visibleCount);

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setIsLoadingMore(false);
    }, 800);
  };

  const getArticlesByCategory = (category) => {
    return newsArticles.filter(article => article.category === category).slice(0, 5);
  };

  return (
    <>
      {/* Hero Section */}
      <HeroSection featuredArticles={featuredArticles} />

      {/* Latest News Grid */}
      <div className="container">
        <NewsGrid articles={latestArticles} title="Latest News" />

        {visibleCount < newsArticles.length && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-3xl)' }}>
            <button
              className="btn btn-primary"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              style={{ padding: '0.75rem 3rem', minWidth: '200px' }}
            >
              {isLoadingMore ? 'Loading...' : 'Load More Stories'}
            </button>
          </div>
        )}
      </div>

      {/* Main Content with Sidebar */}
      <div style={{
        background: 'var(--color-bg-primary)',
        paddingTop: 'var(--spacing-2xl)',
        paddingBottom: 'var(--spacing-3xl)'
      }}>
        <div className="container">
          <div className="main-content-grid">
            {/* Main Content */}
            <div>
              {/* Category Sections */}
              {categories.map((category) => (
                <CategorySection
                  key={category.name}
                  category={category.name}
                  articles={getArticlesByCategory(category.name)}
                />
              ))}
            </div>

            {/* Sidebar - Trending */}
            <div className="hide-mobile">
              <TrendingSection trendingArticles={trendingNews} />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />
    </>
  );
}
