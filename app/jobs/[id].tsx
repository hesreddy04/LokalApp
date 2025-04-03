import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useBookmarks } from '../../hooks/useBookmarks';
import BookmarkButton from '../../components/BookmarkButton';
import { MaterialIcons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

// Get valid icon names from MaterialIcons
type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

interface JobDetailsProps {
  title: string;
  primary_details: {
    Place: string;
    Salary: string;
    Experience: string;
  };
  content?: string;
  id: string;
}

export default function JobDetails() {
  const params = useLocalSearchParams();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Ensure jobData is properly parsed
  const job: JobDetailsProps | null = params.jobData 
    ? JSON.parse(params.jobData as string) 
    : null;

  if (!job) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Job not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{job.title}</Text>
        <BookmarkButton 
          isBookmarked={isBookmarked(job.id)} 
          onPress={() => toggleBookmark(job)}
          size={28}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Job Details</Text>
        <DetailRow icon="location-on" label="Location" value={job.primary_details.Place} color="#4B8BBE" />
        <DetailRow icon="attach-money" label="Salary" value={job.primary_details.Salary} color="#4CAF50" />
        <DetailRow icon="work" label="Experience" value={job.primary_details.Experience} color="#FF9800" />
      </View>

      {job.content && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{job.content}</Text>
        </View>
      )}
    </ScrollView>
  );
}

// ✅ Fixed DetailRow TypeScript issue
function DetailRow({ icon, label, value, color }: { icon: MaterialIconName, label: string, value: string, color: string }) {
  return (
    <View style={styles.detailRow}>
      <MaterialIcons name={icon} size={20} color={color} />
      <Text style={styles.detailLabel}>{label}:</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#F8F9FA',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  notFoundText: {
    fontSize: 18,
    color: '#16213E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    flex: 1,
    color: '#16213E',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1A1A2E',
    borderBottomWidth: 2,
    borderBottomColor: '#E94560',
    paddingBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 10,
  },
  detailLabel: {
    width: 100,
    fontWeight: '500',
    color: '#4E4E4E',
  },
  detailValue: {
    flex: 1,
    color: '#16213E',
    fontWeight: '500',
  },
  description: {
    lineHeight: 22,
    color: '#4E4E4E',
    fontSize: 15,
  },
});

