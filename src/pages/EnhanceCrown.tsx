import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, Platform } from 'react-native';
import React from 'react';
import BottomTabBar from '../components/BottomTabBar';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Keep fixed brand colors for the specific input categories
import { yellow, lightBlue, lightGreen } from '../utils/colors';
import { BellIcon, SparkIcon, ReflectionIcon, ArrowUpIcon } from '../utils/icons';

const EnhanceCrown: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { colors, isDark } = useAppTheme();

    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const dynamicStyles = StyleSheet.create({
        safeArea: { backgroundColor: colors.background },
        container: { backgroundColor: colors.background },
        headerSubtitle: { color: '#8C8B9C' },
        headerTitle: { color: colors.text },
        headerDate: { color: '#8C8B9C' },

        // Exact light blue tint from Figma for the bell button background
        bellButton: { backgroundColor: isDark ? colors.surfaceMuted : '#F0F5FE' },
        notificationDot: { borderColor: isDark ? colors.surfaceMuted : '#F0F5FE' },
        divider: { backgroundColor: isDark ? colors.border : '#F3EFE6' },

        itemTitleMain: { color: colors.text },
        itemSubtitle: { color: '#8C8B9C' },
        bottomActionContainer: { backgroundColor: colors.background },

        // Dynamic tinted backgrounds for the icon boxes
        iconBoxYellow: { backgroundColor: isDark ? 'rgba(201, 162, 39, 0.15)' : '#FEF9EC' },
        iconBoxBlue: { backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#F0F5FE' },
        iconBoxGreen: { backgroundColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#EAF8F3' },
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
                        <BellIcon color={lightBlue} />
                        <View style={[styles.notificationDot, dynamicStyles.notificationDot]} />
                    </Pressable>
                </View>

                <View style={[styles.divider, dynamicStyles.divider]} />

                {/* Scrollable Content */}
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                    <View style={styles.contentWrapper}>
                        {/* Intention */}
                        <View style={styles.ritualItem}>
                            <View style={styles.iconRow}>
                                <View style={[styles.iconBox, dynamicStyles.iconBoxYellow]}>
                                    <SparkIcon color={yellow} size={20} />
                                </View>
                                <Text style={[styles.itemTitle, { color: yellow }]}>Intention</Text>
                            </View>
                            <Text style={[styles.itemSubtitle, dynamicStyles.itemSubtitle]}>What matters most today?</Text>
                        </View>

                        {/* Reflection */}
                        <View style={styles.ritualItem}>
                            <View style={styles.iconRow}>
                                <View style={[styles.iconBox, dynamicStyles.iconBoxBlue]}>
                                    <ReflectionIcon color={lightBlue} />
                                </View>
                                <Text style={[styles.itemTitle, { color: lightBlue }]}>Reflection</Text>
                            </View>
                            <Text style={[styles.itemSubtitle, dynamicStyles.itemSubtitle]}>What did today teach you?</Text>
                        </View>

                        {/* Achievement */}
                        <View style={styles.ritualItem}>
                            <View style={styles.iconRow}>
                                <View style={[styles.iconBox, dynamicStyles.iconBoxGreen]}>
                                    <ArrowUpIcon color={lightGreen} />
                                </View>
                                <Text style={[styles.itemTitle, { color: lightGreen }]}>Achievement</Text>
                            </View>
                            <Text style={[styles.itemSubtitle, dynamicStyles.itemSubtitle]}>What moved your life forward?</Text>
                        </View>
                    </View>

                </ScrollView>

                {/* Bottom Action Area */}
                <View style={[styles.bottomActionContainer, dynamicStyles.bottomActionContainer]}>
                    <View style={[styles.divider, dynamicStyles.divider]} />
                    <Pressable
                        style={styles.primaryButton}
                        onPress={() => navigation.navigate('EnhanceCrownEmotion')}
                    >
                        <Text style={styles.primaryButtonText}>Crown This Day</Text>
                        <SparkIcon color="#FFFFFF" size={14} />
                    </Pressable>
                </View>

                {/* Fixed Bottom Tab Bar */}
                <BottomTabBar activeTab="today" />

            </View>
        </SafeAreaView>
    );
};

export default EnhanceCrown;

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
        paddingTop: Platform.OS === 'android' ? 24 : 12,
        paddingBottom: 20,
    },
    headerSubtitle: {
        fontSize: 12.5,
        fontWeight: '500',
        marginBottom: 2,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 2,
    },
    headerDate: {
        fontSize: 14,
    },
    bellButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#FF4B4B',
        borderWidth: 1.5,
    },
    divider: {
        height: 1,
        width: '100%',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
    },
    contentWrapper: {
        alignItems: 'center',
    },
    ritualItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 44,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    itemSubtitle: {
        fontSize: 15.5,
    },
    bottomActionContainer: {
        paddingBottom: 0,
    },
    primaryButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 18,
        marginHorizontal: 24,
        marginTop: 24,
        marginBottom: 24,
        gap: 8,
        backgroundColor: yellow,
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 6,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16.5,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
});