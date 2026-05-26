import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import Svg, { Circle, Line, Path, G } from 'react-native-svg';
import { ArrowLeftIcon, BellIcon } from '../utils/icons';
import { yellow } from '../utils/colors';
import { useAppTheme } from '../hooks/useAppTheme';

// --- EXACT FIGMA ICONS ---
const SunIcon = ({ color = '#111111' }: { color?: string }) => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="12" r="4" fill="none" stroke={color} strokeWidth="1.8" />
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

const MoonIcon = ({ color = '#C9A227' }: { color?: string }) => (
    <Svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        {/* Flipped horizontally to match Figma */}
        <G transform="translate(24, 0) scale(-1, 1)">
            <Path
                d="M16 3.5C14.5405 4.01263 13.3009 5.01309 12.4886 6.33319C11.6763 7.65329 11.3413 9.21397 11.5412 10.7495C11.7411 12.2851 12.4638 13.7052 13.5925 14.7777C14.7213 15.8501 16.1787 16.5116 17.732 16.6531C16.9654 17.9514 15.8015 18.97 14.4134 19.5608C13.0253 20.1515 11.484 20.2823 10.0153 19.9337C8.54667 19.5851 7.23178 18.7762 6.26761 17.6251C5.30344 16.474 4.74028 15.0406 4.66252 13.5432C4.58476 12.0458 4.99658 10.5619 5.83575 9.31798C6.67492 8.07408 7.89579 7.13792 9.31496 6.65007C10.7341 6.16221 12.2748 6.14948 13.7018 6.61378C13.9783 5.49985 14.6016 4.50261 15.4798 3.76671C15.6486 3.62524 15.8241 3.50294 16 3.5Z"
                fill={color}
            />
        </G>
    </Svg>
);

const ExactSparkIcon = ({ color = '#111111' }: { color?: string }) => (
    <Svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <Path d="M12 2C12 7.5228 16.4772 12 22 12C16.4772 12 12 16.4772 12 22C12 16.4772 7.5228 12 2 12C7.5228 12 12 7.5228 12 2Z" fill={color} />
    </Svg>
);
// ----------------------------

type NotificationCardProps = {
    timePrimary: string;
    timeSecondary: string;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ color?: string }>;
    iconColor: string;
    iconPillColor: string; // Restored prop for specific light backgrounds
    colors: any;
    isDark: boolean;
};

const NotificationCard = ({
    timePrimary,
    timeSecondary,
    title,
    subtitle,
    icon: Icon,
    iconColor,
    iconPillColor,
    colors,
    isDark,
}: NotificationCardProps) => (
    <View style={styles.sectionContainer}>
        <View style={styles.timeLabel}>
            {/* Added exact pill background color here */}
            <View style={[styles.timeIconPill, { backgroundColor: iconPillColor }]}>
                <Icon color={iconColor} />
            </View>
            <Text style={[styles.timePrimary, { color: colors.text }]}>{timePrimary}</Text>
            <Text style={[styles.timeSecondary, { color: '#8C8B9C' }]}>{timeSecondary}</Text>
        </View>

        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.surface,
                    borderColor: isDark ? colors.border : '#F3EFE6',
                    shadowOpacity: isDark ? 0 : 0.04,
                },
            ]}
        >
            <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                    <ExactSparkIcon color="#C9A227" />
                </View>
                <Text style={styles.cardSource}>Chronica</Text>
                <Text style={styles.cardTime}>now</Text>
            </View>

            <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>

            <View style={styles.cardActions}>
                <TouchableOpacity
                    style={[
                        styles.dismissBtn,
                        { borderColor: isDark ? colors.border : '#F3EFE6' },
                    ]}
                    activeOpacity={0.7}
                >
                    <Text style={styles.dismissBtnText}>Dismiss</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85}>
                    <Text style={styles.primaryBtnText}>Go to Today's Ritual</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

const Notifications: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { colors, isDark } = useAppTheme();

    // Specific Pill Backgrounds from Figma mapped for Light & Dark mode
    const morningPill = isDark ? 'rgba(201, 162, 39, 0.15)' : '#F8F2DE'; // Light Yellow
    const eveningPill = isDark ? 'rgba(142, 120, 209, 0.15)' : '#EFEAFD'; // Light Purple
    const weeklyPill = isDark ? 'rgba(59, 130, 246, 0.15)' : '#EAF5FE'; // Light Blue

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        backBtn: { backgroundColor: isDark ? colors.surfaceMuted : '#FAFAFA' },
        headerDivider: { backgroundColor: isDark ? colors.border : '#F3EFE6' },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.headerRow}>
                <TouchableOpacity
                    style={[styles.backButton, dynamicStyles.backBtn]}
                    activeOpacity={0.8}
                    onPress={() => navigation?.goBack()}
                >
                    <ArrowLeftIcon color={colors.text} />
                </TouchableOpacity>
                <View style={styles.headerTextWrap}>
                    <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
                    <Text style={styles.headerSubtitle}>
                        Gentle nudges to mark each day. Calm, not noisy.
                    </Text>
                </View>
            </View>

            <View style={[styles.headerDivider, dynamicStyles.headerDivider]} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <NotificationCard
                    timePrimary="Morning"
                    timeSecondary="9:00 AM"
                    title="Today is one of your life days"
                    subtitle="April 15 — Begin with intention. Set the tone for this day."
                    icon={SunIcon}
                    iconColor={colors.text}
                    iconPillColor={morningPill}
                    colors={colors}
                    isDark={isDark}
                />

                <NotificationCard
                    timePrimary="Evening"
                    timeSecondary="8:00 PM"
                    title="Don't leave today empty"
                    subtitle="A few quiet reflections before this day closes forever."
                    icon={MoonIcon}
                    iconColor={yellow}
                    iconPillColor={eveningPill}
                    colors={colors}
                    isDark={isDark}
                />

                <NotificationCard
                    timePrimary="Weekly"
                    timeSecondary="Sunday · 7:00 PM"
                    title="Your week in review"
                    subtitle="See how many days you lived fully. Your rhythm awaits."
                    icon={ExactSparkIcon}
                    iconColor={colors.text}
                    iconPillColor={weeklyPill}
                    colors={colors}
                    isDark={isDark}
                />

                <View style={[styles.disclaimer, { borderColor: isDark ? colors.border : '#F3EFE6', backgroundColor: colors.surface }]}>
                    <View style={styles.disclaimerIconWrap}>
                        <BellIcon color={yellow} />
                    </View>
                    <Text style={styles.disclaimerText}>
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
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 16,
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
    title: {
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 2,
        letterSpacing: -0.3,
    },
    headerSubtitle: {
        fontSize: 12.5,
        color: '#8C8B9C',
    },
    headerDivider: {
        height: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 34,
    },
    sectionContainer: {
        marginBottom: 26,
    },
    timeLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    timeIconPill: {
        width: 24,
        height: 24,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    timePrimary: {
        fontSize: 13,
        fontWeight: '700',
        marginRight: 4,
    },
    timeSecondary: {
        fontSize: 13,
        fontWeight: '400',
    },
    card: {
        borderRadius: 24,
        borderWidth: 1,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 12,
        elevation: 2,
        padding: 18,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 26,
        height: 26,
        borderRadius: 7,
        backgroundColor: '#1A1523',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    cardSource: {
        fontSize: 13.5,
        fontWeight: '400',
        color: '#8C8B9C',
    },
    cardTime: {
        marginLeft: 'auto',
        fontSize: 12.5,
        fontWeight: '400',
        color: '#B4B4B4',
    },
    cardTitle: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: -0.3,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 13.5,
        lineHeight: 19,
        color: '#8C8B9C',
        marginBottom: 20,
    },
    cardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    dismissBtn: {
        flex: 1,
        height: 48,
        borderRadius: 14,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dismissBtnText: {
        color: '#8C8B9C',
        fontWeight: '500',
        fontSize: 14.5,
    },
    primaryBtn: {
        flex: 1.6,
        height: 48,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C9A227',
    },
    primaryBtnText: {
        color: '#FFFFFF',
        fontWeight: '600',
        fontSize: 14.5,
        letterSpacing: 0.1,
    },
    disclaimer: {
        borderRadius: 20,
        borderWidth: 1,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    disclaimerIconWrap: {
        marginRight: 10,
        marginTop: 2,
    },
    disclaimerText: {
        flex: 1,
        fontSize: 12,
        lineHeight: 18,
        color: '#8C8B9C',
    },
});

export default Notifications;