import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import BottomTabBar from '../components/BottomTabBar';
import { ArrowLeftIcon } from '../utils/icons';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

const SparkleIcon = ({ color }: { color: string }) => (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        {/* Main 4-pointed outlined star */}
        <Path
            d="M12 3C12 8.5 16.5 12 21 12C16.5 12 12 15.5 12 21C12 15.5 7.5 12 3 12C7.5 12 12 8.5 12 3Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Top right small solid star */}
        <Path
            d="M19 4C19 5.5 20.5 6 22 6C20.5 6 19 6.5 19 8C19 6.5 17.5 6 16 6C17.5 6 19 5.5 19 4Z"
            fill={color}
        />
        {/* Bottom left dot */}
        <Circle cx="6.5" cy="17.5" r="1.5" fill={color} />
    </Svg>
);

const DayDetailScreen = ({ navigation, route }: any) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    const {
        day = 15,
        month = 'April',
        year = 2026,
        dayOfWeek = 'Monday',
        status = 'Not documented'
    } = route?.params || {};

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        header: { borderBottomColor: colors.border },
        backButton: { borderColor: colors.border },
        headerTitle: { color: colors.text },
        headerSubtitle: { color: colors.textSecondary },
        statusBadge: { backgroundColor: colors.surfaceMuted },
        statusBadgeText: { color: colors.textSecondary },
        card: {
            backgroundColor: colors.surface,
            borderColor: colors.border
        },
        iconBackground: { backgroundColor: colors.surfaceMuted },
        cardTitle: { color: colors.text },
        cardDescription: { color: colors.textSecondary },
        documentButton: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
        },
        documentButtonText: {
            color: colors.background // Inverts automatically: white on dark btn, dark on white btn
        },
        bottomTabContainer: {
            borderTopColor: colors.border,
            backgroundColor: colors.background
        }
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>

            {/* Header */}
            <View style={[styles.header, dynamicStyles.header]}>
                <View style={styles.headerLeft}>
                    <Pressable style={[styles.backButton, dynamicStyles.backButton]} onPress={() => navigation?.goBack()}>
                        <ArrowLeftIcon color={colors.text} />
                    </Pressable>
                    <View style={styles.headerTitles}>
                        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{month} {day}, {year}</Text>
                        <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>{dayOfWeek}</Text>
                    </View>
                </View>

                <View style={[styles.statusBadge, dynamicStyles.statusBadge]}>
                    <Text style={[styles.statusBadgeText, dynamicStyles.statusBadgeText]}>{status}</Text>
                </View>
            </View>

            {/* Main Content Area */}
            <View style={styles.content}>

                {/* Undocumented Card */}
                <View style={[styles.card, dynamicStyles.card]}>
                    <View style={styles.iconWrapper}>
                        <View style={[styles.iconBackground, dynamicStyles.iconBackground]}>
                            <SparkleIcon color={colors.accent} />
                        </View>
                    </View>

                    <Text style={[styles.cardTitle, dynamicStyles.cardTitle]}>Undocumented</Text>
                    <Text style={[styles.cardDescription, dynamicStyles.cardDescription]}>
                        This day has not been recorded yet.{'\n'}
                        Document it so it's never forgotten.
                    </Text>
                </View>

                {/* Call to Action Button */}
                <Pressable
                    style={[styles.documentButton, dynamicStyles.documentButton]}
                    onPress={() => navigation.navigate('DocumentDay', {
                        day: day,
                        month: month,
                        year: year,
                        dayOfWeek: dayOfWeek,
                        status: status
                    })}
                >
                    <Text style={[styles.documentButtonText, dynamicStyles.documentButtonText]}>Document this day</Text>
                </Pressable>

            </View>

            {/* Bottom Tab Bar */}
            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="map" />
            </View>

        </SafeAreaView>
    );
};

export default DayDetailScreen;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitles: {
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    headerSubtitle: {
        fontSize: 13,
        marginTop: 2
    },
    statusBadge: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16
    },
    statusBadgeText: {
        fontSize: 12,
        fontWeight: '500'
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    card: {
        borderRadius: 24,
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
    },
    iconWrapper: {
        marginBottom: 20
    },
    iconBackground: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 12
    },
    cardDescription: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '400'
    },
    documentButton: {
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    documentButtonText: {
        fontSize: 16,
        fontWeight: '600'
    },
    bottomTabContainer: {
        borderTopWidth: 1,
    },
});