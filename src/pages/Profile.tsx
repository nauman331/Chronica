import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import LogoutModal from '../components/LogoutModal';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

import {
    UserIcon,
    CalendarIcon,
    ChevronRightIcon,
    HourglassIcon,
    SubscriptionIcon,
    WidgetsIcon,
    SettingsIcon,
    SignOutIcon,
    SparkleSmallIcon
} from '../utils/icons';

// Keep fixed brand colors for gradients and accents
import {
    white,
    yellow,
    lightyellow,
    lightPurple,
    darkPurple
} from '../utils/colors';

const Profile = ({ navigation }: any) => {
    const dispatch = useDispatch();

    // --- 1. Get dynamic colors & theme state ---
    const { colors, isDark } = useAppTheme();

    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleConfirmLogout = () => {
        setIsLogoutModalVisible(false);
        dispatch(logout());
    };

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        badge: { borderColor: colors.background },
        userName: { color: colors.text },
        userSubtitle: { color: colors.textSecondary },

        statCard: { backgroundColor: colors.surface },
        statValue: { color: colors.text },
        statLabel: { color: colors.textSecondary },
        statSubLabel: { color: colors.textSecondary },

        listContainer: { backgroundColor: colors.surface },
        borderBottom: { borderBottomColor: colors.border },
        listTitle: { color: colors.text },
        listSubtitle: { color: colors.textSecondary },

        // Use surfaceMuted for standard menu icons so they adapt in dark mode
        menuIconCircle: { backgroundColor: colors.surfaceMuted },
        // Use a themed transparent red for the sign out button background
        signOutIconCircle: { backgroundColor: isDark ? 'rgba(229, 57, 53, 0.15)' : '#FFF1F1' },
        signOutText: { color: colors.danger },

        bottomTabContainer: {
            backgroundColor: colors.background,
            borderTopColor: colors.border
        }
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* --- Header --- */}
                <View style={styles.headerContainer}>
                    <View style={styles.avatarWrapper}>
                        <LinearGradient
                            colors={[darkPurple, lightPurple]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.avatarCircle}
                        >
                            <UserIcon color={yellow} />
                        </LinearGradient>
                        <View style={[styles.badge, dynamicStyles.badge]}>
                            <SparkleSmallIcon color={white} />
                        </View>
                    </View>
                    <Text style={[styles.userName, dynamicStyles.userName]}>Chronica User</Text>
                    <Text style={[styles.userSubtitle, dynamicStyles.userSubtitle]}>32 years old · 11,791 days lived</Text>
                </View>

                {/* --- Life Progress Card (Fixed Dark Theme for Brand Consistency) --- */}
                <View style={styles.progressCardContainer}>
                    <LinearGradient
                        colors={[darkPurple, lightPurple]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />

                    <View style={styles.progressCardContent}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabelText}>Life Progress</Text>
                            <Text style={styles.progressLabelText}>Age 32</Text>
                        </View>
                        <View style={styles.progressDataRow}>
                            <Text style={styles.progressPercentage}>40.4%</Text>
                            <Text style={styles.progressTotal}>of 80 years</Text>
                        </View>

                        <View style={styles.progressBarTrack}>
                            <View style={[styles.progressBarFill, { width: '40.4%' }]} />
                        </View>

                        <View style={styles.progressFooter}>
                            <Text style={styles.progressLabelText}>Born</Text>
                            <Text style={styles.progressLabelText}>Age 80</Text>
                        </View>
                    </View>
                </View>

                {/* --- Stats Grid --- */}
                <View style={styles.statsGrid}>
                    <View style={[styles.statCard, dynamicStyles.statCard]}>
                        <Text style={[styles.statValue, dynamicStyles.statValue]}>48</Text>
                        <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Years remaining</Text>
                        <Text style={[styles.statSubLabel, dynamicStyles.statSubLabel]}>to age 80</Text>
                    </View>
                    <View style={[styles.statCard, dynamicStyles.statCard]}>
                        <Text style={[styles.statValue, dynamicStyles.statValue]}>17,409</Text>
                        <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Days ahead</Text>
                        <Text style={[styles.statSubLabel, dynamicStyles.statSubLabel]}>approx.</Text>
                    </View>
                    <View style={[styles.statCard, dynamicStyles.statCard]}>
                        {/* Fixed brand color for this specific stat */}
                        <Text style={[styles.statValue, { color: '#4A85F6' }]}>1,684</Text>
                        <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Weeks lived</Text>
                        <Text style={[styles.statSubLabel, dynamicStyles.statSubLabel]}>of 4,160</Text>
                    </View>
                    <View style={[styles.statCard, dynamicStyles.statCard]}>
                        {/* Fixed brand color for this specific stat */}
                        <Text style={[styles.statValue, { color: yellow }]}>261</Text>
                        <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Days to birthday</Text>
                        <Text style={[styles.statSubLabel, dynamicStyles.statSubLabel]}>turning 33</Text>
                    </View>
                </View>

                {/* --- Info List (Dates) --- */}
                <View style={[styles.listContainer, dynamicStyles.listContainer]}>
                    <View style={[styles.listItem, styles.borderBottom, dynamicStyles.borderBottom]}>
                        {/* Kept brand lightyellow for birthdate */}
                        <View style={[styles.listIconCircle, { backgroundColor: isDark ? colors.surfaceMuted : lightyellow }]}>
                            <CalendarIcon color={yellow} />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listSubtitle, dynamicStyles.listSubtitle]}>Date of Birth</Text>
                            <Text style={[styles.listTitle, dynamicStyles.listTitle]}>January 1, 1994</Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={[styles.listIconCircle, { backgroundColor: isDark ? colors.surfaceMuted : '#F0FDF4' }]}>
                            <HourglassIcon color="#10B981" />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listSubtitle, dynamicStyles.listSubtitle]}>Time on Earth</Text>
                            <Text style={[styles.listTitle, dynamicStyles.listTitle]}>11,791 days · 1,684 weeks</Text>
                        </View>
                    </View>
                </View>

                {/* --- Actions Menu --- */}
                <View style={[styles.listContainer, dynamicStyles.listContainer]}>
                    <TouchableOpacity style={[styles.listItem, styles.borderBottom, dynamicStyles.borderBottom]} activeOpacity={0.7}
                        onPress={() => navigation.navigate("SubscriptionScreen")}
                    >
                        <View style={[styles.listIconCircle, dynamicStyles.menuIconCircle]}>
                            <SubscriptionIcon />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listTitle, dynamicStyles.listTitle]}>Subscription</Text>
                            <Text style={[styles.listSubtitle, dynamicStyles.listSubtitle]}>Buy plans</Text>
                        </View>
                        <ChevronRightIcon color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.listItem, styles.borderBottom, dynamicStyles.borderBottom]} activeOpacity={0.7}
                        onPress={() => navigation.navigate("WidgetsScreen")}
                    >
                        <View style={[styles.listIconCircle, dynamicStyles.menuIconCircle]}>
                            <WidgetsIcon />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listTitle, dynamicStyles.listTitle]}>Widgets</Text>
                            <Text style={[styles.listSubtitle, dynamicStyles.listSubtitle]}>Today · Progress · Streak</Text>
                        </View>
                        <ChevronRightIcon color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.listItem, styles.borderBottom, dynamicStyles.borderBottom]}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("Settings")}
                    >
                        <View style={[styles.listIconCircle, dynamicStyles.menuIconCircle]}>
                            <SettingsIcon />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listTitle, dynamicStyles.listTitle]}>Settings</Text>
                            <Text style={[styles.listSubtitle, dynamicStyles.listSubtitle]}>Preferences</Text>
                        </View>
                        <ChevronRightIcon color={colors.textSecondary} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.listItem}
                        activeOpacity={0.7}
                        onPress={() => setIsLogoutModalVisible(true)}
                    >
                        <View style={[styles.listIconCircle, dynamicStyles.signOutIconCircle]}>
                            <SignOutIcon />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listTitle, dynamicStyles.signOutText]}>Sign out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="profile" />
            </View>

            {/* --- Reusable Modal --- */}
            <LogoutModal
                visible={isLogoutModalVisible}
                onClose={() => setIsLogoutModalVisible(false)}
                onConfirm={handleConfirmLogout}
            />
        </SafeAreaView>
    );
};

export default Profile;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
    },
    avatarCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: yellow,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    badge: {
        position: 'absolute',
        bottom: -5,
        right: 0,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: yellow,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    userSubtitle: {
        fontSize: 14,
    },
    progressCardContainer: {
        borderRadius: 24,
        marginBottom: 16,
        overflow: 'hidden',
    },
    progressCardContent: {
        padding: 20,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    progressLabelText: {
        color: 'rgba(255, 255, 255, 0.5)', // Keeps contrast against dark gradient
        fontSize: 12,
        fontWeight: '500',
    },
    progressDataRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 16,
    },
    progressPercentage: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '800',
    },
    progressTotal: {
        color: yellow,
        fontSize: 16,
        fontWeight: '600',
    },
    progressBarTrack: {
        height: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 4,
        marginBottom: 12,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: yellow,
        borderRadius: 4,
    },
    progressFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statCard: {
        width: '48%',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    statValue: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 6,
        letterSpacing: -0.5,
    },
    statLabel: {
        fontSize: 14,
        marginBottom: 2,
    },
    statSubLabel: {
        fontSize: 12,
    },
    listContainer: {
        borderRadius: 20,
        marginBottom: 16,
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
    },
    borderBottom: {
        borderBottomWidth: 1,
    },
    listIconCircle: {
        width: 40,
        height: 40,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    listContent: {
        flex: 1,
    },
    listTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    listSubtitle: {
        fontSize: 13,
    },
    bottomTabContainer: {
        justifyContent: 'flex-end',
        borderTopWidth: 1,
    },
});