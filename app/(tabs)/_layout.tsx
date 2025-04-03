// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { View, Text, StyleSheet, Image as RNImage } from 'react-native';
import { useBookmarks } from '../../hooks/useBookmarks';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingVertical: 10,
    backgroundColor: '#1A2526',
  },
  headerLogo: {
    width: 36,
    height: 36,
    marginRight: 12,
    borderRadius: 10,
    shadowColor: '#F2CC8F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#F4F1DE',
    letterSpacing: 0.5,
  },
  tabBar: {
    height: 50,
    backgroundColor: '#1A2526',
    opacity: 0.98,
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: '#1F1F1F',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: -5 },
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  tabIcon: {
    marginBottom: 2,
  },
  tabIconActive: {
    shadowColor: '#F2CC8F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#A3A3A3',
    letterSpacing: 0.5,
  },
  tabLabelActive: {
    color: '#F2CC8F',
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 6,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F2CC8F',
    shadowColor: '#F2CC8F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    right: 20,
    top: 4,
    backgroundColor: '#E07A5F',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F4F1DE',
  },
  badgeText: {
    color: '#F4F1DE',
    fontSize: 9,
    fontWeight: 'bold',
    paddingHorizontal: 3,
  },
});

const ICONS = {
  logo: 'https://e7.pngegg.com/pngimages/582/358/png-clipart-recruitment-flat-design-business-computer-icons-business-text-trademark.png',
};

interface TabBarIconProps {
  focused: boolean;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  route: string;
}

function CustomTabBarIcon({ focused, label, iconName, route }: TabBarIconProps) {
  const router = useRouter();

  const handlePress = () => {
    console.log(`Navigating to route: ${route}`);
    router.push(route);
  };

  return (
    <View style={styles.tabItem} onTouchEnd={handlePress}>
      <Ionicons
        name={iconName}
        size={22}
        color={focused ? '#F2CC8F' : '#A3A3A3'}
        style={[styles.tabIcon, focused && styles.tabIconActive]}
      />
      <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
        {label}
      </Text>
      {focused && <View style={styles.activeIndicator} />}
    </View>
  );
}

export default function TabLayout() {
  const { bookmarks } = useBookmarks();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        headerStyle: styles.headerContainer,
        headerTitle: () => (
          <View style={styles.headerContainer}>
            <RNImage
              source={{ uri: ICONS.logo }}
              style={styles.headerLogo}
              defaultSource={{ uri: 'https://via.placeholder.com/32' }}
            />
            <Text style={styles.headerTitle}>Lokal Jobs App</Text>
          </View>
        ),
        headerTitleAlign: 'left',
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Jobs',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              focused={focused}
              label="Jobs"
              iconName="briefcase"
              route="/"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmarks"
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative', flex: 1 }}>
              <CustomTabBarIcon
                focused={focused}
                label="Bookmarks"
                iconName="bookmark"
                route="/bookmarks"
              />
              {bookmarks.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {bookmarks.length > 99 ? '99+' : bookmarks.length}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="jobs/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}