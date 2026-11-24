import { useState } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getCardImage } from '../Data';

export default function CardPreview({ number }) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  const cardNumber = number.trim();

  const validNumber =
    /^[0-9]+$/.test(cardNumber) &&
    Number(cardNumber) > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CARD PREVIEW</Text>

      {!validNumber ? (
        <View style={styles.placeholder}>
          <FontAwesome6
            name="image"
            size={32}
            color="#9AA7BC"
          />

          <Text style={styles.message}>
            Enter a valid card number
          </Text>
        </View>
      ) : imageError ? (
        <View style={styles.placeholder}>
          <FontAwesome6
            name="image"
            size={32}
            color="#9AA7BC"
          />

          <Text style={styles.message}>
            Card image unavailable
          </Text>

          <Text style={styles.hint}>
            Check the card number
          </Text>
        </View>
      ) : (
        <View style={styles.previewArea}>
          <Image
            source={{ uri: getCardImage(cardNumber) }}
            style={styles.image}
            resizeMode="contain"
            onLoad={() => setLoading(false)}
            onError={() => {
              setImageError(true);
              setLoading(false);
            }}
          />

          {loading && (
            <Text style={styles.message}>
              Loading card image...
            </Text>
          )}
        </View>
      )}

      <Text style={styles.footer}>
        Pokémon TCG · Scarlet & Violet—151
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEEA',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#25324B',
    marginBottom: 14,
    letterSpacing: 1,
  },
  previewArea: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 210,
  },
  placeholder: {
    width: 150,
    height: 210,
    borderRadius: 10,
    backgroundColor: '#F0F3F9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  message: {
    fontSize: 12,
    color: '#748096',
    textAlign: 'center',
    marginTop: 10,
  },
  hint: {
    fontSize: 11,
    color: '#B44747',
    marginTop: 5,
    textAlign: 'center',
  },
  footer: {
    fontSize: 11,
    color: '#9AA7BC',
    marginTop: 12,
  },
});
