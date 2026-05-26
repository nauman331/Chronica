import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapIcon, CalendarIcon, ChartIcon, UserIcon } from '../utils/icons';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

interface BottomTabBarProps {
    activeTab: 'map' | 'today' | 'insights' | 'profile';
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab }) => {
    const navigation = useNavigation<any>();

    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    // Helper constants for icon colors
    const activeColor = colors.text;
    const inactiveColor = colors.textSecondary;

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        tabBar: {
            backgroundColor: colors.background,
            borderTopColor: colors.border,
        },
        activeTab: {
            backgroundColor: colors.surfaceMuted,
        },
        tabText: {
            color: inactiveColor,
        },
        activeTabText: {
            color: activeColor,
        }
    });

    return (
        <View style={[styles.tabBar, dynamicStyles.tabBar]}>
            <Pressable
                style={[styles.tabItem, activeTab === 'map' && [styles.activeTab, dynamicStyles.activeTab]]}
                onPress={() => navigation.navigate('LifeMap' as never)}
            >
                <MapIcon color={activeTab === 'map' ? activeColor : inactiveColor} />
                <Text style={activeTab === 'map' ? [styles.activeTabText, dynamicStyles.activeTabText] : [styles.tabText, dynamicStyles.tabText]}>
                    Life Map
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'today' && [styles.activeTab, dynamicStyles.activeTab]]}
                onPress={() => navigation.navigate('EnhanceCrown' as never)}
            >
                <CalendarIcon color={activeTab === 'today' ? activeColor : inactiveColor} />
                <Text style={activeTab === 'today' ? [styles.activeTabText, dynamicStyles.activeTabText] : [styles.tabText, dynamicStyles.tabText]}>
                    Today
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'insights' && [styles.activeTab, dynamicStyles.activeTab]]}
                onPress={() => navigation.navigate('Insights' as never)}
            >
                <ChartIcon color={activeTab === 'insights' ? activeColor : inactiveColor} />
                <Text style={activeTab === 'insights' ? [styles.activeTabText, dynamicStyles.activeTabText] : [styles.tabText, dynamicStyles.tabText]}>
                    Insights
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'profile' && [styles.activeTab, dynamicStyles.activeTab]]}
                onPress={() => navigation.navigate('Profile' as never)}
            >
                <UserIcon color={activeTab === 'profile' ? activeColor : inactiveColor} />
                <Text style={activeTab === 'profile' ? [styles.activeTabText, dynamicStyles.activeTabText] : [styles.tabText, dynamicStyles.tabText]}>
                    Profile
                </Text>
            </Pressable>
        </View>
    );
};

export default BottomTabBar;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: Platform.OS === 'ios' ? 10 : 20,
        borderTopWidth: 1,
    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        gap: 4,
    },
    activeTab: {
        borderRadius: 16,
        paddingVertical: 8,
    },
    tabText: {
        fontSize: 11,
        fontWeight: '500',
    },
    activeTabText: {
        fontSize: 11,
        fontWeight: '700',
    },
});