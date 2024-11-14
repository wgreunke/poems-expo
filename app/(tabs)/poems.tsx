import React, { useEffect, useState } from 'react';
import {View, Text, ScrollView, Pressable, Image, Linking } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
const customData = require('../../assets/poems_data.json');

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
      
      <View style={{ height: 2, backgroundColor: '#007AFF', marginVertical: 10 }} />
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
//const [poemData, setPoemData] = useState(local_poem_data);
const [chosenLanguage, setChosenLanguage] = useState('Spanish');
const [currentIndex, setCurrentIndex] = useState(0);
const [filteredPoemData, setFilteredPoemData] = useState(poemData);


// Initial load - shuffle the data once
useEffect(() => {
  setPoemData(shuffleArray(customData));
  //setPoemData(local_poem_data);
}, []); // Empty dependency array means this runs once on mount

// Filter by language without shuffling
useEffect(() => {
  const filtered = poemData.filter(poemData => poemData.target_language === chosenLanguage);
  setFilteredPoemData(filtered);
}, [chosenLanguage, poemData]);


return (
  <View style={{ backgroundColor: '#f5f5f5', height: '100vh',paddingLeft:10,paddingTop:10 }}>
    

  <ScrollView style={{ backgroundColor: '#f5f5f5' }}>
  <LanguageChooser 
    setChosenLanguage={setChosenLanguage} 
    setCurrentIndex={setCurrentIndex}
    chosenLanguage={chosenLanguage}
  />

        {
        Array.from({length:5}).map((_, index) => (
          <React.Fragment key={index}>
            <View>
              <DisplayPoem poem_data={filteredPoemData} currentIndex={index}/>
            </View>
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

const local_poem_data=[
{
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
},
{
    "key_words": "busy bat clean",
    "target_line1": "Eine Fledermaus so flei\u00dfig ist,",
    "target_line2": "Sie fliegt durch die Nacht, ganz ohne List.",
    "target_line3": "Reinigt die L\u00fcfte, geschwind und klar,",
    "target_line4": "In der Dunkelheit, da ist sie ein Star.",
    "base_line1": "A bat is so diligent,",
    "base_line2": "It flies through the night, without a trick.",
    "base_line3": "Cleansing the air, swift and clear,",
    "base_line4": "In the darkness, it is a star here.",
    "target_language": "German",
    "base": "English",
    "image_name": "busy-bat-clean.jpg"
},
{
    "key_words": "house kitchen time",
    "target_line1": "Im Haus da tickt die stille Uhr,",
    "target_line2": "In der K\u00fcche zieht die Zeit ihre Spur,",
    "target_line3": "W\u00e4hrend wir kochen und tr\u00e4umen so sacht,",
    "target_line4": "Verliert die Hektik an Macht und Pracht.",
    "base_line1": "In the house, the silent clock ticks,",
    "base_line2": "In the kitchen, time leaves its tricks,",
    "base_line3": "While we cook and dream so gently,",
    "base_line4": "The hustle and bustle lose their plenty.",
    "target_language": "German",
    "base": "English",
    "image_name": "house-kitchen-time.jpg"
},
{
    "key_words": "boots mustard thick",
    "target_line1": "Die Stiefel treten im dicken Sand,",
    "target_line2": "Wie Senf auf die Zunge brennt.",
    "target_line3": "Mit jedem Schritt, fest in der Hand,",
    "target_line4": "Halt' ich die Freiheit, die uns trennt.",
    "base_line1": "The boots tread in the thick sand,",
    "base_line2": "Like mustard burning on the tongue.",
    "base_line3": "With every step, firm in hand,",
    "base_line4": "I hold the freedom that separates us.",
    "target_language": "German",
    "base": "English",
    "image_name": "boots-mustard-thick.jpg"
},
{
    "key_words": "goat crocodile scarf",
    "target_line1": "Eine Ziege fra\u00df das Gras im Kreis,",
    "target_line2": "Neben ihr ein Krokodil ganz leis'.",
    "target_line3": "Es trug einen Schal, der war recht rar,",
    "target_line4": "Doch zieht man hier nicht gern an einem Star.",
    "base_line1": "A goat grazed grass in a circle,",
    "base_line2": "Next to her, a crocodile so quiet.",
    "base_line3": "It wore a scarf, which was quite rare,",
    "base_line4": "But here, one does not like to pull on a star.",
    "target_language": "German",
    "base": "English",
    "image_name": "goat-crocodile-scarf.jpg"
},
{
    "key_words": "building purple glass",
    "target_line1": "Ein Geb\u00e4ude aus Glas, so klar und k\u00fchl,",
    "target_line2": "In violetter Pracht, wie ein k\u00f6niglicher Stuhl.",
    "target_line3": "Es spiegelt die Farben der Stadt bei Nacht,",
    "target_line4": "Ein Funken von Magie, vom Mond bewacht.",
    "base_line1": "A building of glass, so clear and cool,",
    "base_line2": "In violet splendor, like a royal stool.",
    "base_line3": "It reflects the colors of the city at night,",
    "base_line4": "A spark of magic, watched by the moonlight.",
    "target_language": "German",
    "base": "English",
    "image_name": "building-purple-glass.jpg"
},
{
    "key_words": "study sugar light",
    "target_line1": "Im Licht der Lampe, s\u00fc\u00df wie Zucker,",
    "target_line2": "Studiert er sp\u00e4t, kein Zeitverzucker.",
    "target_line3": "Der Schreibtisch voll, die B\u00fccher schwer,",
    "target_line4": "Doch lernt er flei\u00dfig immer mehr.",
    "base_line1": "In the light of the lamp, sweet as sugar,",
    "base_line2": "He studies late, no time to linger.",
    "base_line3": "The desk is full, the books are heavy,",
    "base_line4": "Yet he diligently learns, ever ready.",
    "target_language": "German",
    "base": "English",
    "image_name": "study-sugar-light.jpg"
},
{
    "key_words": "month man sauce",
    "target_line1": "Der Mann im Monat sitzt ganz gro\u00df,",
    "target_line2": "Er liebt die W\u00fcrze, seine So\u00df'.",
    "target_line3": "Jeden Tag ein neues Schmankerl,",
    "target_line4": "Mit der Sch\u00f6pfkelle immer wandelbar.",
    "base_line1": "The man in the moon sits up high,",
    "base_line2": "He loves the spice, his sauce awry.",
    "base_line3": "Every day a new delicacy,",
    "base_line4": "With the ladle ever versatile, you see.",
    "target_language": "German",
    "base": "English",
    "image_name": "month-man-sauce.jpg"
},
{
    "key_words": "hat country otter",
    "target_line1": "Ein Otter tr\u00e4gt seinen Hut mit Stolz,",
    "target_line2": "Im Fluss, dem Land hier zugeh\u00f6rig,",
    "target_line3": "Er schwimmt herum, das Wasser sein Holz,",
    "target_line4": "Sein L\u00e4cheln freundlich, unerh\u00f6rt fr\u00f6hlich.",
    "base_line1": "An otter wears his hat with pride,",
    "base_line2": "In the river, belonging to the land,",
    "base_line3": "He swims around, the water his wood,",
    "base_line4": "His smile friendly, unbelievably joyful.",
    "target_language": "German",
    "base": "English",
    "image_name": "hat-country-otter.jpg"
},
{
    "key_words": "beaver sheep question",
    "target_line1": "Ein Biber fragt das Schaf ganz sacht,",
    "target_line2": "Warum er nachts so selten wacht.",
    "target_line3": "Das Schaf mit einem L\u00e4cheln spricht,",
    "target_line4": "\u201eIch tr\u00e4ume lieber manches Licht.\u201c",
    "base_line1": "A beaver gently asks the sheep,",
    "base_line2": "Why he rarely wakes at night from sleep.",
    "base_line3": "The sheep replies with a smile so bright,",
    "base_line4": "\"I prefer to dream of some light.\"",
    "target_language": "German",
    "base": "English",
    "image_name": "beaver-sheep-question.jpg"
},
{
    "key_words": "bike goose cook",
    "target_line1": "Ein Fahrrad rollt im Sonnenschein,",
    "target_line2": "Eine Gans schnattert dort am Teich.",
    "target_line3": "In der K\u00fcche brutzelt schon der Wein,",
    "target_line4": "Zum Kochen f\u00fchl ich mich heut reich.",
    "base_line1": "A bicycle rolls in the sunshine,",
    "base_line2": "A goose is honking by the pond.",
    "base_line3": "In the kitchen, the wine is already sizzling,",
    "base_line4": "Today I feel rich for cooking.",
    "target_language": "German",
    "base": "English",
    "image_name": "bike-goose-cook.jpg"
},
{
    "key_words": "backpack socks salt",
    "target_line1": "Im Rucksack trage ich Socken und Salz",
    "target_line2": "F\u00fcr Abenteuer fern von Asphalt und Schmalz.",
    "target_line3": "Die Wege sind steinig, doch voller Reiz,",
    "target_line4": "Mit Salz auf der Zunge wird alles hei\u00df.",
    "base_line1": "In my backpack, I carry socks and salt,",
    "base_line2": "For adventures far from asphalt and schmaltz.",
    "base_line3": "The paths are rocky, yet full of charm,",
    "base_line4": "With salt on the tongue, everything is warm.",
    "target_language": "German",
    "base": "English",
    "image_name": "backpack-socks-salt.jpg"
},
{
    "key_words": "sleep silver gold",
    "target_line1": "Der Schlaf ist sanft im Silberschein,",
    "target_line2": "Die Tr\u00e4ume weben Gold so fein.",
    "target_line3": "In der Nacht, da ruht die Welt,",
    "target_line4": "Wo Silberlicht die Dunkelheit erhellt.",
    "base_line1": "Sleep is gentle in the silver glow,",
    "base_line2": "Dreams weave gold so fine, you know.",
    "base_line3": "In the night, the world finds rest,",
    "base_line4": "Where silver light brightens the darkness best.",
    "target_language": "German",
    "base": "English",
    "image_name": "sleep-silver-gold.jpg"
},
{
    "key_words": "boots mustard thick",
    "target_line1": "Botas amarillas de mostaza",
    "target_line2": "caminan por tierra extensa y rasa,",
    "target_line3": "giran bajo nubes de tono espeso,",
    "target_line4": "mientras el viento sopla travieso.",
    "base_line1": "Boots yellow of mustard",
    "base_line2": "walk they through land extensive and flat",
    "base_line3": "they turn under clouds of tone thick",
    "base_line4": "while the wind blows mischievous",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "boots-mustard-thick.jpg"
},
{
    "key_words": "goat crocodile  scarf",
    "target_line1": "Sobre el c\u00e9sped, la cabra danza,",
    "target_line2": "baile con bufanda en el amanecer,",
    "target_line3": "un cocodrilo observa en remembranza,",
    "target_line4": "bajo sombras de un atardecer.",
    "base_line1": "On the grass, the goat dances,",
    "base_line2": "dance with scarf in the dawn,",
    "base_line3": "a crocodile observes in remembrance,",
    "base_line4": "under shadows of a sunset.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "goat-crocodile-scarf.jpg"
},
{
    "key_words": "building purple glass",
    "target_line1": "En el edificio de cristal anidado,",
    "target_line2": "un reflejo morado se ha posado,",
    "target_line3": "luz del amanecer, brillante y espesa,",
    "target_line4": "como un sue\u00f1o en su bosque de belleza.",
    "base_line1": "In the building of glass nestled,",
    "base_line2": "a reflection purple has settled,",
    "base_line3": "light of the dawn, bright and thick,",
    "base_line4": "like a dream in its forest of beauty.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "building-purple-glass.jpg"
},
{
    "key_words": "swan hand",
    "target_line1": "El cisne flota en el lago,",
    "target_line2": "con gracia mueve su ala,",
    "target_line3": "como la mano de un mago,",
    "target_line4": "que en el aire nunca se cala.",
    "base_line1": "The swan floats on the lake,",
    "base_line2": "with grace moves its wing,",
    "base_line3": "like the hand of a magician,",
    "base_line4": "that in the air never pauses.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "swan-lake.jpg"
},
{
    "key_words": "study sugar light",
    "target_line1": "En el rinc\u00f3n oscuro del estudio, la luz",
    "target_line2": "endulza como az\u00facar el espacio y su paz.",
    "target_line3": "Los libros reposan, un saber en cruz,",
    "target_line4": "y el d\u00eda se disuelve como un dulce al pasar.",
    "base_line1": "In the dark corner of the study, the light",
    "base_line2": "sweetens like sugar the space and its peace.",
    "base_line3": "The books rest, a knowledge in cross,",
    "base_line4": "and the day itself dissolves like a candy upon passing.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "study-sugar-light.jpg"
},
{
    "key_words": "month man sauce",
    "target_line1": "En el mes de abril brilla un fulgor,",
    "target_line2": "un hombre sabio con dulce saz\u00f3n,",
    "target_line3": "salsa en su alma, ritmo en el son,",
    "target_line4": "danza la vida con todo su amor.",
    "base_line1": "In the month of April shines a gleam,",
    "base_line2": "a man wise with sweet seasoning,",
    "base_line3": "sauce in his soul, rhythm in the sound,",
    "base_line4": "dances the life with all his love.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "month-man-sauce.jpg"
},
{
    "key_words": "cat breakfast pencil",
    "target_line1": "El gato afila un l\u00e1piz en su denso pelaje,",
    "target_line2": "mientras desayuno devora, con dulce coraje.",
    "target_line3": "El l\u00e1piz escribe sue\u00f1os en el aire flotante,",
    "target_line4": "mientras el d\u00eda comienza, sereno y brillante.",
    "base_line1": "The cat sharpens a pencil in its dense fur,",
    "base_line2": "while breakfast devours, with sweet courage.",
    "base_line3": "The pencil writes dreams in the floating air,",
    "base_line4": "while the day begins, serene and bright.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "cat-breakfast-pencil.jpg"
},
{
    "key_words": "hat country otter",
    "target_line1": "En el pa\u00eds de los sue\u00f1os sin fin,",
    "target_line2": "donde el sombrero juega con el viento,",
    "target_line3": "un castor observa con contento,",
    "target_line4": "el r\u00edo que fluye con suave jard\u00edn.",
    "base_line1": "In the country of the dreams without end,",
    "base_line2": "where the hat plays with the wind,",
    "base_line3": "a beaver observes with happiness,",
    "base_line4": "the river that flows with soft garden.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "hat-country-otter.jpg"
},
{
    "key_words": "beaver sheep question",
    "target_line1": "El castor construye una presa,",
    "target_line2": "la oveja en el campo bosteza,",
    "target_line3": "una pregunta en el aire vuela,",
    "target_line4": "\u00bfcu\u00e1l es su sue\u00f1o mientras reposa?",
    "base_line1": "The beaver builds a dam,",
    "base_line2": "the sheep in the field yawns,",
    "base_line3": "a question in the air flies,",
    "base_line4": "what is its dream while it rests?",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "beaver-sheep-question.jpg"
},
{
    "key_words": "backpack socks salt",
    "target_line1": "En la mochila llevo sue\u00f1os de cristal,",
    "target_line2": "los calcetines de aventuras al azar,",
    "target_line3": "en mares de sal, buscamos sin cesar,",
    "target_line4": "un destino lejano, un abrazo sin igual.",
    "base_line1": "In the backpack I carry dreams of crystal,",
    "base_line2": "the socks of adventures to the random,",
    "base_line3": "in seas of salt, we search without cease,",
    "base_line4": "a destiny distant, a hug without equal.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "backpack-socks-salt.jpg"
},
{
    "key_words": "sleep silver gold",
    "target_line1": "En sue\u00f1os de plata me envuelvo,",
    "target_line2": "donde todo es oro brillante.",
    "target_line3": "La noche, en su manto de encanto,",
    "target_line4": "me lleva a un mundo flotante.",
    "base_line1": "In dreams of silver myself I wrap,",
    "base_line2": "where all is gold shining.",
    "base_line3": "The night, in its cloak of enchantment,",
    "base_line4": "me carries to a world  floating.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "sleep-silver-gold.jpg"
},
{
    "key_words": "coffee wolf thin",
    "target_line1": "El caf\u00e9 en la taza, aroma que embriaga,",
    "target_line2": "un lobo a\u00falla bajo la luz que halaga.",
    "target_line3": "Sus sombras delgadas en la noche danzan,",
    "target_line4": "en el silencio, susurros que se avanzan.",
    "base_line1": "The coffee in the cup, aroma that intoxicates,",
    "base_line2": "a wolf howls under the light that flatters.",
    "base_line3": "Its thin shadows in the night they dance,",
    "base_line4": "in the silence, whispers that advance.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "coffee-wolf-thin.jpg"
},
{
    "key_words": "gloves rabbit colorful",
    "target_line1": "Un conejo con guantes de seda,",
    "target_line2": "salta alegre bajo el sol radiante,",
    "target_line3": "su pelaje es un arco\u00edris brillante,",
    "target_line4": "pinta el campo con su danza empleada.",
    "base_line1": "A rabbit with gloves of silk,",
    "base_line2": "jumps joyful under the sun radiant,",
    "base_line3": "its fur is a rainbow shiny,",
    "base_line4": "paints the field with its dance employed.",
    "target_language": "Spanish",
    "base": "English",
    "image_name": "gloves-rabbit-colorful.jpg"
}
]