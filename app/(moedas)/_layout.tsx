import { Tabs } from 'expo-router/tabs';
import { MaterialIcons } from '@expo/vector-icons';

export default function MoedasLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#2e7d32' }}>
      <Tabs.Screen
        name="moedas"
        options={{
          title: 'Moedas',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="list" color={color as string} size={size} />,
        }}
      />
      <Tabs.Screen
        name="favoritas"
        options={{
          title: 'Favoritas',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="star" color={color as string} size={size} />,
        }}
      />
      <Tabs.Screen
        name="converter"
        options={{
          title: 'Converter',
          tabBarIcon: ({ color, size }) => <MaterialIcons name="swap-horiz" color={color as string} size={size} />,
        }}
      />
    </Tabs>
  );
}
