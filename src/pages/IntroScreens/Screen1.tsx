import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';
import React, { useMemo } from 'react';
import Svg, { Circle } from 'react-native-svg';
import { blue, gray, white, yellow } from '../../utils/colors';

const Screen1 = ({ birthDate, onNext, onSkip }: any) => {
    const bDate = useMemo(() => new Date(birthDate), [birthDate]);
    const today = new Date();
    const daysLived = Math.floor((today.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));
    const formattedDaysLived = daysLived >= 1000 ? (daysLived / 1000).toFixed(1) + 'k' : daysLived.toString();

    const radius = 60;
    const strokeWidth = 6;
    const circumference = 2 * Math.PI * radius;
    const progressPercent = Math.min(daysLived / (80 * 365), 1);
    const strokeDashoffset = circumference - (circumference * progressPercent);

    return (
        <View style={styles.container}>
            <View style={styles.centerSection}>
                <View style={styles.ringContainer}>
                    <Svg width="150" height="150" viewBox="0 0 150 150">
                        <Circle cx="75" cy="75" r={radius} stroke="#F5F3ED" strokeWidth={strokeWidth} fill="none" />
                        <Circle cx="75" cy="75" r={radius} stroke={yellow} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" transform="rotate(-90 75 75)" />
                    </Svg>
                    <View style={styles.ringTextContainer}>
                        <Text style={styles.ringValue}>{formattedDaysLived}</Text>
                        <Text style={styles.ringLabel}>days lived</Text>
                    </View>
                </View>

                <Text style={styles.title}>Welcome to{'\n'}<Text style={styles.logo}>CHRONICA</Text></Text>
                <Text style={styles.subtitle}>Your story, visualized</Text>
            </View>

            <View style={styles.bottomSection}>
                <Pressable style={styles.button} onPress={onNext}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
                <Pressable style={styles.skipButton} onPress={onSkip}>
                    <Text style={styles.skipText}>Skip intro</Text>
                </Pressable>
            </View>
        </View>
    );
};
export default Screen1;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: white, justifyContent: 'space-between', paddingTop: 80 },
    centerSection: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, marginTop: -40 },
    ringContainer: { width: 150, height: 150, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
    ringTextContainer: { position: 'absolute', justifyContent: 'center', alignItems: 'center' },
    ringValue: { color: yellow, fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
    ringLabel: { color: yellow, fontSize: 12, fontWeight: '500', marginTop: 2 },
    title: { color: blue, fontSize: 34, fontWeight: '800', textAlign: 'center', lineHeight: 42, marginBottom: 16 },
    logo: { color: yellow },
    subtitle: { color: gray, fontSize: 15, fontWeight: '500', textAlign: 'center' },
    bottomSection: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: Dimensions.get('window').height > 800 ? 50 : 30, borderTopWidth: 1, borderTopColor: '#F0EAE1' },
    button: {
        backgroundColor: blue,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: blue,
                shadowOpacity: 0.4,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 12 },
            },
            android: {
                elevation: 10,
            }
        })
    },
    buttonText: { color: white, fontSize: 16, fontWeight: '500' },
    skipButton: { alignSelf: 'flex-end', marginTop: 24 },
    skipText: { color: '#A0A0A0', fontSize: 14, fontWeight: '500' },
});