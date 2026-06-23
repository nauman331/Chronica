import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";

import { useAppTheme } from '../hooks/useAppTheme';

import { yellow } from '../utils/colors';

const SplashScreen: React.FC<any> = ({ navigation }) => {
    const { colors } = useAppTheme();

    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (token) {
                navigation.replace('EnhanceCrown');
            } else {
                navigation.replace('GetStarted');
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigation, token]);

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        footerText: { color: colors.textSecondary },
    });

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <Text style={styles.logoText}>CHRONICA</Text>
            <Text style={[styles.footerText, dynamicStyles.footerText]}>
                By continuing, you agree to{"\n"}our Terms Conditions and Privacy Policy
            </Text>
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    logoText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: yellow,
        letterSpacing: 2,
    },
    footerText: {
        position: 'absolute',
        bottom: 40,
        fontSize: 10,
        textAlign: 'center',
        lineHeight: 16,
    },
});