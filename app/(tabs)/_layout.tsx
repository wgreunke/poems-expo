import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="poems"
        options={{
          title: 'Poems',
          tabBarIcon: ({ color, size }) => (
            <>
              <Entypo name="open-book" size={size} color={color} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ color, size }) => (
            <Icon name="info" size={size} color={color} />
          ),
        }}
      />
    <Tabs.Screen
        name="contact"
        options={{
          title: 'Contact',
          tabBarIcon: ({ color, size }) => (
            <Icon name="email" size={size} color={color} />
          ),
        }}
      />
    <Tabs.Screen
        name="write"
        options={{
          title: 'Share Poem',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="pencil" size={size} color={color} />
          ),
        }}
      />

    
    </Tabs>
    
    
  );
}
