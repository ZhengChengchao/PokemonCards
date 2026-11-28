import { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { datasource, getCardImage } from './Data';
import CardPreview from './components/CardPreview';

export default function Add({ navigation }) {

  // Store the values entered by the user
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [type, setType] = useState('Electric');

  // Add a new Pokemon to the selected section
  const addPokemon = () => {
    const pokemonName = name.trim();
    const cardNumber = number.trim();

    // Check that the inputs are valid
    if (
      pokemonName === '' ||
      !/^[0-9]+$/.test(cardNumber) ||
      Number(cardNumber) === 0
    ) {
      Alert.alert(
        'Invalid Input',
        'Please enter a Pokémon name and a valid card number.'
      );
      return;
    }

    // Ask for confirmation
    Alert.alert(
      'Add Pokémon?',
      'Add ' + pokemonName + ' to your collection?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            // Find the selected element section
            const section = datasource.find(
              item => item.title === type
            );

            if (!section) {
              Alert.alert(
                'Error',
                'Element section not found.'
              );
              return;
            }

            // Generate a unique key for the new item
            const allItems = datasource.flatMap(
              item => item.data
            );

            const nextKey = Math.max(
              0,
              ...allItems.map(item => Number(item.key) || 0)
            ) + 1;

            // Create the new Pokemon object
            const newPokemon = {
              key: String(nextKey),
              name: pokemonName,
              number: cardNumber,
              image: getCardImage(cardNumber),
            };

            // Add the Pokemon to the selected section
            section.data.push(newPokemon);

            // Return to Home
            navigation.goBack();
          },
        },
      ]
    );
  };

  // Confirm before leaving the Add screen
  const cancelAdd = () => {
    Alert.alert(
      'Discard changes?',
      'Your entered details will be lost.',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={cancelAdd}
          >
            <FontAwesome6
              name="arrow-left"
              size={18}
              color="#25324B"
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Add Pokémon
            </Text>

            <Text style={styles.subtitle}>
              Add a new card to your collection
            </Text>
          </View>
        </View>

        {/* Form */}
        <Text style={styles.label}>
          Pokémon Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Pokémon name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>
          Card Number
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. 25"
          keyboardType="number-pad"
          value={number}
          onChangeText={setNumber}
        />

        <Text style={styles.label}>
          Element
        </Text>

        <View style={styles.pickerContainer}>   
          <Picker
            selectedValue={type}
            onValueChange={setType}
          >
            {datasource.map(section => (
              <Picker.Item
                key={section.title}
                label={section.title}
                value={section.title}
              />
            ))}
          </Picker>
        </View> 

        {/* Online card preview */}
        <CardPreview
          key={number.trim()}
          number={number}
        />

        {/* Submit */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={addPokemon}
        >
          <Text style={styles.submitText}>
            SUBMIT
          </Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={cancelAdd}
        >
          <Text style={styles.cancelText}>
            CANCEL
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F7FC',
  },
  content: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  backButton: {
    padding: 12,
    marginRight: 12,
    backgroundColor: '#E5EDFF',
    borderRadius: 10,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#25324B',
  },
  subtitle: {
    fontSize: 12,
    color: '#748096',
    marginTop: 5,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#25324B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEEA',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#25324B',
    marginBottom: 20,
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEEA',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#4169B2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  submitText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cancelButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEEA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#25324B',
  },
});
