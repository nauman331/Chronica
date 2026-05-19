import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React from 'react'
import { blue, gray, white, yellow } from '../utils/colors'

const GetStarted: React.FC<any> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    Welcome to <Text style={styles.accent}>CHRONICA</Text>
                </Text>
                <Text style={styles.subtitle}>
                    Log in or create an account to keep your daily ritual and life tracking in one
                    place.
                </Text>

                <TextInput placeholder="Your Birth Date" placeholderTextColor={gray} style={styles.input} />
                <TextInput placeholder="Email Address" placeholderTextColor={gray} style={styles.input} />

                <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('EnhanceCrown')}>
                    <Text style={styles.primaryButtonText}>Begin Your Journey</Text>
                </Pressable>

                <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('EnhanceCrown')}>
                    <Text style={styles.secondaryButtonText}>Already have an account</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    card: {
        borderRadius: 30,
        backgroundColor: white,
        padding: 24,
        borderWidth: 1,
        borderColor: '#EFECE7',
        gap: 16,
        shadowColor: blue,
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 4,
    },
    title: {
        fontSize: 28,
        lineHeight: 34,
        color: blue,
        fontWeight: '800',
        textAlign: 'center',
    },
    accent: {
        color: yellow,
    },
    subtitle: {
        color: gray,
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 13,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E8E4DC',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        color: blue,
        fontSize: 14,
        backgroundColor: '#FBFAF8',
    },
    primaryButton: {
        backgroundColor: blue,
        paddingVertical: 15,
        borderRadius: 18,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: white,
        fontSize: 15,
        fontWeight: '700',
    },
    secondaryButton: {
        borderWidth: 1,
        borderColor: '#E8E4DC',
        paddingVertical: 14,
        borderRadius: 18,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: blue,
        fontSize: 14,
        fontWeight: '700',
    },
})