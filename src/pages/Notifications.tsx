import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Image,
} from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';
import {
    ArrowLeftIcon,
    BellIcon,
    SparkIcon,
} from '../utils/icons';
import { yellow } from '../utils/colors';
import { useAppTheme } from '../hooks/useAppTheme';
import sparkleIconImg from '../assets/sparkle_icon.png';

const BRAND = {
    logoBg: '#241942',
    textSoft: '#8F90A3',
    pillMorning: '#F8F2DE',
    pillEvening: '#EFEAFD',
    pillWeekly: '#EAF5FE',
};

const SunIcon = ({ color }: { color: string }) => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="4" fill={color} />
        <Line x1="12" y1="2" x2="12" y2="5" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="12" y1="19" x2="12" y2="22" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="2" y1="12" x2="5" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="19" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="4.8" y1="4.8" x2="7" y2="7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="17" y1="17" x2="19.2" y2="19.2" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="17" y1="7" x2="19.2" y2="4.8" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        <Line x1="4.8" y1="19.2" x2="7" y2="17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
);

const MoonIcon = ({ color }: { color: string }) => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <Path
            d="M16 3.5C14.5405 4.01263 13.3009 5.01309 12.4886 6.33319C11.6763 7.65329 11.3413 9.21397 11.5412 10.7495C11.7411 12.2851 12.4638 13.7052 13.5925 14.7777C14.7213 15.8501 16.1787 16.5116 17.732 16.6531C16.9654 17.9514 15.8015 18.97 14.4134 19.5608C13.0253 20.1515 11.484 20.2823 10.0153 19.9337C8.54667 19.5851 7.23178 18.7762 6.26761 17.6251C5.30344 16.474 4.74028 15.0406 4.66252 13.5432C4.58476 12.0458 4.99658 10.5619 5.83575 9.31798C6.67492 8.07408 7.89579 7.13792 9.31496 6.65007C10.7341 6.16221 12.2748 6.14948 13.7018 6.61378C13.9783 5.49985 14.6016 4.50261 15.4798 3.76671C15.6486 3.62524 15.8241 3.50294 16 3.5Z"
            fill={color}
        />
    </Svg>
);

type NotificationCardProps = {
    timePrimary: string;
    timeSecondary: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ color: string }>;
    iconPillColor: string;
    iconColor: string;
    colors: {
        surface: string;
        border: string;
        text: string;
        textSecondary: string;
        surfaceMuted: string;
    };
    isDark: boolean;
};

const NotificationCard = ({
    timePrimary,
    timeSecondary,
    title,
    subtitle,
    icon: Icon,
    iconPillColor,
    iconColor,
    colors,
    isDark,
}: NotificationCardProps) => (
    <View style={styles.sectionContainer}>
        <View style={styles.timeLabel}>
            <View style={[styles.timeIconPill, { backgroundColor: iconPillColor }]}>
                <Icon color={iconColor} />
            </View>
            <Text style={[styles.timePrimary, { color: colors.text }]}>{timePrimary}</Text>
            <Text style={[styles.timeSecondary, { color: colors.textSecondary }]}>{timeSecondary}</Text>
        </View>

        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    shadowOpacity: isDark ? 0 : 0.08,
                },
            ]}
        >
            <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                    <Image source={sparkleIconImg} style={styles.iconImage} />
                </View>
                <Text style={[styles.cardSource, { color: colors.textSecondary }]}>Chronica</Text>
                <Text style={[styles.cardTime, { color: colors.textSecondary }]}>now</Text>
            </View>

            <View style={[styles.cardDivider, { backgroundColor: colors.border }]} />

            <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>{subtitle}</Text>

            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={[
                        styles.dismissBtn,
                        {
                            borderColor: colors.border,
                            backgroundColor: colors.surfaceMuted,
                        },
                    ]}
                >
                    <Text style={[styles.dismissBtnText, { color: colors.textSecondary }]}>Dismiss</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnText}>Go to Today's Ritual</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const Notifications: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { colors, isDark } = useAppTheme();

    const morningPill = isDark ? 'rgba(201, 162, 39, 0.2)' : BRAND.pillMorning;
    const eveningPill = isDark ? 'rgba(142, 120, 209, 0.25)' : BRAND.pillEvening;
    const weeklyPill = isDark ? 'rgba(59, 130, 246, 0.2)' : BRAND.pillWeekly;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.backButton, { backgroundColor: colors.surfaceMuted }]}
                    activeOpacity={0.8}
                    onPress={() => navigation?.goBack()}
                >
                    <ArrowLeftIcon color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
                    Gentle nudges to mark each day. Calm, not noisy.
                </Text>
            </View>

            <View style={[styles.headerDivider, { backgroundColor: colors.border }]} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <NotificationCard
                    timePrimary="Morning"
                    timeSecondary=" 9:00 AM"
                    title="Today is one of your life days"
                    subtitle="April 15 - Begin with intention. Set the tone for this day."
                    icon={SunIcon}
                    iconPillColor={morningPill}
                    iconColor={colors.text}
                    colors={colors}
                    isDark={isDark}
                />

                <NotificationCard
                    timePrimary="Evening"
                    timeSecondary=" 8:00 PM"
                    title="Don't leave today empty"
                    subtitle="A few quiet reflections before this day closes forever."
                    icon={MoonIcon}
                    iconPillColor={eveningPill}
                    iconColor={yellow}
                    colors={colors}
                    isDark={isDark}
                />

                <NotificationCard
                    timePrimary="Weekly"
                    timeSecondary=" Sunday · 7:00 PM"
                    title="Your week in review"
                    subtitle="See how many days you lived fully. Your rhythm awaits."
                    icon={SparkIcon}
                    iconPillColor={weeklyPill}
                    iconColor={colors.text}
                    colors={colors}
                    isDark={isDark}
                />

                <View style={[styles.disclaimer, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                    <BellIcon color={yellow} />
                    <Text style={[styles.disclaimerText, { color: colors.textSecondary }]}>
                        Chronica sends 2–3 notifications per day at most. The goal is awareness, not pressure. Each message is written to feel like a quiet reminder, not an alert.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 20,
        paddingTop: 8,
        paddingBottom: 10,
    },
    backButton: {
        width: 42,
        height: 42,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 32,
        lineHeight: 36,
        fontWeight: '800',
    },
    headerSubtitle: {
        fontSize: 13,
        lineHeight: 18,
        marginTop: 2,
    },
    headerDivider: {
        height: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 14,
        paddingBottom: 30,
    },
    sectionContainer: {
        marginBottom: 22,
    },
    timeLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    timeIconPill: {
        width: 26,
        height: 26,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    timePrimary: {
        fontSize: 17,
        fontWeight: '700',
    },
    timeSecondary: {
        fontSize: 16,
        fontWeight: '500',
    },
    card: {
        borderRadius: 20,
        borderWidth: 1,
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 12,
        elevation: 2,
        paddingTop: 14,
        paddingHorizontal: 14,
        paddingBottom: 14,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    iconBox: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: BRAND.logoBg,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    iconImage: {
        width: 14,
        height: 14,
    },
    cardSource: {
        fontSize: 16,
        fontWeight: '500',
    },
    cardTime: {
        marginLeft: 'auto',
        fontSize: 14,
        fontWeight: '500',
    },
    cardDivider: {
        height: 1,
        marginHorizontal: -14,
        marginBottom: 14,
    },
    cardTitle: {
        fontSize: 17,
        lineHeight: 23,
        fontWeight: '800',
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 15,
        lineHeight: 21,
        marginBottom: 14,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 10,
    },
    dismissBtn: {
        flex: 1,
        height: 52,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dismissBtnText: {
        fontWeight: '600',
        fontSize: 15,
    },
    primaryBtn: {
        flex: 2,
        height: 52,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: yellow,
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.16,
        shadowRadius: 10,
        elevation: 2,
    },
    primaryBtnText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 15,
    },
    disclaimer: {
        marginTop: 4,
        borderRadius: 16,
        borderWidth: 1,
        padding: 14,
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
    },
    disclaimerText: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
    },
});

export default Notifications;