import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { yellow, white } from '../utils/colors';
import { useSelector } from "react-redux";

const SplashScreen: React.FC<any> = ({ navigation }) => {
    const token = useSelector((state: any) => state.auth.token)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (token) {
                navigation.replace('EnhanceCrown');
            } else {
                navigation.replace('GetStarted');
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.logoText}>CHRONICA</Text>
            <Text style={styles.footerText}>
                By continuing, you agree to{"\n"}our Terms Conditions and Privacy Policy
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
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
        color: '#888888',
        lineHeight: 16,
    },
});

export default SplashScreen;