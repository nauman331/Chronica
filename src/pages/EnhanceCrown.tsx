import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, Platform } from 'react-native';
import React from 'react';
import BottomTabBar from '../components/BottomTabBar';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Keep fixed brand colors for the specific input categories
import { yellow, lightBlue, lightGreen } from '../utils/colors';
import { BellIcon, SparkIcon, ReflectionIcon, ArrowUpIcon } from '../utils/icons';

const EnhanceCrown: React.FC<{ navigation: any }> = ({ navigation }) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        safeArea: { backgroundColor: colors.background },
        container: { backgroundColor: colors.background },
        headerSubtitle: { color: colors.textSecondary },
        headerTitle: { color: colors.text },
        headerDate: { color: colors.textSecondary },
        bellButton: { backgroundColor: colors.surfaceMuted },
        notificationDot: { borderColor: colors.surfaceMuted }, // Matches bell background
        divider: { backgroundColor: colors.border },
        iconBox: { backgroundColor: colors.surfaceMuted }, // Adapts for dark mode
        itemSubtitle: { color: colors.textSecondary },
        bottomActionContainer: { backgroundColor: colors.background },
        primaryButton: {
            backgroundColor: yellow,
            shadowColor: yellow,
        }
    });

    return (
        <SafeAreaView style={[styles.safeArea, dynamicStyles.safeArea]}>
            <View style={[styles.container, dynamicStyles.container]}>

                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>Today's Ritual</Text>
                        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{dayName}</Text>
                        <Text style={[styles.headerDate, dynamicStyles.headerDate]}>{formattedDate}</Text>
                    </View>

                    <Pressable style={[styles.bellButton, dynamicStyles.bellButton]}
                        onPress={() => navigation.navigate('Notifications')}
                    >
                        {/* REMOVED color prop to fix TypeScript error */}
                        <BellIcon />
                        <View style={[styles.notificationDot, dynamicStyles.notificationDot]} />
                    </Pressable>
                </View>

                <View style={[styles.divider, dynamicStyles.divider]} />

                {/* Scrollable Content */}
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    {/* Intention */}
                    <View style={styles.ritualItem}>
                        <View style={styles.iconRow}>
                            <View style={[styles.iconBox, dynamicStyles.iconBox]}>
                                {/* Assuming SparkIcon is typed correctly to take color */}
                                <SparkIcon color={yellow} />
                            </View>
                            <Text style={[styles.itemTitle, { color: yellow }]}>Intention</Text>
                        </View>
                        <Text style={[styles.itemSubtitle, dynamicStyles.itemSubtitle]}>What matters most today?</Text>
                    </View>

                    {/* Reflection */}
                    <View style={styles.ritualItem}>
                        <View style={styles.iconRow}>
                            <View style={[styles.iconBox, dynamicStyles.iconBox]}>
                                {/* REMOVED color prop to fix TypeScript error */}
                                <ReflectionIcon />
                            </View>
                            <Text style={[styles.itemTitle, { color: lightBlue }]}>Reflection</Text>
                        </View>
                        <Text style={[styles.itemSubtitle, dynamicStyles.itemSubtitle]}>What did today teach you?</Text>
                    </View>

                    {/* Achievement */}
                    <View style={styles.ritualItem}>
                        <View style={styles.iconRow}>
                            <View style={[styles.iconBox, dynamicStyles.iconBox]}>
                                {/* REMOVED color prop to fix TypeScript error */}
                                <ArrowUpIcon />
                            </View>
                            <Text style={[styles.itemTitle, { color: lightGreen }]}>Achievement</Text>
                        </View>
                        <Text style={[styles.itemSubtitle, dynamicStyles.itemSubtitle]}>What moved your life forward?</Text>
                    </View>

                </ScrollView>

                {/* Bottom Action Area */}
                <View style={[styles.bottomActionContainer, dynamicStyles.bottomActionContainer]}>
                    <View style={[styles.divider, dynamicStyles.divider]} />
                    <Pressable
                        style={[styles.primaryButton, dynamicStyles.primaryButton]}
                        onPress={() => navigation.navigate('EnhanceCrownEmotion')}
                    >
                        <Text style={styles.primaryButtonText}>Crown This Day</Text>
                        {/* Assuming SparkIcon is typed correctly to take color */}
                        <SparkIcon color="#FFFFFF" />
                    </Pressable>
                </View>

                {/* Fixed Bottom Tab Bar */}
                <BottomTabBar activeTab="today" />

            </View>
        </SafeAreaView>
    );
};

export default EnhanceCrown;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: 20,
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 4
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 4
    },
    headerDate: {
        fontSize: 13,
    },
    bellButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    notificationDot: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#FF4B4B',
        borderWidth: 1.5,
    },
    divider: {
        height: 1,
        width: '100%'
    },
    scrollContent: {
        paddingVertical: 40,
        gap: 50,
        alignItems: 'center',
    },
    ritualItem: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    itemSubtitle: {
        fontSize: 14,
    },
    bottomActionContainer: {
        paddingBottom: 24,
    },
    primaryButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        gap: 8,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500'
    },
});