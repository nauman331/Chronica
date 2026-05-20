import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Pressable } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import BottomTabBar from '../components/BottomTabBar';
import {
    white,
    blue,
    yellow,
    COLOR_FUTURE,
    COLOR_TEXT_MAIN,
    gray
} from '../utils/colors';

const ArrowLeftIcon = ({ color }: { color: string }) => (
    <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <Path d="M19 12H5M12 19l-7-7 7-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const SparkleIcon = ({ color }: { color: string }) => (
    <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        {/* Main 4-pointed outlined star */}
        <Path
            d="M12 3C12 8.5 16.5 12 21 12C16.5 12 12 15.5 12 21C12 15.5 7.5 12 3 12C7.5 12 12 8.5 12 3Z"
            stroke={color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        {/* Top right small solid star */}
        <Path
            d="M19 4C19 5.5 20.5 6 22 6C20.5 6 19 6.5 19 8C19 6.5 17.5 6 16 6C17.5 6 19 5.5 19 4Z"
            fill={color}
        />
        {/* Bottom left dot */}
        <Circle cx="6.5" cy="17.5" r="1.5" fill={color} />
    </Svg>
);

const DayDetailScreen = ({ navigation, route }: any) => {
    const {
        day = 15,
        month = 'April',
        year = 2026,
        dayOfWeek = 'Monday',
        status = 'Not documented'
    } = route?.params || {};

    return (
        <SafeAreaView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Pressable style={styles.backButton} onPress={() => navigation?.goBack()}>
                        <ArrowLeftIcon color={COLOR_TEXT_MAIN} />
                    </Pressable>
                    <View style={styles.headerTitles}>
                        <Text style={styles.headerTitle}>{month} {day}, {year}</Text>
                        <Text style={styles.headerSubtitle}>{dayOfWeek}</Text>
                    </View>
                </View>

                <View style={styles.statusBadge}>
                    <Text style={styles.statusBadgeText}>{status}</Text>
                </View>
            </View>

            {/* Main Content Area */}
            <View style={styles.content}>

                {/* Undocumented Card */}
                <View style={styles.card}>
                    <View style={styles.iconWrapper}>
                        {/* Pale yellow background for the icon */}
                        <View style={styles.iconBackground}>
                            <SparkleIcon color={yellow} />
                        </View>
                    </View>

                    <Text style={styles.cardTitle}>Undocumented</Text>
                    <Text style={styles.cardDescription}>
                        This day has not been recorded yet.{'\n'}
                        Document it so it's never forgotten.
                    </Text>
                </View>

                {/* Call to Action Button */}
                <Pressable
                    style={styles.documentButton}
                    onPress={() => navigation.navigate('DocumentDay', {
                        day: day,
                        month: month,
                        year: year,
                        dayOfWeek: dayOfWeek,
                        status: status
                    })}
                >
                    <Text style={styles.documentButtonText}>Document this day</Text>
                </Pressable>

            </View>

            {/* Bottom Tab Bar */}
            <View style={styles.bottomTabContainer}>
                <BottomTabBar activeTab="map" />
            </View>

        </SafeAreaView>
    );
};

export default DayDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F8F8'
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLOR_FUTURE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitles: {
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLOR_TEXT_MAIN
    },
    headerSubtitle: {
        fontSize: 13,
        color: gray,
        marginTop: 2
    },
    statusBadge: {
        backgroundColor: '#F4F4F6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16
    },
    statusBadgeText: {
        fontSize: 12,
        color: gray,
        fontWeight: '500'
    },

    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 24,
    },

    card: {
        backgroundColor: white,
        borderRadius: 24,
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        marginBottom: 16,
        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.06,
        shadowRadius: 20,
        // Android Elevation
        elevation: 4,
        borderWidth: 1,
        borderColor: '#F8F8F8'
    },
    iconWrapper: {
        marginBottom: 20
    },
    iconBackground: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFF8E6',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLOR_TEXT_MAIN,
        marginBottom: 12
    },
    cardDescription: {
        fontSize: 14,
        color: gray,
        textAlign: 'center',
        lineHeight: 22,
        fontWeight: '400'
    },

    documentButton: {
        backgroundColor: blue,
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: blue,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 6,
    },
    documentButtonText: {
        color: white,
        fontSize: 16,
        fontWeight: '600'
    },

    bottomTabContainer: {
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        backgroundColor: white
    },
});