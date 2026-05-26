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

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Icons
import { ChevronLeftIcon } from '../utils/icons';

// Brand colors for static accents
import { yellow, white, lightyellow, darkPurple } from '../utils/colors';

const SubscriptionScreen = ({ navigation }: any) => {
    // --- 1. Get dynamic colors & theme ---
    const { colors, isDark } = useAppTheme();

    const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('yearly');

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        headerTitle: { color: colors.text },
        mainTitle: { color: colors.text },
        subtitle: { color: colors.textSecondary },
        valuePropTitle: { color: colors.text },
        valuePropText: { color: colors.textSecondary },

        // Unselected card styles
        cardUnselected: {
            backgroundColor: colors.surface,
            borderColor: colors.border
        },
        // Selected card styles (Brand Yellow)
        cardSelected: {
            backgroundColor: isDark ? 'rgba(201, 162, 39, 0.1)' : '#FFFCF3', // Dark mode gets a tinted overlay, light mode gets lightyellow
            borderColor: yellow,
        },

        planTitle: { color: colors.text },
        planPrice: { color: colors.text },
        planDuration: { color: colors.textSecondary },

        // The radio circle
        radioOuterUnselected: { borderColor: colors.border },
        radioOuterSelected: { borderColor: yellow },

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

                {/* --- Quote Card --- */}
                <View style={styles.quoteCardContainer}>
                    <LinearGradient
                        colors={['#241C35', '#120E1C']} // Deep dark purple/black from the design
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
                        activeOpacity={0.8}
                        style={[
                            styles.planCard,
                            selectedPlan === 'monthly' ? dynamicStyles.cardSelected : dynamicStyles.cardUnselected
                        ]}
                        onPress={() => setSelectedPlan('monthly')}
                    >
                        <View style={styles.planInfo}>
                            <Text style={[styles.planTitle, dynamicStyles.planTitle]}>Monthly</Text>
                            <Text style={[styles.planPrice, dynamicStyles.planPrice]}>
                                $9.99 <Text style={[styles.planDuration, dynamicStyles.planDuration]}>/month</Text>
                            </Text>
                        </View>
                        <View style={[
                            styles.radioOuter,
                            selectedPlan === 'monthly' ? dynamicStyles.radioOuterSelected : dynamicStyles.radioOuterUnselected
                        ]}>
                            {selectedPlan === 'monthly' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                    {/* Yearly Plan */}
                    <TouchableOpacity
                        activeOpacity={0.8}
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
                                $89 <Text style={[styles.planDuration, dynamicStyles.planDuration]}>/year</Text>
                            </Text>
                        </View>
                        <View style={[
                            styles.radioOuter,
                            selectedPlan === 'yearly' ? dynamicStyles.radioOuterSelected : dynamicStyles.radioOuterUnselected
                        ]}>
                            {selectedPlan === 'yearly' && <View style={styles.radioInner} />}
                        </View>
                    </TouchableOpacity>

                </View>

                {/* --- Call To Action --- */}
                <View style={styles.ctaSection}>
                    <TouchableOpacity
                        style={styles.ctaButton}
                        activeOpacity={0.8}
                        onPress={() => {/* Handle Subscription Logic */ }}
                    >
                        <Text style={styles.ctaButtonText}>Start 7-Day Free Trial</Text>
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

// --- 3. Static Layout Styles (No Colors Here) ---
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
        fontSize: 15,
        fontWeight: '600',
    },
    headerSpacer: {
        width: 40, // Balances the back button for absolute centering of title
    },
    scrollContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },

    // Hero
    heroSection: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 32,
    },
    mainTitle: {
        fontSize: 34,
        fontWeight: '700',
        textAlign: 'center',
        lineHeight: 42,
        letterSpacing: -0.5,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
    },

    // Quote Card
    quoteCardContainer: {
        borderRadius: 24,
        paddingVertical: 40,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 8,
    },
    quoteText: {
        color: white,
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    quoteAuthor: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
        fontWeight: '500',
    },

    // Value Prop
    valuePropSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    valuePropTitle: {
        fontSize: 18,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12,
    },
    valuePropText: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
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
        borderWidth: 1.5,
        padding: 20,
    },
    planInfo: {
        flex: 1,
    },
    yearlyHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    planTitle: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
    },
    badge: {
        backgroundColor: '#D1A342', // A specific muted gold that fits well inside the yellow card
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8, // Align with title
    },
    badgeText: {
        color: white,
        fontSize: 11,
        fontWeight: '700',
    },
    planPrice: {
        fontSize: 24,
        fontWeight: '700',
        letterSpacing: -0.5,
    },
    planDuration: {
        fontSize: 14,
        fontWeight: '500',
    },

    // Radio Buttons
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: yellow,
    },

    // CTA
    ctaSection: {
        alignItems: 'center',
    },
    ctaButton: {
        width: '100%',
        backgroundColor: '#181423', // Matches the very dark aesthetic of the button in the design
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#181423',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
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
    },
});