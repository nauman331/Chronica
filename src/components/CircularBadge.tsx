import { View, StyleSheet } from 'react-native'
import DropShadow from 'react-native-drop-shadow';

import React from 'react'
import { yellow } from '../utils/colors';

const CircularBadge = ({ Icon }: { Icon: React.ComponentType }) => {
    return (
        <DropShadow style={styles.outerGlow}>
            <DropShadow style={styles.innerGlow}>
                <View style={styles.iconCircle}>
                    <Icon />
                </View>
            </DropShadow>
        </DropShadow>
    )
}

export default CircularBadge

const styles = StyleSheet.create({
    outerGlow: {
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.26,
        shadowRadius: 56,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        elevation: 14,
        backgroundColor: 'transparent',
    },
    innerGlow: {
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.7,
        shadowRadius: 26,
        width: 80,
        height: 80,
        borderRadius: 77,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        elevation: 10,
        backgroundColor: 'transparent',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: yellow,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },
})