import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { setTheme, ThemeOption } from '../store/slices/ThemeSlice';
import { useAppTheme } from '../hooks/useAppTheme';
import useFetch from '../hooks/useFetch';
import useSubmit from '../hooks/useSubmit';

import { CustomSwitch } from '../components/CustomSwith';
import LogoutModal from '../components/LogoutModal';
import { ChevronLeftIcon, ChevronRightIcon } from '../utils/icons';
import messaging from '@react-native-firebase/messaging';

import {
    white,
    gray,
    darkPurple,
    lightPurple,
    yellow
} from '../utils/colors';

const Settings = ({ navigation }: any) => {
    const dispatch = useDispatch();

    // --- Theme Hook ---
    const { colors, themeOption } = useAppTheme();

    // --- API Hooks for Notifications ---
    const { data: prefData, loading: prefLoading } = useFetch('notifications/preferences', { isAuth: true });
    const { submit } = useSubmit({ isAuth: true });

    const [selectedLifeSpan, setSelectedLifeSpan] = useState(60);

    // --- Notification States ---
    const [preferences, setPreferences] = useState({
        morning: false,
        evening: false,
        weekly: false,
    });

    useEffect(() => {
        if (prefData) {
            setPreferences({
                morning: !!(prefData as any).morning_enabled,
                evening: !!(prefData as any).evening_enabled,
                weekly: !!(prefData as any).weekly_enabled,
            });
        }
    }, [prefData]);

    const togglePreference = async (key: 'morning' | 'evening' | 'weekly') => {
        const newValue = !preferences[key];
        setPreferences(prev => ({ ...prev, [key]: newValue }));
        const apiKey = `${key}_enabled`;

        try {
            await submit('notifications/preferences', { [apiKey]: newValue }, { method: 'PATCH' });
        } catch (error) {
            console.error(`Failed to update ${key} preference`, error);
            setPreferences(prev => ({ ...prev, [key]: !newValue }));
        }
    };

    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);

    const handleBack = () => navigation?.goBack();

    const handleConfirmLogout = async () => {
        setIsLogoutModalVisible(false);

        try {
            const token = await messaging().getToken();

            if (token) {
                await submit('notifications/device-tokens', { token }, { method: 'DELETE' });
                console.log("Device token deleted from backend.");
            }
        } catch (error) {
            console.log("Failed to delete device token on logout", error);
        } finally {
            dispatch(logout());
        }
    }

    const handleThemeSelect = (option: ThemeOption) => {
        dispatch(setTheme(option));
        setIsThemeModalVisible(false);
    };

    const getThemeDisplayText = () => {
        if (themeOption === 'system') return 'System Default';
        if (themeOption === 'dark') return 'Dark Mode';
        return 'Light Mode';
    };

    // --- Dynamic Styles ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        textMain: { color: colors.text },
        textSecondary: { color: colors.textSecondary },
        cardBase: { backgroundColor: colors.surface, borderColor: colors.border },
        cardUnselected: { backgroundColor: colors.surfaceMuted, borderColor: colors.border },
        borderOverlay: { borderColor: colors.border }
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            {/* --- Header --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <ChevronLeftIcon color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, dynamicStyles.textMain]}>Settings</Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* --- Section: Life Span View --- */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Your Life Span View</Text>
                    <Text style={[styles.sectionSubtitle, dynamicStyles.textSecondary]}>Choose how to visualize your life timeline</Text>

                    {[
                        { years: 60, days: '21,900 days' },
                        { years: 80, days: '29,200 days' },
                        { years: 100, days: '36,500 days' },
                    ].map((item) => {
                        const isSelected = selectedLifeSpan === item.years;
                        return (
                            <TouchableOpacity
                                key={item.years}
                                activeOpacity={0.9}
                                onPress={() => setSelectedLifeSpan(item.years)}
                                style={[styles.cardBase, dynamicStyles.cardBase, !isSelected && dynamicStyles.cardUnselected]}
                            >
                                {isSelected && (
                                    <LinearGradient
                                        colors={[lightPurple, darkPurple]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        style={StyleSheet.absoluteFill}
                                    />
                                )}
                                <Text style={[styles.cardTitle, dynamicStyles.textMain, isSelected && { color: white }]}>
                                    {item.years} years
                                </Text>
                                <Text style={[styles.cardRightText, dynamicStyles.textSecondary, isSelected && { color: 'rgba(255,255,255,0.6)' }]}>
                                    {item.days}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* --- Section: Notifications (API INTEGRATED) --- */}
                <View style={styles.section}>
                    <View style={styles.rowBetween}>
                        <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Notifications</Text>
                        {prefLoading && <ActivityIndicator size="small" color={yellow} />}
                    </View>

                    <View style={[styles.cardBase, dynamicStyles.cardUnselected, styles.cardRow, { marginBottom: 8 }]}>
                        <View style={styles.cardTextContent}>
                            <Text style={[styles.cardTitle, dynamicStyles.textMain]}>Morning Reminder</Text>
                            <Text style={[styles.cardDescription, dynamicStyles.textSecondary]}>Today is one of your life days.</Text>
                        </View>
                        <CustomSwitch
                            value={preferences.morning}
                            onValueChange={() => togglePreference('morning')}
                            activeColor={colors.primary}
                            inactiveColor={colors.border}
                        />
                    </View>

                    <View style={[styles.cardBase, dynamicStyles.cardUnselected, styles.cardRow, { marginBottom: 8 }]}>
                        <View style={styles.cardTextContent}>
                            <Text style={[styles.cardTitle, dynamicStyles.textMain]}>Evening Prompt</Text>
                            <Text style={[styles.cardDescription, dynamicStyles.textSecondary]}>Don't let today pass undocumented.</Text>
                        </View>
                        <CustomSwitch
                            value={preferences.evening}
                            onValueChange={() => togglePreference('evening')}
                            activeColor={colors.primary}
                            inactiveColor={colors.border}
                        />
                    </View>

                    <View style={[styles.cardBase, dynamicStyles.cardUnselected, styles.cardRow]}>
                        <View style={styles.cardTextContent}>
                            <Text style={[styles.cardTitle, dynamicStyles.textMain]}>Weekly Reflection</Text>
                            <Text style={[styles.cardDescription, dynamicStyles.textSecondary]}>Reflect on the week that has passed.</Text>
                        </View>
                        <CustomSwitch
                            value={preferences.weekly}
                            onValueChange={() => togglePreference('weekly')}
                            activeColor={colors.primary}
                            inactiveColor={colors.border}
                        />
                    </View>
                </View>

                {/* --- Section: Appearance --- */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Appearance</Text>
                    <TouchableOpacity
                        style={[styles.cardBase, dynamicStyles.cardUnselected, styles.cardRow]}
                        onPress={() => setIsThemeModalVisible(true)}
                    >
                        <View style={styles.cardTextContent}>
                            <Text style={[styles.cardTitle, dynamicStyles.textMain]}>Theme</Text>
                            <Text style={[styles.cardDescription, { color: colors.accent, fontWeight: '600' }]}>
                                {getThemeDisplayText()}
                            </Text>
                        </View>
                        <ChevronRightIcon color={colors.accent} />
                    </TouchableOpacity>
                </View>

                {/* --- Section: Account --- */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Account</Text>

                    <TouchableOpacity style={[styles.cardBase, dynamicStyles.cardBase, styles.cardRow]}>
                        <Text style={[styles.cardTitle, dynamicStyles.textMain]}>Profile Settings</Text>
                        <ChevronRightIcon color={colors.accent} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.cardBase, dynamicStyles.cardBase, styles.cardRow]}>
                        <Text style={[styles.cardTitle, dynamicStyles.textMain]}>Email & Password</Text>
                        <ChevronRightIcon color={colors.accent} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.cardBase, dynamicStyles.cardBase, styles.cardRow]}
                        onPress={() => navigation.navigate("SubscriptionScreen")}
                    >
                        <Text style={[styles.cardTitle, dynamicStyles.textMain]}>Subscription</Text>
                        <ChevronRightIcon color={colors.accent} />
                    </TouchableOpacity>
                </View>

                {/* --- Section: Privacy & Data --- */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Privacy & Data</Text>
                    <Text style={[styles.sectionSubtitle, dynamicStyles.textSecondary]}>How your data is used and protected</Text>
                    {['Privacy Policy', 'Terms of Service', 'Your Data'].map((title) => (
                        <TouchableOpacity key={title} style={[styles.cardBase, dynamicStyles.cardBase, styles.cardRow]}>
                            <Text style={[styles.cardTitle, dynamicStyles.textMain]}>{title}</Text>
                            <ChevronRightIcon color={colors.accent} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- Section: Support --- */}
                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, dynamicStyles.textMain]}>Support</Text>
                    {['Help Center', 'Contact Support'].map((title) => (
                        <TouchableOpacity key={title} style={[styles.cardBase, dynamicStyles.cardBase, styles.cardRow]}>
                            <Text style={[styles.cardTitle, dynamicStyles.textMain]}>{title}</Text>
                            <ChevronRightIcon color={colors.accent} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- Logout Trigger --- */}
                <TouchableOpacity
                    style={[styles.cardBase, dynamicStyles.cardBase, { justifyContent: 'center', marginTop: 10, borderColor: gray }]}
                    onPress={() => setIsLogoutModalVisible(true)}
                >
                    <Text style={[styles.cardTitle, { color: gray }]}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>

            <LogoutModal
                visible={isLogoutModalVisible}
                onClose={() => setIsLogoutModalVisible(false)}
                onConfirm={handleConfirmLogout}
            />

            <Modal
                visible={isThemeModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsThemeModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsThemeModalVisible(false)}
                >
                    <View style={[styles.themeModalContent, { backgroundColor: colors.surface }]}>
                        <Text style={[styles.modalTitle, dynamicStyles.textMain, { marginBottom: 20 }]}>Select Theme</Text>

                        {(['system', 'light', 'dark'] as ThemeOption[]).map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={[
                                    styles.themeOptionBtn,
                                    dynamicStyles.borderOverlay,
                                    themeOption === option && { backgroundColor: colors.surfaceMuted }
                                ]}
                                onPress={() => handleThemeSelect(option)}
                            >
                                <Text style={[styles.cardTitle, dynamicStyles.textMain, { textTransform: 'capitalize' }]}>
                                    {option === 'system' ? 'System Default' : option}
                                </Text>
                                {themeOption === option && <ChevronRightIcon color={colors.accent} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
};

export default Settings;

// Static Layout Styles
const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 56, paddingHorizontal: 20 },
    backButton: { position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'center' },
    headerTitle: { fontSize: 17, fontWeight: '700' },
    scrollContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
    section: { marginBottom: 24 },
    rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    sectionTitle: { fontSize: 16, fontWeight: '800', marginBottom: 4 },
    sectionSubtitle: { fontSize: 13, marginBottom: 12 },
    cardBase: { borderRadius: 16, paddingVertical: 18, paddingHorizontal: 16, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, overflow: 'hidden' },
    cardRow: { alignItems: 'center' },
    cardTextContent: { flex: 1, paddingRight: 12 },
    cardTitle: { fontSize: 15, fontWeight: '600' },
    cardDescription: { fontSize: 12, marginTop: 4, lineHeight: 18 },
    cardRightText: { fontSize: 14, fontWeight: '500' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' },
    themeModalContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
    modalTitle: { fontSize: 20, fontWeight: '800' },
    themeOptionBtn: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, paddingHorizontal: 12, borderBottomWidth: 1, borderRadius: 8 }
});