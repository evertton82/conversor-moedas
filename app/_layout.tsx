import 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Drawer screenOptions={{ drawerActiveTintColor: '#2e7d32' }}>
        <Drawer.Screen
          name="index"
          options={{
            title: 'Início',
            drawerIcon: ({ color, size }) => <MaterialIcons name="home" color={color as string} size={size} />,
          }}
        />
        <Drawer.Screen
          name="sobre"
          options={{
            title: 'Sobre',
            drawerIcon: ({ color, size }) => <MaterialIcons name="info" color={color as string} size={size} />,
          }}
        />
        <Drawer.Screen
          name="(moedas)"
          options={{
            title: 'Moedas',
            drawerIcon: ({ color, size }) => <MaterialIcons name="attach-money" color={color as string} size={size} />,
          }}
        />
      </Drawer>
    </SafeAreaProvider>
  );
}
