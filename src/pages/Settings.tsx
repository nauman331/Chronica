import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { CustomSwitch } from '../components/CustomSwith';
import LogoutModal from '../components/LogoutModal'; // <-- Import the new modal
import { ChevronLeftIcon, ChevronRightIcon } from '../utils/icons';

import {
    white,
    gray,
    COLOR_TEXT_MAIN,
    darkPurple,
    lightPurple,
    yellow,
    lightyellow
} from '../utils/colors';

const LIGHT_BG = lightyellow;
const BORDER_COLOR = '#F3EFE6';

const Settings = ({ navigation }: any) => {
    const dispatch = useDispatch();
    const [selectedLifeSpan, setSelectedLifeSpan] = useState(60);
    const [isDailyRemindersEnabled, setIsDailyRemindersEnabled] = useState(true);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

    const handleBack = () => {
        navigation?.goBack();
    };

    const handleConfirmLogout = () => {
        setIsLogoutModalVisible(false);
        dispatch(logout());
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- Header --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <ChevronLeftIcon color={COLOR_TEXT_MAIN} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* --- Section: Life Span View --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Your Life Span View</Text>
                    <Text style={styles.sectionSubtitle}>Choose how to visualize your life timeline</Text>

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
                                style={[
                                    styles.cardBase,
                                    !isSelected && styles.cardUnselected
                                ]}
                            >
                                {isSelected && (
                                    <LinearGradient
                                        colors={[lightPurple, darkPurple]}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 0, y: 1 }}
                                        style={StyleSheet.absoluteFill}
                                    />
                                )}
                                <Text style={[styles.cardTitle, isSelected && { color: white }]}>
                                    {item.years} years
                                </Text>
                                <Text style={[styles.cardRightText, isSelected && { color: 'rgba(255,255,255,0.6)' }]}>
                                    {item.days}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* --- Section: Notifications --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Notifications</Text>
                    <View style={[styles.cardBase, styles.cardUnselected, styles.cardRow]}>
                        <View style={styles.cardTextContent}>
                            <Text style={styles.cardTitle}>Daily Reminders</Text>
                            <Text style={styles.cardDescription}>Gentle nudges to complete your ritual</Text>
                        </View>
                        <CustomSwitch
                            value={isDailyRemindersEnabled}
                            onValueChange={(val: boolean) => setIsDailyRemindersEnabled(val)}
                            activeColor={darkPurple}
                            inactiveColor="#E5E5EA"
                        />
                    </View>
                </View>

                {/* --- Section: Appearance --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appearance</Text>
                    <TouchableOpacity style={[styles.cardBase, styles.cardUnselected, styles.cardRow]}>
                        <View style={styles.cardTextContent}>
                            <Text style={styles.cardTitle}>Theme</Text>
                            <Text style={[styles.cardDescription, { color: yellow, fontWeight: '600' }]}>Light mode</Text>
                        </View>
                        <ChevronRightIcon color={yellow} />
                    </TouchableOpacity>
                </View>

                {/* --- Section: Account --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account</Text>
                    {['Profile Settings', 'Email & Password', 'Subscription'].map((title) => (
                        <TouchableOpacity key={title} style={[styles.cardBase, styles.cardWhite, styles.cardRow]}>
                            <Text style={styles.cardTitle}>{title}</Text>
                            <ChevronRightIcon color={yellow} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- Section: Privacy & Data --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Privacy & Data</Text>
                    <Text style={styles.sectionSubtitle}>How your data is used and protected</Text>
                    {['Privacy Policy', 'Terms of Service', 'Your Data'].map((title) => (
                        <TouchableOpacity key={title} style={[styles.cardBase, styles.cardWhite, styles.cardRow]}>
                            <Text style={styles.cardTitle}>{title}</Text>
                            <ChevronRightIcon color={yellow} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- Section: Support --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support</Text>
                    {['Help Center', 'Contact Support'].map((title) => (
                        <TouchableOpacity key={title} style={[styles.cardBase, styles.cardWhite, styles.cardRow]}>
                            <Text style={styles.cardTitle}>{title}</Text>
                            <ChevronRightIcon color={yellow} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* --- Logout Trigger --- */}
                <TouchableOpacity
                    style={[styles.cardBase, styles.cardWhite, { justifyContent: 'center', marginTop: 10 }]}
                    onPress={() => setIsLogoutModalVisible(true)}
                >
                    <Text style={[styles.cardTitle, { color: gray }]}>Log Out</Text>
                </TouchableOpacity>

            </ScrollView>

            {/* --- Reusable Modal --- */}
            <LogoutModal
                visible={isLogoutModalVisible}
                onClose={() => setIsLogoutModalVisible(false)}
                onConfirm={handleConfirmLogout}
            />
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: COLOR_TEXT_MAIN,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: COLOR_TEXT_MAIN,
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 13,
        color: gray,
        marginBottom: 12,
    },
    cardBase: {
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        overflow: 'hidden',
    },
    cardUnselected: {
        backgroundColor: LIGHT_BG,
    },
    cardWhite: {
        backgroundColor: white,
    },
    cardRow: {
        alignItems: 'center',
    },
    cardTextContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: COLOR_TEXT_MAIN,
    },
    cardDescription: {
        fontSize: 12,
        color: gray,
        marginTop: 2,
    },
    cardRightText: {
        fontSize: 14,
        fontWeight: '500',
        color: gray,
    },
});