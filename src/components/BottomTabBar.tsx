import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Rect, Polyline, Line } from 'react-native-svg';

const darkText = '#1A1824';
const mutedText = '#8A8F99';
const borderLight = '#F0F0F0';

const MapIcon = ({ color }: { color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Polyline points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
        <Line x1="9" y1="3" x2="9" y2="18" />
        <Line x1="15" y1="6" x2="15" y2="21" />
    </Svg>
);

const CalendarIcon = ({ color }: { color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <Line x1="16" y1="2" x2="16" y2="6" />
        <Line x1="8" y1="2" x2="8" y2="6" />
        <Line x1="3" y1="10" x2="21" y2="10" />
    </Svg>
);

const ChartIcon = ({ color }: { color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Polyline points="3 17 8 11 13 14 18 7 21 10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="21" cy="10" r="2" fill={color} />
    </Svg>
);

const UserIcon = ({ color }: { color: string }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <Circle cx="12" cy="7" r="4" />
    </Svg>
);

interface BottomTabBarProps {
    activeTab: 'map' | 'today' | 'insights' | 'profile';
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab }) => {
    const navigation = useNavigation<any>();
    return (
        <View style={styles.tabBar}>
            <Pressable
                style={[styles.tabItem, activeTab === 'map' && styles.activeTab]}
                onPress={() => navigation.navigate('LifeMap' as never)}
            >
                <MapIcon color={activeTab === 'map' ? darkText : mutedText} />
                <Text style={activeTab === 'map' ? styles.activeTabText : styles.tabText}>Life Map</Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'today' && styles.activeTab]}
                onPress={() => navigation.navigate('EnhanceCrown' as never)}
            >
                <CalendarIcon color={activeTab === 'today' ? darkText : mutedText} />
                <Text style={activeTab === 'today' ? styles.activeTabText : styles.tabText}>Today</Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'insights' && styles.activeTab]}
                onPress={() => navigation.navigate('Insights' as never)}
            >
                <ChartIcon color={activeTab === 'insights' ? darkText : mutedText} />
                <Text style={activeTab === 'insights' ? styles.activeTabText : styles.tabText}>Insights</Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'profile' && styles.activeTab]}
                onPress={() => navigation.navigate('Profile' as never)}
            >
                <UserIcon color={activeTab === 'profile' ? darkText : mutedText} />
                <Text style={activeTab === 'profile' ? styles.activeTabText : styles.tabText}>Profile</Text>
            </Pressable>
        </View>
    );
};

export default BottomTabBar;

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 10 : 20,
        borderTopWidth: 1,
        borderTopColor: borderLight,
        backgroundColor: '#FFFFFF',
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        gap: 4,
    },
    activeTab: {
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        paddingVertical: 8,
    },
    tabText: {
        fontSize: 11,
        color: mutedText,
        fontWeight: '500',
    },
    activeTabText: {
        fontSize: 11,
        color: darkText,
        fontWeight: '700',
    },
});