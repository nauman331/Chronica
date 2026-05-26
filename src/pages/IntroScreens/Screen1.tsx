import { View, Text, StyleSheet, Pressable, Dimensions, Platform } from 'react-native';
import React, { useMemo } from 'react';
import Svg, { Circle } from 'react-native-svg';

// Import custom theme hook
import { useAppTheme } from '../../hooks/useAppTheme';

// Keep brand color
import { yellow } from '../../utils/colors';

const Screen1 = ({ birthDate, onNext, onSkip }: any) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    const bDate = useMemo(() => new Date(birthDate), [birthDate]);
    const today = new Date();
    const daysLived = Math.floor((today.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));
    const formattedDaysLived = daysLived >= 1000 ? (daysLived / 1000).toFixed(1) + 'k' : daysLived.toString();

    const radius = 60;
    const strokeWidth = 6;
    const circumference = 2 * Math.PI * radius;
    const progressPercent = Math.min(daysLived / (80 * 365), 1);
    const strokeDashoffset = circumference - (circumference * progressPercent);

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        subtitle: { color: colors.textSecondary },
        bottomSection: { borderTopColor: colors.border },
        button: {
            backgroundColor: colors.primary,
            ...Platform.select({
                ios: { shadowColor: colors.primary }
            })
        },
        buttonText: { color: colors.background }, // Inverts against primary button color
        skipText: { color: colors.textSecondary },
    });

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.centerSection}>
                <View style={styles.ringContainer}>
                    <Svg width="150" height="150" viewBox="0 0 150 150">
                        {/* Use theme border color for the empty track of the ring */}
                        <Circle cx="75" cy="75" r={radius} stroke={colors.border} strokeWidth={strokeWidth} fill="none" />
                        <Circle cx="75" cy="75" r={radius} stroke={yellow} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" transform="rotate(-90 75 75)" />
                    </Svg>
                    <View style={styles.ringTextContainer}>
                        <Text style={styles.ringValue}>{formattedDaysLived}</Text>
                        <Text style={styles.ringLabel}>days lived</Text>
                    </View>
                </View>

                <Text style={[styles.title, dynamicStyles.title]}>Welcome to{'\n'}<Text style={styles.logo}>CHRONICA</Text></Text>
                <Text style={[styles.subtitle, dynamicStyles.subtitle]}>Your story, visualized</Text>
            </View>

            <View style={[styles.bottomSection, dynamicStyles.bottomSection]}>
                <Pressable style={[styles.button, dynamicStyles.button]} onPress={onNext}>
                    <Text style={[styles.buttonText, dynamicStyles.buttonText]}>Continue</Text>
                </Pressable>
                <Pressable style={styles.skipButton} onPress={onSkip}>
                    <Text style={[styles.skipText, dynamicStyles.skipText]}>Skip intro</Text>
                </Pressable>
            </View>
        </View>
    );
};
export default Screen1;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 80
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: -40
    },
    ringContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40
    },
    ringTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    ringValue: {
        color: yellow, // Stays yellow
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5
    },
    ringLabel: {
        color: yellow, // Stays yellow
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 42,
        marginBottom: 16
    },
    logo: { color: yellow }, // Stays yellow
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center'
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingTop: 32,
        paddingBottom: Dimensions.get('window').height > 800 ? 50 : 30,
        borderTopWidth: 1,
    },
    button: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowOpacity: 0.4,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 12 },
            },
            android: {
                elevation: 10,
            }
        })
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500'
    },
    skipButton: {
        alignSelf: 'flex-end',
        marginTop: 24
    },
    skipText: {
        fontSize: 14,
        fontWeight: '500'
    },
});