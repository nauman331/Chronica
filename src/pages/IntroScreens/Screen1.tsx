import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import React, { useMemo } from 'react';
import Svg, { Circle } from 'react-native-svg';

import { useAppTheme } from '../../hooks/useAppTheme';
import { yellow } from '../../utils/colors';

const { height } = Dimensions.get('window');

const Screen1 = ({ birthDate, onNext, onSkip }: any) => {
    const { colors, isDark } = useAppTheme();

    const bDate = useMemo(() => new Date(birthDate), [birthDate]);
    const today = new Date();
    const daysLived = Math.floor((today.getTime() - bDate.getTime()) / (1000 * 60 * 60 * 24));
    const formattedDaysLived = daysLived >= 1000 ? (daysLived / 1000).toFixed(1) + 'k' : daysLived.toString();

    const radius = 60;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;
    const progressPercent = Math.min(daysLived / (80 * 365), 1);
    const strokeDashoffset = circumference - (circumference * progressPercent);

    // FIX: Extracted the SVG stroke color into a standard variable
    const ringEmptyColor = isDark ? colors.border : '#F3EFE6';

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        subtitle: { color: '#8C8B9C' },
        bottomSection: {
            borderTopColor: isDark ? colors.border : '#F3EFE6',
            backgroundColor: colors.background
        },
        button: {
            backgroundColor: isDark ? colors.primary : '#1A1523',
        },
        buttonText: { color: '#FFFFFF' },
        skipText: { color: '#B4B4B4' },
    });

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.centerSection}>
                <View style={styles.ringContainer}>
                    <Svg width="150" height="150" viewBox="0 0 150 150">
                        <Circle cx="75" cy="75" r={radius} stroke={ringEmptyColor} strokeWidth={strokeWidth} fill="none" />
                        <Circle cx="75" cy="75" r={radius} stroke={yellow} strokeWidth={strokeWidth} fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" transform="rotate(-90 75 75)" />
                    </Svg>
                    <View style={styles.ringTextContainer}>
                        <Text style={styles.ringValue}>{formattedDaysLived}</Text>
                        <Text style={styles.ringLabel}>days lived</Text>
                    </View>
                </View>

                <Text style={[styles.title, dynamicStyles.title]}>
                    Welcome to{'\n'}
                    <Text style={styles.logo}>CHRONICA</Text>
                </Text>

                <Text style={[styles.subtitle, dynamicStyles.subtitle]}>Your story, visualized</Text>
            </View>

            <View style={[styles.bottomSection, dynamicStyles.bottomSection]}>
                <Pressable style={[styles.button, dynamicStyles.button]} onPress={onNext}>
                    <Text style={[styles.buttonText, dynamicStyles.buttonText]}>Continue</Text>
                </Pressable>

                <Pressable style={styles.skipButton} hitSlop={10} onPress={onSkip}>
                    <Text style={[styles.skipText, dynamicStyles.skipText]}>Skip intro</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Screen1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 80,
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginTop: -60,
    },
    ringContainer: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 36,
    },
    ringTextContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ringValue: {
        color: yellow,
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    ringLabel: {
        color: yellow,
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 44,
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    logo: { color: yellow },
    subtitle: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.1,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: height > 800 ? 50 : 34,
        borderTopWidth: 1,
    },
    button: {
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        letterSpacing: 0.2,
    },
    skipButton: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    skipText: {
        fontSize: 14,
        fontWeight: '500',
    },
});