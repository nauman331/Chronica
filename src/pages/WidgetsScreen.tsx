import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';

import { useAppTheme } from '../hooks/useAppTheme';

import { yellow, white, blue, lightyellow, COLOR_CROWNED } from '../utils/colors';

import {
    ArrowLeftIcon,
    ArrowRightSmallIcon,
    DashedCircleIcon,
    ProgressRingIcon,
    DotPatternIcon,
    BadgeIcon,
    MiniCheckIcon
} from '../utils/icons';

import BottomTabBar from '../components/BottomTabBar';


const weekData = [
    { day: 'M', crowned: true },
    { day: 'T', crowned: true },
    { day: 'W', crowned: true },
    { day: 'T', crowned: true },
    { day: 'F', crowned: false },
    { day: 'S', crowned: false },
    { day: 'S', crowned: false },
];

const WidgetsScreen = ({ navigation }: any) => {
    // --- 1. Get dynamic colors & theme ---
    const { colors, isDark } = useAppTheme();
    const [todayState, setTodayState] = useState<'empty' | 'progress' | 'crowned'>('empty');

    // Helper functions are moved to dynamicStyles if needed, but since they are
    // static layout (Figma-exact dimensions), they stay in the static StyleSheet.
    // However, the colors inside them must be dynamic or match the provided colors file.

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        textMain: { color: colors.text },
        textSecondary: { color: colors.textSecondary },
        card: {
            backgroundColor: colors.surface,
            borderColor: colors.border
        },
        toggleContainer: { backgroundColor: colors.surfaceMuted },
        toggleActive: { backgroundColor: colors.surface },
        toggleTextActive: { color: colors.text },
        toggleTextInactive: { color: colors.textSecondary },
        pillBg: { backgroundColor: isDark ? 'rgba(200, 164, 60, 0.15)' : lightyellow }, // lightyellow from file
        pillBorder: { borderColor: isDark ? 'rgba(200, 164, 60, 0.3)' : '#FDECA6' }, // Slight brand tint on border
        progressBarTrack: { backgroundColor: colors.border },
        footerText: { color: colors.textSecondary },
        bottomTabContainer: { borderTopColor: colors.border, backgroundColor: colors.background }
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            {/* --- Header --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation?.goBack()} style={styles.backButton}>
                    {/* Using imported ArrowLeftIcon as requested */}
                    <ArrowLeftIcon color={colors.text} />
                </TouchableOpacity>
                <View style={styles.headerTextContainer}>
                    <Text style={[styles.headerTitle, dynamicStyles.textMain]}>Widgets</Text>
                    <Text style={[styles.headerSubtitle, dynamicStyles.textSecondary]}>Toggle above to preview each state</Text>
                </View>
                <View style={{ width: 40 }} />
            </View>

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

                    {/* Empty State */}
                    {todayState === 'empty' && (
                        <View style={styles.widgetInner}>
                            <Text style={[styles.widgetDateText, dynamicStyles.textSecondary]}>April 15</Text>
                            <View style={styles.todayRow}>
                                {/* Using imported DashedCircleIcon - dot is visible in icons file */}
                                <DashedCircleIcon color={colors.border} />
                                <View style={styles.todayTextContent}>
                                    <Text style={[styles.todayMainText, dynamicStyles.textMain]}>Today is empty</Text>
                                    <Text style={[styles.todaySubText, dynamicStyles.textSecondary]}>This day is waiting to be lived</Text>
                                </View>
                            </View>
                            <View style={[styles.actionPill, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}>
                                <Text style={styles.actionPillText}>Complete Today</Text>
                                {/* Using imported ArrowRightSmallIcon with fixed yellow color */}
                                <ArrowRightSmallIcon color={yellow} />
                            </View>
                        </View>
                    )}

                    {/* Progress State */}
                    {todayState === 'progress' && (
                        <View style={styles.widgetInner}>
                            <Text style={[styles.widgetDateText, dynamicStyles.textSecondary]}>April 15</Text>
                            <View style={styles.todayRow}>
                                <View style={styles.progressRingWrapper}>
                                    {/* Using imported ProgressRingIcon */}
                                    <ProgressRingIcon progress={66} trackColor={colors.border} />
                                    <Text style={[styles.progressRingText, dynamicStyles.textMain]}>2/3</Text>
                                </View>
                                <View style={styles.todayTextContent}>
                                    <Text style={[styles.todayMainText, dynamicStyles.textMain]}>Almost there</Text>
                                    <Text style={[styles.todaySubText, dynamicStyles.textSecondary]}>One more reflection to crown today</Text>
                                </View>
                            </View>
                            <View style={[styles.actionPill, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}>
                                <Text style={styles.actionPillText}>Finish Today</Text>
                                <ArrowRightSmallIcon color={yellow} />
                            </View>
                        </View>
                    )}

                    {/* Crowned State */}
                    {todayState === 'crowned' && (
                        <View style={[styles.widgetInner, styles.crownedInner]}>
                            {/* Using imported DotPatternIcon */}
                            <View style={styles.patternContainer}>
                                <DotPatternIcon />
                            </View>

                            <View style={styles.crownedHeader}>
                                <Text style={[styles.widgetDateTextUpper, dynamicStyles.textSecondary]}>APRIL 15</Text>
                                <View style={[styles.statusPill, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}>
                                    {/* Replaced crown with mini check icon as requested for Figma matching */}
                                    <MiniCheckIcon color={yellow} />
                                    <Text style={styles.statusPillText}>Crowned</Text>
                                </View>
                            </View>

                            <View style={[styles.crownIconBg, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}>
                                {/* Large badge icon is smaller to match Figma */}
                                <BadgeIcon color={yellow} size={40} />
                            </View>

                            <Text style={[styles.crownedMainText, dynamicStyles.textMain]}>Day Crowned ✦</Text>
                            <Text style={[styles.crownedSubText, dynamicStyles.textSecondary]}>April 15 · Preserved forever</Text>
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
                            <Text style={[styles.progressBigValue, dynamicStyles.textMain]}>11,791</Text>
                            <Text style={[styles.progressSubText, dynamicStyles.textSecondary]}>days of life lived</Text>
                        </View>
                        <View style={styles.progressRingWrapperBig}>
                            <ProgressRingIcon progress={40.4} size={56} strokeWidth={4} trackColor={colors.border} />
                            <View style={styles.progressRingTextContainer}>
                                <Text style={[styles.progressRingPercent, dynamicStyles.textMain]}>40.4%</Text>
                                <Text style={[styles.progressRingOfLife, dynamicStyles.textSecondary]}>of life</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.linearProgressContainer}>
                        <View style={[styles.linearTrack, dynamicStyles.progressBarTrack]}>
                            <View style={[styles.linearFill, { width: '40.4%' }]} />
                        </View>
                        <View style={styles.linearLabels}>
                            <Text style={[styles.linearLabelText, dynamicStyles.textSecondary]}>Born</Text>
                            <Text style={[styles.linearLabelText, dynamicStyles.textSecondary]}>Age 80</Text>
                        </View>
                    </View>
                </View>

                {/* ================= SECTION 3: STREAK WIDGET (CHART ACCORDING TO VALUES) ================= */}
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
                            {/* FIX: Combined into a single text block to fix rogue string error */}
                            <Text style={[styles.streakBigValue, dynamicStyles.textMain]}>
                                18<Text style={[styles.streakSubText, dynamicStyles.textSecondary]}> day run</Text>
                            </Text>
                        </View>
                        <View style={[styles.statusPill, dynamicStyles.pillBg, styles.pillBorder, dynamicStyles.pillBorder]}>
                            {/* Dot uses the brand golden crowned color from file */}
                            <View style={styles.greenDot} />
                            <Text style={styles.statusPillText}>On track</Text>
                        </View>
                    </View>

                    <Text style={[styles.weekLabel, dynamicStyles.textSecondary]}>This week</Text>

                    {/* Dynamic Chart mapped from weekData - bars center relative to each other */}
                    <View style={styles.weekBlocksRow}>
                        {weekData.map((item, index) => (
                            <View key={index} style={styles.dayBlockContainer}>
                                <View style={styles.barWrapper}>
                                    <View style={[
                                        styles.dayBlock,
                                        {
                                            // Chart is according to values: 34 for crowned, 14 for not
                                            height: item.crowned ? 34 : 14,
                                            // Inactive uses surfaceMuted/blue in dark, else Figma light yellow hex
                                            backgroundColor: item.crowned ? COLOR_CROWNED : (isDark ? colors.surfaceMuted : '#F7EBCB')
                                        }
                                    ]} />
                                </View>
                                <Text style={[
                                    styles.dayLabel,
                                    item.day === 'W' ? { color: yellow, fontWeight: '700' } : dynamicStyles.textSecondary
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
                            {/* Inactive legend matches the chart in light/dark */}
                            <View style={[styles.legendDot, { backgroundColor: isDark ? colors.surfaceMuted : '#F7EBCB' }]} />
                            <Text style={[styles.legendText, dynamicStyles.textSecondary]}>Not yet</Text>
                        </View>
                    </View>
                </View>

                {/* --- Footer Note --- */}
                <Text style={[styles.footerNote, dynamicStyles.footerText]}>
                    ✦ Widgets reflect your days as you document them. Add Chronica to your home screen via the system share menu — your life, always in view.
                </Text>

            </ScrollView>

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="profile" />
            </View>
        </SafeAreaView>
    );
};

export default WidgetsScreen;

// --- Static Layout Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 20 : 10,
        paddingBottom: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTextContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
    },
    headerSubtitle: {
        fontSize: 11,
        marginTop: 2,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 10,
    },

    // Sections
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sectionTitleBlock: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 12,
    },

    // Toggle
    toggleContainer: {
        flexDirection: 'row',
        borderRadius: 20,
        padding: 4,
        marginLeft: 12,
    },
    toggleBtn: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 16,
    },
    toggleActive: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    toggleText: {
        fontSize: 10,
        fontWeight: '600',
    },

    // Base Widget Card
    widgetCard: {
        borderRadius: 24,
        padding: 24,
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.04,
        shadowRadius: 16,
        elevation: 3,
        overflow: 'hidden',
    },

    // Today Widget Internal
    widgetInner: {
        width: '100%',
    },
    widgetDateText: {
        fontSize: 13,
        marginBottom: 16,
    },
    todayRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    todayTextContent: {
        marginLeft: 16,
        flex: 1,
    },
    todayMainText: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 4,
    },
    todaySubText: {
        fontSize: 13,
    },
    actionPill: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20,
        gap: 6,
    },
    actionPillText: {
        color: yellow,
        fontSize: 12,
        fontWeight: '700',
    },
    pillBorder: {
        borderWidth: 1,
    },
    progressRingWrapper: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressRingText: {
        position: 'absolute',
        fontSize: 12,
        fontWeight: '700',
    },

    // Crowned State
    crownedInner: {
        alignItems: 'center',
        paddingTop: 10,
    },
    patternContainer: {
        position: 'absolute',
        right: -30,
        top: -30,
        width: 150,
        height: 150,
    },
    crownedHeader: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    widgetDateTextUpper: {
        fontSize: 11,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
        gap: 4,
    },
    statusPillText: {
        color: yellow,
        fontSize: 11,
        fontWeight: '700',
    },
    crownIconBg: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    crownedMainText: {
        fontSize: 18,
        fontWeight: '800',
        marginBottom: 6,
    },
    crownedSubText: {
        fontSize: 13,
    },

    // Progress Widget Internal
    progressLabel: {
        fontSize: 11,
        fontWeight: '500',
        marginBottom: 8,
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    progressBigValue: {
        fontSize: 34,
        fontWeight: '800',
        letterSpacing: -1,
        marginBottom: 2,
    },
    progressSubText: {
        fontSize: 13,
    },
    progressRingWrapperBig: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressRingTextContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    progressRingPercent: {
        fontSize: 12,
        fontWeight: '800',
    },
    progressRingOfLife: {
        fontSize: 8,
    },
    linearProgressContainer: {
        width: '100%',
    },
    linearTrack: {
        height: 4,
        borderRadius: 2,
        marginBottom: 8,
    },
    linearFill: {
        height: '100%',
        backgroundColor: yellow,
        borderRadius: 2,
    },
    linearLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linearLabelText: {
        fontSize: 10,
    },

    // Streak Widget Internal
    streakHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    streakBigValue: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -1,
    },
    streakSubText: {
        fontSize: 14,
        fontWeight: '500',
    },
    greenDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLOR_CROWNED,
    },
    weekLabel: {
        fontSize: 11,
        marginBottom: 12,
    },
    weekBlocksRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    dayBlockContainer: {
        alignItems: 'center',
        gap: 8,
    },
    barWrapper: {
        height: 34,
        justifyContent: 'center', // Vertically centers the 14px bars relative to the 34px ones
    },
    dayBlock: {
        width: 34,
        borderRadius: 8,
    },
    dayLabel: {
        fontSize: 10,
        fontWeight: '500',
    },
    legendRow: {
        flexDirection: 'row',
        gap: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: 11,
    },

    // Footer Note
    footerNote: {
        fontSize: 12,
        lineHeight: 18,
        marginTop: 32,
        paddingHorizontal: 8,
        textAlign: 'center',
    },
    bottomTabContainer: {
        borderTopWidth: 1,
        justifyContent: 'flex-end',
    },
});