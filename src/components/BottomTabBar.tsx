import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapIcon, CalendarIcon, ChartIcon, UserIcon } from '../utils/icons';

const darkText = '#1A1824';
const mutedText = '#8A8F99';
const borderLight = '#F0F0F0';

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