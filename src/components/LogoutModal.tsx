import React from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { useAppTheme } from '../hooks/useAppTheme';

import { white } from '../utils/colors';

interface LogoutModalProps {
    visible: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ visible, onClose, onConfirm }) => {
    const { colors } = useAppTheme();

    const dynamicStyles = StyleSheet.create({
        modalContent: {
            backgroundColor: colors.surface
        },
        modalTitle: {
            color: colors.text
        },
        modalMessage: {
            color: colors.textSecondary
        },
        cancelButton: {
            backgroundColor: colors.surfaceMuted
        },
        cancelButtonText: {
            color: colors.text
        },
        confirmButton: {
            backgroundColor: colors.danger || '#E53935'
        }
    });

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={[styles.modalContent, dynamicStyles.modalContent]}>
                    <Text style={[styles.modalTitle, dynamicStyles.modalTitle]}>Log Out</Text>
                    <Text style={[styles.modalMessage, dynamicStyles.modalMessage]}>Are you sure you want to log out of your account?</Text>

                    <View style={styles.modalButtonGroup}>
                        <TouchableOpacity
                            style={[styles.modalButton, dynamicStyles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={[styles.cancelButtonText, dynamicStyles.cancelButtonText]}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.modalButton, dynamicStyles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.confirmButtonText}>Log Out</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default LogoutModal;

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
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
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