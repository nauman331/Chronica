import React, { useMemo, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BottomTabBar from '../components/BottomTabBar';
import { useAppTheme } from '../hooks/useAppTheme';
import { ArrowLeftIcon, DownloadIcon, MiniCrown, WidgetsIcon } from '../utils/icons';
import { lightyellow, yellow } from '../utils/colors';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

type ShareMode = 'day' | 'weekly' | 'lifemap';

// --- CUSTOM EXACT FIGMA ICONS ---
const ExactCopyIcon = ({ color = '#8C8B9C', size = 20 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <Path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Svg>
);

const ExactWeeklyIcon = ({ color = '#8C8B9C', size = 14 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="12" cy="12" r="8" />
        <Circle cx="12" cy="12" r="3" />
    </Svg>
);

const ExactShareIcon = ({ color = '#FFFFFF', size = 17 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <Circle cx="18" cy="5" r="3" fill={color} />
        <Circle cx="6" cy="12" r="3" fill={color} />
        <Circle cx="18" cy="19" r="3" fill={color} />
        <Path d="M8.59 13.51l6.83 3.98" stroke={color} />
        <Path d="M15.41 6.51l-6.82 3.98" stroke={color} />
    </Svg>
);

const DotIcon = ({ color = yellow, size = 6 }) => (
    <Svg width={size} height={size} viewBox="0 0 6 6" fill={color}>
        <Circle cx="3" cy="3" r="3" />
    </Svg>
);

const FilledSparkIcon = ({ color = yellow, size = 14 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
            d="M12 2C12 7.5228 16.4772 12 22 12C16.4772 12 12 16.4772 12 22C12 16.4772 7.5228 12 2 12C7.5228 12 12 7.5228 12 2Z"
            fill={color}
        />
    </Svg>
);
// ---------------------------------

const segmentSubtitle = (mode: ShareMode) => {
    if (mode === 'lifemap') {
        return "Every dot is a piece of your life — what's lived, what still awaits.";
    }
    return 'Share when you complete a day. Dark, gold, timeless.';
};

const ShareProgress: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { colors, isDark } = useAppTheme();
    const [mode, setMode] = useState<ShareMode>('day');

    const weeklyCells = useMemo(
        () => [
            true, true, false, true, true, true, false,
            false, true, true, true, false, true, true,
            true, true, true, false, true, false, false,
            true, true, true, true, false, false, false,
        ],
        []
    );

    const lifeMapDots = useMemo(() => {
        const total = 17 * 14;
        const lived = 96;
        return Array.from({ length: total }, (_, idx) => idx < lived);
    }, []);

    const paleColor = '#F6ECD7';

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        headerTitle: { color: colors.text },
        headerSubtitle: { color: '#8C8B9C' },
        backBtn: { backgroundColor: isDark ? colors.surfaceMuted : '#F9F8F5' },
        sectionDivider: { backgroundColor: '#F3EFE6' },
        segmentWrap: {
            borderColor: '#F3EFE6',
        },
        segmentText: { color: '#8C8B9C' },
        segmentActive: {
            backgroundColor: isDark ? colors.surfaceMuted : '#FFFFFF',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 6,
            elevation: 2,
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.04)',
        },
        segmentActiveText: { color: colors.text },
        card: {
            backgroundColor: colors.surface,
            borderColor: '#F3EFE6',
            boxShadow: isDark ? '0px 48px 96px rgba(0, 0, 0, 0.08)' : '0px 48px 96px rgba(0, 0, 0, 0.04)',

        },
        mutedText: { color: '#8C8B9C' },
        mainText: { color: colors.text },
        paleSurface: { backgroundColor: isDark ? colors.surfaceMuted : '#FEF9EC' },
        borderTone: { borderColor: '#F3EFE6' },
        helperCard: {
            backgroundColor: colors.surface,
            borderColor: '#F3EFE6',
        },
        sideBtnFill: {
            backgroundColor: colors.surface,
        },
        bottomTabContainer: {
            backgroundColor: colors.background,
            borderTopColor: '#F3EFE6',
        },
        darkShadow: {
            shadowOpacity: isDark ? 0 : 0.04,
        },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.content}>
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        style={[styles.backButton, dynamicStyles.backBtn]}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.8}
                    >
                        <ArrowLeftIcon color={colors.text} />
                    </TouchableOpacity>
                    <View style={styles.headerTextWrap}>
                        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>Share Progress</Text>
                        <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>{segmentSubtitle(mode)}</Text>
                    </View>
                </View>

                <View style={[styles.topDivider, dynamicStyles.sectionDivider]} />

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {/* Segmented Control */}
                    <View style={[styles.segmentWrap, dynamicStyles.segmentWrap]}>
                        <TouchableOpacity
                            style={[styles.segmentBtn, mode === 'day' && styles.segmentBtnActive, mode === 'day' && dynamicStyles.segmentActive]}
                            onPress={() => setMode('day')}
                            activeOpacity={0.9}
                        >
                            <FilledSparkIcon color={mode === 'day' ? yellow : '#8C8B9C'} size={14} />
                            <Text style={mode === 'day' ? [styles.segmentTextActive, dynamicStyles.segmentActiveText] : [styles.segmentText, dynamicStyles.segmentText]}>
                                Day Crowned
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.segmentBtn, mode === 'weekly' && styles.segmentBtnActive, mode === 'weekly' && dynamicStyles.segmentActive]}
                            onPress={() => setMode('weekly')}
                            activeOpacity={0.9}
                        >
                            <ExactWeeklyIcon color={mode === 'weekly' ? yellow : '#8C8B9C'} size={14} />
                            <Text style={mode === 'weekly' ? [styles.segmentTextActive, dynamicStyles.segmentActiveText] : [styles.segmentText, dynamicStyles.segmentText]}>
                                Weekly
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.segmentBtn, mode === 'lifemap' && styles.segmentBtnActive, mode === 'lifemap' && dynamicStyles.segmentActive]}
                            onPress={() => setMode('lifemap')}
                            activeOpacity={0.9}
                        >
                            <WidgetsIcon color={mode === 'lifemap' ? yellow : '#8C8B9C'} size={13} />
                            <Text style={mode === 'lifemap' ? [styles.segmentTextActive, dynamicStyles.segmentActiveText] : [styles.segmentText, dynamicStyles.segmentText]}>
                                Life Map
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Main Dynamic Card */}
                    <View style={[styles.card, dynamicStyles.card, styles.cardShadow, dynamicStyles.darkShadow]}>
                        {mode === 'day' && (
                            <>
                                <View style={styles.cardTopRow}>
                                    <Text style={styles.brandGoldText}>Chronica</Text>
                                    <View style={[styles.pillTag, dynamicStyles.paleSurface]}>
                                        <DotIcon color={yellow} size={5.5} />
                                        <Text style={styles.pillTagTextGold}>Day Crowned</Text>
                                    </View>
                                </View>

                                <View style={styles.dayCenterWrap}>
                                    <View style={styles.bigGoldCircle}>
                                        <MiniCrown color="#FFFFFF" size={34} />
                                    </View>
                                    <Text style={[styles.dayTitle, dynamicStyles.mainText]}>This day is complete.</Text>
                                    <Text style={[styles.daySub, dynamicStyles.mutedText]}>One more day accounted for.</Text>
                                    <View style={[styles.datePill, dynamicStyles.borderTone]}>
                                        <DotIcon color={yellow} size={6} />
                                        <Text style={styles.datePillText}>April 15, 2026</Text>
                                    </View>
                                </View>

                                <View style={styles.cardFooterStats}>
                                    <View>
                                        <Text style={styles.statMainGold}>11,791</Text>
                                        <Text style={[styles.statSub, dynamicStyles.mutedText]}>days lived</Text>
                                    </View>
                                    <View style={styles.statRight}>
                                        <Text style={[styles.statMain, dynamicStyles.mainText]}>128</Text>
                                        <Text style={[styles.statSub, dynamicStyles.mutedText]}>days crowned</Text>
                                    </View>
                                </View>
                            </>
                        )}

                        {mode === 'weekly' && (
                            <>
                                <View style={styles.cardTopRow}>
                                    <Text style={[styles.smallLabel, dynamicStyles.mutedText]}>Chronica</Text>
                                    <View style={[styles.pillTag, dynamicStyles.paleSurface]}>
                                        <Text style={styles.goldBig}>5</Text>
                                        <Text style={[styles.pillTagText, dynamicStyles.mutedText]}>/ 7 days</Text>
                                    </View>
                                </View>

                                <Text style={[styles.weekTitle, dynamicStyles.mainText]}>April</Text>
                                <Text style={[styles.smallLabel, dynamicStyles.mutedText]}>Week 3 in review</Text>
                                <Text style={[styles.weekHint, dynamicStyles.mutedText]}>Consistency compounds.</Text>

                                <View style={styles.weekdayRow}>
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
                                        <Text key={`${day}-${index}`} style={[styles.weekdayText, dynamicStyles.mutedText]}>{day}</Text>
                                    ))}
                                </View>

                                <View style={styles.weekGrid}>
                                    {weeklyCells.map((on, idx) => (
                                        <View
                                            key={`w-${idx}`}
                                            style={[
                                                styles.weekCell,
                                                { backgroundColor: on ? '#C9A227' : paleColor },
                                            ]}
                                        />
                                    ))}
                                </View>

                                <View style={styles.weekBottomRow}>
                                    <View>
                                        <View style={styles.rowCenter}>
                                            <Text style={[styles.statMain, dynamicStyles.mainText]}>18 days</Text>
                                            <View style={{ marginLeft: 6 }}>
                                                <FilledSparkIcon color={colors.text} size={14} />
                                            </View>
                                        </View>
                                        <Text style={[styles.smallLabel, dynamicStyles.mutedText, { marginTop: 4 }]}>this rhythm is yours</Text>
                                    </View>
                                    <View style={styles.legendWrap}>
                                        <View style={styles.legendRow}>
                                            <DotIcon color="#C9A227" size={6.5} />
                                            <Text style={[styles.legendText, dynamicStyles.mutedText]}>Crowned</Text>
                                            <DotIcon color={paleColor} size={6.5} />
                                            <Text style={[styles.legendText, dynamicStyles.mutedText]}>Missed</Text>
                                        </View>
                                    </View>
                                </View>
                            </>
                        )}

                        {mode === 'lifemap' && (
                            <>
                                <View style={styles.cardTopRow}>
                                    <Text style={[styles.smallLabel, dynamicStyles.mutedText]}>Chronica · Life Map</Text>
                                    <View style={[styles.pillTag, dynamicStyles.paleSurface]}>
                                        <FilledSparkIcon color={yellow} size={12} />
                                        <Text style={styles.pillTagTextGold}>11,791 days</Text>
                                    </View>
                                </View>

                                <Text style={[styles.lifePercent, dynamicStyles.mainText]}>40.4%</Text>
                                <Text style={[styles.smallLabel, dynamicStyles.mutedText]}>of a life, lived</Text>
                                <Text style={[styles.weekHint, dynamicStyles.mutedText, { marginBottom: 16 }]}>This is your life, in days</Text>

                                <View style={styles.lifeGrid}>
                                    {lifeMapDots.map((isLived, idx) => (
                                        <View
                                            key={`d-${idx}`}
                                            style={[
                                                styles.lifeDot,
                                                { backgroundColor: isLived ? '#C9A227' : paleColor },
                                            ]}
                                        />
                                    ))}
                                </View>
                            </>
                        )}
                    </View>

                    <Text style={[styles.caption, dynamicStyles.mutedText, { marginLeft: 25 }]}>Chronica — your life, in days</Text>

                    {/* Action Row */}
                    <View style={styles.actionRow}>
                        <TouchableOpacity activeOpacity={0.85} style={styles.shareMainBtnWrapper}>
                            <LinearGradient
                                colors={['#1A1523', '#2D1B4E']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.shareMainBtnGradient}
                            >
                                <ExactShareIcon color="#FFFFFF" size={18} />
                                <Text style={styles.shareMainText}>Share Image</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.85} style={[styles.sideBtn, dynamicStyles.borderTone, dynamicStyles.sideBtnFill]}>
                            <ExactCopyIcon color="#8C8B9C" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.85} style={[styles.sideBtn, dynamicStyles.borderTone, dynamicStyles.sideBtnFill]}>
                            <DownloadIcon color="#8C8B9C" size={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Helper Callout */}
                    <View style={[styles.helperCard, dynamicStyles.helperCard]}>
                        <View style={styles.helperRow}>
                            <Text style={[styles.helperText, dynamicStyles.mutedText]}>
                                <FilledSparkIcon color="#8C8B9C" size={14} /> All share cards export as high-res images (1080×1080px) -— optimized for Instagram Stories, Twitter, and any social format. No branding clutter.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="insights" />
            </View>
        </SafeAreaView>
    );
};

export default ShareProgress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 14,
    },
    backButton: {
        width: 38,
        height: 38,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    headerTextWrap: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 2,
        letterSpacing: -0.3,
    },
    headerSubtitle: {
        fontSize: 10,
        lineHeight: 16,
    },
    topDivider: {
        height: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
    },
    segmentWrap: {
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 18,
        padding: 4,
        marginBottom: 24,
    },
    segmentBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        borderRadius: 15,
        paddingVertical: 12,
    },
    segmentBtnActive: {
        // backgroundColor and shadow handled in dynamicStyles for dark mode compatibility
    },
    segmentText: {
        fontSize: 13,
        fontWeight: '400',
    },
    segmentTextActive: {
        fontSize: 13,
        fontWeight: '400',
    },
    card: {
        borderRadius: 32,
        borderWidth: 1,
        padding: 24,
        marginBottom: 20,
    },
    cardShadow: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 12 },
        shadowRadius: 24,
    },
    cardTopRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    brandGoldText: {
        color: yellow,
        fontSize: 13.5,
        fontWeight: '400',
    },
    pillTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    pillTagText: {
        fontSize: 12,
        fontWeight: '400',
    },
    pillTagTextGold: {
        color: yellow,
        fontSize: 12,
        fontWeight: '400',
    },
    dayCenterWrap: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    bigGoldCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#C9A227',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#C9A227',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 26,
    },
    dayTitle: {
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 6,
        textAlign: 'center',
        letterSpacing: -0.5,
    },
    daySub: {
        fontSize: 13.5,
        marginBottom: 20,
    },
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: lightyellow,
    },
    datePillText: {
        color: yellow,
        fontSize: 14.5,
        fontWeight: '400',
    },
    cardFooterStats: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    statMain: {
        fontSize: 15,
        fontWeight: '500',
    },
    statMainGold: {
        color: yellow,
        fontSize: 15,
        fontWeight: '500',
    },
    statSub: {
        fontSize: 12,
        marginTop: 2,
    },
    statRight: {
        alignItems: 'flex-end',
    },
    smallLabel: {
        fontSize: 13,
        fontWeight: '500',
    },
    goldBig: {
        color: yellow,
        fontSize: 18,
        fontWeight: '700',
        marginRight: -2,
    },
    weekTitle: {
        marginTop: -25,
        fontSize: 32,
        lineHeight: 36,
        fontWeight: '500',
        marginBottom: 2,
        letterSpacing: -0.5,
    },
    weekHint: {
        fontSize: 12,
        marginTop: 18,
        marginBottom: 14,
    },
    weekdayRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    weekdayText: {
        width: 34,
        textAlign: 'center',
        fontSize: 10,
        fontWeight: '400',
        textTransform: 'uppercase',
    },
    weekGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 10,
        rowGap: 10,
        marginBottom: 20,
    },
    weekCell: {
        width: 34,
        height: 16,
        borderRadius: 8,
    },
    weekBottomRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 6,
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendWrap: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingBottom: 4,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendText: {
        fontSize: 11.5,
        marginRight: 6,
    },
    lifePercent: {
        marginTop: -20,
        fontSize: 30,
        lineHeight: 40,
        fontWeight: '600',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    lifeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        columnGap: 5,
        rowGap: 5,
    },
    lifeDot: {
        width: 13,
        height: 13,
        borderRadius: 6.5,
    },
    caption: {
        fontSize: 12,
        marginBottom: 16,
        marginLeft: 4,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 18,
        justifyContent: 'space-between',
    },
    shareMainBtnWrapper: {
        flex: 1,
        height: 58,
        borderRadius: 18,
        overflow: 'hidden',
    },
    shareMainBtnGradient: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    shareMainText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    sideBtn: {
        width: 58,
        height: 58,
        borderRadius: 18,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    helperCard: {
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 16,
    },
    helperRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    helperIconWrap: {
        marginRight: 10,
        marginTop: 3,
    },
    helperText: {
        flex: 1,
        fontSize: 11,
        lineHeight: 20,
    },
    bottomTabContainer: {
        borderTopWidth: 1,
    },
});