'use client';

import { useState } from 'react';

export default function NewsletterSection() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section className="section-sm" style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decorative Elements */}
            <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0',
                filter: 'blur(40px)'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-30px',
                left: '-30px',
                width: '150px',
                height: '150px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '0',
                filter: 'blur(40px)'
            }} />

            <div className="container" style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                width: '100%',
                padding: '0'
            }}>
                <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                    color: 'white',
                    marginBottom: 'var(--spacing-md)'
                }}>
                    Stay Informed
                </h2>

                <p style={{
                    fontSize: '1.125rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    marginBottom: 'var(--spacing-xl)',
                    lineHeight: '1.6'
                }}>
                    Get the latest news from Ranchi delivered straight to your inbox. Subscribe to our newsletter.
                </p>

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    gap: 'var(--spacing-md)',
                    maxWidth: '500px',
                    margin: '0 auto',
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-md)',
                        flexWrap: 'wrap'
                    }}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={status === 'loading' || status === 'success'}
                            style={{
                                flex: 1,
                                padding: '1rem 1.5rem',
                                fontSize: '1rem',
                                border: 'none',
                                borderRadius: 'var(--radius-lg)',
                                background: 'white',
                                color: 'var(--color-text-primary)',
                                outline: 'none'
                            }}
                        />

                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="btn"
                            style={{
                                padding: '1rem 2rem',
                                fontSize: '1rem',
                                fontWeight: '700',
                                background: status === 'success' ? 'var(--color-success)' : 'var(--color-accent)',
                                color: 'var(--color-primary)',
                                border: 'none',
                                borderRadius: 'var(--radius-lg)',
                                cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
                                transition: 'all var(--transition-fast)',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {status === 'loading' && 'Subscribing...'}
                            {status === 'success' && '✓ Subscribed!'}
                            {status === 'idle' && 'Subscribe'}
                            {status === 'error' && 'Try Again'}
                        </button>
                    </div>

                    {status === 'success' && (
                        <p style={{
                            color: 'white',
                            fontSize: '0.875rem',
                            margin: 0,
                            animation: 'fadeIn 0.3s ease-out'
                        }}>
                            Thank you for subscribing! Check your email for confirmation.
                        </p>
                    )}
                </form>
            </div>
        </section>
    );
}
