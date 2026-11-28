import { useState } from 'react';
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import PokemonCard from './components/PokemonCard';
import { datasource } from './Data';
import { useIsFocused } from '@react-navigation/native';

// Default categories cannot be deleted
const defaultCategories = ['Electric', 'Fire', 'Water'];

export default function Home({ navigation }) {

  // Refresh Home when returning from Add, Edit or AddCategory
  useIsFocused();

  // Refresh Home after deleting a category
  const [refresh, setRefresh] = useState(0);

  // Create updated arrays for SectionList
  const sections = datasource.map(section => ({
    ...section,
    data: [...section.data],
  }));

  // Add Pokemon button
  const handleAddPokemon = () => {
    navigation.navigate('Add');
  };

  // Delete a custom category
  const deleteCategory = (section) => {

    // Prevent deleting default categories
    if (defaultCategories.includes(section.title)) {
      return;
    }

    // Prevent deleting categories containing Pokemon
    if (section.data.length > 0) {
      Alert.alert(
        'Category Not Empty',
        'Please move or delete all Pokémon in this category first.'
      );
      return;
    }

    // Confirm deletion
    Alert.alert(
      'Delete Category?',
      'Are you sure you want to delete ' + section.title + '?',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            const index = datasource.findIndex(
              item => item.title === section.title
            );

            if (index !== -1) {
              datasource.splice(index, 1);

              // Refresh Home immediately
              setRefresh(value => value + 1);
            }
          },
        },
      ]
    );
  };

  // Display each Pokemon card
  const renderItem = ({ item, index, section }) => (
    <PokemonCard
      pokemon={item}
      onPress={() => navigation.navigate('Edit', {
        index: index,
        type: section.title,
        name: item.name,
        number: item.number,
      })}
    />
  );

  // Display section headings
  const renderSectionHeader = ({ section }) => {
    const isDefault = defaultCategories.includes(section.title);

    return (
      <View
        style={[
          styles.sectionHeader,
          { backgroundColor: section.bgColor },
        ]}
      >
        <View style={styles.sectionTitleContainer}>
          <FontAwesome6
            name={section.icon}
            size={18}
            color={section.iconColor}
          />

          <Text
            style={[
              styles.sectionTitle,
              { color: section.iconColor },
            ]}
          >
            {section.title.toUpperCase()}
          </Text>
        </View>

        {/* Delete button only for custom categories */}
        {!isDefault && (
          <TouchableOpacity
            style={styles.deleteCategoryButton}
            onPress={() => deleteCategory(section)}
          >
            <FontAwesome6
              name="trash"
              size={16}
              color={section.iconColor}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Pokémon Cards
        </Text>

        <Text style={styles.subtitle}>
          Explore your card collection
        </Text>
      </View>

      {/* Add Pokemon Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddPokemon}
      >
        <FontAwesome6
          name="plus"
          size={15}
          color="#FFFFFF"
        />

        <Text style={styles.addButtonText}>
          ADD POKÉMON
        </Text>
      </TouchableOpacity>

      {/* Add Category Button */}
      <TouchableOpacity
        style={styles.addCategoryButton}
        onPress={() => navigation.navigate('AddCategory')}
      >
        <FontAwesome6
          name="folder-plus"
          size={15}
          color="#4169B2"
        />

        <Text style={styles.addCategoryText}>
          ADD CATEGORY
        </Text>
      </TouchableOpacity>

      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        extraData={refresh}
      />
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
    paddingHorizontal: 20,
    paddingBottom: 18,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#25324B',
  },
  subtitle: {
    fontSize: 14,
    color: '#748096',
    marginTop: 5,
  },
  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4169B2',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 12,
    marginTop: 15,
    marginBottom: 12,
    minHeight: 48,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  deleteCategoryButton: {
    position: 'absolute',
    right: 12,
    padding: 8,
  },
  addCategoryButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4169B2',
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  addCategoryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4169B2',
    marginLeft: 10,
  },
});