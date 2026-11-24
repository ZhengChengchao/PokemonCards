import {View, Text, SectionList, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import PokemonCard from './components/PokemonCard';
import { datasource } from './Data';

export default function Home({navigation}) {

  // Add Pokemon button (for next lesson)
  const handleAddPokemon = () => {
    Alert.alert(
      'Add Pokémon',
      'This feature will be available in the next lesson.'
    );
  };

  // Display Pokemon details
  const showDetails = (item) => {
    Alert.alert(
      item.name,
      'Pokémon Card #' + item.number
    );
  };

  // Display each Pokemon card
  const renderItem = ({ item }) => {
    return (
      <PokemonCard
        pokemon={item}
        onPress={() => showDetails(item)}
      />
    );
  };

  // Display section headings
  const renderSectionHeader = ({ section }) => {
    return (
      <View
        style={[
          styles.sectionHeader,
          { backgroundColor: section.bgColor },
        ]}
      >
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

      <SectionList
        sections={datasource}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
