import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { blue, gray, white, yellow } from '../utils/colors'

const EnhanceCrown: React.FC<any> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.orb}>
                    <Text style={styles.orbText}>+</Text>
                </View>
                <Text style={styles.title}>
                    The Daily <Text style={styles.highlight}>Ritual</Text>
                </Text>
                <Text style={styles.body}>
                    Three small actions. One calm focus. Start your day with intention and keep
                    your rhythm visible.
                </Text>
                <Text style={styles.body}>
                    <Text style={styles.today}>Today:</Text> choose what matters, reflect on what
                    happened, and end the day with clarity.
                </Text>

                <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Screen1')}>
                    <Text style={styles.primaryButtonText}>Begin Today&apos;s Ritual</Text>
                </Pressable>

                <Pressable style={styles.secondaryButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.secondaryButtonText}>Skip intro</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default EnhanceCrown

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    card: {
        borderRadius: 32,
        padding: 28,
        backgroundColor: blue,
        gap: 16,
        alignItems: 'center',
    },
    orb: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#2D2242',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orbText: {
        color: white,
        fontSize: 24,
        fontWeight: '800',
    },
    title: {
        color: white,
        fontSize: 30,
        fontWeight: '800',
        textAlign: 'center',
    },
    highlight: {
        color: yellow,
    },
    body: {
        color: '#D8D5E3',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
    },
    today: {
        color: yellow,
        fontWeight: '700',
    },
    primaryButton: {
        width: '100%',
        backgroundColor: yellow,
        paddingVertical: 15,
        borderRadius: 18,
        alignItems: 'center',
        marginTop: 6,
    },
    primaryButtonText: {
        color: blue,
        fontSize: 15,
        fontWeight: '800',
    },
    secondaryButton: {
        marginTop: 8,
        paddingVertical: 10,
    },
    secondaryButtonText: {
        color: gray,
        fontSize: 13,
        fontWeight: '600',
    },
})