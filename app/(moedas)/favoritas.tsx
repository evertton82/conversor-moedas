import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Moeda } from '../../src/types/Moeda';
import { ItemMoeda } from '../../src/components/ItemMoeda';
import { URL_BASE } from '../../src/api/config';
import { favoritaEvents } from '../../src/events/favoritaEvent';

const MOEDAS_FAVORITAS = 'moedas_favoritas';

export default function FavoritasScreen() {
  const [moedas, setMoedas] = useState<Moeda[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const listarFavoritas = () => {
    setError(null);
    AsyncStorage.getItem(MOEDAS_FAVORITAS)
      .then((res) => {
        const favoritas: string[] = res ? JSON.parse(res) : [];

        if (favoritas.length === 0) {
          setMoedas([]);
          setIsLoading(false);
          return;
        }

        fetch(`${URL_BASE}/codes`)
          .then((res) => res.json())
          .then((data) => {
            const lista: Moeda[] = data.supported_codes.map((item: string[]) => ({ codigo: item[0], nome: item[1] }));
            setMoedas(lista.filter((moeda) => favoritas.includes(moeda.codigo)));
          })
          .catch((err) => setError(err.message))
          .finally(() => setIsLoading(false));
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    listarFavoritas();
  }, []);

  useEffect(() => {
    const subscription = favoritaEvents.addListener('favoritos:changed', listarFavoritas);
    return () => subscription.remove();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ fontSize: 18, marginTop: 10 }}>Carregando favoritas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Falha ao carregar favoritas.</Text>
      </View>
    );
  }

  if (moedas.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>
          Nenhuma moeda favorita. Toque na estrela de uma moeda na aba Moedas.
        </Text>
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
