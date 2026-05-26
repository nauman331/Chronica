import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Keep brand yellow for the logo
import { yellow } from '../utils/colors';

const SplashScreen: React.FC<any> = ({ navigation }) => {
    // --- 1. Get dynamic colors ---
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

    // --- 2. Dynamic Styles based on active theme ---
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

// --- 3. Static Layout Styles (No Colors Here) ---
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
        color: yellow, // Stays yellow
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