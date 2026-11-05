import { useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Moeda } from '../../src/types/Moeda';
import { URL_BASE } from '../../src/api/config';

type Resultado = {
  valorOrigem: number;
  valorDestino: number;
  taxa: number;
  origem: string;
  destino: string;
};

export default function ConverterScreen() {
  const [moedas, setMoedas] = useState<Moeda[]>([]);
  const [origem, setOrigem] = useState('BRL');
  const [destino, setDestino] = useState('USD');
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState<Resultado | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${URL_BASE}/codes`)
      .then((res) => res.json())
      .then((data) => {
        const lista = data.supported_codes.map((item: string[]) => ({ codigo: item[0], nome: item[1] }));
        setMoedas(lista);
      })
      .catch((err) => setError(err.message));
  }, []);

  const converter = () => {
    const numero = Number(valor.replace(',', '.'));

    if (!numero || numero <= 0) {
      setError('Digite um valor válido.');
      return;
    }

    setError(null);
    setIsLoading(true);

    fetch(`${URL_BASE}/pair/${origem}/${destino}/${numero}`)
      .then((res) => res.json())
      .then((data) => {
        setResultado({
          valorOrigem: numero,
          valorDestino: data.conversion_result,
          taxa: data.conversion_rate,
          origem: origem,
          destino: destino,
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#ffffff' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ marginBottom: 4 }}>Moeda Origem</Text>
      <View style={{ borderWidth: 1, borderColor: '#cccccc', marginBottom: 12 }}>
        <Picker selectedValue={origem} onValueChange={(item) => setOrigem(item)} itemStyle={{ height: 120, fontSize: 16 }}>
          {moedas.map((moeda) => (
            <Picker.Item key={moeda.codigo} label={`${moeda.nome} (${moeda.codigo})`} value={moeda.codigo} />
          ))}
        </Picker>
      </View>

      <Text style={{ marginBottom: 4 }}>Moeda Destino</Text>
      <View style={{ borderWidth: 1, borderColor: '#cccccc', marginBottom: 12 }}>
        <Picker selectedValue={destino} onValueChange={(item) => setDestino(item)} itemStyle={{ height: 120, fontSize: 16 }}>
          {moedas.map((moeda) => (
            <Picker.Item key={moeda.codigo} label={`${moeda.nome} (${moeda.codigo})`} value={moeda.codigo} />
          ))}
        </Picker>
      </View>

      <Text style={{ marginBottom: 4 }}>Valor</Text>
      <TextInput
        value={valor}
        onChangeText={setValor}
        placeholder="Ex: 99"
        keyboardType="decimal-pad"
        style={{ borderWidth: 1, borderColor: '#cccccc', padding: 10, fontSize: 16, marginBottom: 16 }}
      />

      <Pressable onPress={converter} style={{ backgroundColor: '#2e7d32', padding: 12, alignItems: 'center' }}>
        <Text style={{ color: '#ffffff', fontWeight: 'bold' }}>CONVERTER</Text>
      </Pressable>

      {isLoading && <ActivityIndicator size="large" style={{ marginTop: 16 }} />}

      {error && <Text style={{ color: 'red', marginTop: 12 }}>{error}</Text>}

      {resultado && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Valor origem: {resultado.valorOrigem} {resultado.origem}</Text>
          <Text style={{ fontSize: 16 }}>Valor destino: {resultado.valorDestino} {resultado.destino}</Text>
          <Text style={{ fontSize: 16 }}>Taxa de conversão: {resultado.taxa}</Text>
        </View>
      )}
    </ScrollView>
  );
}
