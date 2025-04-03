import { View, StyleSheet } from 'react-native';

const JobCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.skeleton, styles.titleSkeleton]} />
        <View style={[styles.skeleton, styles.bookmarkSkeleton]} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={[styles.skeleton, styles.detailSkeleton]} />
        <View style={[styles.skeleton, styles.detailSkeleton]} />
        <View style={[styles.skeleton, styles.detailSkeleton]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 8,
  },
  detailsContainer: {
    gap: 8,
  },
  skeleton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  titleSkeleton: {
    height: 20,
    flex: 1,
  },
  bookmarkSkeleton: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  detailSkeleton: {
    height: 16,
    width: '80%',
  },
});

export default JobCardSkeleton;