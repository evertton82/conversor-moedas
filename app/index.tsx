import { View, Text } from 'react-native';

export default function InicioScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Conversor de Moedas</Text>
    </View>
  );
}
