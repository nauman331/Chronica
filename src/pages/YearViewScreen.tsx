import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator, DimensionValue } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import { useAppTheme } from '../hooks/useAppTheme';
import useFetch from '../hooks/useFetch';

import {
    COLOR_CROWNED,
    COLOR_DOCUMENTED,
    COLOR_PAST,
} from '../utils/colors';

import { ArrowLeftIcon, SolidSparkleIcon } from '../utils/icons';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DOT_SIZE = 9;
const CONTAINER_SIZE = 16;

const YearViewScreen = ({ navigation, route }: any) => {
    const { colors } = useAppTheme();
    const { year = new Date().getFullYear(), age = 31 } = route.params || {};

    const { data: apiData, loading } = useFetch(`life-days/?start_date=${year}-01-01&end_date=${year}-12-31`, { isAuth: true });

    const { monthsData, totalStats } = useMemo(() => {
        const rawEntries = Array.isArray(apiData) ? apiData : (apiData as any)?.results || [];
        const entriesMap: Record<string, any> = {};
        rawEntries.forEach((entry: any) => { entriesMap[entry.date] = entry; });

        const now = new Date();
        const todayStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;

        let totalDoc = 0;
        let totalCrowned = 0;
        let totalPastDays = 0;

        const months = Array.from({ length: 12 }).map((_, monthIndex) => {
            const formattedMonth = (monthIndex + 1).toString().padStart(2, '0');
            const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

            const dots = [];
            let monthDoc = 0;
            let monthCrowned = 0;
            let monthPastDays = 0;

            for (let d = 1; d <= daysInMonth; d++) {
                const dateStr = `${year}-${formattedMonth}-${d.toString().padStart(2, '0')}`;

                if (dateStr > todayStr) {
                    dots.push('future');
                } else {
                    monthPastDays++;
                    totalPastDays++;
                    if (entriesMap[dateStr]) {
                        if (entriesMap[dateStr].is_crowned) {
                            dots.push('crowned');
                            monthCrowned++;
                            totalCrowned++;
                        } else {
                            dots.push('documented');
                            monthDoc++;
                            totalDoc++;
                        }
                    } else {
                        dots.push('past');
                    }
                }
            }

            const monthProgress = monthPastDays > 0 ? Math.round(((monthDoc + monthCrowned) / monthPastDays) * 100) : 0;
            const progressColor = monthCrowned > 0 ? COLOR_CROWNED : COLOR_DOCUMENTED;

            return {
                name: MONTHS[monthIndex],
                fullName: new Date(year, monthIndex, 1).toLocaleString('default', { month: 'long' }),
                dots,
                progress: monthProgress,
                progressColor
            };
        });

        const overallProgress = totalPastDays > 0 ? Math.round(((totalDoc + totalCrowned) / totalPastDays) * 100) : 0;

        return {
            monthsData: months,
            totalStats: { doc: totalDoc, crowned: totalCrowned, percentage: overallProgress }
        };
    }, [apiData, year]);

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        iconButton: { backgroundColor: colors.surfaceMuted },
        headerTitle: { color: colors.text },
        headerSubtitle: { color: colors.textSecondary },
        todayButton: { backgroundColor: colors.primary, shadowColor: colors.primary },
        todayButtonText: { color: colors.background },
        summaryCard: { backgroundColor: colors.surface, borderColor: colors.border },
        summaryBarTrack: { backgroundColor: colors.border },
        summaryDateLabel: { color: colors.textSecondary },
        monthName: { color: colors.text },
        futureDot: { backgroundColor: colors.border },
        monthProgressBar: { backgroundColor: colors.border },
        monthProgressText: { color: colors.textSecondary },
        bottomTabContainer: { backgroundColor: colors.background, borderTopColor: colors.border },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.header}>
                <View style={styles.headerControls}>
                    <Pressable style={[styles.iconButton, dynamicStyles.iconButton]} onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon color={colors.text} />
                    </Pressable>
                </View>

                <View style={styles.headerTitleContainer}>
                    <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{year}</Text>
                    <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>Age {age}</Text>
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
                    {/* Summary Card */}
                    <View style={[styles.summaryCard, dynamicStyles.summaryCard]}>
                        <View style={styles.summaryStatsRow}>
                            <View style={styles.summaryStat}>
                                <Text style={[styles.statTitle, { color: COLOR_DOCUMENTED }]}>Documented</Text>
                                <Text style={[styles.statValue, { color: COLOR_DOCUMENTED }]}>{totalStats.doc}</Text>
                            </View>
                            <View style={styles.summaryStat}>
                                <Text style={[styles.statTitle, { color: COLOR_CROWNED }]}>Crowned</Text>
                                <Text style={[styles.statValue, { color: COLOR_CROWNED }]}>{totalStats.crowned}</Text>
                            </View>
                            <View style={styles.summaryStat}>
                                <Text style={[styles.statTitle, { color: COLOR_PAST }]}>Through year</Text>
                                <Text style={[styles.statValue, { color: COLOR_PAST }]}>{totalStats.percentage}%</Text>
                            </View>
                        </View>

                        <View style={styles.summaryProgressContainer}>
                            <View style={[styles.summaryBarTrack, dynamicStyles.summaryBarTrack]}>
                                <View style={[styles.summaryBarFill, { width: `${totalStats.percentage}%` as DimensionValue, backgroundColor: COLOR_CROWNED }]} />
                            </View>
                            <View style={styles.summaryLabelsContainer}>
                                <Text style={[styles.summaryDateLabel, dynamicStyles.summaryDateLabel]}>Jan {year}</Text>
                                <Text style={[styles.summaryDateLabel, dynamicStyles.summaryDateLabel]}>Dec {year}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.monthGrid}>
                        {monthsData.map((month, index) => (
                            <Pressable
                                key={index}
                                style={styles.monthCard}
                                onPress={() => navigation.navigate('MonthView', { year, month: month.fullName })}
                            >
                                <Text style={[styles.monthName, dynamicStyles.monthName]}>{month.name}</Text>

                                <View style={styles.dotGrid}>
                                    {month.dots.map((state, i) => (
                                        <View key={i} style={styles.dotContainer}>
                                            {state === 'crowned' && <View style={styles.crownedHalo} />}
                                            <View
                                                style={[
                                                    styles.dot,
                                                    state === 'crowned' && styles.crownedDot,
                                                    state === 'documented' && { backgroundColor: COLOR_DOCUMENTED },
                                                    state === 'past' && { backgroundColor: COLOR_PAST },
                                                    state === 'future' && dynamicStyles.futureDot
                                                ]}
                                            />
                                        </View>
                                    ))}
                                </View>

                                <View style={styles.monthProgressRow}>
                                    <View style={[styles.monthProgressBar, dynamicStyles.monthProgressBar]}>
                                        <View
                                            style={[
                                                styles.monthProgressFill,
                                                { width: `${month.progress}%` as DimensionValue, backgroundColor: month.progressColor }
                                            ]}
                                        />
                                    </View>
                                    <Text style={[styles.monthProgressText, dynamicStyles.monthProgressText]}>{month.progress}%</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                </ScrollView>
            )}

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="map" />
            </View>
        </SafeAreaView>
    );
};

export default YearViewScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 12 },
    headerControls: { flexDirection: 'row', gap: 8 },
    headerControlsRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    iconButton: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
    headerTitleContainer: { alignItems: 'center' },
    headerTitle: { fontSize: 16, fontWeight: '800' },
    headerSubtitle: { fontSize: 11, marginTop: 2 },
    todayButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 9, paddingHorizontal: 14, borderRadius: 20, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 12, elevation: 8, zIndex: 2 },
    todayButtonText: { fontSize: 13, fontWeight: '600' },
    scrollContent: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40 },
    summaryCard: { borderRadius: 16, padding: 24, marginBottom: 32, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 16, elevation: 3, borderWidth: 1 },
    summaryStatsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
    summaryStat: { alignItems: 'center' },
    statTitle: { fontSize: 12, fontWeight: '800', marginBottom: 6 },
    statValue: { fontSize: 14, fontWeight: '700' },
    summaryProgressContainer: { width: '100%', marginTop: 4 },
    summaryBarTrack: { height: 2, width: '100%', marginBottom: 10 },
    summaryBarFill: { height: '100%' },
    summaryLabelsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    summaryDateLabel: { fontSize: 10, fontWeight: '500' },
    monthGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    monthCard: { width: '46%', marginBottom: 36 },
    monthName: { fontSize: 18, fontWeight: '800', marginBottom: 14 },
    dotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 1.5, marginBottom: 14 },
    dotContainer: { width: CONTAINER_SIZE, height: CONTAINER_SIZE, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
    dot: { width: DOT_SIZE, height: DOT_SIZE, borderRadius: DOT_SIZE / 2, zIndex: 2 },
    crownedDot: { width: 11, height: 11, borderRadius: 5.5, backgroundColor: COLOR_CROWNED, shadowColor: COLOR_CROWNED, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 12, elevation: 10 },
    crownedHalo: { position: 'absolute', width: 20, height: 20, borderRadius: 14, backgroundColor: COLOR_CROWNED, opacity: 0.1, zIndex: 1 },
    monthProgressRow: { flexDirection: 'row', alignItems: 'center' },
    monthProgressBar: { flex: 1, height: 2, borderRadius: 1 },
    monthProgressFill: { height: '100%', borderRadius: 1 },
    monthProgressText: { fontSize: 9, fontWeight: '600', marginLeft: 8, width: 22 },
    bottomTabContainer: { justifyContent: 'flex-end', borderTopWidth: 1 },
});