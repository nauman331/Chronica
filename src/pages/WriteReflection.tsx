import React, { useState } from 'react';
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
    Image
} from 'react-native';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

import sparkleimg from "../assets/sparkle.png";

// Keep fixed brand colors for the progress/buttons
import { white, yellow } from '../utils/colors';
import { ArrowLeftIcon, GreenCheckIcon, SolidSparkleIcon } from '../utils/icons';

const WriteReflection = ({ navigation }: any) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    const [text, setText] = useState('Today I experienced...');

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        backButton: { backgroundColor: colors.surfaceMuted },
        inactiveDot: { backgroundColor: colors.surfaceMuted },
        progressLineContainer: { backgroundColor: colors.surfaceMuted },
        title: { color: colors.text },
        subtitle: { color: colors.textSecondary },
        inputContainer: {
            backgroundColor: colors.surface,
            borderColor: colors.border,
        },
        textInput: { color: colors.text },
        charCount: { color: colors.textSecondary },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>

                        {/* --- Top Navigation Bar --- */}
                        <View style={styles.navBar}>
                            <TouchableOpacity
                                style={[styles.backButton, dynamicStyles.backButton]}
                                onPress={() => navigation.goBack()}
                            >
                                <ArrowLeftIcon color={colors.text} />
                            </TouchableOpacity>

                            {/* Pagination Dots */}
                            <View style={styles.dotsContainer}>
                                <View style={[styles.dot, styles.activeDot]} />
                                <View style={[styles.dot, dynamicStyles.inactiveDot]} />
                                <View style={[styles.dot, dynamicStyles.inactiveDot]} />
                            </View>

                            <View style={{ width: 40 }} />
                        </View>

                        {/* --- Progress Line --- */}
                        <View style={[styles.progressLineContainer, dynamicStyles.progressLineContainer]}>
                            <View style={styles.progressLineFill} />
                        </View>

                        {/* --- Main Content --- */}
                        <View style={styles.content}>
                            <View style={styles.iconContainer}>
                                <Image
                                    source={sparkleimg}
                                    style={{ width: 56, height: 56 }}
                                    resizeMode="contain"
                                />
                            </View>

                            <Text style={[styles.title, dynamicStyles.title]}>What did you{'\n'}experience?</Text>
                            <Text style={[styles.subtitle, dynamicStyles.subtitle]}>Describe the moment, event, or situation</Text>

                            {/* Text Input Area */}
                            <View style={[styles.inputContainer, dynamicStyles.inputContainer]}>
                                <TextInput
                                    style={[styles.textInput, dynamicStyles.textInput]}
                                    multiline
                                    value={text}
                                    onChangeText={setText}
                                    placeholder="Start typing..."
                                    placeholderTextColor={colors.textSecondary}
                                    textAlignVertical="top"
                                />
                                <View style={styles.checkIconWrapper}>
                                    <GreenCheckIcon />
                                </View>
                            </View>
                            <Text style={[styles.charCount, dynamicStyles.charCount]}>{text.length} characters</Text>
                        </View>

                        {/* --- Bottom Button --- */}
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.continueButton} activeOpacity={0.8}
                                onPress={() => navigation.navigate('WhatDidYouLearn')}
                            >
                                <Text style={styles.continueButtonText}>Continue </Text>
                                <SolidSparkleIcon color={white} size={14} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default WriteReflection;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'space-between',
    },

    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    activeDot: {
        width: 16,
        backgroundColor: yellow,
    },
    progressLineContainer: {
        height: 4,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 2,
        marginBottom: 30,
    },
    progressLineFill: {
        width: '33%',
        height: '100%',
        backgroundColor: yellow, // Stays yellow
        borderRadius: 2,
    },

    // Main Content
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 38,
        letterSpacing: -0.5,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 32,
    },

    // Text Input
    inputContainer: {
        width: '100%',
        height: 220,
        borderWidth: 1,
        borderRadius: 20,
        padding: 20,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        lineHeight: 24,
    },
    checkIconWrapper: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    charCount: {
        alignSelf: 'flex-end',
        fontSize: 12,
        marginTop: 8,
    },

    // Footer & Continue Button
    footer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    continueButton: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#C8A43C', // Fixed yellow/gold
        paddingVertical: 18,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#C8A43C',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    continueButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: white,
    },
});