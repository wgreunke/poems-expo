import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';

export default function About() {
    const handleEmailPress = () => {
        Linking.openURL('mailto:versehint@gmail.com');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Share your poem</Text>
            <Text style={styles.paragraph}>
                Do you have a simple poem or limerick that you would like to share?  We would love to hear from you.
            </Text>
            <Text style={styles.paragraph}>
                Send your poem to versehint@gmail.com and we will add it to our collection
            </Text>
            <Pressable onPress={handleEmailPress} style={styles.button}>
                <Text style={styles.buttonText}>Email your Poem</Text>
            </Pressable>
        </View>
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
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

