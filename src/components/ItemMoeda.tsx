import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { Moeda } from '../types/Moeda';
import { favoritaEvents } from '../events/favoritaEvent';

const MOEDAS_FAVORITAS = 'moedas_favoritas';

type Props = {
  item: Moeda;
};

export function ItemMoeda({ item }: Props) {
  const [favorita, setFavorita] = useState(false);

  const verificarFavorita = () => {
    AsyncStorage.getItem(MOEDAS_FAVORITAS)
      .then((res) => {
        const favoritas: string[] = res ? JSON.parse(res) : [];
        setFavorita(favoritas.includes(item.codigo));
      })
      .catch((err) => console.log(err));
  };

  const favoritar = () => {
    AsyncStorage.getItem(MOEDAS_FAVORITAS)
      .then((res) => {
        const favoritas: string[] = res ? JSON.parse(res) : [];
        let atualizadas: string[];

        if (favoritas.includes(item.codigo)) {
          atualizadas = favoritas.filter((codigo) => codigo !== item.codigo);
        } else {
          atualizadas = [...favoritas, item.codigo];
        }

        AsyncStorage.setItem(MOEDAS_FAVORITAS, JSON.stringify(atualizadas)).then(() => {
          favoritaEvents.emit('favoritos:changed');
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    verificarFavorita();
    const subscription = favoritaEvents.addListener('favoritos:changed', verificarFavorita);
    return () => subscription.remove();
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#dddddd',
      }}
    >
      <Text style={{ fontWeight: 'bold', width: 50 }}>{item.codigo}</Text>
      <Text style={{ flex: 1 }}>{item.nome}</Text>
      <TouchableOpacity onPress={favoritar}>
        <MaterialIcons name={favorita ? 'star' : 'star-border'} size={24} color={favorita ? '#f1c40f' : '#999999'} />
      </TouchableOpacity>
    </View>
  );
}
