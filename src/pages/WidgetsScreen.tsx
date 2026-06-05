import React, { useState, useEffect, useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Platform,
    Pressable,
    ActivityIndicator
} from 'react-native';

import { useAppTheme } from '../hooks/useAppTheme';
import useFetch from '../hooks/useFetch';
import { yellow, white, lightyellow, COLOR_CROWNED } from '../utils/colors';

import {
    ArrowLeftIcon,
    ArrowRightSmallIcon,
    DashedCircleIcon,
    ProgressRingIcon,
    DotPatternIcon,
    BadgeIcon,
} from '../utils/icons';

import BottomTabBar from '../components/BottomTabBar';
import Svg, { Path } from 'react-native-svg';

const MiniCheckIcon = ({ color = yellow }: { color?: string }) => (
    <Svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const WidgetsScreen = ({ navigation }: any) => {
    const { colors, isDark } = useAppTheme();
    const [todayState, setTodayState] = useState<'empty' | 'progress' | 'crowned'>('empty');

    // --- API Calls (Fetching concurrently) ---
    const { data: todayData, loading: loadToday } = useFetch('widgets/today', { isAuth: true });
    const { data: progressData, loading: loadProgress } = useFetch('widgets/life-progress', { isAuth: true });
    const { data: streakData, loading: loadStreak } = useFetch('widgets/streak', { isAuth: true });
    const { data: lifeMapData, loading: loadMap } = useFetch('life-map/', { isAuth: true });

    const isLoading = loadToday || loadProgress || loadStreak || loadMap;

    // --- Dynamic Formatting ---
    const now = new Date();
    const todayStr = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    // Sync the Today toggle with real API data on load
    useEffect(() => {
        if (todayData) {
            const status = (todayData as any).status;
            if (status === 'crowned') setTodayState('crowned');
            else if (status === 'documented' || status === 'progress') setTodayState('progress');
            else setTodayState('empty');
        }
    }, [todayData]);

    // Build the dynamic 7-day rolling week blocks for the Streak widget
    const dynamicWeekData = useMemo(() => {
        const days = [];
        const statesMap = (lifeMapData as any)?.states || {};
        const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        // Go backwards 7 days to end exactly on today
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(now.getDate() - i);
            const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

            const dayState = statesMap[dateStr];
            const isCrowned = dayState === 'crowned';

            days.push({
                day: dayNames[d.getDay()],
                crowned: isCrowned,
                isToday: i === 0 // Mark the last item as today
            });
        }
        return days;
    }, [lifeMapData]);

    const safeProgress = (progressData as any) || {};
    const safeStreak = (streakData as any) || {};
    const safeLifeMap = (lifeMapData as any) || {};

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        textMain: { color: colors.text },
        textSecondary: { color: '#8C8B9C' },
        card: {
            backgroundColor: isDark ? colors.surface : '#FFFFFF',
            borderColor: isDark ? colors.border : '#F3EFE6',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: isDark ? 0 : 0.05,
            shadowRadius: 24,
            elevation: isDark ? 0 : 4,
        },
        toggleContainer: { backgroundColor: isDark ? colors.surfaceMuted : '#FAFAFA', borderColor: isDark ? colors.border : '#F3EFE6', borderWidth: 1 },
        toggleActive: { backgroundColor: isDark ? colors.surface : '#FFFFFF' },
        toggleTextActive: { color: colors.text },
        toggleTextInactive: { color: '#8C8B9C' },
        pillBg: { backgroundColor: isDark ? 'rgba(200, 164, 60, 0.15)' : lightyellow },
        pillBorder: { borderColor: isDark ? 'rgba(200, 164, 60, 0.3)' : '#FDECA6' },
        progressBarTrack: { backgroundColor: isDark ? colors.border : '#F3EFE6' },
        footerText: { color: '#8C8B9C' },
        bottomTabContainer: { borderTopColor: isDark ? colors.border : '#F3EFE6', backgroundColor: colors.background },
        dayInactive: { backgroundColor: isDark ? colors.surfaceMuted : '#F6ECD7' },
        dotInactive: { backgroundColor: isDark ? colors.surfaceMuted : '#F6ECD7' },
        headerDivider: { backgroundColor: isDark ? colors.border : '#F3EFE6' },
        backBtn: { backgroundColor: isDark ? colors.surfaceMuted : '#FAFAFA' },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            {/* --- Header --- */}
            <View style={styles.headerRow}>
                <TouchableOpacity
                    style={[styles.backButton, dynamicStyles.backBtn]}
                    activeOpacity={0.8}
                    onPress={() => navigation?.goBack()}
                >
                    <ArrowLeftIcon color={colors.text} />
                </TouchableOpacity>
                <View style={styles.headerTextWrap}>
                    <Text style={[styles.headerTitle, dynamicStyles.textMain]}>Widgets</Text>
                    <Text style={styles.headerSubtitle}>
                        Toggle above to preview each state
                    </Text>
                </View>
            </View>

            <View style={[styles.headerDivider, dynamicStyles.headerDivider]} />

            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={yellow} />
                </View>
            ) : (
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* ================= SECTION 1: TODAY WIDGET ================= */}
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionTitleBlock}>
                            <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Today Widget</Text>
                            <Text style={[styles.sectionSubtitle, dynamicStyles.textSecondary]}>Shows today's status at a glance</Text>
                        </View>

                        {/* Segmented Toggle */}
                        <View style={[styles.toggleContainer, dynamicStyles.toggleContainer]}>
                            {(['empty', 'progress', 'crowned'] as const).map((state) => (
                                <TouchableOpacity
                                    key={state}
                                    activeOpacity={0.8}
                                    onPress={() => setTodayState(state)}
                                    style={[styles.toggleBtn, todayState === state && [styles.toggleActive, dynamicStyles.toggleActive]]}
                                >
                                    <Text style={[
                                        styles.toggleText,
                                        todayState === state ? dynamicStyles.toggleTextActive : dynamicStyles.toggleTextInactive
                                    ]}>
                                        {state.charAt(0).toUpperCase() + state.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* TODAY WIDGET PREVIEW CARD */}
                    <View style={[styles.widgetCard, dynamicStyles.card]}>

                        {todayState === 'empty' && (
                            <View style={styles.widgetInner}>
                                <Text style={[styles.widgetDateText, dynamicStyles.textSecondary]}>{todayStr}</Text>
                                <View style={styles.todayRow}>
                                    <DashedCircleIcon color={colors.border} />
                                    <View style={styles.todayTextContent}>
                                        <Text style={[styles.todayMainText, dynamicStyles.textMain]}>Today is empty</Text>
                                        <Text style={[styles.todaySubText, dynamicStyles.textSecondary]}>This day is waiting to be lived</Text>
                                    </View>
                                </View>
                                <Pressable style={[styles.actionPill, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}
                                    onPress={() => navigation.navigate("EnhanceCrown")}
                                >
                                    <Text style={styles.actionPillText}>Complete Today</Text>
                                    <ArrowRightSmallIcon color={yellow} />
                                </Pressable>
                            </View>
                        )}

                        {todayState === 'progress' && (
                            <View style={styles.widgetInner}>
                                <Text style={[styles.widgetDateText, dynamicStyles.textSecondary]}>{todayStr}</Text>
                                <View style={styles.todayRow}>
                                    <View style={styles.progressRingWrapper}>
                                        <ProgressRingIcon progress={66} trackColor={isDark ? colors.border : '#F3EFE6'} />
                                        <Text style={[styles.progressRingText, dynamicStyles.textMain]}>2/3</Text>
                                    </View>
                                    <View style={styles.todayTextContent}>
                                        <Text style={[styles.todayMainText, dynamicStyles.textMain]}>Almost there</Text>
                                        <Text style={[styles.todaySubText, dynamicStyles.textSecondary]}>One more reflection to crown today</Text>
                                    </View>
                                </View>
                                <Pressable style={[styles.actionPill, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}
                                    onPress={() => navigation.navigate("EnhanceCrown")}
                                >
                                    <Text style={styles.actionPillText}>Finish Today</Text>
                                    <ArrowRightSmallIcon color={yellow} />
                                </Pressable>
                            </View>
                        )}

                        {todayState === 'crowned' && (
                            <View style={[styles.widgetInner, styles.crownedInner]}>
                                <View style={styles.patternContainer}>
                                    <DotPatternIcon />
                                </View>

                                <View style={styles.crownedHeader}>
                                    <Text style={[styles.widgetDateTextUpper, dynamicStyles.textSecondary]}>{todayStr.toUpperCase()}</Text>
                                    <View style={[styles.statusPill, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}>
                                        <MiniCheckIcon color={yellow} />
                                        <Text style={styles.statusPillText}>Crowned</Text>
                                    </View>
                                </View>

                                <View style={[styles.crownIconBg, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}>
                                    <BadgeIcon color={yellow} size={30} />
                                </View>

                                <Text style={[styles.crownedMainText, dynamicStyles.textMain]}>Day Crowned ✦</Text>
                                <Text style={[styles.crownedSubText, dynamicStyles.textSecondary]}>{todayStr} · Preserved forever</Text>
                            </View>
                        )}
                    </View>

                    {/* ================= SECTION 2: PROGRESS WIDGET ================= */}
                    <View style={[styles.sectionHeader, { marginTop: 40 }]}>
                        <View style={styles.sectionTitleBlock}>
                            <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Progress Widget</Text>
                            <Text style={[styles.sectionSubtitle, dynamicStyles.textSecondary]}>Days lived - subtle, not overwhelming</Text>
                        </View>
                    </View>

                    <View style={[styles.widgetCard, dynamicStyles.card]}>
                        <Text style={[styles.progressLabel, dynamicStyles.textSecondary]}>Life Progress</Text>

                        <View style={styles.progressRow}>
                            <View>
                                <Text style={[styles.progressBigValue, dynamicStyles.textMain]}>
                                    {(safeProgress.days_lived || safeLifeMap.days_lived || 0).toLocaleString()}
                                </Text>
                                <Text style={[styles.progressSubText, dynamicStyles.textSecondary]}>days of life lived</Text>
                            </View>
                            <View style={styles.progressRingWrapperBig}>
                                <ProgressRingIcon progress={safeProgress.life_percentage || safeLifeMap.life_percentage || 0} size={54} strokeWidth={4} trackColor={isDark ? colors.border : '#F3EFE6'} />
                                <View style={styles.progressRingTextContainer}>
                                    <Text style={[styles.progressRingPercent, dynamicStyles.textMain]}>
                                        {(safeProgress.life_percentage || safeLifeMap.life_percentage || 0).toFixed(1)}%
                                    </Text>
                                    <Text style={[styles.progressRingOfLife, dynamicStyles.textSecondary]}>of life</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.linearProgressContainer}>
                            <View style={[styles.linearTrack, dynamicStyles.progressBarTrack]}>
                                <View style={[styles.linearFill, { width: `${safeProgress.life_percentage || safeLifeMap.life_percentage || 0}%` }]} />
                            </View>
                            <View style={styles.linearLabels}>
                                <Text style={[styles.linearLabelText, dynamicStyles.textSecondary]}>Born</Text>
                                <Text style={[styles.linearLabelText, dynamicStyles.textSecondary]}>Age 80</Text>
                            </View>
                        </View>
                    </View>

                    {/* ================= SECTION 3: STREAK WIDGET ================= */}
                    <View style={[styles.sectionHeader, { marginTop: 40 }]}>
                        <View style={styles.sectionTitleBlock}>
                            <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Streak & Consistency</Text>
                            <Text style={[styles.sectionSubtitle, dynamicStyles.textSecondary]}>Weekly activity indicator</Text>
                        </View>
                    </View>

                    <View style={[styles.widgetCard, dynamicStyles.card]}>
                        <View style={styles.streakHeader}>
                            <View>
                                <Text style={[styles.progressLabel, dynamicStyles.textSecondary]}>Consistency</Text>
                                <Text style={[styles.streakBigValue, dynamicStyles.textMain]}>
                                    {safeStreak.current_streak !== undefined ? safeStreak.current_streak : 0}<Text style={[styles.streakSubText, dynamicStyles.textSecondary]}> day run</Text>
                                </Text>
                            </View>
                            <View style={[styles.statusPill, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}>
                                <View style={[styles.greenDot, (safeStreak.current_streak === 0 || safeStreak.current_streak === undefined) && { backgroundColor: '#8C8B9C' }]} />
                                <Text style={styles.statusPillText}>
                                    {safeStreak.current_streak > 0 ? "On track" : "Let's begin"}
                                </Text>
                            </View>
                        </View>

                        <Text style={[styles.weekLabel, dynamicStyles.textSecondary]}>Last 7 days</Text>

                        <View style={styles.weekBlocksRow}>
                            {dynamicWeekData.map((item, index) => (
                                <View key={index} style={styles.dayBlockContainer}>
                                    <View style={styles.barWrapper}>
                                        <View style={[
                                            styles.dayBlock,
                                            {
                                                height: item.crowned ? 34 : 14,
                                                backgroundColor: item.crowned ? COLOR_CROWNED : (isDark ? colors.surfaceMuted : '#F6ECD7')
                                            }
                                        ]} />
                                    </View>
                                    <Text style={[
                                        styles.dayLabel,
                                        item.isToday ? { color: yellow, fontWeight: '700' } : dynamicStyles.textSecondary
                                    ]}>{item.day}</Text>
                                </View>
                            ))}
                        </View>

                        <View style={styles.legendRow}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: COLOR_CROWNED }]} />
                                <Text style={[styles.legendText, dynamicStyles.textSecondary]}>Crowned day</Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, dynamicStyles.dotInactive]} />
                                <Text style={[styles.legendText, dynamicStyles.textSecondary]}>Not yet</Text>
                            </View>
                        </View>
                    </View>

                    {/* --- Footer Note --- */}
                    <View style={styles.footerNoteContainer}>
                        <Text style={[styles.footerNote, dynamicStyles.footerText]}>
                            ✦ Widgets reflect your days as you document them. Add Chronica to your home screen via the system share menu — your life, always in view.
                        </Text>
                    </View>

                </ScrollView>
            )}

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="profile" />
            </View>
        </SafeAreaView >
    );
};

export default WidgetsScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 16 },
    backButton: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
    headerTextWrap: { flex: 1 },
    headerTitle: { fontSize: 20, fontWeight: '700', marginBottom: 2, letterSpacing: -0.3 },
    headerSubtitle: { fontSize: 12.5, color: '#8C8B9C' },
    headerDivider: { height: 1 },
    scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 24 },

    // Sections
    sectionHeader: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 },
    sectionTitleBlock: { flex: 1 },
    sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
    sectionSubtitle: { fontSize: 12.5 },

    // Toggle
    toggleContainer: { flexDirection: 'row', borderRadius: 18, padding: 4, marginLeft: 12 },
    toggleBtn: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 14 },
    toggleActive: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2 },
    toggleText: { fontSize: 11, fontWeight: '500' },

    // Base Widget Card
    widgetCard: { borderRadius: 24, padding: 24, borderWidth: 1 },

    // Today Widget Internal
    widgetInner: { width: '100%' },
    widgetDateText: { fontSize: 13, marginBottom: 20 },
    todayRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    todayTextContent: { marginLeft: 16, flex: 1 },
    todayMainText: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
    todaySubText: { fontSize: 13 },
    actionPill: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, gap: 6 },
    actionPillText: { color: yellow, fontSize: 12, fontWeight: '600' },
    pillBorder: { borderWidth: 1 },
    progressRingWrapper: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
    progressRingText: { position: 'absolute', fontSize: 12, fontWeight: '700' },

    // Crowned State
    crownedInner: { alignItems: 'flex-start', overflow: 'hidden' },
    patternContainer: { position: 'absolute', right: -30, top: -30, width: 150, height: 150 },
    crownedHeader: { width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    widgetDateTextUpper: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
    statusPill: { flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 14, gap: 6 },
    statusPillText: { color: yellow, fontSize: 11, fontWeight: '600' },
    crownIconBg: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    crownedMainText: { fontSize: 18, fontWeight: '700', marginBottom: 4 },
    crownedSubText: { fontSize: 12.5 },

    // Progress Widget Internal
    progressLabel: { fontSize: 11, fontWeight: '500', marginBottom: 10 },
    progressRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 },
    progressBigValue: { fontSize: 34, fontWeight: '800', letterSpacing: -1, marginBottom: 2 },
    progressSubText: { fontSize: 13 },
    progressRingWrapperBig: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
    progressRingTextContainer: { position: 'absolute', alignItems: 'center' },
    progressRingPercent: { fontSize: 11.5, fontWeight: '700' },
    progressRingOfLife: { fontSize: 8 },
    linearProgressContainer: { width: '100%' },
    linearTrack: { height: 4, borderRadius: 2, marginBottom: 8 },
    linearFill: { height: '100%', backgroundColor: yellow, borderRadius: 2 },
    linearLabels: { flexDirection: 'row', justifyContent: 'space-between' },
    linearLabelText: { fontSize: 11 },

    // Streak Widget Internal
    streakHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
    streakBigValue: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
    streakSubText: { fontSize: 14, fontWeight: '500' },
    greenDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLOR_CROWNED },
    weekLabel: { fontSize: 11, marginBottom: 12 },
    weekBlocksRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    dayBlockContainer: { alignItems: 'center', gap: 8 },
    barWrapper: { height: 34, justifyContent: 'center' },
    dayBlock: { width: 34, borderRadius: 8 },
    dayLabel: { fontSize: 10, fontWeight: '500' },
    legendRow: { flexDirection: 'row', gap: 16 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { fontSize: 11.5 },

    // Footer Note
    footerNoteContainer: { borderRadius: 20, borderWidth: 1, borderColor: '#F3EFE6', padding: 16, marginTop: 32 },
    footerNote: { fontSize: 12.5, lineHeight: 18 },
    bottomTabContainer: { borderTopWidth: 1, justifyContent: 'flex-end' },
});