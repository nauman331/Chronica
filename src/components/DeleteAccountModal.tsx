import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import useSubmit from '../hooks/useSubmit';
import { useAppTheme } from '../hooks/useAppTheme';

import { white, gray } from '../utils/colors';

interface DeleteAccountModalProps {
    visible: boolean;
    onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ visible, onClose }) => {
    const { colors } = useAppTheme();
    const dispatch = useDispatch();
    const { submit, loading } = useSubmit({ isAuth: true });

    const [password, setPassword] = useState('');

    const handleClose = () => {
        setPassword('');
        onClose();
    };

    const handleConfirm = async () => {
        if (!password) {
            return;
        }

        const response = await submit('users/me/delete', { password }, { method: 'POST' });

        if (response) {
            // Success response received
            setPassword('');
            handleClose();
            dispatch(logout());
        }
    };

    const dynamicStyles = StyleSheet.create({
        modalContent: {
            backgroundColor: colors.surface
        },
        modalTitle: {
            color: colors.danger || '#E53935'
        },
        modalMessage: {
            color: colors.textSecondary
        },
        input: {
            backgroundColor: colors.background,
            color: colors.text,
            borderColor: colors.border
        },
        cancelButton: {
            backgroundColor: colors.surfaceMuted
        },
        cancelButtonText: {
            color: colors.text
        },
        confirmButton: {
            backgroundColor: colors.danger || '#E53935',
            opacity: password ? 1 : 0.5
        }
    });

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, dynamicStyles.modalContent]}>
                    <Text style={[styles.modalTitle, dynamicStyles.modalTitle]}>Delete Account</Text>
                    <Text style={[styles.modalMessage, dynamicStyles.modalMessage]}>
                        Warning: This action is permanent and cannot be undone. All your data will be permanently deleted.
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.inputLabel, { color: colors.text }]}>Enter your password to confirm:</Text>
                        <TextInput
                            style={[styles.input, dynamicStyles.input]}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            placeholderTextColor={gray}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>

                    <View style={styles.modalButtonGroup}>
                        <TouchableOpacity
                            style={[styles.modalButton, dynamicStyles.cancelButton]}
                            onPress={handleClose}
                            disabled={loading}
                        >
                            <Text style={[styles.cancelButtonText, dynamicStyles.cancelButtonText]}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, dynamicStyles.confirmButton]}
                            onPress={handleConfirm}
                            disabled={loading || !password}
                        >
                            {loading ? (
                                <ActivityIndicator color={white} />
                            ) : (
                                <Text style={styles.confirmButtonText}>Delete</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    modalContent: {
        width: '100%',
        borderRadius: 24,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 8,
    },
    modalMessage: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 20,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 24,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        paddingHorizontal: 16,
        fontSize: 15,
    },
    modalButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    },
    cancelButton: {
        marginRight: 8,
    },
    confirmButton: {
        marginLeft: 8,
    },
    cancelButtonText: {
        fontSize: 15,
        fontWeight: '600',
    },
    confirmButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: white,
    },
});
