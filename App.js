import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobsScreen from './src/screens/JobsScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Jobs') iconName = 'work';
            else if (route.name === 'Bookmarks') iconName = 'bookmark';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#E94560',
          tabBarInactiveTintColor: '#4E4E4E',
        })}
      >
        <Tab.Screen name="Jobs" component={JobsScreen} />
        <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}