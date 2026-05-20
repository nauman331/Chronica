import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import BottomTabBar from '../components/BottomTabBar';
import {
    white,
    blue,
    COLOR_CROWNED,
    COLOR_TEXT_MUTED,
    COLOR_DOCUMENTED,
    COLOR_PAST,
    COLOR_FUTURE,
    COLOR_TEXT_MAIN
} from '../utils/colors';

import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, SolidSparkleIcon } from '../utils/icons';


const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DOT_SIZE = 9;
const HALO_SIZE = 16;

const generateMonthData = (monthIndex: number) => {
    const dots = Array.from({ length: 15 }).map((_, i) => {
        const rand = Math.random();
        if (monthIndex > 8 && i > 8) return 'future';
        if (rand > 0.92) return 'crowned';
        if (rand > 0.5) return 'documented';
        return 'past';
    });

    let crownedCount = 0;
    const finalizedDots = dots.map(d => {
        if (d === 'crowned') {
            crownedCount++;
            if (crownedCount > 1) return 'documented';
        }
        return d;
    });

    const isGoldProgress = [1, 2, 3, 4, 5, 6, 7, 9, 11].includes(monthIndex);

    return {
        name: MONTHS[monthIndex],
        dots: finalizedDots,
        progress: Math.floor(Math.random() * 40) + 20,
        progressColor: isGoldProgress ? COLOR_CROWNED : COLOR_DOCUMENTED
    };
};

const YearViewScreen = ({ navigation, route }: any) => {
    const { year = 2026, age = 31 } = route.params || {};
    const monthsData = useMemo(() => Array.from({ length: 12 }).map((_, i) => generateMonthData(i)), []);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerControls}>
                    <Pressable style={styles.iconButton} onPress={() => navigation.goBack()}>
                        <ArrowLeftIcon color={COLOR_TEXT_MAIN} />
                    </Pressable>
                    <Pressable style={styles.iconButton}>
                        <ChevronLeftIcon color={COLOR_TEXT_MAIN} />
                    </Pressable>
                </View>

                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>{year}</Text>
                    <Text style={styles.headerSubtitle}>Age {age}</Text>
                </View>

                <View style={styles.headerControlsRight}>
                    <Pressable style={styles.iconButton}>
                        <ChevronRightIcon color={COLOR_TEXT_MAIN} />
                    </Pressable>
                    <Pressable style={styles.todayButton} onPress={() => navigation.navigate("EnhanceCrown")}>
                        <Text style={styles.todayButtonText}>Today</Text>
                        <SolidSparkleIcon color={white} />
                    </Pressable>
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
                        <View style={styles.summaryBarTrack}>
                            <View style={[styles.summaryBarFill, { width: '55%', backgroundColor: COLOR_CROWNED }]} />
                        </View>
                        <View style={styles.summaryLabelsContainer}>
                            <Text style={styles.summaryDateLabel}>Jan {year - 1}</Text>
                            <Text style={styles.summaryDateLabel}>Dec {year - 1}</Text>
                        </View>
                    </View>
                </View>

                {/* Month Grid */}
                <View style={styles.monthGrid}>
                    {monthsData.map((month, index) => (
                        <Pressable
                            key={index}
                            style={styles.monthCard}
                            onPress={() => navigation.navigate('MonthView', { year, month: month.name })}
                        >
                            <Text style={styles.monthName}>{month.name}</Text>

                            <View style={styles.dotGrid}>
                                {month.dots.map((state, i) => (
                                    <View key={i} style={styles.dotContainer}>
                                        {state === 'crowned' && <View style={[styles.halo, { backgroundColor: COLOR_CROWNED, opacity: 0.25 }]} />}
                                        <View
                                            style={[
                                                styles.dot,
                                                state === 'crowned' && { backgroundColor: COLOR_CROWNED },
                                                state === 'documented' && { backgroundColor: COLOR_DOCUMENTED },
                                                state === 'past' && { backgroundColor: COLOR_PAST },
                                                state === 'future' && { backgroundColor: COLOR_FUTURE }
                                            ]}
                                        />
                                    </View>
                                ))}
                            </View>

                            <View style={styles.monthProgressRow}>
                                <View style={styles.monthProgressBar}>
                                    <View
                                        style={[
                                            styles.monthProgressFill,
                                            { width: `${month.progress}%`, backgroundColor: month.progressColor }
                                        ]}
                                    />
                                </View>
                                <Text style={styles.monthProgressText}>{month.progress}%</Text>
                            </View>
                        </Pressable>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.bottomTabContainer}>
                <BottomTabBar activeTab="map" />
            </View>
        </SafeAreaView>
    );
};

export default YearViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 12
    },
    headerControls: {
        flexDirection: 'row',
        gap: 8
    },
    headerControlsRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    iconButton: {
        width: 34,
        height: 34,
        borderRadius: 17,
        backgroundColor: COLOR_FUTURE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitleContainer: {
        alignItems: 'center'
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLOR_TEXT_MAIN
    },
    headerSubtitle: {
        fontSize: 11,
        color: COLOR_TEXT_MUTED,
        marginTop: 2
    },
    todayButton: {
        backgroundColor: blue,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 9,
        paddingHorizontal: 14,
        borderRadius: 20
    },
    todayButtonText: {
        color: white,
        fontSize: 13,
        fontWeight: '600'
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 16,
        paddingBottom: 40
    },
    summaryCard: {
        backgroundColor: white,
        borderRadius: 16,
        padding: 24,
        marginBottom: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 16,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#F6F6F6'
    },
    summaryStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    summaryStat: {
        alignItems: 'center'
    },
    statTitle: {
        fontSize: 12,
        fontWeight: '600',
        marginBottom: 6
    },
    statValue: {
        fontSize: 14,
        fontWeight: '700'
    },
    summaryProgressContainer: {
        width: '100%',
        marginTop: 4
    },
    summaryBarTrack: {
        height: 2,
        backgroundColor: COLOR_FUTURE,
        width: '100%',
        marginBottom: 10
    },
    summaryBarFill: {
        height: '100%'
    },
    summaryLabelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    summaryDateLabel: {
        fontSize: 10,
        color: COLOR_TEXT_MUTED,
        fontWeight: '500'
    },
    // Month Grid Styles
    monthGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    monthCard: {
        width: '46%',
        marginBottom: 36
    },
    monthName: {
        fontSize: 18,
        fontWeight: '800',
        color: COLOR_TEXT_MAIN,
        marginBottom: 14
    },
    // Dot Grid System
    dotGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 1.5,
        marginBottom: 14
    },
    dotContainer: {
        width: HALO_SIZE,
        height: HALO_SIZE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        zIndex: 2
    },
    halo: {
        position: 'absolute',
        width: HALO_SIZE,
        height: HALO_SIZE,
        borderRadius: HALO_SIZE / 2,
        zIndex: 1
    },
    // Month Progress Bar
    monthProgressRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    monthProgressBar: {
        flex: 1,
        height: 2,
        backgroundColor: COLOR_FUTURE,
        borderRadius: 1
    },
    monthProgressFill: {
        height: '100%',
        borderRadius: 1
    },
    monthProgressText: {
        fontSize: 9,
        color: COLOR_TEXT_MUTED,
        fontWeight: '600',
        marginLeft: 8,
        width: 22
    },
    // Footer
    bottomTabContainer: {
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: COLOR_FUTURE,
        backgroundColor: white
    },
});