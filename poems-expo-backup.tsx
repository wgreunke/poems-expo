import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, Pressable, Image, Linking } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const customData = require('../../assets/poems_data.json');
//const customData= require('./assets/poems_data.json');
import { StyleSheet } from 'react-native';
//import { readString } from 'react-native-csv';
import Checkbox from 'expo-checkbox';

// First, at the top of your file (outside any component), create the image map:
const imageMap = {
  'backpack-socks-salt.jpg': require('../../assets/images/backpack-socks-salt.jpg'),
  'beaver-sheep-question.jpg': require('../../assets/images/beaver-sheep-question.jpg'),
  'bike-goose-cook.jpg': require('../../assets/images/bike-goose-cook.jpg'),
  'boots-mustard-thick.jpg': require('../../assets/images/boots-mustard-thick.jpg'),
  'building-purple-glass.jpg': require('../../assets/images/building-purple-glass.jpg'),
  'busy-bat-clean.jpg': require('../../assets/images/busy-bat-clean.jpg'),
  'cat-breakfast-pencil.jpg': require('../../assets/images/cat-breakfast-pencil.jpg'),
  'coffee-wolf-thin.jpg': require('../../assets/images/coffee-wolf-thin.jpg'),
  'gloves-rabbit-colorful.jpg': require('../../assets/images/gloves-rabbit-colorful.jpg'),
  'goat-crocodile-scarf.jpg': require('../../assets/images/goat-crocodile-scarf.jpg'),
  'hat-country-otter.jpg': require('../../assets/images/hat-country-otter.jpg'),
  'house-kitchen-time.jpg': require('../../assets/images/house-kitchen-time.jpg'),
  'month-man-sauce.jpg': require('../../assets/images/month-man-sauce.jpg'),
  'sleep-silver-gold.jpg': require('../../assets/images/sleep-silver-gold.jpg'),
  'study-sugar-light.jpg': require('../../assets/images/study-sugar-light.jpg'),
  'swan-lake.jpg': require('../../assets/images/swan-lake.jpg'),
};



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
  
  // Check if currentIndex is within bounds
  if (currentIndex < 0 || currentIndex >= poem_data.length) {
    return <Text>No poem available</Text>; // Display a message if out of bounds
  }

  return(
    <View>
      <Text>{local_poem_data.target_line1}</Text>
      <Text>*************************************</Text>
      <Text>{poem_data[currentIndex].target_line1}</Text>
      {/* Show the base line in gray if the checkbox is checked, if not check it is white */}
      <Text style={{color: showBase ? 'gray' : '#f5f5f5'}}>{poem_data[currentIndex].base_line1}</Text>
      <Text>{poem_data[currentIndex].target_line2}</Text>
      {/* Show the base line in gray if the checkbox is checked, if not check it is white */}
      <Text style={{color: showBase ? 'gray' : '#f5f5f5'}}>{poem_data[currentIndex].base_line2}</Text>
      <Text>{poem_data[currentIndex].target_line3}</Text>
      {/* Show the base line in gray if the checkbox is checked, if not check it is white */}
      <Text style={{color: showBase ? 'gray' : '#f5f5f5'}}>{poem_data[currentIndex].base_line3}</Text>
      <Text>{poem_data[currentIndex].target_line4}</Text>
      {/* Show the base line in gray if the checkbox is checked, if not check it is white */}
      <Text style={{color: showBase ? 'gray' : '#f5f5f5'}}>{poem_data[currentIndex].base_line4}</Text>
      {/* Show the image if it exists */}
      <ToggleTranslation handleTranslation={handleTranslation} showBase={showBase}/>
      <Image  
          source={imageMap[poem_data[currentIndex].image_name]}
          style={{
            width: '100%',
            height: 150,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginVertical: 10
          }}
        />
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
          justifyContent: 'center',
          gap: 10,
          padding: 10,
          opacity: pressed ? 0.8 : 1,
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


// Initial load - shuffle the data once
useEffect(() => {
  setPoemData(shuffleArray(customData));
}, []); // Empty dependency array means this runs once on mount

// Filter by language without shuffling
useEffect(() => {
  const filtered = poemData.filter(poemData => poemData.target_language === chosenLanguage);
  setFilteredPoemData(filtered);
}, [chosenLanguage, poemData]);


return (
  <View style={{ backgroundColor: '#f5f5f5', height: '100vh' }}>
    <LanguageChooser 
    setChosenLanguage={setChosenLanguage} 
    setCurrentIndex={setCurrentIndex}
    chosenLanguage={chosenLanguage}
  />
  <ScrollView style={{ backgroundColor: '#f5f5f5', flex: 1 }}>
        {
        Array.from({length:5}).map((_, index) => (
          <React.Fragment key={index}>
            <DisplayPoem poem_data={filteredPoemData} currentIndex={index}/>
          </React.Fragment>
        ))        
        }
    
        <View style={{ marginBottom: 200 }}>
          <Pressable onPress={() => Linking.openURL('https://www.linkedin.com/in/wgreunke/')}>
            <Text style={{ color: '#0077B5', textDecorationLine: 'underline' }}>Created by: Ward Greunke</Text>
          </Pressable>
        </View>
    </ScrollView>    


  </View>
);
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
  },
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
    paddingRight:30, // Adjust as needed
  },


});

// Add this shuffle function before the App component
const shuffleArray = (array: any[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const local_poem_data= {
  "key_words": "gloves rabbit colorful",
  "target_line1": "Der Handschuh liegt im bunten Schein,",
  "target_line2": "Ein Hase h\u00fcpft im Farbenspiel hinein,",
  "target_line3": "Der Regenbogen strahlt so bunt und fein,",
  "target_line4": "Die Welt ist voller Wunder, gro\u00df und klein.",
  "base_line1": "The glove lies in the colorful shine,",
  "base_line2": "A rabbit hops into the play of colors,",
  "base_line3": "The rainbow glows so vibrant and fine,",
  "base_line4": "The world is full of wonders, big and small.",
  "target_language": "German",
  "base": "English",
  "image_name": "gloves-rabbit-colorful.jpg"
}
