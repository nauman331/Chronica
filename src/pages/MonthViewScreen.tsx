import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

// --- Colors ---
const COLOR_PAST = '#5A6170'; // Slightly darker gray for text contrast
const COLOR_DOCUMENTED = '#8CB9FF';
const COLOR_CROWNED = '#E4BA2E';
const COLOR_FUTURE = '#EBEBEB';
const COLOR_TEXT_MAIN = '#111111';
const COLOR_TEXT_MUTED = '#8A8F99';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Mock Calendar Generator (April 2026 Layout)
const generateCalendar = () => {
    const days = [];
    // 3 empty days for offset (starts on Wed)
    for (let i = 0; i < 3; i++) days.push(null);
    for (let i = 1; i <= 31; i++) {
        let state = 'past';
        if (i > 25) state = 'future';
        else if (i % 7 === 0 || i % 4 === 0) state = 'documented';
        days.push({ day: i, state });
    }
    return days;
};

const MonthViewScreen = () => {
    const calendarDays = generateCalendar();

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerControls}>
                    <Pressable style={styles.iconButton}><Text style={styles.iconText}>←</Text></Pressable>
                    <Pressable style={styles.iconButton}><Text style={styles.iconText}>‹</Text></Pressable>
                </View>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>April 2026</Text>
                    <Text style={styles.headerSubtitle}>31 days - 35% documented</Text>
                </View>
                <View style={styles.headerControlsRight}>
                    <Pressable style={styles.iconButton}><Text style={styles.iconText}>›</Text></Pressable>
                    <Pressable style={styles.todayButton}><Text style={styles.todayButtonText}>Today ✦</Text></Pressable>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Top Progress */}
                <View style={styles.topProgressContainer}>
                    <View style={styles.topProgressBar}><View style={[styles.topProgressFill, { width: '100%' }]} /></View>
                    <Text style={styles.topProgressText}>100% through April</Text>
                </View>

                {/* Calendar Card */}
                <View style={styles.calendarCard}>
                    <View style={styles.daysHeader}>
                        {DAYS_OF_WEEK.map(day => (
                            <Text key={day} style={styles.dayHeaderText}>{day}</Text>
                        ))}
                    </View>
                    <View style={styles.calendarGrid}>
                        {calendarDays.map((item, index) => {
                            if (!item) return <View key={`empty-${index}`} style={styles.dayCell} />;

                            let bgColor = COLOR_FUTURE;
                            let textColor = COLOR_TEXT_MAIN;

                            if (item.state === 'past') { bgColor = COLOR_PAST; textColor = '#FFFFFF'; }
                            if (item.state === 'documented') { bgColor = COLOR_DOCUMENTED; textColor = '#FFFFFF'; }
                            if (item.state === 'crowned') { bgColor = COLOR_CROWNED; textColor = '#FFFFFF'; }

                            return (
                                <View key={index} style={[styles.dayCell, { backgroundColor: bgColor }]}>
                                    <Text style={[styles.dayCellText, { color: textColor }]}>{item.day}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsSection}>
                    <View style={styles.legendRow}>
                        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_PAST }]} /><Text style={styles.legendText}>Past</Text></View>
                        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_DOCUMENTED }]} /><Text style={styles.legendText}>Documented</Text></View>
                        <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_CROWNED }]} /><Text style={styles.legendText}>Crowned</Text></View>
                    </View>

                    <View style={styles.statsNumbersRow}>
                        <View style={styles.statBox}>
                            <Text style={[styles.statLargeNum, { color: COLOR_DOCUMENTED }]}>11</Text>
                            <Text style={styles.statLabel}>documented</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={[styles.statLargeNum, { color: COLOR_CROWNED }]}>0</Text>
                            <Text style={styles.statLabel}>crowned</Text>
                        </View>
                        <View style={styles.statBox}>
                            <Text style={[styles.statLargeNum, { color: COLOR_TEXT_MAIN }]}>20</Text>
                            <Text style={styles.statLabel}>remaining</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomTabContainer}>
                <BottomTabBar activeTab="today" />
            </View>
        </SafeAreaView>
    );
};

export default MonthViewScreen;

// --- Styles for Month View ---
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
    topProgressContainer: { alignItems: 'center', marginVertical: 16 },
    topProgressBar: { width: '100%', height: 4, backgroundColor: '#F3F3F3', borderRadius: 2, marginBottom: 8 },
    topProgressFill: { height: '100%', backgroundColor: COLOR_CROWNED, borderRadius: 2 },
    topProgressText: { fontSize: 12, color: COLOR_CROWNED, fontWeight: '500' },
    calendarCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, marginBottom: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.06, shadowRadius: 16, elevation: 3, borderWidth: 1, borderColor: '#F0F0F0' },
    daysHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
    dayHeaderText: { width: 36, textAlign: 'center', fontSize: 12, color: COLOR_TEXT_MUTED, fontWeight: '500' },
    calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', gap: 10 },
    dayCell: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
    dayCellText: { fontSize: 14, fontWeight: '600' },
    statsSection: { paddingHorizontal: 10 },
    legendRow: { flexDirection: 'row', justifyContent: 'flex-start', gap: 16, marginBottom: 24 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { fontSize: 12, color: COLOR_TEXT_MUTED, fontWeight: '500' },
    statsNumbersRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 },
    statBox: { alignItems: 'center' },
    statLargeNum: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
    statLabel: { fontSize: 12, color: COLOR_TEXT_MUTED },
    bottomTabContainer: { justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#F4F4F4' },
});