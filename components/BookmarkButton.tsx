import { Pressable, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';

interface Props {
  isBookmarked: boolean;
  onPress: () => void;
  size?: number;
  disabled?: boolean;
}

export default function BookmarkButton({
  isBookmarked,
  onPress,
  size = 24,
  disabled = false,
}: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.15,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isBookmarked]);

  return (
    <Pressable
      onPress={onPress}
      style={styles.button}
      android_ripple={{ color: '#E94560', borderless: true }}
      disabled={disabled}
      accessibilityLabel={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      accessibilityRole="button"
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <MaterialIcons
          name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
          size={size}
          color={isBookmarked ? '#E94560' : '#4E4E4E'}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    overflow: 'hidden',
  },
});