import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable, Dimensions } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

const { width } = Dimensions.get('window');

// --- Colors ---
const COLOR_PAST = '#7A818C';
const COLOR_DOCUMENTED = '#8CB9FF';
const COLOR_CROWNED = '#E4BA2E';
const COLOR_FUTURE = '#EBEBEB';
const COLOR_TEXT_MAIN = '#111111';
const COLOR_TEXT_MUTED = '#8A8F99';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Mock Data Generator for Months
const generateMonthData = (monthIndex: number) => {
    const daysInMonth = 30; // Simplified for UI mockup
    const dots = Array.from({ length: daysInMonth }).map((_, i) => {
        const rand = Math.random();
        if (monthIndex > 5) return 'future'; // Future months
        if (rand > 0.9) return 'crowned';
        if (rand > 0.6) return 'documented';
        return 'past';
    });
    return { name: MONTHS[monthIndex], dots, progress: Math.floor(Math.random() * 60) + 20 };
};

const YearViewScreen = () => {
    const monthsData = useMemo(() => Array.from({ length: 12 }).map((_, i) => generateMonthData(i)), []);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerControls}>
                    <Pressable style={styles.iconButton}><Text style={styles.iconText}>←</Text></Pressable>
                    <Pressable style={styles.iconButton}><Text style={styles.iconText}>‹</Text></Pressable>
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>2026</Text>
                    <Text style={styles.headerSubtitle}>Age 31</Text>
                </View>
                <View style={styles.headerControlsRight}>
                    <Pressable style={styles.iconButton}><Text style={styles.iconText}>›</Text></Pressable>
                    <Pressable style={styles.todayButton}><Text style={styles.todayButtonText}>Today ✦</Text></Pressable>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryStatsRow}>
                        <View style={styles.summaryStat}>
                            <Text style={[styles.statTitle, { color: COLOR_DOCUMENTED }]}>Documented</Text>
                            <Text style={[styles.statValue, { color: COLOR_DOCUMENTED }]}>109</Text>
                        </View>
                        <View style={styles.summaryStat}>
                            <Text style={[styles.statTitle, { color: COLOR_CROWNED }]}>Crowned</Text>
                            <Text style={[styles.statValue, { color: COLOR_CROWNED }]}>17</Text>
                        </View>
                        <View style={styles.summaryStat}>
                            <Text style={[styles.statTitle, { color: COLOR_PAST }]}>Through year</Text>
                            <Text style={[styles.statValue, { color: COLOR_PAST }]}>100%</Text>
                        </View>
                    </View>
                    <View style={styles.summaryProgressContainer}>
                        <View style={styles.summaryProgressBar}><View style={[styles.summaryProgressFill, { width: '40%' }]} /></View>
                        <View style={styles.summaryProgressLabels}>
                            <Text style={styles.progressLabel}>Jan 2026</Text>
                            <Text style={styles.progressLabel}>Dec 2026</Text>
                        </View>
                    </View>
                </View>

                {/* Month Grid */}
                <View style={styles.monthGrid}>
                    {monthsData.map((month, index) => (
                        <View key={index} style={styles.monthCard}>
                            <Text style={styles.monthName}>{month.name}</Text>
                            <View style={styles.dotGrid}>
                                {month.dots.map((state, i) => (
                                    <View key={i} style={[
                                        styles.dot,
                                        state === 'crowned' && { backgroundColor: COLOR_CROWNED },
                                        state === 'documented' && { backgroundColor: COLOR_DOCUMENTED },
                                        state === 'past' && { backgroundColor: COLOR_PAST },
                                        state === 'future' && { backgroundColor: COLOR_FUTURE }
                                    ]} />
                                ))}
                            </View>
                            <View style={styles.monthProgressRow}>
                                <View style={styles.monthProgressBar}>
                                    <View style={[styles.monthProgressFill, { width: `${month.progress}%`, backgroundColor: index % 2 === 0 ? COLOR_DOCUMENTED : COLOR_CROWNED }]} />
                                </View>
                                <Text style={styles.monthProgressText}>{month.progress}%</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.bottomTabContainer}>
                <BottomTabBar activeTab="today" />
            </View>
        </SafeAreaView>
    );
};

export default YearViewScreen;

// --- Styles for Year View ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
    headerControls: { flexDirection: 'row', gap: 8 },
    headerControlsRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    iconButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F4F4F4', alignItems: 'center', justifyContent: 'center' },
    iconText: { fontSize: 18, color: COLOR_TEXT_MAIN },
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLOR_TEXT_MAIN },
    headerSubtitle: { fontSize: 12, color: COLOR_TEXT_MUTED },
    todayButton: { backgroundColor: '#191528', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20 },
    todayButtonText: { color: '#FFFFFF', fontSize: 12, fontWeight: '600' },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 40 },
    summaryCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2, borderWidth: 1, borderColor: '#F0F0F0' },
    summaryStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
    summaryStat: { alignItems: 'center' },
    statTitle: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
    statValue: { fontSize: 16, fontWeight: 'bold' },
    summaryProgressContainer: { width: '100%' },
    summaryProgressBar: { height: 4, backgroundColor: '#F3F3F3', borderRadius: 2, marginBottom: 8 },
    summaryProgressFill: { height: '100%', backgroundColor: COLOR_CROWNED, borderRadius: 2 },
    summaryProgressLabels: { flexDirection: 'row', justifyContent: 'space-between' },
    progressLabel: { fontSize: 10, color: COLOR_TEXT_MUTED },
    monthGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    monthCard: { width: '48%', marginBottom: 32 },
    monthName: { fontSize: 20, fontWeight: 'bold', color: COLOR_TEXT_MAIN, marginBottom: 12 },
    dotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 12 },
    dot: { width: 6, height: 6, borderRadius: 3 },
    monthProgressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    monthProgressBar: { flex: 1, height: 3, backgroundColor: '#F3F3F3', borderRadius: 1.5 },
    monthProgressFill: { height: '100%', borderRadius: 1.5 },
    monthProgressText: { fontSize: 10, color: COLOR_TEXT_MUTED, fontWeight: '500', width: 24 },
    bottomTabContainer: { justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#F4F4F4' },
});