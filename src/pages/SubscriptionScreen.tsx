import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useAppTheme } from '../hooks/useAppTheme';

import { ChevronLeftIcon } from '../utils/icons';

import { yellow, white, lightPurple, darkPurple, lightyellow } from '../utils/colors';
import Toast from 'react-native-toast-message';

const SubscriptionScreen = ({ navigation }: any) => {
    const { colors, isDark } = useAppTheme();

    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        headerTitle: { color: colors.text },
        mainTitle: { color: colors.text },
        subtitle: { color: colors.textSecondary },
        valuePropTitle: { color: colors.text },
        valuePropText: { color: colors.textSecondary },

        cardUnselected: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
        },
        cardSelected: {
            backgroundColor: isDark ? lightyellow : '#FFFDF5',
            borderColor: yellow,
            borderWidth: 1.5,
            shadowColor: yellow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 12,
            elevation: 4,
        },

        planTitle: { color: colors.text },
        planPrice: { color: colors.text },
        planDuration: { color: colors.textSecondary },

        // The radio circle
        radioOuterUnselected: { borderColor: colors.border },
        radioOuterSelected: { borderColor: yellow },

        ctaButton: {
            backgroundColor: isDark ? '#FFFFFF' : darkPurple,
            shadowColor: isDark ? '#000000' : darkPurple,
        },
        ctaButtonText: {
            color: isDark ? darkPurple : white,
        },

        footerText: { color: colors.textSecondary }
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>

            {/* --- Header --- */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation?.goBack()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <ChevronLeftIcon color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>Choose Your Path</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* --- Hero Text --- */}
                <View style={styles.heroSection}>
                    <Text style={[styles.mainTitle, dynamicStyles.mainTitle]}>
                        You have 18,547{'\n'}days remaining.
                    </Text>
                    <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                        Make each one count
                    </Text>
                </View>

                {/* --- Quote Card (Now using Settings Gradient) --- */}
                <View style={styles.quoteCardContainer}>
                    <LinearGradient
                        colors={[lightPurple, darkPurple]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={StyleSheet.absoluteFill}
                    />
                    <Text style={styles.quoteText}>
                        "The whole future lies in uncertainty:{'\n'}live immediately."
                    </Text>
                    <Text style={styles.quoteAuthor}>— Seneca</Text>
                </View>

                {/* --- Value Proposition --- */}
                <View style={styles.valuePropSection}>
                    <Text style={[styles.valuePropTitle, dynamicStyles.valuePropTitle]}>
                        Chronica helps you live intentionally
                    </Text>
                    <Text style={[styles.valuePropText, dynamicStyles.valuePropText]}>
                        A simple daily practice to document your journey, reflect on what matters, and see your life as it unfolds
                    </Text>
                </View>

                {/* --- Subscription Plans --- */}
                <View style={styles.plansSection}>

                    {/* Monthly Plan */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[
                            styles.planCard,
                            selectedPlan === 'monthly' ? dynamicStyles.cardSelected : dynamicStyles.cardUnselected
                        ]}
                        onPress={() => setSelectedPlan('monthly')}
                    >
                        <View style={styles.planInfo}>
                            <Text style={[styles.planTitle, dynamicStyles.planTitle]}>Monthly</Text>
                            <Text style={[styles.planPrice, dynamicStyles.planPrice]}>
                                $4.99 <Text style={[styles.planDuration, dynamicStyles.planDuration]}>/month</Text>
                            </Text>
                        </View>
                        <View style={[
                            styles.radioOuter,
                            selectedPlan === 'monthly' ? [dynamicStyles.radioOuterSelected, styles.radioThick] : dynamicStyles.radioOuterUnselected
                        ]} />
                    </TouchableOpacity>

                    {/* Yearly Plan */}
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={[
                            styles.planCard,
                            selectedPlan === 'yearly' ? dynamicStyles.cardSelected : dynamicStyles.cardUnselected
                        ]}
                        onPress={() => setSelectedPlan('yearly')}
                    >
                        <View style={styles.planInfo}>
                            <View style={styles.yearlyHeaderRow}>
                                <Text style={[styles.planTitle, dynamicStyles.planTitle]}>Yearly</Text>
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>Save $30</Text>
                                </View>
                            </View>
                            <Text style={[styles.planPrice, dynamicStyles.planPrice]}>
                                $39.99 <Text style={[styles.planDuration, dynamicStyles.planDuration]}>/year</Text>
                            </Text>
                        </View>
                        <View style={[
                            styles.radioOuter,
                            selectedPlan === 'yearly' ? [dynamicStyles.radioOuterSelected, styles.radioThick] : dynamicStyles.radioOuterUnselected
                        ]} />
                    </TouchableOpacity>

                </View>

                {/* --- Call To Action --- */}
                <View style={styles.ctaSection}>
                    <TouchableOpacity
                        style={[styles.ctaButton, dynamicStyles.ctaButton]}
                        activeOpacity={0.8}
                        onPress={() => Toast.show({
                            type: 'success',
                            text1: 'Coming Soon',
                            text2: 'Subscription will come soon...',
                            position: 'top'
                        })}
                    >
                        <Text style={[styles.ctaButtonText, dynamicStyles.ctaButtonText]}>Start 7-Day Free Trial</Text>
                    </TouchableOpacity>
                    <Text style={[styles.footerText, dynamicStyles.footerText]}>
                        Then $89/year. Cancel anytime.
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default SubscriptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 20 : 10,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '500',
    },
    headerSpacer: {
        width: 40,
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },

    // Hero
    heroSection: {
        alignItems: 'center',
        marginTop: 4,
        marginBottom: 32,
    },
    mainTitle: {
        fontSize: 34,
        fontWeight: '500',
        textAlign: 'center',
        lineHeight: 40,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },

    // Quote Card
    quoteCardContainer: {
        borderRadius: 24,
        paddingVertical: 36,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 36,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    quoteText: {
        color: white,
        fontSize: 15,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 20,
    },
    quoteAuthor: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 13,
        fontWeight: '500',
    },

    // Value Prop
    valuePropSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    valuePropTitle: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: -0.3,
    },
    valuePropText: {
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 8,
    },

    // Plans
    plansSection: {
        gap: 16,
        marginBottom: 32,
    },
    planCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        padding: 20,
    },
    planInfo: {
        flex: 1,
    },
    yearlyHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 6,
    },
    planTitle: {
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 6,
    },
    badge: {
        backgroundColor: '#C8A43C',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        color: white,
        fontSize: 11,
        fontWeight: '500',
    },
    planPrice: {
        fontSize: 26,
        fontWeight: '500',
        letterSpacing: -0.5,
    },
    planDuration: {
        fontSize: 14,
        fontWeight: '500',
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioThick: {
        borderWidth: 6,
    },

    ctaSection: {
        alignItems: 'center',
    },
    ctaButton: {
        width: '100%',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 6,
    },
    ctaButtonText: {
        color: white,
        fontSize: 16,
        fontWeight: '600',
    },
    footerText: {
        fontSize: 12,
        fontWeight: '400',
    },
});