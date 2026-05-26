import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Keep brand yellow for accents
import { yellow } from '../utils/colors';
import { BookHeartIcon } from '../utils/icons';
import CircularBadge from '../components/CircularBadge';

const ReflectionSaved: React.FC<any> = ({ navigation }) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        datePill: { backgroundColor: colors.surfaceMuted },
        subtitle: { color: colors.textSecondary },
        italicText: { color: colors.textSecondary },
        primaryButton: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary
        },
        primaryButtonText: {
            color: colors.background // Inverts automatically against the primary button
        },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.content}>

                {/* Using your default CircularBadge sizes! */}
                <CircularBadge Icon={BookHeartIcon} iconCircleSize={100} />

                {/* Main Heading */}
                <Text style={[styles.title, dynamicStyles.title]}>Reflection Saved</Text>

                {/* Date Pill (Keeps brand yellow border & text) */}
                <View style={[styles.datePill, dynamicStyles.datePill]}>
                    <View style={styles.dot} />
                    <Text style={styles.dateText}>April 15, 2026</Text>
                </View>

                {/* Subtitles */}
                <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                    Your thoughts are now part of{'\n'}your life story
                </Text>

                <Text style={[styles.italicText, dynamicStyles.italicText]}>
                    Each reflection deepens your{'\n'}understanding of the path you're walking
                </Text>

                {/* Continue Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.primaryButton, dynamicStyles.primaryButton]}
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('Insights');
                        }}
                    >
                        <Text style={[styles.primaryButtonText, dynamicStyles.primaryButtonText]}>Continue</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default ReflectionSaved;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },

    // Typography
    title: {
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        letterSpacing: -0.5,
        marginBottom: 16,
    },

    // Date Pill
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: yellow,
        marginBottom: 32,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: yellow,
        marginRight: 8,
    },
    dateText: {
        fontSize: 14,
        color: yellow, // Stays yellow
        fontWeight: '600',
    },

    // Subtitles
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    italicText: {
        fontSize: 14,
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 22,
        marginBottom: 48,
    },

    // Button
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
    },
    primaryButton: {
        width: '90%',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});