import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
  Button,
} from 'react-native';
import JobCard from '../../components/JobCard';
import { fetchJobs } from '../../utils/api';
import { useBookmarks } from '../../hooks/useBookmarks';

// ✅ Define Job type
interface Job {
  id: string;
  title: string;
  primary_details: {
    Place: string;
    Salary: string;
    Experience: string;
  };
  content?: string;
}

const PAGE_SIZE = 10;

const JobBoardScreen = () => {
  // ✅ Explicitly type useState
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // ✅ Explicitly type `currentPage` & handle unknown error
  const fetchJobData = useCallback(async (currentPage: number): Promise<Job[]> => {
    try {
      const newJobs: Job[] = await fetchJobs(currentPage, PAGE_SIZE);
      if (newJobs.length === 0 || newJobs.length < PAGE_SIZE) {
        setHasMore(false);
      }
      return newJobs;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      throw err;
    }
  }, []);

  // ✅ Properly type function & fix setState issue
  const loadJobs = useCallback(async (): Promise<void> => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newJobs: Job[] = await fetchJobData(page);
      setJobs((prevJobs) => [...prevJobs, ...newJobs]); // ✅ Fix prevJobs type
      setPage((prevPage) => prevPage + 1);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, fetchJobData]);

  // ✅ Fix TypeScript error in handleRefresh
  const handleRefresh = useCallback(async (): Promise<void> => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    try {
      const newJobs: Job[] = await fetchJobData(1);
      setJobs(newJobs);
    } finally {
      setRefreshing(false);
    }
  }, [fetchJobData]);

  useEffect(() => {
    loadJobs();
  }, []);

  const handleEndReached = useCallback((): void => {
    if (!loading && hasMore) {
      loadJobs();
    }
  }, [loading, hasMore, loadJobs]);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button
          title="Retry"
          onPress={() => {
            setError(null);
            loadJobs();
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Latest Opportunities</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item, index) => `job-${item.id}-${index}`}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            isBookmarked={isBookmarked(item.id)}
            onBookmark={() => toggleBookmark(item)}
          />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && hasMore ? (
            <ActivityIndicator
              size="large"
              color="#1A1A2E"
              style={styles.loader}
            />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#1A1A2E']}
            tintColor="#1A1A2E"
          />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A2E',
    margin: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  loader: {
    marginVertical: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#E94560',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default JobBoardScreen;
