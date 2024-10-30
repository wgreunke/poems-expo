// App.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import Papa from 'papaparse';

// Component to display a single row
const DataRow = ({ rowData }) => (
  <View style={styles.row}>
    {Object.entries(rowData).map(([key, value], index) => (
      <Text key={index}>
        {key}: {value}
      </Text>
    ))}
  </View>
);

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCSV = async () => {
      try {
        console.log('Starting CSV load...');
        // Note the relative path from App.js to the CSV file
        const asset = await Asset.loadAsync(require('./assets/poems_data2.csv'));
        console.log('Asset loaded:', asset);

        if (asset && asset[0]) {
          const fileContent = await FileSystem.readAsStringAsync(asset[0].localUri);
          console.log('File content loaded, first 50 chars:', fileContent.substring(0, 50));

          const result = Papa.parse(fileContent, {
            header: true,
            skipEmptyLines: true
          });

          console.log('Parsed data, row count:', result.data.length);
          setData(result.data);
        } else {
          throw new Error('Asset not loaded properly');
        }
      } catch (err) {
        console.error('Error details:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCSV();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CSV Data</Text>
      <ScrollView>
        {data.map((row, index) => (
          <DataRow key={index} rowData={row} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
  }
});
