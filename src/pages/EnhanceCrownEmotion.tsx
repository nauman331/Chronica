import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { BadgeIcon } from '../utils/icons';
import CircularBadge from '../components/CircularBadge';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Keep yellow for the brand accent (the "crown" effect)
import { yellow } from '../utils/colors';

const EnhanceCrownEmotion: React.FC<any> = ({ navigation }: { navigation: any }) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        datePill: { backgroundColor: colors.surfaceMuted },
        bodyText: { color: colors.text },
        quoteText: { color: colors.textSecondary },
        primaryButton: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary
        },
        primaryButtonText: {
            color: colors.background // Inverts automatically against the primary color
        },
        secondaryButton: {
            backgroundColor: colors.surface,
            borderColor: colors.border
        },
        secondaryButtonText: { color: colors.textSecondary },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.content}>

                <CircularBadge Icon={BadgeIcon} />

                {/* Title */}
                <Text style={[styles.title, dynamicStyles.title]}>Day Crowned</Text>

                {/* Date Pill */}
                <View style={[styles.datePill, dynamicStyles.datePill]}>
                    <View style={styles.dot} />
                    <Text style={styles.dateText}>April 15, 2026</Text>
                </View>

                {/* Body Text */}
                <Text style={[styles.bodyText, dynamicStyles.bodyText]}>
                    This day is now preserved in your life story forever.
                </Text>

                {/* Quote */}
                <Text style={[styles.quoteText, dynamicStyles.quoteText]}>
                    "Every documented day is a{"\n"}gift to your future self."
                </Text>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.primaryButton, dynamicStyles.primaryButton]}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("EnhanceCrown")}
                    >
                        <Text style={[styles.primaryButtonText, dynamicStyles.primaryButtonText]}>Return to Today</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.secondaryButton, dynamicStyles.secondaryButton]}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate("LifeMap")}
                    >
                        <Text style={[styles.secondaryButtonText, dynamicStyles.secondaryButtonText]}>View Life Map →</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default EnhanceCrownEmotion;

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
    // Leaving glow styles intact in case they are referenced by CircularBadge internally or elsewhere
    outerGlow: {
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.26,
        shadowRadius: 56,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        elevation: 14,
        backgroundColor: 'transparent',
    },
    innerGlow: {
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.7,
        shadowRadius: 26,
        width: 80,
        height: 80,
        borderRadius: 77,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        elevation: 10,
        backgroundColor: 'transparent',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: yellow,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 16,
    },
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: yellow,
        marginBottom: 24,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: yellow,
        marginRight: 8,
    },
    dateText: {
        color: yellow,
        fontSize: 14,
        fontWeight: '600',
    },
    bodyText: {
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 26,
        marginBottom: 48,
    },
    quoteText: {
        fontSize: 14,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 48,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
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
    secondaryButton: {
        width: '90%',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});