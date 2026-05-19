import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { blue, gray, lightGreen, white, yellow } from '../../utils/colors'

const Screen1: React.FC<any> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.center}>
                <Text style={styles.logo}>CHRONICA</Text>
                <Text style={styles.subtitle}>Your story, visualized</Text>
                <Text style={styles.body}>
                    Start with a clear view of your days, rituals, and habits.
                </Text>
            </View>

            <Pressable style={styles.button} onPress={() => navigation.navigate('Screen2')}>
                <Text style={styles.buttonText}>Continue</Text>
            </Pressable>

            <View style={styles.footer}>
                <View style={styles.dot} />
                <Text style={styles.body}>A calm beginning to a focused routine.</Text>
            </View>
        </View>
    )
}

export default Screen1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
    },
    logo: {
        color: yellow,
        fontSize: 34,
        fontWeight: '800',
        letterSpacing: 2,
    },
    subtitle: {
        color: blue,
        fontSize: 16,
        fontWeight: '700',
    },
    body: {
        color: gray,
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
        maxWidth: 260,
    },
    button: {
        backgroundColor: blue,
        paddingVertical: 15,
        borderRadius: 18,
        alignItems: 'center',
    },
    buttonText: {
        color: white,
        fontSize: 15,
        fontWeight: '700',
    },
    footer: {
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: lightGreen,
    },
})