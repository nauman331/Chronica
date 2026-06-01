import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Platform,
    Modal,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import { useAppTheme } from '../hooks/useAppTheme';
import useSubmit from '../hooks/useSubmit';
import { login } from '../store/slices/authSlice';

interface AuthBottomSheetProps {
    visible: boolean;
    initialMode?: 'signup' | 'login';
    onClose: () => void;
    birthDate: string;
}

const AuthBottomSheet: React.FC<AuthBottomSheetProps> = ({
    visible,
    initialMode = 'signup',
    onClose,
    birthDate,
}) => {
    const { colors } = useAppTheme();
    const { submit, loading } = useSubmit();
    const dispatch = useDispatch();

    const [mode, setMode] = useState<'signup' | 'login'>(initialMode);

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthplace, setBirthplace] = useState('');

    useEffect(() => {
        if (visible) {
            setMode(initialMode);
            setPassword('');
        }
    }, [visible, initialMode]);

    const handleSubmit = async () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password;

        if (mode === 'signup') {
            const trimmedFullName = fullName.trim();
            const trimmedUsername = username.trim();
            const trimmedBirthplace = birthplace.trim();

            if (!trimmedEmail || !trimmedPassword || !trimmedFullName || !trimmedUsername || !trimmedBirthplace) {
                Toast.show({
                    type: 'error',
                    text1: 'Required Fields Missing',
                    text2: 'Please fill out all fields to create your account.',
                    position: 'top'
                });
                return;
            }

            const payload = {
                email: trimmedEmail,
                username: trimmedUsername,
                full_name: trimmedFullName,
                password: trimmedPassword,
                birth_date: birthDate,
                birth_place: trimmedBirthplace
            };

            const response = await submit('auth/signup', payload, { method: 'POST' });

            if (response && response.token) {
                dispatch(login({
                    token: response.token,
                    refresh: response.refresh,
                    userdata: response.user
                }));
            }
        } else {
            if (!trimmedEmail || !trimmedPassword) {
                Toast.show({
                    type: 'error',
                    text1: 'Required Fields Missing',
                    text2: 'Please enter your email and password.',
                    position: 'top'
                });
                return;
            }

            const payload = {
                email: trimmedEmail,
                password: trimmedPassword
            };

            const response = await submit('auth/login', payload, { method: 'POST' });

            if (response && response.token) {
                dispatch(login({
                    token: response.token,
                    refresh: response.refresh
                }));
            }
        }
    };

    const toggleMode = () => {
        setMode(prev => prev === 'signup' ? 'login' : 'signup');
    };

    const dynamicStyles = StyleSheet.create({
        sheetContainer: { backgroundColor: colors.background },
        title: { color: colors.text },
        subtitle: { color: colors.textSecondary },
        backButton: { borderColor: colors.border },
        backButtonText: { color: colors.text },
        inputLabel: { color: colors.text },
        input: { backgroundColor: colors.background, borderColor: colors.border, color: colors.text },
        primaryButton: {
            backgroundColor: colors.text,
            ...Platform.select({
                ios: { shadowColor: colors.text, shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } },
                android: { elevation: 4 }
            })
        },
        primaryButtonText: { color: colors.background },
        bottomLinksText: { color: colors.textSecondary },
        bottomLinksAction: { color: colors.text }
    });

    return (
        <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.sheetOverlay}>
                <View style={[styles.sheetContent, dynamicStyles.sheetContainer]}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>

                        <View style={styles.sheetHeader}>
                            <Pressable style={[styles.backButton, dynamicStyles.backButton]} onPress={onClose}>
                                <Text style={[styles.backButtonArrow, dynamicStyles.backButtonText]}>←</Text>
                            </Pressable>
                            <Text style={[styles.sheetTitle, dynamicStyles.title]}>
                                {mode === 'signup' ? 'Sign up to CHRONICA' : 'Sign in to CHRONICA'}
                            </Text>
                            <Text style={[styles.sheetSubtitle, dynamicStyles.subtitle]}>
                                {mode === 'signup' ? 'Tell us about yourself' : 'Welcome back'}
                            </Text>
                        </View>

                        {/* SIGN UP ONLY FIELDS */}
                        {mode === 'signup' && (
                            <>
                                <View style={styles.formGroup}>
                                    <Text style={[styles.inputLabel, dynamicStyles.inputLabel]}>Full Name</Text>
                                    <TextInput
                                        style={[styles.input, dynamicStyles.input]}
                                        placeholder="Enter your full name"
                                        placeholderTextColor={colors.textSecondary}
                                        value={fullName}
                                        onChangeText={setFullName}
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={[styles.inputLabel, dynamicStyles.inputLabel]}>Username</Text>
                                    <TextInput
                                        style={[styles.input, dynamicStyles.input]}
                                        placeholder="Choose a username"
                                        placeholderTextColor={colors.textSecondary}
                                        autoCapitalize="none"
                                        value={username}
                                        onChangeText={setUsername}
                                    />
                                </View>
                            </>
                        )}

                        {/* SHARED FIELDS */}
                        <View style={styles.formGroup}>
                            <Text style={[styles.inputLabel, dynamicStyles.inputLabel]}>Email</Text>
                            <TextInput
                                style={[styles.input, dynamicStyles.input]}
                                placeholder="Enter your email"
                                placeholderTextColor={colors.textSecondary}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={[styles.inputLabel, dynamicStyles.inputLabel]}>Password</Text>
                            <TextInput
                                style={[styles.input, dynamicStyles.input]}
                                placeholder={mode === 'signup' ? "Create a password" : "Enter your password"}
                                placeholderTextColor={colors.textSecondary}
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>

                        {/* SIGN UP ONLY FIELDS */}
                        {mode === 'signup' && (
                            <View style={styles.formGroup}>
                                <Text style={[styles.inputLabel, dynamicStyles.inputLabel]}>Birthplace</Text>
                                <TextInput
                                    style={[styles.input, dynamicStyles.input]}
                                    placeholder="City, Country"
                                    placeholderTextColor={colors.textSecondary}
                                    value={birthplace}
                                    onChangeText={setBirthplace}
                                />
                            </View>
                        )}

                        <Pressable
                            style={[styles.primaryButton, dynamicStyles.primaryButton, styles.sheetSubmitBtn]}
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={colors.background} />
                            ) : (
                                <Text style={[styles.primaryButtonText, dynamicStyles.primaryButtonText]}>
                                    {mode === 'signup' ? 'Sign up' : 'Sign in'}
                                </Text>
                            )}
                        </Pressable>

                        <View style={styles.bottomLinksRow}>
                            <Text style={dynamicStyles.bottomLinksText}>
                                {mode === 'signup' ? 'Already have an account? ' : "Don't have an account? "}
                            </Text>
                            <Pressable onPress={toggleMode}>
                                <Text style={[styles.bottomLinksActionText, dynamicStyles.bottomLinksAction]}>
                                    {mode === 'signup' ? 'Sign in' : 'Sign up'}
                                </Text>
                            </Pressable>
                        </View>

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
            <Toast />
        </Modal>
    );
};

export default AuthBottomSheet;

const styles = StyleSheet.create({
    sheetOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
    sheetContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24, paddingHorizontal: 24, height: '92%' },
    sheetScroll: { paddingBottom: 40 },
    sheetHeader: { marginBottom: 24 },
    backButton: { width: 40, height: 40, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    backButtonArrow: { fontSize: 18 },
    sheetTitle: { fontSize: 28, fontWeight: '800', marginBottom: 4 },
    sheetSubtitle: { fontSize: 15, marginBottom: 8 },
    formGroup: { gap: 8, marginBottom: 20 },
    inputLabel: { fontSize: 14, fontWeight: '600', marginLeft: 4 },
    input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15 },
    primaryButton: { paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginTop: 8, marginBottom: 16 },
    primaryButtonText: { fontSize: 15, fontWeight: '600' },
    sheetSubmitBtn: { marginTop: 16 },
    bottomLinksRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 16 },
    bottomLinksActionText: { fontWeight: '600' }
});