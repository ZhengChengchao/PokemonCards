import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { datasource } from './Data';

// Predefined themes for new categories
const themes = [
  {
    name: 'Green',
    icon: 'leaf',
    bgColor: '#DFEBE2',
    iconColor: '#356B50',
  },
  {
    name: 'Purple',
    icon: 'star',
    bgColor: '#EEE3F5',
    iconColor: '#8155A0',
  },
  {
    name: 'Pink',
    icon: 'heart',
    bgColor: '#FBE4EB',
    iconColor: '#B45B79',
  },
  {
    name: 'Orange',
    icon: 'sun',
    bgColor: '#FFEAD5',
    iconColor: '#A96A37',
  },
];

const getTextColor = (hex) => {
  const color = hex.replace('#', '');

  const red = parseInt(color.substring(0, 2), 16);
  const green = parseInt(color.substring(2, 4), 16);
  const blue = parseInt(color.substring(4, 6), 16);

  const brightness =
    (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness < 150 ? '#FFFFFF' : '#25324B';
};

export default function AddCategory({ navigation }) {

  // Store the entered name and selected theme
  const [categoryName, setCategoryName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [customColor, setCustomColor] = useState('');

  const isValidHex = /^#[0-9A-Fa-f]{6}$/.test(customColor.trim());

  const previewColor = isValidHex
    ? customColor.trim()
    : themes[selectedTheme].bgColor;

  const previewTextColor = isValidHex
    ? getTextColor(previewColor)
    : '#25324B';

  const createCategory = () => {
    const name = categoryName.trim();

    // Prevent empty category names
    if (name === '') {
      Alert.alert(
        'Invalid Input',
        'Please enter a category name.'
      );
      return;
    }

    // Prevent duplicate category names
    const alreadyExists = datasource.some(
      section =>
        section.title.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      Alert.alert(
        'Category Exists',
        'This category already exists.'
      );
      return;
    }

    if (customColor.trim() !== '' && !isValidHex) {
      Alert.alert(
        'Invalid Colour',
        'Please enter a valid HEX colour, such as #A8D5BA.'
      );
      return;
    }

    Alert.alert(
      'Create Category?',
      'Create a new category called ' + name + '?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const theme = themes[selectedTheme];

            const newCategory = {
              title: name,
              icon: theme.icon,
              bgColor: previewColor,
              iconColor: isValidHex
                ? getTextColor(previewColor)
                : theme.iconColor,
              data: [],
            };

            // Add a new section to the datasource
            datasource.push(newCategory);

            navigation.goBack();
          },
        },
      ]
    );
  };

  const cancelCategory = () => {
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
            onPress={cancelCategory}
          >
            <FontAwesome6
              name="arrow-left"
              size={18}
              color="#25324B"
            />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Add Category
            </Text>

            <Text style={styles.subtitle}>
              Organise your Pokémon collection
            </Text>
          </View>
        </View>

        {/* Category Name */}
        <Text style={styles.label}>
          Category Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="e.g. Grass"
          value={categoryName}
          onChangeText={setCategoryName}
          maxLength={30}
        />

        {/* Theme Selection */}
        <Text style={styles.label}>
          Choose a Theme
        </Text>

        <View style={styles.themeContainer}>
          {themes.map((theme, index) => (
            <TouchableOpacity
              key={theme.name}
              style={[
                styles.themeOption,
                {
                  backgroundColor: theme.bgColor,
                  borderColor:
                    selectedTheme === index
                      ? theme.iconColor
                      : '#D8DEEA',
                  borderWidth:
                    selectedTheme === index ? 2 : 1,
                },
              ]}
              onPress={() => setSelectedTheme(index)}
            >
              <FontAwesome6
                name={theme.icon}
                size={24}
                color={theme.iconColor}
              />

              <Text style={styles.themeText}>
                {theme.name}
              </Text>

              {selectedTheme === index && (
                <FontAwesome6
                  name="check-circle"
                  size={15}
                  color={theme.iconColor}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
        {/* Custom Color Input */}
        <Text style={styles.label}>
          Custom HEX Colour (Optional)
        </Text>

        <TextInput
          style={styles.input}
          placeholder="#A8D5BA"
          value={customColor}
          onChangeText={setCustomColor}
          autoCapitalize="characters"
          maxLength={7}
        />

        {customColor.trim() !== '' && !isValidHex && (
          <Text style={styles.errorText}>
            Enter a valid HEX colour, e.g. #A8D5BA
          </Text>
        )}        

        <View
          style={[
            styles.colorPreview,
            { backgroundColor: previewColor },
          ]}
        >
          <FontAwesome6
            name={themes[selectedTheme].icon}
            size={20}
            color={
              isValidHex
                ? previewTextColor
                : themes[selectedTheme].iconColor
            }
          />

          <Text
            style={[
              styles.previewText,
              { color: previewTextColor, marginTop: 8 },
            ]}
          >
            {categoryName.trim()
              ? categoryName.trim().toUpperCase()
              : 'CATEGORY PREVIEW'}
          </Text>
        </View>

        {/* Create Category */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={createCategory}
        >
          <Text style={styles.createText}>
            CREATE CATEGORY
          </Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={cancelCategory}
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
    marginBottom: 30,
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
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DEEA',
    borderRadius: 10,
    padding: 14,
    fontSize: 15,
    color: '#25324B',
    marginBottom: 25,
  },
  themeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  themeOption: {
    width: '48%',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    minHeight: 100,
  },
  themeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#25324B',
    marginTop: 8,
    marginBottom: 6,
  },
  createButton: {
    backgroundColor: '#4169B2',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  createText: {
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
  colorPreview: {
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#D8DEEA',
  },
  previewText: {
    fontWeight: 'bold',
  },
  errorText: {
    color: '#B44747',
    fontSize: 12,
    marginTop: -12,
    marginBottom: 20,
  },
});