import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';

export const CustomSwitch = ({ value, onValueChange, activeColor, inactiveColor }: { value: boolean; onValueChange: (value: boolean) => void; activeColor: string; inactiveColor: string }) => {
    const translateX = useRef(new Animated.Value(value ? 22 : 2)).current;

    useEffect(() => {
        Animated.timing(translateX, {
            toValue: value ? 22 : 2,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [value]);

    const backgroundColor = translateX.interpolate({
        inputRange: [2, 22],
        outputRange: [inactiveColor, activeColor],
    });

    return (
        <Pressable
            onPress={() => onValueChange(!value)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
            <Animated.View style={[switchStyles.track, { backgroundColor }]}>
                <Animated.View style={[switchStyles.thumb, { transform: [{ translateX }] }]} />
            </Animated.View>
        </Pressable>
    );
};

const switchStyles = StyleSheet.create({
    track: {
        width: 44,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
    },
    thumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
});