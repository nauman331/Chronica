import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';

// Components & Hooks
import { useAppTheme } from '../hooks/useAppTheme';
import AuthBottomSheet from '../components/AuthBottomSheet';

import googleIcon from '../assets/logo.png';
import facebookIcon from '../assets/facebook.png';
import gmailIcon from '../assets/gmail.png';
import { white } from '../utils/colors';

const GetStarted: React.FC<any> = ({ navigation, route }) => {
    const { colors } = useAppTheme();

    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);

    // Bottom Sheet States
    const [isSheetVisible, setIsSheetVisible] = useState(false);
    const [authMode, setAuthMode] = useState<'signup' | 'login'>('signup');

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);

        if (event.type === 'set' || selectedDate) {
            setIsDateSelected(true);
        }
    };

    const formatDate = (dateToFormat: Date) => {
        const day = dateToFormat.getDate().toString().padStart(2, '0');
        const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
        const year = dateToFormat.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatDjangoDate = (dateToFormat: Date) => {
        const day = dateToFormat.getDate().toString().padStart(2, '0');
        const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
        const year = dateToFormat.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleOpenSignup = () => {
        if (!isDateSelected) {
            Toast.show({
                type: 'error',
                text1: 'Date Required',
                text2: 'Please select your birth date to continue.',
                position: 'bottom',
                bottomOffset: 120
            });
            return;
        }
        // Navigate to onboarding and pass the selected date
        navigation.navigate('Onboarding', { birthDate: formatDjangoDate(date) });
    };

    const handleOpenLogin = () => {
        setAuthMode('login');
        setIsSheetVisible(true);
    };

    // If navigated back from onboarding with params, open the auth sheet
    useEffect(() => {
        const params = route?.params;
        if (params?.openAuth) {
            if (params.birthDate) {
                const parsed = new Date(params.birthDate);
                if (!isNaN(parsed.getTime())) {
                    setDate(parsed);
                    setIsDateSelected(true);
                }
            }
            setAuthMode(params.openAuth);
            setIsSheetVisible(true);
            // clear params to avoid re-triggering
            navigation.setParams({ openAuth: undefined, birthDate: undefined });
        }
    }, [route?.params]);

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        accent: { color: colors.accent },
        subtitle: { color: colors.textSecondary },
        card: { backgroundColor: colors.surface, borderColor: colors.border, shadowColor: colors.text },
        inputLabel: { color: colors.text },
        input: { backgroundColor: colors.background, borderColor: colors.accent },
        inputText: { color: isDateSelected ? (colors.background === white ? colors.text : white) : colors.textSecondary },
        primaryButton: {
            backgroundColor: colors.text,
            ...Platform.select({
                ios: { shadowColor: colors.text, shadowOpacity: 0.3, shadowRadius: 10, shadowOffset: { width: 0, height: 8 } },
                android: { elevation: 6 }
            })
        },
        primaryButtonText: { color: colors.background },
        secondaryButton: { backgroundColor: colors.surface, borderColor: colors.border },
        secondaryButtonText: { color: colors.text },
        line: { backgroundColor: colors.border },
        dividerText: { color: colors.textSecondary },
        socialButton: { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
        footerText: { color: colors.textSecondary },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.mainContent}>
                <View style={styles.header}>
                    <Text style={[styles.title, dynamicStyles.title]}>
                        Welcome to{'\n'}
                        <Text style={[styles.accent, dynamicStyles.accent]}>CHRONICA</Text>
                    </Text>
                    <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                        You have one life.{'\n'}You are living it right now.
                    </Text>
                </View>

                <View style={[styles.card, dynamicStyles.card]}>
                    <View style={styles.inputGroup}>
                        <Text style={[styles.inputLabel, dynamicStyles.inputLabel]}>Your Birth Date</Text>

                        <Pressable style={[styles.input, dynamicStyles.input]} onPress={() => setShowPicker(true)}>
                            <Text style={[styles.inputTextBase, dynamicStyles.inputText]}>
                                {isDateSelected ? formatDate(date) : "dd/mm/yyyy"}
                            </Text>
                        </Pressable>

                        {showPicker && (
                            <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} maximumDate={new Date()} />
                        )}
                    </View>

                    <Pressable style={[styles.primaryButton, dynamicStyles.primaryButton]} onPress={handleOpenSignup}>
                        <Text style={[styles.primaryButtonText, dynamicStyles.primaryButtonText]}>Begin Your Journey</Text>
                    </Pressable>

                    <Pressable style={[styles.secondaryButton, dynamicStyles.secondaryButton]} onPress={handleOpenLogin}>
                        <Text style={[styles.secondaryButtonText, dynamicStyles.secondaryButtonText]}>Already have an account</Text>
                    </Pressable>

                    <View style={styles.dividerContainer}>
                        <View style={[styles.line, dynamicStyles.line]} />
                        <Text style={[styles.dividerText, dynamicStyles.dividerText]}>Or continue with</Text>
                        <View style={[styles.line, dynamicStyles.line]} />
                    </View>

                    <View style={styles.socialContainer}>
                        <Pressable style={[styles.socialButton, dynamicStyles.socialButton]}><Image source={googleIcon} style={styles.iconImage} /></Pressable>
                        <Pressable style={[styles.socialButton, dynamicStyles.socialButton]}><Image source={facebookIcon} style={styles.iconImage} /></Pressable>
                        <Pressable style={[styles.socialButton, dynamicStyles.socialButton]}><Image source={gmailIcon} style={styles.iconImage} /></Pressable>
                    </View>
                </View>
            </View>

            <View style={styles.footer}>
                <Text style={[styles.footerText, dynamicStyles.footerText]}>
                    Your data stays private and is stored{'\n'}locally on your device
                </Text>
            </View>

            <AuthBottomSheet
                visible={isSheetVisible}
                initialMode={authMode}
                onClose={() => setIsSheetVisible(false)}
                birthDate={formatDjangoDate(date)}
            />
            <Toast />
        </SafeAreaView>
    );
};

export default GetStarted;

const styles = StyleSheet.create({
    container: { flex: 1 },
    mainContent: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
    header: { alignItems: 'center', marginBottom: 32 },
    title: { fontSize: 32, lineHeight: 40, fontWeight: '800', textAlign: 'center' },
    accent: {},
    subtitle: { marginTop: 16, textAlign: 'center', lineHeight: 22, fontSize: 15 },
    card: { borderRadius: 24, padding: 24, borderWidth: 1, shadowOpacity: 0.06, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 1 },
    inputGroup: { gap: 8, marginBottom: 24 },
    inputLabel: { fontSize: 14, fontWeight: '600', marginLeft: 4 },
    input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, justifyContent: 'center' },
    inputTextBase: { fontSize: 15 },
    primaryButton: { paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
    primaryButtonText: { fontSize: 15, fontWeight: '600' },
    secondaryButton: { borderWidth: 1, paddingVertical: 15, borderRadius: 16, alignItems: 'center', marginBottom: 16 },
    secondaryButtonText: { fontSize: 14, fontWeight: '500' },
    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    line: { flex: 1, height: 1 },
    dividerText: { marginHorizontal: 12, fontSize: 13 },
    socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 24 },
    socialButton: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center' },
    iconImage: { width: 24, height: 24, resizeMode: 'contain' },
    footer: { paddingBottom: 24, paddingHorizontal: 24, alignItems: 'center' },
    footerText: { textAlign: 'center', lineHeight: 20, fontSize: 13, fontWeight: '400' },
});