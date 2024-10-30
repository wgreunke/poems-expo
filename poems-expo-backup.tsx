import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import Papa from 'papaparse';
import RNPickerSelect from 'react-native-picker-select';

// Language selector component
const LanguageChooser = ({ value, onValueChange }) => (
  <View>
    <Text>Choose a language to learn</Text>
    <RNPickerSelect
      value={value}
      onValueChange={onValueChange}
      style={pickerSelectStyles}
      items={[
        { label: 'Spanish', value: 'Spanish' },
        { label: 'German', value: 'German' },
      ]}
    />
  </View>
);

// Display individual poem component
const DisplayPoem = ({ poemData }) => {
  if (!poemData) {
    return <Text>No poem data available</Text>;
  }

  return (
    <View style={styles.poemContainer}>
      <Text style={styles.poemLine}>{poemData.target_line1}</Text>
      {/* Add other poem lines as needed */}
    </View>
  );
};

// Main component
export default function HomeScreen() {
  const [poemData, setPoemData] = useState([]);
  const [chosenLanguage, setChosenLanguage] = useState('Spanish');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load CSV data on component mount
  useEffect(() => {
    const loadCSV = async () => {
      try {
        setIsLoading(true);
        
        // Change the require statement to use a direct path
        const csvModule = require('../../assets/poems_data.csv');
        console.log('CSV Module:', csvModule);
        
        const asset = Asset.fromModule(csvModule);
        console.log('Asset:', asset);

        await asset.downloadAsync();
        console.log('Asset downloaded, URI:', asset.localUri);
        
        if (!asset.localUri) {
          throw new Error('No local URI available for asset');
        }

        const fileContent = await FileSystem.readAsStringAsync(asset.localUri);
        console.log('File content length:', fileContent.length);
        
        const parsedData = Papa.parse(fileContent, { 
          header: true,
          skipEmptyLines: true 
        });

        // Log parsing results
        console.log('Parsed data rows:', parsedData.data.length);
        if (parsedData.errors.length > 0) {
          throw new Error('CSV parsing errors: ' + JSON.stringify(parsedData.errors));
        }

        setPoemData(parsedData.data);
        setIsLoading(false);
      } catch (err) {
        console.error('Detailed error loading CSV:', {
          error: err,
          message: err.message,
          stack: err.stack
        });
        setError(`Failed to load poems data: ${err.message}`);
        setIsLoading(false);
      }
    };

    loadCSV();
  }, []);

  // Filter poems based on selected language
  const filteredPoems = poemData.filter(poem => poem.target === chosenLanguage);

  // Handle language change
  const handleLanguageChange = (value) => {
    setChosenLanguage(value);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading poems...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Easy Poems</Text>
      
      <LanguageChooser 
        value={chosenLanguage}
        onValueChange={handleLanguageChange}
      />

      <ScrollView style={styles.poemsList}>
        {filteredPoems.length > 0 ? (
          filteredPoems.map((poem, index) => (
            <DisplayPoem 
              key={index}
              poemData={poem}
            />
          ))
        ) : (
          <Text>No poems available for {chosenLanguage}</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  poemsList: {
    flex: 1,
  },
  poemContainer: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  poemLine: {
    fontSize: 16,
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginBottom: 16,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    marginBottom: 16,
  },
});
