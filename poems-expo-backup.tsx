import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, Pressable } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const customData = require('../../assets/poems_data.json');
import { StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';


export const LanguageChooser = ({ setChosenLanguage, setCurrentIndex, chosenLanguage }) => {
  return (
    <View>
    <Text>Choose a language to learn</Text>
    <RNPickerSelect
      value={chosenLanguage}
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


const DisplayPoem = ({ poem_data, currentIndex }) => {
 
  const [showBase, setShowBase] = useState(false);

  const handleTranslation = () => {
    setShowBase(!showBase);
  }
  
  //The lines of the poem are passed as a list of objects.  
    return(
      <View>
        <Text>    </Text>
        <Text>*************************************</Text>
        <Text>T1 line Firsts Line</Text>
        <Text>B1 Line</Text>
        <Text>{poem_data[currentIndex].target_line1}</Text>
        {/* Show the base line in gray if the checkbox is checked, if not check it is white */}
        <Text style={{color: showBase ? 'gray' : 'white'}}>{poem_data[currentIndex].base_line1}</Text>
        <Text>{poem_data[currentIndex].target_line2}</Text>
        {/* Show the base line in gray if the checkbox is checked, if not check it is white */}
        <Text style={{color: showBase ? 'gray' : 'white'}}>{poem_data[currentIndex].base_line2}</Text>
        <Text>{poem_data[currentIndex].target_line3}</Text>
        {/* Show the base line in gray if the checkbox is checked, if not check it is white */}
        <Text style={{color: showBase ? 'gray' : 'white'}}>{poem_data[currentIndex].base_line3}</Text>
        <Text>{poem_data[currentIndex].target_line4}</Text>
        {/* Show the base line in gray if the checkbox is checked, if not check it is white */}
        <Text style={{color: showBase ? 'gray' : 'white'}}>{poem_data[currentIndex].base_line4}</Text>

        
        
        
        <ToggleTranslation handleTranslation={handleTranslation} showBase={showBase}/>
         

      </View>
    )
  }


//Create a checkbox that says "Show translation"
const ToggleTranslation=({handleTranslation, showBase})=>{
  return (
    <Pressable 
      onPress={() => handleTranslation()}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
          padding: 10,  // Add padding around the entire component
          opacity: pressed ? 0.8 : 1,  // Optional: adds press feedback
        }
      ]}
    >
      <Text>Show English?</Text>
      <Checkbox
        value={showBase}
        onValueChange={handleTranslation}
        color={showBase ? '#007AFF' : undefined}
      />
    </Pressable>
  );
};




  /* ******************** Main App ******************** */
export default function App() {

const [poemData, setPoemData] = useState(customData);
const [chosenLanguage, setChosenLanguage] = useState('Spanish');
const [currentIndex, setCurrentIndex] = useState(0);
const [filteredPoemData, setFilteredPoemData] = useState(poemData);



//Filter the poem data based on the chosen language
useEffect(() => {
  setFilteredPoemData(poemData.filter(poemData => poemData.target_language === chosenLanguage));
}, [chosenLanguage]);


return (
  <View>
  <Text>
    This should be the json file
    {poemData[0].target_line1}

  </Text>
  <LanguageChooser 
    setChosenLanguage={setChosenLanguage} 
    setCurrentIndex={setCurrentIndex}
    chosenLanguage={chosenLanguage}
  />
  <ScrollView>     
        {
        Array.from({length:3}).map((_, index) => (
          <React.Fragment key={index}>
            <DisplayPoem poem_data={filteredPoemData} currentIndex={index}/>
          </React.Fragment>
        ))        
        }
    
      </ScrollView>    

  </View>
);
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
    paddingRight: 30, // Adjust as needed

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
