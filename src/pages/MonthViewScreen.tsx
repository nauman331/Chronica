import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Fixed Colors for map states
import {
    white, // Keeping white for text inside the colored dots
    COLOR_CROWNED,
    COLOR_DOCUMENTED,
    COLOR_PAST,
    COLOR_FUTURE
} from '../utils/colors';

import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, SolidSparkleIcon } from '../utils/icons';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MonthViewScreen = ({ navigation, route }: any) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    const { year = 2026, month = 'April' } = route.params || {};

    const calendarDays = useMemo(() => {
        const days = [];
        for (let i = 0; i < 3; i++) days.push(null);

        for (let i = 1; i <= 31; i++) {
            let state = 'past';
            const documentedDays = [3, 4, 5, 7, 13, 14, 17, 20, 22, 25, 28];
            if (documentedDays.includes(i)) {
                state = 'documented';
            }
            days.push({ day: i, state });
        }
        return days;
    }, []);

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        iconButton: { backgroundColor: colors.surfaceMuted },
        headerTitle: { color: colors.text },
        headerSubtitle: { color: colors.textSecondary },
        todayButton: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary
        },
        todayButtonText: { color: colors.background }, // Inverts automatically

        calendarCard: {
            backgroundColor: colors.surface,
            borderColor: colors.border
        },
        dayHeaderText: { color: colors.textSecondary },

        statsCard: {
            backgroundColor: colors.surface,
            borderColor: colors.border
        },
        legendText: { color: colors.textSecondary },
        statLabel: { color: colors.textSecondary },

        bottomTabContainer: {
            backgroundColor: colors.background,
            borderTopColor: colors.border
        },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerControls}>
                    <Pressable style={[styles.iconButton, dynamicStyles.iconButton]} onPress={() => navigation?.goBack()}>
                        <ArrowLeftIcon color={colors.text} />
                    </Pressable>
                    <Pressable style={[styles.iconButton, dynamicStyles.iconButton]}>
                        <ChevronLeftIcon color={colors.text} />
                    </Pressable>
                </View>

                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{month} {year}</Text>
                    <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>31 days - 35% documented</Text>
                </View>

                <View style={styles.headerControlsRight}>
                    <Pressable style={[styles.iconButton, dynamicStyles.iconButton]}>
                        <ChevronRightIcon color={colors.text} />
                    </Pressable>
                    <Pressable style={[styles.todayButton, dynamicStyles.todayButton]} onPress={() => navigation.navigate("EnhanceCrown")}>
                        <Text style={[styles.todayButtonText, dynamicStyles.todayButtonText]}>Today</Text>
                        <SolidSparkleIcon color={colors.background} />
                    </Pressable>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                {/* Top Progress Line (Yellow line above text) */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                        <View style={[styles.progressFill, { width: '100%' }]} />
                    </View>
                    <Text style={styles.progressText}>100% through January</Text>
                </View>

                {/* Calendar Card */}
                <View style={[styles.calendarCard, dynamicStyles.calendarCard]}>
                    <View style={styles.daysHeader}>
                        {DAYS_OF_WEEK.map((day, i) => (
                            <View key={i} style={styles.dayCellContainer}>
                                <Text style={[styles.dayHeaderText, dynamicStyles.dayHeaderText]}>{day}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.calendarGrid}>
                        {calendarDays.map((item, index) => {
                            if (!item) {
                                return <View key={`empty-${index}`} style={styles.dayCellContainer} />;
                            }

                            // Keep these strict colors for consistency with LifeMap
                            let bgColor = COLOR_PAST;

                            // Text inside map dots is always white to contrast against the dark background colors
                            let textColor = white;

                            if (item.state === 'documented') bgColor = COLOR_DOCUMENTED;
                            if (item.state === 'crowned') bgColor = COLOR_CROWNED;

                            return (
                                <View key={index} style={styles.dayCellContainer}>
                                    <Pressable
                                        style={[styles.dayCell, { backgroundColor: bgColor }]}
                                        onPress={() => {
                                            let statusText = 'Not documented';
                                            if (item.state === 'documented') statusText = 'Documented';
                                            if (item.state === 'crowned') statusText = 'Crowned';
                                            navigation.navigate('DayDetail', {
                                                day: item.day,
                                                month: month,
                                                year: year,
                                                dayOfWeek: 'Monday',
                                                status: statusText
                                            });
                                        }}
                                    >
                                        <Text style={[styles.dayCellText, { color: textColor }]}>
                                            {item.day}
                                        </Text>
                                    </Pressable>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Stats Card */}
                <View style={[styles.statsCard, dynamicStyles.statsCard]}>
                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: COLOR_PAST }]} />
                            <Text style={[styles.legendText, dynamicStyles.legendText]}>Past</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: COLOR_DOCUMENTED }]} />
                            <Text style={[styles.legendText, dynamicStyles.legendText]}>Documented</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: COLOR_CROWNED }]} />
                            <Text style={[styles.legendText, dynamicStyles.legendText]}>Crowned</Text>
                        </View>
                    </View>

                    <View style={styles.statsNumbersRow}>
                        <View style={styles.statBox}>
                            <Text style={[styles.statLargeNum, { color: COLOR_DOCUMENTED }]}>11</Text>
                            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>documented</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={[styles.statLargeNum, { color: COLOR_CROWNED }]}>0</Text>
                            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>crowned</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={[styles.statLargeNum, { color: COLOR_PAST }]}>20</Text>
                            <Text style={[styles.statLabel, dynamicStyles.statLabel]}>remaining</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="map" />
            </View>
        </SafeAreaView>
    );
};

export default MonthViewScreen;

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
        paddingVertical: 12
    },
    headerControls: { flexDirection: 'row', gap: 8 },
    headerControlsRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    iconButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '700' },
    headerSubtitle: { fontSize: 12, marginTop: 2 },
    todayButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.22,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 2
    },
    todayButtonText: { fontSize: 13, fontWeight: '600' },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        paddingTop: 12,
    },
    progressContainer: {
        marginBottom: 24,
        alignItems: 'center'
    },
    progressBar: {
        width: '100%',
        height: 3,
        borderRadius: 1.5,
        marginBottom: 8
    },
    progressFill: {
        height: '100%',
        backgroundColor: COLOR_CROWNED,
        borderRadius: 1.5
    },
    progressText: {
        fontSize: 13,
        color: COLOR_CROWNED, // Keeping text yellow to match bar
        fontWeight: '500'
    },
    calendarCard: {
        borderRadius: 24,
        paddingVertical: 24,
        paddingHorizontal: 16,
        marginBottom: 24,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 3,
        borderWidth: 1,
    },
    daysHeader: {
        flexDirection: 'row',
        marginBottom: 16
    },
    dayHeaderText: {
        textAlign: 'center',
        fontSize: 12,
        fontWeight: '400'
    },
    calendarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dayCellContainer: {
        width: '14.28%',
        alignItems: 'center',
        marginBottom: 10
    },
    dayCell: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dayCellText: {
        fontSize: 14,
        fontWeight: '500'
    },
    statsCard: {
        borderRadius: 20,
        padding: 20,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 1,
        borderWidth: 1,
    },
    legendRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 16,
        marginBottom: 24
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4
    },
    legendText: {
        fontSize: 12,
        fontWeight: '500'
    },
    statsNumbersRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8
    },
    statBox: {
        alignItems: 'center',
    },
    statLargeNum: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 4
    },
    statLabel: {
        fontSize: 12,
        fontWeight: '400'
    },
    bottomTabContainer: {
        borderTopWidth: 1,
    },
});