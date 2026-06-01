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
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';

import { useAppTheme } from '../hooks/useAppTheme';
import useSubmit from '../hooks/useSubmit';
import { setuser } from '../store/slices/authSlice';
import { RootState } from '../store/store';

interface EditProfileModalProps {
    visible: boolean;
    onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ visible, onClose }) => {
    const { colors } = useAppTheme();
    const dispatch = useDispatch();

    const { userdata } = useSelector((state: RootState) => state.auth);
    const { submit, loading } = useSubmit({ isAuth: true });

    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [birthplace, setBirthplace] = useState('');

    useEffect(() => {
        if (visible && userdata) {
            setFullName(userdata.full_name || '');
            setUsername(userdata.username || '');
            setBirthplace(userdata.birth_place || '');
        }
    }, [visible, userdata]);

    const handleUpdate = async () => {
        const trimmedFullName = fullName.trim();
        const trimmedUsername = username.trim();
        const trimmedBirthplace = birthplace.trim();

        if (!trimmedFullName || !trimmedUsername || !trimmedBirthplace) {
            Toast.show({
                type: 'error',
                text1: 'Required Fields Missing',
                text2: 'Please fill out your Full Name, Username, and Birthplace.',
                position: 'top'
            });
            return;
        }

        const payload = {
            full_name: trimmedFullName,
            username: trimmedUsername,
            birth_place: trimmedBirthplace
        };

        const response = await submit('users/me', payload, { method: 'PATCH' });

        if (response) {
            dispatch(setuser({ ...userdata, ...payload }));

            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'Profile updated successfully!',
                position: 'top'
            });

            onClose();
        }
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
        primaryButtonText: { color: colors.background }
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
                            <Text style={[styles.sheetTitle, dynamicStyles.title]}>Edit Profile</Text>
                            <Text style={[styles.sheetSubtitle, dynamicStyles.subtitle]}>Update your personal details</Text>
                        </View>

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

                        <Pressable
                            style={[styles.primaryButton, dynamicStyles.primaryButton, styles.sheetSubmitBtn]}
                            onPress={handleUpdate}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color={colors.background} />
                            ) : (
                                <Text style={[styles.primaryButtonText, dynamicStyles.primaryButtonText]}>Save Changes</Text>
                            )}
                        </Pressable>

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>

            <Toast />
        </Modal>
    );
};

export default EditProfileModal;

const styles = StyleSheet.create({
    sheetOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
    sheetContent: { borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 24, paddingHorizontal: 24, height: '80%' },
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
    sheetSubmitBtn: { marginTop: 16 }
});