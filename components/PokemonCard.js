import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';

export default function PokemonCard({ pokemon, onPress }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.info}>
        <Text style={styles.name}>
          {pokemon.name}
        </Text>

        <Text style={styles.number}>
          Card #{pokemon.number}
        </Text>
      </View>

      <Image
        source={{ uri: pokemon.image }}
        style={styles.image}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E6EE',
    elevation: 2,
  },
  info: {
    flex: 1,
    paddingLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#25324B',
  },
  number: {
    fontSize: 12,
    color: '#7E899B',
    marginTop: 8,
  },
  image: {
    width: 125,
    height: 175,
  },
});
