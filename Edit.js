import { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { datasource, getCardImage } from './Data';

export default function Edit({ navigation, route }) {

  // Receive the selected Pokemon details from Home
  const { index, type, name, number } = route.params;

  // Prefill the form using the received values
  const [pokemonName, setPokemonName] = useState(name);
  const [cardNumber, setCardNumber] = useState(number);
  const [element, setElement] = useState(type);

  // Update the selected Pokemon
  const saveChanges = () => {
    const newName = pokemonName.trim();
    const newNumber = cardNumber.trim();

    if (
      newName === '' ||
      !/^[0-9]+$/.test(newNumber) ||
      Number(newNumber) === 0
    ) {
      Alert.alert(
        'Invalid Input',
        'Please enter a Pokemon name and a valid card number.'
      );
      return;
    }

    Alert.alert(
      'Save changes?',
      'Save changes to ' + newName + '?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {

            // Find the original element section
            const originalSection = datasource.find(
              section => section.title === type
            );

            // Find the newly selected element section
            const newSection = datasource.find(
              section => section.title === element
            );

            if (!originalSection || !newSection ||
                !originalSection.data[index]) {
              Alert.alert('Error', 'Pokémon card not found.');
              return;
            }

            // Keep the original unique key
            const originalPokemon = originalSection.data[index];

            const updatedPokemon = {
              key: originalPokemon.key,
              name: newName,
              number: newNumber,
              image: getCardImage(newNumber),
            };

            if (type === element) {
              // Update within the same section
              originalSection.data[index] = updatedPokemon;
            } else {
              // Move Pokemon to a different section
              originalSection.data.splice(index, 1);
              newSection.data.push(updatedPokemon);
            }

            navigation.goBack();
          },
        },
      ]
    );
  };

  // Confirm before deleting the selected Pokemon
  const deletePokemon = () => {
    Alert.alert(
      'Delete Pokémon?',
      'Are you sure you want to delete ' + name + '?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const section = datasource.find(
              item => item.title === type
            );

            if (!section || !section.data[index]) {
              Alert.alert('Error', 'Pokémon card not found.');
              return;
            }

            section.data.splice(index, 1);
            navigation.goBack();
          },
        },
      ]
    );
  };

  // Return without saving
  const cancelEdit = () => {
    Alert.alert(
      'Discard changes?',
      'Your unsaved changes will be lost.',
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

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={cancelEdit}
        >
          <FontAwesome6
            name="arrow-left"
            size={18}
            color="#25324B"
          />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>
            Edit Pokémon
          </Text>

          <Text style={styles.subtitle}>
            Update or remove a card
          </Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>

        <Text style={styles.label}>
          Pokémon Name
        </Text>

        <TextInput
          style={styles.input}
          value={pokemonName}
          onChangeText={setPokemonName}
          placeholder="Enter Pokémon name"
        />

        <Text style={styles.label}>
          Card Number
        </Text>

        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="e.g. 25"
          keyboardType="number-pad"
        />

        <Text style={styles.label}>
          Element
        </Text>

        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={element}
            onValueChange={setElement}
          >
            <Picker.Item
              label="Electric"
              value="Electric"
            />
            <Picker.Item
              label="Fire"
              value="Fire"
            />
          </Picker>
        </View>

        {/* Save changes */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveChanges}
        >
          <Text style={styles.saveText}>
            SAVE CHANGES
          </Text>
        </TouchableOpacity>

        {/* Delete Pokemon */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deletePokemon}
        >
          <FontAwesome6
            name="trash"
            size={14}
            color="#B44747"
          />

          <Text style={styles.deleteText}>
            DELETE POKÉMON
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 55,
    backgroundColor: '#F5F7FC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  backButton: {
    padding: 12,
    marginRight: 10,
    backgroundColor: '#E5EDFF',
    borderRadius: 10,
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
  form: {
    paddingHorizontal: 20,
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
    marginBottom: 25,
    overflow: 'hidden',
  },
  saveButton: {
    backgroundColor: '#4169B2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  saveText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FFF1F1',
    borderWidth: 1,
    borderColor: '#E9BABA',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#B44747',
    marginLeft: 10,
  },
});
