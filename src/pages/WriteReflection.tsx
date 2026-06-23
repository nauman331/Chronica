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
import useFetch from '../hooks/useFetch';
import useSubmit from '../hooks/useSubmit';

import sparkleimg from "../assets/sparkle.png";
import { white, yellow } from '../utils/colors';
import { ArrowLeftIcon, GreenCheckIcon, SolidSparkleIcon } from '../utils/icons';

const getCurrentWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    const start = new Date(new Date().setDate(diffToMonday));
    const end = new Date(new Date(start).setDate(start.getDate() + 6));

    const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    return {
        period_start_date: formatDate(start),
        period_end_date: formatDate(end)
    };
};

const WriteReflection = ({ navigation }: any) => {
    const { colors } = useAppTheme();
    const { submit, loading: submitting } = useSubmit({ isAuth: true });

    const { period_start_date, period_end_date } = useMemo(() => getCurrentWeekDates(), []);

    const { data: existingReflections, loading: fetching } = useFetch(
        `reflections/?start_date=${period_start_date}&end_date=${period_end_date}`,
        { isAuth: true }
    );

    const existingRef = useMemo(() => {
        if (Array.isArray(existingReflections) && existingReflections.length > 0) return existingReflections[0];
        if ((existingReflections as any)?.results && (existingReflections as any).results.length > 0) return (existingReflections as any).results[0];
        return null;
    }, [existingReflections]);

    const isLocked = useMemo(() => {
        if (!existingRef) return false;
        if (existingRef.is_locked) return true;
        if (existingRef.edit_deadline) {
            return new Date() > new Date(existingRef.edit_deadline);
        }
        return false;
    }, [existingRef]);

    const [text, setText] = useState('');

    useEffect(() => {
        if (existingRef && existingRef.reflection_text) {
            setText(existingRef.reflection_text);
        }
    }, [existingRef]);

    const handleSave = async () => {
        if (isLocked) {
            navigation.navigate('ReflectionSaved');
            return;
        }

        if (text.trim().length === 0) return;

        const payload = {
            reflection_text: text.trim(),
            period_start_date,
            period_end_date
        };

        const existingId = existingRef?.id || existingRef?.pk;
        const endpoint = existingId ? `reflections/${existingId}` : 'reflections/';
        const method = existingId ? 'PATCH' : 'POST';

        const response = await submit(endpoint, payload, { method });

        if (response) {
            navigation.navigate('ReflectionSaved');
        }
    };

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        backButton: { backgroundColor: colors.surfaceMuted },
        title: { color: colors.text },
        subtitle: { color: colors.textSecondary },
        inputContainer: { backgroundColor: colors.surface, borderColor: colors.border },
        textInput: { color: colors.text },
        charCount: { color: colors.textSecondary },
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
                            <View style={{ width: 40 }} />
                        </View>

                        <View style={styles.content}>
                            <View style={styles.iconContainer}>
                                <Image source={sparkleimg} style={{ width: 56, height: 56 }} resizeMode="contain" />
                            </View>

                            <Text style={[styles.title, dynamicStyles.title]}>What did you{'\n'}experience?</Text>
                            <Text style={[styles.subtitle, dynamicStyles.subtitle]}>Describe the moment, event, or situation</Text>

                            <View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
                                {fetching ? (
                                    <ActivityIndicator color={yellow} style={{ flex: 1 }} />
                                ) : (
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
                                )}
                                <View style={styles.checkIconWrapper}>
                                    {text.length > 20 && !fetching && <GreenCheckIcon />}
                                </View>
                            </View>
                            <Text style={[styles.charCount, dynamicStyles.charCount]}>{text.length} characters</Text>
                        </View>

                        <View style={styles.footer}>
                            <TouchableOpacity
                                style={[styles.continueButton, (text.trim().length === 0 && !isLocked) && { opacity: 0.5 }]}
                                activeOpacity={0.8}
                                onPress={handleSave}
                                disabled={submitting || fetching || (text.trim().length === 0 && !isLocked)}
                            >
                                {submitting ? (
                                    <ActivityIndicator color={white} />
                                ) : (
                                    <>
                                        <Text style={styles.continueButtonText}>{isLocked ? "View Saved Reflection" : "Save Reflection"}</Text>
                                        <SolidSparkleIcon color={white} size={14} />
                                    </>
                                )}
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default WriteReflection;

const styles = StyleSheet.create({
    container: { flex: 1 },
    inner: { flex: 1, justifyContent: 'space-between' },
    navBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 20 },
    backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    content: { flex: 1, paddingHorizontal: 20, alignItems: 'center', paddingTop: 10 },
    iconContainer: { marginBottom: 16 },
    title: { fontSize: 32, fontWeight: '800', textAlign: 'center', lineHeight: 38, letterSpacing: -0.5, marginBottom: 12 },
    subtitle: { fontSize: 15, textAlign: 'center', marginBottom: 32 },
    inputContainer: { width: '100%', height: 220, borderWidth: 1, borderRadius: 20, padding: 20 },
    textInput: { flex: 1, fontSize: 16, lineHeight: 24 },
    checkIconWrapper: { position: 'absolute', top: 20, right: 20 },
    charCount: { alignSelf: 'flex-end', fontSize: 12, marginTop: 8 },
    footer: { paddingHorizontal: 20, paddingBottom: 20 },
    continueButton: { flexDirection: 'row', gap: 6, width: '100%', backgroundColor: '#C8A43C', paddingVertical: 18, borderRadius: 16, alignItems: 'center', justifyContent: 'center', shadowColor: '#C8A43C', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
    continueButtonText: { fontSize: 16, fontWeight: '700', color: white },
});