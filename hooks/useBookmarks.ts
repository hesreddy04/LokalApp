import { useState, useEffect } from 'react';
import { Job } from '../types';
import { loadBookmarks, saveBookmarks } from '../utils/storage';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load bookmarks on mount
  useEffect(() => {
    const initializeBookmarks = async () => {
      try {
        const savedBookmarks = await loadBookmarks();
        const bookmarksWithKeys = savedBookmarks.map((bookmark: Job) => ({
          ...bookmark,
          uniqueKey: bookmark.uniqueKey || `${bookmark.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }));
        setBookmarks(bookmarksWithKeys);
      } catch (err) {
        setError('Failed to load bookmarks');
        console.error('Failed to load bookmarks:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeBookmarks();
  }, []);

  // Save bookmarks when they change
  useEffect(() => {
    const persistBookmarks = async () => {
      if (!loading) {
        try {
          await saveBookmarks(bookmarks);
          setError(null);
        } catch (err) {
          setError('Failed to save bookmarks');
          console.error('Failed to save bookmarks:', err);
        }
      }
    };

    persistBookmarks();
  }, [bookmarks, loading]);

  const toggleBookmark = (job: Job) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === job.id);
      if (exists) {
        return prev.filter((b) => b.id !== job.id);
      }
      return [
        ...prev,
        {
          ...job,
          uniqueKey: job.uniqueKey || `${job.id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        },
      ];
    });
  };

  const isBookmarked = (jobId: string | number) => {
    return bookmarks.some((b) => b.id.toString() === jobId.toString());
  };

  return {
    bookmarks,
    loading,
    error,
    toggleBookmark,
    isBookmarked,
  };
}