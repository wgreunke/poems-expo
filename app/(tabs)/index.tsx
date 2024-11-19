import { Link } from 'expo-router';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';

export default function HomePage() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Verse Hint</Text>
        <Text style={styles.subtitle}>Easy Spanish, French and German poems with instant translations.</Text>
        <Text style={styles.tagline}>Practice reading without looking up words.?</Text>
        <Image source={require('../../assets/images/poem_image.png')} style={styles.image} />
      </View>




      <View style={styles.content}>
        <Text style={styles.description}>
          Just click "Show English" to get a literal translation for each word.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Link href="/poems?language=Spanish" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Read Spanish Poems</Text>
          </Pressable>
        </Link>        
      </View>
      


      <View style={styles.buttonContainer}>
        <Link href="/poems?language=German" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Read German Poems</Text>
          </Pressable>
        </Link>        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 10,
  },
  content: {
    width: '100%',
    marginBottom: 30,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 15,
  },
  callToAction: {
    fontWeight: '600',
    fontSize: 18,
    color: '#007AFF',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});
