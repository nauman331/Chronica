import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
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
    gray,
    COLOR_TEXT_MAIN,
    lightyellow,
    lightPurple,
    darkPurple
} from '../utils/colors';

const Profile = ({ navigation }: any) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >

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
                        <View style={styles.badge}>
                            <SparkleSmallIcon color={white} />
                        </View>
                    </View>
                    <Text style={styles.userName}>Chronica User</Text>
                    <Text style={styles.userSubtitle}>32 years old · 11,791 days lived</Text>
                </View>

                {/* --- Life Progress Card --- */}
                <View style={styles.progressCardContainer}>
                    {/* The Gradient acts ONLY as an absolute background layer */}
                    <LinearGradient
                        colors={[darkPurple, lightPurple]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />

                    {/* The content sits normally inside with perfect padding */}
                    <View style={styles.progressCardContent}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabelText}>Life Progress</Text>
                            <Text style={styles.progressLabelText}>Age 32</Text>
                        </View>
                        <View style={styles.progressDataRow}>
                            <Text style={styles.progressPercentage}>40.4%</Text>
                            <Text style={styles.progressTotal}>of 80 years</Text>
                        </View>

                        {/* Progress Bar Track */}
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
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>48</Text>
                        <Text style={styles.statLabel}>Years remaining</Text>
                        <Text style={styles.statSubLabel}>to age 80</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={styles.statValue}>17,409</Text>
                        <Text style={styles.statLabel}>Days ahead</Text>
                        <Text style={styles.statSubLabel}>approx.</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statValue, { color: '#4A85F6' }]}>1,684</Text>
                        <Text style={styles.statLabel}>Weeks lived</Text>
                        <Text style={styles.statSubLabel}>of 4,160</Text>
                    </View>
                    <View style={styles.statCard}>
                        <Text style={[styles.statValue, { color: yellow }]}>261</Text>
                        <Text style={styles.statLabel}>Days to birthday</Text>
                        <Text style={styles.statSubLabel}>turning 33</Text>
                    </View>
                </View>

                {/* --- Info List (Dates) --- */}
                <View style={styles.listContainer}>
                    <View style={[styles.listItem, styles.borderBottom]}>
                        <View style={[styles.listIconCircle, { backgroundColor: lightyellow }]}>
                            <CalendarIcon color={yellow} />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.listSubtitle}>Date of Birth</Text>
                            <Text style={styles.listTitle}>January 1, 1994</Text>
                        </View>
                    </View>
                    <View style={styles.listItem}>
                        <View style={[styles.listIconCircle, { backgroundColor: '#F0FDF4' }]}>
                            <HourglassIcon color="#10B981" />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.listSubtitle}>Time on Earth</Text>
                            <Text style={styles.listTitle}>11,791 days · 1,684 weeks</Text>
                        </View>
                    </View>
                </View>

                {/* --- Actions Menu --- */}
                <View style={styles.listContainer}>
                    <TouchableOpacity style={[styles.listItem, styles.borderBottom]} activeOpacity={0.7}>
                        <View style={[styles.listIconCircle, { backgroundColor: '#F3F0EC' }]}>
                            <SubscriptionIcon />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.listTitle}>Subscription</Text>
                            <Text style={styles.listSubtitle}>Buy plans</Text>
                        </View>
                        <ChevronRightIcon color="#C7C7CC" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.listItem, styles.borderBottom]} activeOpacity={0.7}>
                        <View style={[styles.listIconCircle, { backgroundColor: '#F3F0EC' }]}>
                            <WidgetsIcon />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.listTitle}>Widgets</Text>
                            <Text style={styles.listSubtitle}>Today · Progress · Streak</Text>
                        </View>
                        <ChevronRightIcon color="#C7C7CC" />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.listItem, styles.borderBottom]} activeOpacity={0.7}>
                        <View style={[styles.listIconCircle, { backgroundColor: '#F3F0EC' }]}>
                            <SettingsIcon />
                        </View>
                        <View style={styles.listContent}>
                            <Text style={styles.listTitle}>Settings</Text>
                            <Text style={styles.listSubtitle}>Preferences</Text>
                        </View>
                        <ChevronRightIcon color="#C7C7CC" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.listItem} activeOpacity={0.7}>
                        <View style={[styles.listIconCircle, { backgroundColor: '#FFF1F1' }]}>
                            <SignOutIcon />
                        </View>
                        <Pressable style={styles.listContent} onPress={handleLogout}>
                            <Text style={[styles.listTitle, { color: '#E53935' }]}>Sign out</Text>
                        </Pressable>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            <View style={styles.bottomTabContainer}>
                <BottomTabBar activeTab="profile" />
            </View>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
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
        borderColor: '#FFFFFF',
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: COLOR_TEXT_MAIN,
        letterSpacing: -0.5,
        marginBottom: 4,
    },
    userSubtitle: {
        fontSize: 14,
        color: gray,
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
        backgroundColor: "#FFFFFF",
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
        color: COLOR_TEXT_MAIN,
        marginBottom: 6,
        letterSpacing: -0.5,
    },
    statLabel: {
        fontSize: 14,
        color: gray,
        marginBottom: 2,
    },
    statSubLabel: {
        fontSize: 12,
        color: '#B0B0B0',
    },
    listContainer: {
        backgroundColor: '#FFFFFF',
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
        borderBottomColor: '#F5F5F5',
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
        color: COLOR_TEXT_MAIN,
        marginBottom: 2,
    },
    listSubtitle: {
        fontSize: 13,
        color: gray,
    },

    // --- Nav ---
    bottomTabContainer: {
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
    },
});