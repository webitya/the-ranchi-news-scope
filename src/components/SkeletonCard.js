'use client';

export default function SkeletonCard() {
    return (
        <div style={{
            background: 'var(--color-bg-secondary)',
            borderRadius: '0',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            height: '100%'
        }}>
            {/* Image Skeleton */}
            <div style={{
                width: '100%',
                aspectRatio: '16/10',
                background: 'linear-gradient(90deg, var(--color-bg-secondary) 25%, var(--color-border) 50%, var(--color-bg-secondary) 75%)',
                backgroundSize: '200% 100%',
                animation: 'skeleton-shimmer 2s infinite'
            }} />

            <div style={{ padding: 'var(--spacing-lg)' }}>
                {/* Badge Skeleton */}
                <div style={{
                    width: '60px',
                    height: '24px',
                    background: 'var(--color-border)',
                    borderRadius: '0',
                    marginBottom: 'var(--spacing-md)',
                    animation: 'skeleton-fade 1.5s infinite alternate'
                }} />

                {/* Title Skeleton */}
                <div style={{
                    width: '90%',
                    height: '24px',
                    background: 'var(--color-border)',
                    marginBottom: 'var(--spacing-sm)',
                    animation: 'skeleton-fade 1.5s infinite alternate'
                }} />
                <div style={{
                    width: '70%',
                    height: '24px',
                    background: 'var(--color-border)',
                    marginBottom: 'var(--spacing-lg)',
                    animation: 'skeleton-fade 1.5s infinite alternate'
                }} />

                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '0', background: 'var(--color-border)' }} />
                    <div style={{ width: '100px', height: '16px', background: 'var(--color-border)', alignSelf: 'center' }} />
                </div>
            </div>

            <style jsx>{`
                @keyframes skeleton-shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                @keyframes skeleton-fade {
                    0% { opacity: 0.5; }
                    100% { opacity: 1; }
                }
            `}</style>
        </div>
    );
}
