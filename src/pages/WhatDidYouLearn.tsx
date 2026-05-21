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

// Import your bulb image here
import bulbimg from "../assets/bulb.png";

import { white, yellow, blue, gray, COLOR_TEXT_MAIN } from '../utils/colors';
import { ArrowLeftIcon, GreenCheckIcon } from '../utils/icons';

const WhatDidYouLearn = ({ navigation }: any) => {
    const [text, setText] = useState('I learned that...');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>

                        {/* --- Top Navigation Bar --- */}
                        <View style={styles.navBar}>
                            <TouchableOpacity
                                style={styles.backButton}
                                onPress={() => navigation.goBack()}
                            >
                                <ArrowLeftIcon color={COLOR_TEXT_MAIN} />
                            </TouchableOpacity>

                            {/* Pagination Dots (Middle Dot Active) */}
                            <View style={styles.dotsContainer}>
                                <View style={styles.dot} />
                                <View style={[styles.dot, styles.activeDot]} />
                                <View style={styles.dot} />
                            </View>

                            <View style={{ width: 40 }} />
                        </View>

                        {/* --- Progress Line --- */}
                        <View style={styles.progressLineContainer}>
                            {/* Fill updated to ~66% for the second step */}
                            <View style={styles.progressLineFill} />
                        </View>

                        {/* --- Main Content --- */}
                        <View style={styles.content}>
                            <View style={styles.iconContainer}>
                                {/* Lightbulb Image */}
                                <Image
                                    source={bulbimg}
                                    style={{ width: 56, height: 56 }}
                                    resizeMode="contain"
                                />
                            </View>

                            <Text style={styles.title}>What did you{'\n'}learn from it?</Text>
                            <Text style={styles.subtitle}>The insight or realization you gained</Text>

                            {/* Text Input Area */}
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    multiline
                                    value={text}
                                    onChangeText={setText}
                                    placeholder="Start typing..."
                                    placeholderTextColor={gray}
                                    textAlignVertical="top"
                                />
                                <View style={styles.checkIconWrapper}>
                                    <GreenCheckIcon />
                                </View>
                            </View>
                            <Text style={styles.charCount}>{text.length} characters</Text>
                        </View>

                        {/* --- Bottom Buttons (Split Layout) --- */}
                        <View style={styles.footerContainer}>
                            <View style={styles.footer}>
                                <TouchableOpacity
                                    style={styles.previousButton}
                                    activeOpacity={0.7}
                                    onPress={() => navigation.goBack()}
                                >
                                    <Text style={styles.previousButtonText}>Previous</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.continueButton}
                                    activeOpacity={0.8}
                                    onPress={() => navigation.navigate('ReflectionSaved')}
                                >
                                    <Text style={styles.continueButtonText}>Continue</Text>
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
    container: {
        flex: 1,
        backgroundColor: white,
    },
    inner: {
        flex: 1,
        justifyContent: 'space-between',
    },

    // Header & Navigation
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
        backgroundColor: '#F7F7F9',
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
        backgroundColor: '#E5E5E5',
    },
    activeDot: {
        width: 16,
        backgroundColor: yellow,
    },
    progressLineContainer: {
        height: 4,
        backgroundColor: '#F3F3F3',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 2,
        marginBottom: 30,
    },
    progressLineFill: {
        width: '66%', // Step 2 out of 3
        height: '100%',
        backgroundColor: yellow,
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
        color: blue,
        textAlign: 'center',
        lineHeight: 38,
        letterSpacing: -0.5,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: gray,
        textAlign: 'center',
        marginBottom: 32,
    },

    // Text Input
    inputContainer: {
        width: '100%',
        height: 220,
        borderWidth: 1,
        borderColor: '#FDECA6',
        borderRadius: 20,
        padding: 20,
        backgroundColor: "#fff",
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        color: COLOR_TEXT_MAIN,
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
        color: gray,
        marginTop: 8,
    },

    // Split Footer Buttons
    footerContainer: {
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0', // Slight line to match the visual separation in the design
        backgroundColor: white,
    },
    footer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 12, // Space between buttons
    },
    previousButton: {
        flex: 1,
        paddingVertical: 18,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
    },
    previousButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: gray,
    },
    continueButton: {
        flex: 1,
        backgroundColor: '#C8A43C',
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