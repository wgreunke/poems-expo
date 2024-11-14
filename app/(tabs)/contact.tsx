import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';

export default function About() {
    const handleEmailPress = () => {
        Linking.openURL('mailto:versehint@gmail.com');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Share a Poem</Text>
            <Text style={styles.paragraph}>
            How can we make VerseHint better for you?
            </Text>
            <Text style={styles.paragraph}>
               Please send your feedback to versehint@gmail.com.
            </Text>
            <Pressable onPress={handleEmailPress} style={styles.button}>
                <Text style={styles.buttonText}>Email Feedback</Text>
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

