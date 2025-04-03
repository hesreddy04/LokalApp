import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import BookmarkButton from './BookmarkButton';
import { MaterialIcons } from '@expo/vector-icons';
import { Job } from './types';

interface Props {
  job: Job;
  isBookmarked: boolean;
  onBookmark: () => void;
}

export default function JobCard({ job, isBookmarked, onBookmark }: Props) {
  const primaryDetails = job.primary_details || {};

  return (
    <Link
      href={{
        pathname: `/jobs/${job.id}`,
        params: { jobData: JSON.stringify(job) },
      }}
      asChild
    >
      <Pressable
        style={styles.card}
        accessibilityRole="button"
        accessibilityLabel={`View details for ${job.title}`}
      >
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={2}>
            {job.title || 'Untitled Job'}
          </Text>
          <BookmarkButton isBookmarked={isBookmarked} onPress={onBookmark} />
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <MaterialIcons name="location-on" size={16} color="#4B8BBE" />
            <Text style={styles.detailText}>
              {primaryDetails.Place || 'Location not specified'}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="attach-money" size={16} color="#4CAF50" />
            <Text style={styles.detailText}>
              {primaryDetails.Salary || 'Salary not disclosed'}
            </Text>
          </View>

          <View style={styles.detailItem}>
            <MaterialIcons name="work" size={16} color="#FF9800" />
            <Text style={styles.detailText}>
              {primaryDetails.Experience || 'Experience not specified'}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#1A1A2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    color: '#16213E',
  },
  detailsContainer: {
    gap: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: '#4E4E4E',
    flexShrink: 1,
  },
});