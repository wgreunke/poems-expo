import React from 'react';
import { View, Text, StyleSheet,Image, ScrollView } from 'react-native';

export default function About() {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>About Us</Text>


                <Text style={styles.paragraph}>
                VerseHint helps you overcome the intermediate plateau with simple poems that use easy vocabulary and literal translations allowing you to quickly learn new words without having to look them up.
                </Text>

                <Text style={styles.paragraph}>
                    The poetry format helps reinforce the sound of similar words through rhyming.
                </Text>


                <Image 
                    source={require('../../assets/images/bike-goose-cook.jpg')} 
                    style={[styles.image, { width: 200, height: 200, alignSelf: 'center' }]} 
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 16,
    },
});

