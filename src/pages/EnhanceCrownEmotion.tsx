import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { BadgeIcon } from '../utils/icons';

import { useAppTheme } from '../hooks/useAppTheme';
import useSubmit from '../hooks/useSubmit';

import { yellow } from '../utils/colors';

const EnhanceCrownEmotion: React.FC<any> = ({ navigation, route }: { navigation: any, route: any }) => {
    const { colors, isDark } = useAppTheme();
    const { submit } = useSubmit({ isAuth: true });

    const {
        day = 15,
        month = 'April',
        year = 2026,
        dateStr,
        intention = '',
        reflection = '',
        achievement = '',
        existingData
    } = route?.params || {};

    const [isSaving, setIsSaving] = useState(!!dateStr);

    useEffect(() => {
        const crownDay = async () => {
            if (!dateStr) return;

            const payload = {
                date: dateStr,
                intention: intention.trim(),
                reflection: reflection.trim(),
                achievement: achievement.trim(),
                is_crowned: true
            };

            const endpoint = existingData ? `life-days/${dateStr}` : 'life-days/';
            const method = existingData ? 'PATCH' : 'POST';

            await submit(endpoint, payload, { method });
            setIsSaving(false);
        };

        if (dateStr) {
            crownDay();
        }
    }, [dateStr]);

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },

        datePill: {
            backgroundColor: isDark ? 'rgba(201, 162, 39, 0.15)' : '#FEF9EC',
        },
        bodyText: { color: colors.text },
        quoteText: { color: '#8C8B9C' },

        primaryButton: {
            backgroundColor: colors.text,
        },
        primaryButtonText: {
            color: colors.background
        },
        secondaryButton: {
            backgroundColor: 'transparent',
            borderColor: isDark ? colors.border : '#EAEAEA'
        },
        secondaryButtonText: { color: colors.textSecondary },
    });

    if (isSaving) {
        return (
            <SafeAreaView style={[styles.container, dynamicStyles.container, styles.loadingCenter]}>
                <ActivityIndicator size="large" color={yellow} />
                <Text style={[styles.bodyText, dynamicStyles.bodyText, { marginTop: 16 }]}>Crowning your day...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.content}>

                <View style={styles.badgeContainer}>
                    <View style={styles.glow} />
                    <View style={styles.iconCircle}>
                        <BadgeIcon color="#FFFFFF" size={42} />
                    </View>
                </View>

                <Text style={[styles.title, dynamicStyles.title]}>Day Crowned</Text>

                <View style={[styles.datePill, dynamicStyles.datePill]}>
                    <View style={styles.dot} />
                    <Text style={styles.dateText}>{month} {day}, {year}</Text>
                </View>

                <Text style={[styles.bodyText, dynamicStyles.bodyText]}>
                    This day is now preserved in{"\n"}your life story forever.
                </Text>

                <Text style={[styles.quoteText, dynamicStyles.quoteText]}>
                    "Every documented day is a{"\n"}gift to your future self."
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.primaryButton, dynamicStyles.primaryButton]}
                        activeOpacity={0.85}
                        onPress={() => {
                            if (typeof navigation.replace === 'function') {
                                navigation.replace('EnhanceCrown');
                                return;
                            }
                            navigation.navigate('EnhanceCrown');
                        }}
                    >
                        <Text style={[styles.primaryButtonText, dynamicStyles.primaryButtonText]}>Return to Today</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.secondaryButton, dynamicStyles.secondaryButton]}
                        activeOpacity={0.7}
                        onPress={() => {
                            if (typeof navigation.replace === 'function') {
                                navigation.replace('LifeMap');
                                return;
                            }
                            navigation.navigate('LifeMap');
                        }}
                    >
                        <Text style={[styles.secondaryButtonText, dynamicStyles.secondaryButtonText]}>View Life Map →</Text>
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
    },
    loadingCenter: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    badgeContainer: {
        marginBottom: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    glow: {
        position: 'absolute',
        width: 104,
        height: 104,
        borderRadius: 52,
        backgroundColor: yellow,
        opacity: 0.4,
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 30,
        elevation: 15,
    },
    iconCircle: {
        width: 104,
        height: 104,
        borderRadius: 52,
        backgroundColor: yellow,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        letterSpacing: -0.5,
        marginBottom: 16,
    },
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 16,
        borderRadius: 100,
        marginBottom: 28,
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
        fontSize: 13.5,
        fontWeight: '600',
    },
    bodyText: {
        fontSize: 19,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 28,
        marginBottom: 44,
    },
    quoteText: {
        fontSize: 14.5,
        fontStyle: 'italic',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 52,
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 14,
    },
    primaryButton: {
        width: '90%',
        paddingVertical: 18,
        borderRadius: 100,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    secondaryButton: {
        width: '90%',
        paddingVertical: 18,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    secondaryButtonText: {
        fontSize: 15,
        fontWeight: '500',
    },
});