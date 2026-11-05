import { View, Text } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12 }}>Sobre</Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        Aplicativo desenvolvido para a disciplina de Desenvolvimento de Software para Dispositivos Móveis.
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 12 }}>
        Ele lista as moedas disponíveis, permite marcar moedas favoritas e converter valores entre elas.
      </Text>
      <Text style={{ fontSize: 16 }}>Dados obtidos da ExchangeRate-API.</Text>
    </View>
  );
}
