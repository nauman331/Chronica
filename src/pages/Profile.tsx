import React, { useState, useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    DimensionValue
} from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import LogoutModal from '../components/LogoutModal';
import EditProfileModal from '../components/EditProfileModal';
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

import {
    white,
    yellow,
    lightyellow,
    lightPurple,
    darkPurple
} from '../utils/colors';
import { RootState } from '../store/store';

const Profile = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const { userdata } = useSelector((state: RootState) => state.auth);

    const { colors, isDark } = useAppTheme();

    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const handleConfirmLogout = () => {
        setIsLogoutModalVisible(false);
        dispatch(logout());
    };

    const lifeStats = useMemo(() => {
        if (!userdata?.birth_date) {
            return {
                age: 0, daysLived: '0', weeksLived: '0',
                formattedDob: 'N/A', yearsRemaining: 80,
                daysAhead: '0', progressPercentage: 0,
                daysToBirthday: 0, turningAge: 0
            };
        }

        const birthDate = new Date(userdata.birth_date);
        const now = new Date();
        const targetAge = 80;

        const formattedDob = birthDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        let age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) {
            age--;
        }

        const diffTimeMs = now.getTime() - birthDate.getTime();
        const daysLivedNum = Math.floor(diffTimeMs / (1000 * 60 * 60 * 24));
        const weeksLivedNum = Math.floor(daysLivedNum / 7);

        const yearsRemaining = Math.max(0, targetAge - age);

        const eightiethBirthday = new Date(birthDate);
        eightiethBirthday.setFullYear(eightiethBirthday.getFullYear() + targetAge);

        const remainingTimeMs = eightiethBirthday.getTime() - now.getTime();
        const daysAheadNum = Math.max(0, Math.floor(remainingTimeMs / (1000 * 60 * 60 * 24)));

        const totalExpectedDays = daysLivedNum + daysAheadNum;
        const rawPercentage = (daysLivedNum / totalExpectedDays) * 100;
        const progressPercentage = Math.min(100, Math.max(0, rawPercentage));

        const nextBirthday = new Date(birthDate);
        nextBirthday.setFullYear(now.getFullYear());

        if (now.getTime() > nextBirthday.getTime()) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
        }

        const daysToBirthday = Math.ceil((nextBirthday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const turningAge = nextBirthday.getFullYear() - birthDate.getFullYear();

        return {
            age,
            daysLived: daysLivedNum.toLocaleString(),
            weeksLived: weeksLivedNum.toLocaleString(),
            formattedDob,
            yearsRemaining,
            daysAhead: daysAheadNum.toLocaleString(),
            progressPercentage: progressPercentage.toFixed(1),
            daysToBirthday,
            turningAge
        };
    }, [userdata?.birth_date]);


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

        menuIconCircle: { backgroundColor: colors.surfaceMuted },
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
                    <Text style={[styles.userName, dynamicStyles.userName]}>{userdata?.full_name || 'N/A'}</Text>
                    <Text style={[styles.userSubtitle, dynamicStyles.userSubtitle]}>
                        {lifeStats.age} years old · {lifeStats.daysLived} days lived
                    </Text>
                </View>

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
                            <Text style={styles.progressLabelText}>Age {lifeStats.age}</Text>
                        </View>
                        <View style={styles.progressDataRow}>
                            <Text style={styles.progressPercentage}>{lifeStats.progressPercentage}%</Text>
                            <Text style={styles.progressTotal}>of 80 years</Text>
                        </View>

                        <View style={styles.progressBarTrack}>
                            <View style={[styles.progressBarFill, { width: `${lifeStats.progressPercentage}%` as DimensionValue }]} />
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
                        <Text style={[styles.statValue, dynamicStyles.statValue]}>{lifeStats.yearsRemaining}</Text>
                        <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Years remaining</Text>
                        <Text style={[styles.statSubLabel, dynamicStyles.statSubLabel]}>to age 80</Text>
                    </View>
                    <View style={[styles.statCard, dynamicStyles.statCard]}>
                        <Text style={[styles.statValue, dynamicStyles.statValue]}>{lifeStats.daysAhead}</Text>
                        <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Days ahead</Text>
                        <Text style={[styles.statSubLabel, dynamicStyles.statSubLabel]}>approx.</Text>
                    </View>
                    <View style={[styles.statCard, dynamicStyles.statCard]}>
                        <Text style={[styles.statValue, { color: '#4A85F6' }]}>{lifeStats.weeksLived}</Text>
                        <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Weeks lived</Text>
                        <Text style={[styles.statSubLabel, dynamicStyles.statSubLabel]}>of 4,160</Text>
                    </View>
                    <View style={[styles.statCard, dynamicStyles.statCard]}>
                        <Text style={[styles.statValue, { color: yellow }]}>{lifeStats.daysToBirthday}</Text>
                        <Text style={[styles.statLabel, dynamicStyles.statLabel]}>Days to birthday</Text>
                        <Text style={[styles.statSubLabel, dynamicStyles.statSubLabel]}>turning {lifeStats.turningAge}</Text>
                    </View>
                </View>

                {/* --- Info List (Dates) --- */}
                <View style={[styles.listContainer, dynamicStyles.listContainer]}>
                    <View style={[styles.listItem, styles.borderBottom, dynamicStyles.borderBottom]}>
                        <View style={[styles.listIconCircle, { backgroundColor: isDark ? colors.surfaceMuted : lightyellow }]}>
                            <CalendarIcon color={yellow} />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listSubtitle, dynamicStyles.listSubtitle]}>Date of Birth</Text>
                            <Text style={[styles.listTitle, dynamicStyles.listTitle]}>{lifeStats.formattedDob}</Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={[styles.listIconCircle, { backgroundColor: isDark ? colors.surfaceMuted : '#F0FDF4' }]}>
                            <HourglassIcon color="#10B981" />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listSubtitle, dynamicStyles.listSubtitle]}>Time on Earth</Text>
                            <Text style={[styles.listTitle, dynamicStyles.listTitle]}>
                                {lifeStats.daysLived} days · {lifeStats.weeksLived} weeks
                            </Text>
                        </View>
                    </View>
                </View>

                {/* --- Actions Menu --- */}
                <View style={[styles.listContainer, dynamicStyles.listContainer]}>
                    <TouchableOpacity style={[styles.listItem, styles.borderBottom, dynamicStyles.borderBottom]} activeOpacity={0.7}
                        onPress={() => setIsEditModalVisible(true)}
                    >
                        <View style={[styles.listIconCircle, dynamicStyles.menuIconCircle]}>
                            <UserIcon color={yellow} />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={[styles.listTitle, dynamicStyles.listTitle]}>Edit Profile</Text>
                            <Text style={[styles.listSubtitle, dynamicStyles.listSubtitle]}>Name, Username, Birthplace</Text>
                        </View>
                        <ChevronRightIcon color={colors.textSecondary} />
                    </TouchableOpacity>
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

            <LogoutModal
                visible={isLogoutModalVisible}
                onClose={() => setIsLogoutModalVisible(false)}
                onConfirm={handleConfirmLogout}
            />
            <EditProfileModal
                visible={isEditModalVisible}
                onClose={() => setIsEditModalVisible(false)}
            />
        </SafeAreaView>
    );
};

export default Profile;

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
        color: 'rgba(255, 255, 255, 0.5)',
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