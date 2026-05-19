import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { blue, gray, lightGreen, white, yellow } from '../../utils/colors'

const Screen3: React.FC<any> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>+</Text>
                </View>
                <Text style={styles.title}>Your Life in Days</Text>
                <Text style={styles.body}>
                    See the shape of your routines, measure what matters, and turn a scattered day
                    into something you can feel.
                </Text>

                <View style={styles.grid}>
                    {Array.from({ length: 48 }).map((_, index) => (
                        <View
                            key={index}
                            style={[styles.block, index % 7 === 0 && styles.activeBlock]}
                        />
                    ))}
                </View>

                <Pressable style={styles.button} onPress={() => navigation.navigate('GetStarted')}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            </View>

            <View style={styles.footer}>
                <View style={styles.dot} />
                <Text style={styles.footerText}>Skip intro</Text>
            </View>
        </View>
    )
}

export default Screen3

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    card: {
        backgroundColor: blue,
        borderRadius: 30,
        padding: 28,
        gap: 16,
    },
    badge: {
        alignSelf: 'center',
        width: 58,
        height: 58,
        borderRadius: 29,
        backgroundColor: '#2D2242',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: white,
        fontSize: 24,
        fontWeight: '800',
    },
    title: {
        color: white,
        fontSize: 28,
        fontWeight: '800',
        textAlign: 'center',
    },
    body: {
        color: '#D8D5E3',
        fontSize: 14,
        lineHeight: 22,
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        justifyContent: 'center',
        marginTop: 6,
    },
    block: {
        width: 12,
        height: 12,
        borderRadius: 3,
        backgroundColor: '#4B3E66',
    },
    activeBlock: {
        backgroundColor: yellow,
    },
    button: {
        marginTop: 14,
        backgroundColor: yellow,
        paddingVertical: 15,
        borderRadius: 18,
        alignItems: 'center',
    },
    buttonText: {
        color: blue,
        fontSize: 15,
        fontWeight: '800',
    },
    footer: {
        marginTop: 12,
        alignItems: 'center',
    },
    footerText: {
        color: gray,
        fontSize: 12,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: lightGreen,
        marginBottom: 10,
    },
})