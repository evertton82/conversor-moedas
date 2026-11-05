import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Moeda } from '../../src/types/Moeda';
import { ItemMoeda } from '../../src/components/ItemMoeda';
import { URL_BASE } from '../../src/api/config';

export default function MoedasScreen() {
  const [moedas, setMoedas] = useState<Moeda[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const listarMoedas = () => {
    fetch(`${URL_BASE}/codes`)
      .then((res) => res.json())
      .then((data) => {
        const lista = data.supported_codes.map((item: string[]) => ({ codigo: item[0], nome: item[1] }));
        setMoedas(lista);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    listarMoedas();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ fontSize: 18, marginTop: 10 }}>Carregando moedas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Falha ao carregar moedas.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff', paddingHorizontal: 16 }}>
      <FlatList
        data={moedas}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => <ItemMoeda item={item} />}
      />
    </View>
  );
}
