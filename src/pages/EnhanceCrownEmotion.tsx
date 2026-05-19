import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { BadgeIcon } from '../utils/icons';
import { yellow, blue, white } from '../utils/colors';
import CircularBadge from '../components/CircularBadge';

const EnhanceCrownEmotion: React.FC<any> = ({ navigation }: { navigation: any }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                <CircularBadge Icon={BadgeIcon} />

                {/* Title */}
                <Text style={styles.title}>Day Crowned</Text>

                {/* Date Pill */}
                <View style={styles.datePill}>
                    <View style={styles.dot} />
                    <Text style={styles.dateText}>April 15, 2026</Text>
                </View>

                {/* Body Text */}
                <Text style={styles.bodyText}>
                    This day is now preserved in your life story forever.
                </Text>

                {/* Quote */}
                <Text style={styles.quoteText}>
                    "Every documented day is a{"\n"}gift to your future self."
                </Text>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}
                        onPress={() => navigation.navigate("EnhanceCrown")}
                    >
                        <Text style={styles.primaryButtonText}>Return to Today</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.8}
                        onPress={() => navigation.navigate("LifeMap")}
                    >
                        <Text style={styles.secondaryButtonText}>View Life Map →</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default EnhanceCrownEmotion;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    outerGlow: {
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.26,
        shadowRadius: 56,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        elevation: 14,
        backgroundColor: 'transparent',
    },
    innerGlow: {
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 14 },
        shadowOpacity: 0.7,
        shadowRadius: 26,
        width: 80,
        height: 80,
        borderRadius: 77,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        elevation: 10,
        backgroundColor: 'transparent',
    },
    iconCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: yellow,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: blue,
        marginBottom: 16,
    },
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f3e4',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: yellow,
        marginBottom: 24,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: yellow,
        marginRight: 8,
    },
    dateText: {
        color: yellow,
        fontSize: 14,
        fontWeight: '600',
    },
    bodyText: {
        fontSize: 18,
        color: '#333333',
        textAlign: 'center',
        paddingHorizontal: 20,
        lineHeight: 26,
        marginBottom: 48,
    },
    quoteText: {
        fontSize: 14,
        color: '#999999',
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 48,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 16,
    },
    primaryButton: {
        backgroundColor: blue,
        width: '90%',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    primaryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: '#FFFFFF',
        width: '90%',
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    secondaryButtonText: {
        color: '#666666',
        fontSize: 16,
        fontWeight: '500',
    },
});
;