import { Image, StyleSheet, Platform, Text,View, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import Papa from 'papaparse'; 
import {SelectItem} from '@ui-kitten/components'
import RNPickerSelect from 'react-native-picker-select';



import React, {useEffect,useState} from 'react';



const DisplayPoem = ({ poem_data, currentIndex }) => {
//The lines of the poem are passed as a list of objects.  
  return(
    <View>
      <Text>T1 line Firsts Line</Text>
      <Text>B1 Line</Text>
      <Text>{poem_data[currentIndex].column_name}</Text>
    </View>
  )
}

//Create the language selector
//CHose this because it is simple to use
//https://github.com/lawnstarter/react-native-picker-select
//https://www.npmjs.com/package/react-native-picker-select

export const LanguageChooser = ({ setChosenLanguage, setCurrentIndex }) => {
  return (
    <View>
    <Text>Choose a language to learn</Text>
    <RNPickerSelect
      value='Spanish'
      onValueChange={(value) =>{
        console.log(value)
        setChosenLanguage(value)
        setCurrentIndex(0)
       }}
      
      style={pickerSelectStyles}
      items={[
        { label: 'Spanish', value: 'Spanish' },
        { label: 'German', value: 'German' },

      ]}
    />
    </View>
  );
};



export default function HomeScreen() {


//ChosenLanguage
const [chosenLanguage, setChosenLanguage] = useState('Spanish');

const [currentIndex, setCurrentIndex] = useState(0);

  //Dummy data for testing
  const mockFilteredData = [
  {
    language: "Spanish",
    column_name: "Some Spanish Text",
    // Add other potential columns as needed
  },
  {
    language: "German",
    column_name: "German Text",
  },
  {
    language:"German",
    column_name: "Second line of German Text",
  }
  // ... other filtered rows
];


  return (
    <>
      <Text>{'\n'} </Text>
      <Text>{'\n'} </Text>
      <Text>{chosenLanguage}</Text>
      <Text>{currentIndex}</Text>
      
      <Text style={styles.titleText}>Easy Poems</Text>
      <LanguageChooser  setChosenLanguage={setChosenLanguage} setCurrentIndex={setCurrentIndex}  />
      <Text>First line of poem</Text>
      <Text style={styles.translatedText}>Translated line</Text>

      <ScrollView>     
        {
        Array.from({length:3}).map((_, index)=>(
          <DisplayPoem key={index}  poem_data={mockFilteredData} currentIndex={index}/>
        )
      )
        
        }
    
      </ScrollView>    
    
  </>);
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  translatedText:{
    color:'gray',
  }

}
);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight:   
 30, // Adjust as needed
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight:   
 30, // Adjust as needed
  },


});

