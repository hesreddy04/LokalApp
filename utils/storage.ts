// utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@bookmarked_jobs';

// Define the type for a single job (if known)
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
}

// Function to load bookmarks from AsyncStorage
export const loadBookmarks = async (): Promise<Job[]> => {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

// Function to save bookmarks with explicit type
export const saveBookmarks = async (bookmarks: Job[]): Promise<void> => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
};
