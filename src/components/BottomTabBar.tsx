import React from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapIcon, CalendarIcon, ChartIcon, UserIcon } from '../utils/icons';

import { useAppTheme } from '../hooks/useAppTheme';

interface BottomTabBarProps {
    activeTab: 'map' | 'today' | 'insights' | 'profile';
}

const BottomTabBar: React.FC<BottomTabBarProps> = ({ activeTab }) => {
    const navigation = useNavigation<any>();

    const { colors } = useAppTheme();

    const activeColor = colors.text;
    const inactiveColor = colors.textSecondary;

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

    const routeToTab: Record<string, BottomTabBarProps['activeTab']> = {
        LifeMap: 'map',
        EnhanceCrown: 'today',
        Insights: 'insights',
        Profile: 'profile',
    };

    const goToRoute = (routeName: string) => {
        if (activeTab === routeToTab[routeName]) {
            return;
        }

        if (typeof navigation.replace === 'function') {
            navigation.replace(routeName as never);
            return;
        }

        navigation.navigate(routeName as never);
    };

    return (
        <View style={[styles.tabBar, dynamicStyles.tabBar]}>
            <Pressable
                style={[styles.tabItem, activeTab === 'map' && [styles.activeTab, dynamicStyles.activeTab]]}
                onPress={() => goToRoute('LifeMap')}
            >
                <MapIcon color={activeTab === 'map' ? activeColor : inactiveColor} />
                <Text style={activeTab === 'map' ? [styles.activeTabText, dynamicStyles.activeTabText] : [styles.tabText, dynamicStyles.tabText]}>
                    Life Map
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'today' && [styles.activeTab, dynamicStyles.activeTab]]}
                onPress={() => goToRoute('EnhanceCrown')}
            >
                <CalendarIcon color={activeTab === 'today' ? activeColor : inactiveColor} />
                <Text style={activeTab === 'today' ? [styles.activeTabText, dynamicStyles.activeTabText] : [styles.tabText, dynamicStyles.tabText]}>
                    Today
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'insights' && [styles.activeTab, dynamicStyles.activeTab]]}
                onPress={() => goToRoute('Insights')}
            >
                <ChartIcon color={activeTab === 'insights' ? activeColor : inactiveColor} />
                <Text style={activeTab === 'insights' ? [styles.activeTabText, dynamicStyles.activeTabText] : [styles.tabText, dynamicStyles.tabText]}>
                    Insights
                </Text>
            </Pressable>

            <Pressable
                style={[styles.tabItem, activeTab === 'profile' && [styles.activeTab, dynamicStyles.activeTab]]}
                onPress={() => goToRoute('Profile')}
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