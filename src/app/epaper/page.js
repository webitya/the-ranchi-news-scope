'use client';

import { useState } from 'react';
import NewsletterSection from '@/components/NewsletterSection';

export default function EPaperPage() {
    const [downloading, setDownloading] = useState(null);

    const handleDownload = (date) => {
        setDownloading(date);
        setTimeout(() => {
            setDownloading(null);
            alert(`Drafting download for ${date} edition. (Simulation only)`);
        }, 2000);
    };

    const archivedEditions = [
        { date: '2026-01-28', title: 'Wednesday Edition' },
        { date: '2026-01-27', title: 'Tuesday Edition' },
        { date: '2026-01-26', title: 'Monday Edition' },
        { date: '2026-01-25', title: 'Sunday Special' },
        { date: '2026-01-24', title: 'Saturday Edition' },
        { date: '2026-01-23', title: 'Friday Edition' },
    ];

    return (
        <div style={{ background: 'var(--color-bg-primary)', paddingTop: '160px', minHeight: '100vh' }}>
            <header className="container" style={{ marginBottom: 'var(--spacing-3xl)', textAlign: 'center' }}>
                <span className="badge" style={{ marginBottom: 'var(--spacing-md)' }}>Digital Archive</span>
                <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    margin: 0,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--spacing-sm)'
                }}>
                    E-Paper Archive
                </h1>
                <p style={{
                    fontSize: '1.125rem',
                    color: 'var(--color-text-secondary)',
                    maxWidth: '600px',
                    margin: '0 auto'
                }}>
                    Access high-quality PDF replicas of our print editions. Stay updated with the classic newspaper experience, anywhere.
                </p>
            </header>

            {/* Latest Edition Section */}
            <section className="container" style={{ marginBottom: 'var(--spacing-4xl)' }}>
                <div style={{
                    background: 'var(--color-primary)',
                    borderRadius: 'var(--radius-3xl)',
                    padding: 'var(--spacing-3xl)',
                    color: 'white',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 'var(--spacing-2xl)',
                    alignItems: 'center',
                    boxShadow: 'var(--shadow-xl)'
                }}>
                    <div>
                        <span style={{ color: 'var(--color-secondary)', fontWeight: '800', fontSize: '0.875rem', textTransform: 'uppercase' }}>
                            OUT NOW
                        </span>
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>
                            Today's Edition
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--spacing-xl)', fontSize: '1.1rem' }}>
                            January 29, 2026 • 24 Pages • 12MB PDF
                        </p>
                        <button
                            className="btn btn-secondary"
                            onClick={() => handleDownload('Latest')}
                            disabled={downloading === 'Latest'}
                            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
                        >
                            {downloading === 'Latest' ? 'Preparing Download...' : 'Download PDF Edition'}
                        </button>
                    </div>
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        <div style={{
                            width: '280px',
                            height: '380px',
                            background: '#fff',
                            borderRadius: '0',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                            padding: '1rem',
                            color: '#333',
                            transform: 'rotate(2deg)',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '0.75rem', fontWeight: '800' }}>THE RANCHI NEWS SCOPE</div>
                                <div style={{ fontSize: '0.5rem' }}>JANUARY 29, 2026</div>
                            </div>
                            <div style={{ width: '100%', height: '120px', background: '#eee', marginBottom: '1rem' }} />
                            <div style={{ height: '10px', width: '80%', background: '#ddd', marginBottom: '0.5rem' }} />
                            <div style={{ height: '10px', width: '100%', background: '#ddd', marginBottom: '0.5rem' }} />
                            <div style={{ height: '10px', width: '60%', background: '#ddd' }} />
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.8))',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '5rem',
                                color: 'var(--color-secondary)',
                                opacity: 0.1
                            }}>
                                PDF
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Archive List */}
            <section className="container" style={{ paddingBottom: 'var(--spacing-4xl)' }}>
                <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    marginBottom: 'var(--spacing-xl)',
                    color: 'var(--color-text-primary)'
                }}>
                    Previous Editions
                </h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: 'var(--spacing-lg)'
                }}>
                    {archivedEditions.map((edition) => (
                        <div key={edition.date} style={{
                            background: 'var(--color-bg-secondary)',
                            padding: 'var(--spacing-lg)',
                            borderRadius: 'var(--radius-xl)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-tertiary)' }}>{edition.date}</div>
                                <div style={{ fontWeight: '700', color: 'var(--color-text-primary)' }}>{edition.title}</div>
                            </div>
                            <button
                                onClick={() => handleDownload(edition.date)}
                                disabled={downloading === edition.date}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--color-secondary)',
                                    cursor: 'pointer',
                                    padding: 'var(--spacing-xs)'
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <NewsletterSection />
        </div>
    );
}
