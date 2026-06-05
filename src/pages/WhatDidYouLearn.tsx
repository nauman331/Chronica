import React, { useState, useEffect, useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Image,
    ActivityIndicator
} from 'react-native';

import { useAppTheme } from '../hooks/useAppTheme';
import useSubmit from '../hooks/useSubmit';

import bulbimg from "../assets/bulb.png";
import { white, yellow } from '../utils/colors';
import { ArrowLeftIcon, GreenCheckIcon } from '../utils/icons';

const WhatDidYouLearn = ({ navigation, route }: any) => {
    const { colors } = useAppTheme();
    const { submit, loading } = useSubmit({ isAuth: true });

    const { existingData } = route?.params || {};
    const reflectionId = existingData?.id || existingData?.pk;
    const apiPrompt = existingData?.prompt;

    // 1. Deadline & Lock Checker
    const isLocked = useMemo(() => {
        if (!existingData) return false;
        if (existingData.is_locked) return true;
        if (existingData.edit_deadline) {
            return new Date() > new Date(existingData.edit_deadline);
        }
        return false;
    }, [existingData]);

    const [text, setText] = useState('');

    // 2. Pre-fill existing Data
    useEffect(() => {
        if (existingData?.reflection_text) {
            setText(existingData.reflection_text);
        }
    }, [existingData]);

    const handleComplete = async () => {
        // Allow navigation without patching if it's locked
        if (isLocked) {
            navigation.navigate('ReflectionSaved');
            return;
        }

        if (!reflectionId || text.trim().length === 0) return;

        const payload = {
            reflection_text: text.trim(),
        };

        const response = await submit(`reflections/${reflectionId}`, payload, { method: 'PATCH' });

        if (response) {
            navigation.navigate('ReflectionSaved');
        }
    };

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        backButton: { backgroundColor: colors.surfaceMuted },
        inactiveDot: { backgroundColor: colors.surfaceMuted },
        progressLineContainer: { backgroundColor: colors.surfaceMuted },
        title: { color: colors.text },
        subtitle: { color: colors.textSecondary },
        inputContainer: { backgroundColor: colors.surface, borderColor: colors.border },
        textInput: { color: colors.text },
        charCount: { color: colors.textSecondary },
        footerContainer: { backgroundColor: colors.background, borderTopColor: colors.border },
        previousButton: { backgroundColor: colors.background, borderColor: colors.border },
        previousButtonText: { color: colors.textSecondary },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>

                        <View style={styles.navBar}>
                            <TouchableOpacity style={[styles.backButton, dynamicStyles.backButton]} onPress={() => navigation.goBack()}>
                                <ArrowLeftIcon color={colors.text} />
                            </TouchableOpacity>

                            <View style={styles.dotsContainer}>
                                <View style={[styles.dot, dynamicStyles.inactiveDot]} />
                                <View style={[styles.dot, styles.activeDot]} />
                                <View style={[styles.dot, dynamicStyles.inactiveDot]} />
                            </View>
                            <View style={{ width: 40 }} />
                        </View>

                        <View style={[styles.progressLineContainer, dynamicStyles.progressLineContainer]}>
                            <View style={styles.progressLineFill} />
                        </View>

                        <View style={styles.content}>
                            <View style={styles.iconContainer}>
                                <Image source={bulbimg} style={{ width: 56, height: 56 }} resizeMode="contain" />
                            </View>

                            <Text style={[styles.title, dynamicStyles.title]}>What did you{'\n'}learn from it?</Text>

                            <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                                {apiPrompt || "The insight or realization you gained"}
                            </Text>

                            <View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
                                <TextInput
                                    style={[styles.textInput, dynamicStyles.textInput]}
                                    multiline
                                    value={text}
                                    onChangeText={setText}
                                    placeholder={isLocked ? "This reflection is locked." : "Start typing..."}
                                    placeholderTextColor={colors.textSecondary}
                                    textAlignVertical="top"
                                    editable={!isLocked}
                                />
                                <View style={styles.checkIconWrapper}>
                                    {text.length > 20 && <GreenCheckIcon />}
                                </View>
                            </View>
                            <Text style={[styles.charCount, dynamicStyles.charCount]}>{text.length} characters</Text>
                        </View>

                        <View style={[styles.footerContainer, dynamicStyles.footerContainer]}>
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={[styles.previousButton, dynamicStyles.previousButton]}
                                    activeOpacity={0.7}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={[styles.previousButtonText, dynamicStyles.previousButtonText]}>Previous</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.continueButton,
                                        (text.trim().length === 0 && !isLocked) && { opacity: 0.5 },
                                        isLocked && { backgroundColor: colors.surfaceMuted, shadowOpacity: 0 } // Gray out if locked
                                    ]}
                                    activeOpacity={0.8}
                                    onPress={handleComplete}
                                    disabled={loading || (text.trim().length === 0 && !isLocked)}
                                >
                                    {loading ? (
                                        <ActivityIndicator color={white} />
                                    ) : (
                                        <Text style={[
                                            styles.continueButtonText,
                                            isLocked && { color: colors.textSecondary } // Gray text if locked
                                        ]}>
                                            {isLocked ? "Reflection Locked" : "Complete Reflection"}
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default WhatDidYouLearn;

const styles = StyleSheet.create({
    container: { flex: 1 },
    inner: { flex: 1, justifyContent: 'space-between' },
    navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    dotsContainer: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    dot: { width: 6, height: 6, borderRadius: 3 },
    activeDot: { width: 16, backgroundColor: yellow },
    progressLineContainer: { height: 4, width: '90%', alignSelf: 'center', borderRadius: 2, marginBottom: 30 },
    progressLineFill: { width: '66%', height: '100%', backgroundColor: yellow, borderRadius: 2 },
    content: { flex: 1, paddingHorizontal: 20, alignItems: 'center' },
    iconContainer: { marginBottom: 16 },
    title: { fontSize: 32, fontWeight: '800', textAlign: 'center', lineHeight: 38, letterSpacing: -0.5, marginBottom: 12 },
    subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 32, paddingHorizontal: 10 },
    inputContainer: { width: '100%', height: 220, borderWidth: 1, borderRadius: 20, padding: 20 },
    textInput: { flex: 1, fontSize: 16, lineHeight: 24 },
    checkIconWrapper: { position: 'absolute', top: 20, right: 20 },
    charCount: { alignSelf: 'flex-end', fontSize: 12, marginTop: 8 },
    footerContainer: { borderTopWidth: 1 },
    footer: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 20, gap: 12 },
    previousButton: { flex: 1, paddingVertical: 18, borderRadius: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    previousButtonText: { fontSize: 16, fontWeight: '600' },
    continueButton: { flex: 1, backgroundColor: '#C8A43C', paddingVertical: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#C8A43C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
    continueButtonText: { fontSize: 16, fontWeight: '700', color: white },
});