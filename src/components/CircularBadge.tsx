import { View, StyleSheet, StyleSheet as RNStyleSheet } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import React from 'react';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

import { white, yellow } from '../utils/colors';

type BadgeIconProps = {
    color?: string;
    size?: number;
};

type CircularBadgeProps = {
    Icon: React.ComponentType<BadgeIconProps>;
    badgeColor?: string;
    shadowColor?: string;
    shadowOpacity?: number;
    innerShadowOpacity?: number;
    shadowRadius?: number;
    innerShadowRadius?: number;
    iconColor?: string;
    iconSize?: number;
    outerSize?: number;
    innerSize?: number;
    iconCircleSize?: number;
    marginBottom?: number;
};

const CircularBadge = ({
    Icon,
    badgeColor = yellow,
    shadowColor = yellow,
    shadowOpacity = 0.26,
    innerShadowOpacity = 0.7,
    shadowRadius = 56,
    innerShadowRadius = 26,
    iconColor = white,
    iconSize = 54,
    outerSize = 200,
    innerSize = 80,
    iconCircleSize = 120,
    marginBottom = 12,
}: CircularBadgeProps) => {
    const outerRadius = outerSize / 2;
    const innerRadius = innerSize / 2;
    const iconCircleRadius = iconCircleSize / 2;

    return (
        <DropShadow style={[styles.outerGlow, { shadowColor, shadowOpacity, shadowRadius, width: outerSize, height: outerSize, borderRadius: outerRadius, marginBottom }]}>
            <DropShadow style={[styles.innerGlow, { shadowColor, shadowOpacity: innerShadowOpacity, shadowRadius: innerShadowRadius, width: innerSize, height: innerSize, borderRadius: innerRadius }]}>

                <View style={[styles.iconCircle, { backgroundColor: badgeColor, width: iconCircleSize, height: iconCircleSize, borderRadius: iconCircleRadius }]}>

                    {/* The 3D Top-Left White Shine Overlay (Now much more subtle) */}
                    <Svg height="100%" width="100%" style={RNStyleSheet.absoluteFill}>
                        <Defs>
                            <RadialGradient id="shine" cx="25%" cy="25%" r="55%">
                                {/* Changed opacity from 0.45 to 0.15 for a very faint glow */}
                                <Stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.30" />
                                <Stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                            </RadialGradient>
                        </Defs>
                        <Circle cx="50%" cy="50%" r="50%" fill="url(#shine)" />
                    </Svg>

                    <Icon color={iconColor} size={iconSize} />
                </View>

            </DropShadow>
        </DropShadow>
    );
};

export default CircularBadge;

const styles = StyleSheet.create({
    outerGlow: {
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.26,
        shadowRadius: 56,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 14,
        backgroundColor: 'transparent',
    },
    innerGlow: {
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.7,
        shadowRadius: 26,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        elevation: 10,
        backgroundColor: 'transparent',
    },
    iconCircle: {
        backgroundColor: yellow,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
});