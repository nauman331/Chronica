import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { yellow, white } from '../utils/colors';

const SplashScreen: React.FC<any> = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('GetStarted');
        }, 2500);

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