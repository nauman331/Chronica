import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import { useAppTheme } from '../hooks/useAppTheme';
import useFetch from '../hooks/useFetch';

import {
    white,
    COLOR_CROWNED,
    COLOR_DOCUMENTED,
    COLOR_PAST,
} from '../utils/colors';

import { ArrowLeftIcon, SolidSparkleIcon } from '../utils/icons';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const MonthViewScreen = ({ navigation, route }: any) => {
    const { colors } = useAppTheme();
    const { year = new Date().getFullYear(), month = MONTHS[new Date().getMonth()] } = route.params || {};

    const monthNum = MONTHS.indexOf(month) + 1;
    const formattedMonth = monthNum.toString().padStart(2, '0');
    const lastDay = new Date(year, monthNum, 0).getDate();

    const { data: apiData, loading } = useFetch(
        `life-days/?start_date=${year}-${formattedMonth}-01&end_date=${year}-${formattedMonth}-${lastDay}`,
        { isAuth: true }
    );

    const { calendarDays, stats } = useMemo(() => {
        const days = [];
        const firstDayOfWeek = new Date(year, monthNum - 1, 1).getDay();

        for (let i = 0; i < firstDayOfWeek; i++) days.push(null);

        const rawEntries = Array.isArray(apiData) ? apiData : (apiData as any)?.results || [];
        const entriesMap: Record<string, any> = {};
        rawEntries.forEach((entry: any) => { entriesMap[entry.date] = entry; });

        const now = new Date();
        const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

        let documentedCount = 0;
        let crownedCount = 0;

        for (let i = 1; i <= lastDay; i++) {
            const dateStr = `${year}-${formattedMonth}-${i.toString().padStart(2, '0')}`;
            let state = 'past';

            if (dateStr > todayStr) {
                state = 'future';
            } else if (entriesMap[dateStr]) {
                if (entriesMap[dateStr].is_crowned) {
                    state = 'crowned';
                    crownedCount++;
                } else {
                    state = 'documented';
                    documentedCount++;
                }
            }
            days.push({ day: i, state, dateStr });
        }
        let pastDays = 0;
        const nowYear = now.getFullYear();
        const nowMonth = now.getMonth() + 1;

        if (year < nowYear || (year === nowYear && monthNum < nowMonth)) {
            pastDays = lastDay;
        } else if (year === nowYear && monthNum === nowMonth) {
            pastDays = now.getDate();
        } else {
            pastDays = 0;
        }

        const totalDocumented = documentedCount + crownedCount;
        const remaining = Math.max(0, pastDays - totalDocumented);
        const percentage = pastDays === 0 ? 0 : Math.round((totalDocumented / pastDays) * 100);

        return {
            calendarDays: days,
            stats: { documented: documentedCount, crowned: crownedCount, remaining, percentage }
        };
    }, [apiData, year, monthNum, formattedMonth, lastDay]);

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        iconButton: { backgroundColor: colors.surfaceMuted },
        headerTitle: { color: colors.text },
        headerSubtitle: { color: colors.textSecondary },
        todayButton: { backgroundColor: colors.primary, shadowColor: colors.primary },
        todayButtonText: { color: colors.background },
        calendarCard: { backgroundColor: colors.surface, borderColor: colors.border },
        dayHeaderText: { color: colors.textSecondary },
        statsCard: { backgroundColor: colors.surface, borderColor: colors.border },
        legendText: { color: colors.textSecondary },
        statLabel: { color: colors.textSecondary },
        bottomTabContainer: { backgroundColor: colors.background, borderTopColor: colors.border },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.header}>
                <View style={styles.headerControls}>
                    <Pressable style={[styles.iconButton, dynamicStyles.iconButton]} onPress={() => navigation?.goBack()}>
                        <ArrowLeftIcon color={colors.text} />
                    </Pressable>
                </View>

                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, dynamicStyles.headerTitle]} numberOfLines={1}>{month} {year}</Text>
                    <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>{lastDay} days - {stats.percentage}% documented</Text>
                </View>

                <View style={styles.headerControlsRight}>
                    <Pressable style={[styles.todayButton, dynamicStyles.todayButton]} onPress={() => navigation.navigate("EnhanceCrown")}>
                        <Text style={[styles.todayButtonText, dynamicStyles.todayButtonText]}>Today</Text>
                        <SolidSparkleIcon color={colors.background} />
                    </Pressable>
                </View>
            </View>

            {loading ? (
                <ActivityIndicator style={{ flex: 1 }} color={colors.primary} />
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.progressContainer}>
                        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
                            <View style={[styles.progressFill, { width: `${stats.percentage}%` }]} />
                        </View>
                        <Text style={styles.progressText}>{stats.percentage}% through {month}</Text>
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
                                if (!item) return <View key={`empty-${index}`} style={styles.dayCellContainer} />;

                                let bgColor = COLOR_PAST;
                                let textColor = white;

                                if (item.state === 'documented') bgColor = COLOR_DOCUMENTED;
                                if (item.state === 'crowned') bgColor = COLOR_CROWNED;
                                if (item.state === 'future') {
                                    bgColor = 'transparent';
                                    textColor = colors.textSecondary;
                                }

                                return (
                                    <View key={index} style={styles.dayCellContainer}>
                                        <Pressable
                                            style={[styles.dayCell, { backgroundColor: bgColor }]}
                                            onPress={() => {
                                                if (item.state === 'future') return;
                                                let statusText = 'Not documented';
                                                if (item.state === 'documented') statusText = 'Documented';
                                                if (item.state === 'crowned') statusText = 'Crowned';

                                                navigation.navigate('DayDetail', {
                                                    day: item.day, month, year,
                                                    dayOfWeek: DAYS_OF_WEEK[new Date(year, monthNum - 1, item.day).getDay()],
                                                    status: statusText,
                                                    dateStr: item.dateStr
                                                });
                                            }}
                                        >
                                            <Text style={[styles.dayCellText, { color: textColor }]}>{item.day}</Text>
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
                                <Text style={[styles.statLargeNum, { color: COLOR_DOCUMENTED }]}>{stats.documented}</Text>
                                <Text style={[styles.statLabel, dynamicStyles.statLabel]}>documented</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={[styles.statLargeNum, { color: COLOR_CROWNED }]}>{stats.crowned}</Text>
                                <Text style={[styles.statLabel, dynamicStyles.statLabel]}>crowned</Text>
                            </View>
                            <View style={styles.statBox}>
                                <Text style={[styles.statLargeNum, { color: COLOR_PAST }]}>{stats.remaining}</Text>
                                <Text style={[styles.statLabel, dynamicStyles.statLabel]}>remaining</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )}

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="map" />
            </View>
        </SafeAreaView>
    );
};

export default MonthViewScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
    headerControls: { flexDirection: 'row', gap: 8, flexShrink: 0 },
    headerControlsRight: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 0 },
    iconButton: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
    headerTitleContainer: { alignItems: 'center', flex: 1, minWidth: 0, paddingHorizontal: 8 },
    headerTitle: { fontSize: 18, fontWeight: '700', textAlign: 'center' },
    headerSubtitle: { fontSize: 9, marginTop: 2 },
    todayButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 9, paddingHorizontal: 14, borderRadius: 20, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 12, elevation: 8, zIndex: 2, flexShrink: 0 },
    todayButtonText: { fontSize: 13, fontWeight: '600' },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 12 },
    progressContainer: { marginBottom: 24, alignItems: 'center' },
    progressBar: { width: '100%', height: 3, borderRadius: 1.5, marginBottom: 8 },
    progressFill: { height: '100%', backgroundColor: COLOR_CROWNED, borderRadius: 1.5 },
    progressText: { fontSize: 13, color: COLOR_CROWNED, fontWeight: '500' },
    calendarCard: { borderRadius: 24, paddingVertical: 24, paddingHorizontal: 16, marginBottom: 24, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.05, shadowRadius: 15, elevation: 3, borderWidth: 1 },
    daysHeader: { flexDirection: 'row', marginBottom: 16 },
    dayHeaderText: { textAlign: 'center', fontSize: 12, fontWeight: '400' },
    calendarGrid: { flexDirection: 'row', flexWrap: 'wrap' },
    dayCellContainer: { width: '14.28%', alignItems: 'center', marginBottom: 10 },
    dayCell: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    dayCellText: { fontSize: 14, fontWeight: '500' },
    statsCard: { borderRadius: 20, padding: 20, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 1, borderWidth: 1 },
    legendRow: { flexDirection: 'row', justifyContent: 'flex-start', gap: 16, marginBottom: 24 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { fontSize: 12, fontWeight: '500' },
    statsNumbersRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 8 },
    statBox: { alignItems: 'center' },
    statLargeNum: { fontSize: 28, fontWeight: '700', marginBottom: 4 },
    statLabel: { fontSize: 12, fontWeight: '400' },
    bottomTabContainer: { borderTopWidth: 1 },
});