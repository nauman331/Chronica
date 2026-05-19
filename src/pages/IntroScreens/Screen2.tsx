import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { blue, gray, lightBlue, white, yellow } from '../../utils/colors'

const Screen2: React.FC<any> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.chip}>
                    <Text style={styles.chipText}>Welcome</Text>
                </View>
                <Text style={styles.title}>
                    Welcome to <Text style={styles.accent}>CHRONICA</Text>
                </Text>
                <Text style={styles.body}>
                    Build a more intentional day with a clear timeline, gentle tracking, and a
                    simple ritual you can return to.
                </Text>

                <View style={styles.stats}>
                    <View style={styles.statRow}>
                        <View style={styles.stat}>
                            <Text style={styles.statText}>11.8k</Text>
                            <Text style={styles.statLabel}>days tracked</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statText}>94%</Text>
                            <Text style={styles.statLabel}>focus score</Text>
                        </View>
                        <View style={styles.stat}>
                            <Text style={styles.statText}>32</Text>
                            <Text style={styles.statLabel}>rituals</Text>
                        </View>
                    </View>
                </View>

                <Pressable style={styles.button} onPress={() => navigation.navigate('Screen3')}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Screen2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    card: {
        backgroundColor: white,
        borderRadius: 28,
        padding: 24,
        borderWidth: 1,
        borderColor: '#EFECE7',
        shadowColor: blue,
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 4,
        gap: 16,
    },
    chip: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: '#FFF6D8',
    },
    chipText: {
        color: yellow,
        fontWeight: '700',
        fontSize: 12,
    },
    title: {
        color: blue,
        fontSize: 28,
        fontWeight: '800',
        lineHeight: 34,
    },
    body: {
        color: gray,
        fontSize: 14,
        lineHeight: 21,
    },
    stats: {
        borderRadius: 20,
        backgroundColor: '#F6F8FB',
        padding: 18,
        gap: 10,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stat: {
        width: '31%',
        height: 70,
        borderRadius: 16,
        backgroundColor: white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statText: {
        color: blue,
        fontSize: 16,
        fontWeight: '800',
    },
    statLabel: {
        color: gray,
        fontSize: 11,
        marginTop: 3,
    },
    button: {
        marginTop: 18,
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
    accent: {
        color: lightBlue,
    },
})