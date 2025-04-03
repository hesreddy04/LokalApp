import { FlatList, View, Text, StyleSheet } from 'react-native';
import JobCard from '../../components/JobCard';
import { useBookmarks } from '../../hooks/useBookmarks';
import { MaterialIcons } from '@expo/vector-icons';
import JobCardSkeleton from '../../components/JobCardSkeleton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#F8F9FA',
  },
  emptyIcon: {
    opacity: 0.3,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#4E4E4E',
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 24,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 16,
    paddingLeft: 8,
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default function MyShortlistScreen() {
  const { bookmarks, loading, toggleBookmark, isBookmarked } = useBookmarks();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>My Shortlist</Text>
        <FlatList
          data={[1, 2, 3]}
          renderItem={() => <JobCardSkeleton />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContent}
        />
      </View>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialIcons
          name="bookmark-border"
          size={64}
          color="#1A1A2E"
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyTitle}>Your Shortlist is Empty</Text>
        <Text style={styles.emptyText}>
          Save interesting positions by tapping the bookmark icon.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Shortlist ({bookmarks.length})</Text>
      <FlatList
        data={bookmarks}
        keyExtractor={(item) => item.uniqueKey || `${item.id}_${Date.now()}`}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            isBookmarked={isBookmarked(item.id)}
            onBookmark={() => toggleBookmark(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
