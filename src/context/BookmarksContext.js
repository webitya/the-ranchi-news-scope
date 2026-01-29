'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const BookmarksContext = createContext();

export function BookmarksProvider({ children }) {
    const [bookmarks, setBookmarks] = useState([]);

    // Load bookmarks from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('rns_bookmarks');
        if (saved) {
            try {
                setBookmarks(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse bookmarks', e);
            }
        }
    }, []);

    // Save bookmarks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('rns_bookmarks', JSON.stringify(bookmarks));
    }, [bookmarks]);

    const toggleBookmark = (articleId) => {
        setBookmarks(prev => {
            if (prev.includes(articleId)) {
                return prev.filter(id => id !== articleId);
            }
            return [...prev, articleId];
        });
    };

    const isBookmarked = (articleId) => bookmarks.includes(articleId);

    return (
        <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked }}>
            {children}
        </BookmarksContext.Provider>
    );
}

export function useBookmarks() {
    const context = useContext(BookmarksContext);
    if (!context) {
        throw new Error('useBookmarks must be used within a BookmarksProvider');
    }
    return context;
}
