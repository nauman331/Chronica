import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { BadgeIcon } from '../utils/icons';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Keep yellow for the brand accent
import { yellow } from '../utils/colors';

const EnhanceCrownEmotion: React.FC<any> = ({ navigation }: { navigation: any }) => {
    const { colors, isDark } = useAppTheme();

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },

        // Exact light yellow pill from Figma
        datePill: {
            backgroundColor: isDark ? 'rgba(201, 162, 39, 0.15)' : '#FEF9EC',
            borderColor: isDark ? 'rgba(201, 162, 39, 0.3)' : '#FDECA6'
        },
        bodyText: { color: colors.text },
        quoteText: { color: '#8C8B9C' },

        // Match the deep dark purple/black button from Figma
        primaryButton: {
            backgroundColor: isDark ? colors.primary : '#1A1523',
        },
        primaryButtonText: {
            color: '#FFFFFF'
        },
        secondaryButton: {
            backgroundColor: colors.surface,
            borderColor: isDark ? colors.border : '#F3EFE6'
        },
        secondaryButtonText: { color: '#8C8B9C' },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.content}>

                {/* Direct Badge implementation to ensure 100% accurate Figma Shadow */}
                <View style={styles.badgeContainer}>
                    <View style={styles.iconCircle}>
                        <BadgeIcon color="#FFFFFF" size={42} />
                    </View>
                </View>

                {/* Title */}
                <Text style={[styles.title, dynamicStyles.title]}>Day Crowned</Text>

                {/* Date Pill */}
                <View style={[styles.datePill, dynamicStyles.datePill]}>
                    <View style={styles.dot} />
                    <Text style={styles.dateText}>April 15, 2026</Text>
                </View>

                {/* Body Text */}
                <Text style={[styles.bodyText, dynamicStyles.bodyText]}>
                    This day is now preserved in{"\n"}your life story forever.
                </Text>

                {/* Quote */}
                <Text style={[styles.quoteText, dynamicStyles.quoteText]}>
                    "Every documented day is a{"\n"}gift to your future self."
                </Text>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.primaryButton, dynamicStyles.primaryButton]}
                        activeOpacity={0.85}
                        onPress={() => navigation.navigate("EnhanceCrown")}
                    >
                        <Text style={[styles.primaryButtonText, dynamicStyles.primaryButtonText]}>Return to Today</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.secondaryButton, dynamicStyles.secondaryButton]}
                        activeOpacity={0.7}
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
    badgeContainer: {
        marginBottom: 28,
    },
    iconCircle: {
        width: 104,
        height: 104,
        borderRadius: 52,
        backgroundColor: yellow,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.35,
        shadowRadius: 28,
        elevation: 10,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        marginBottom: 28,
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
        fontSize: 13.5,
        fontWeight: '600',
    },
    bodyText: {
        fontSize: 19,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: 44,
    },
    quoteText: {
        fontSize: 14.5,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 52,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 14,
    },
    primaryButton: {
        width: '90%',
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    secondaryButton: {
        width: '90%',
        paddingVertical: 18,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    secondaryButtonText: {
        fontSize: 15,
        fontWeight: '500',
    },
});