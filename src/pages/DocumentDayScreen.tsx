import React, { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import BottomTabBar from '../components/BottomTabBar';
import {
    white,
    yellow,
    lightBlue,
    lightGreen,
    gray,
    COLOR_TEXT_MAIN,
    COLOR_TEXT_MUTED,
    COLOR_FUTURE
} from '../utils/colors';
import { ArrowLeftIcon } from '../utils/icons';

const DocumentDayScreen = ({ navigation, route }: any) => {
    const {
        day = 6,
        month = 'January',
        year = 2026,
        dayOfWeek = 'Monday',
        status = 'Not documented'
    } = route?.params || {};

    const [intention, setIntention] = useState('');
    const [reflection, setReflection] = useState('');
    const [achievement, setAchievement] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoid}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <Pressable style={styles.backButton} onPress={() => navigation?.goBack()}>
                            <ArrowLeftIcon color={COLOR_TEXT_MAIN} />
                        </Pressable>
                        <View style={styles.headerTitles}>
                            <Text style={styles.headerTitle}>{month} {day}, {year}</Text>
                            <Text style={styles.headerSubtitle}>{dayOfWeek}</Text>
                        </View>
                    </View>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusBadgeText}>{status}</Text>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Page Title */}
                    <View style={styles.titleSection}>
                        <Text style={styles.mainTitle}>Document {month} {day}</Text>
                        <Text style={styles.mainSubtitle}>Preserve this day in your life story</Text>
                    </View>

                    {/* Intention Input */}
                    <View style={styles.inputSection}>
                        <View style={styles.labelRow}>
                            <View style={[styles.dot, { backgroundColor: yellow }]} />
                            <Text style={[styles.labelText, { color: yellow }]}>INTENTION</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="What was your intention for this day?"
                            placeholderTextColor={COLOR_TEXT_MUTED}
                            multiline
                            textAlignVertical="top"
                            value={intention}
                            onChangeText={setIntention}
                        />
                    </View>

                    {/* Reflection Input */}
                    <View style={styles.inputSection}>
                        <View style={styles.labelRow}>
                            <View style={[styles.dot, { backgroundColor: lightBlue }]} />
                            <Text style={[styles.labelText, { color: lightBlue }]}>REFLECTION</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="What did this day teach you?"
                            placeholderTextColor={COLOR_TEXT_MUTED}
                            multiline
                            textAlignVertical="top"
                            value={reflection}
                            onChangeText={setReflection}
                        />
                    </View>

                    {/* Achievement Input */}
                    <View style={styles.inputSection}>
                        <View style={styles.labelRow}>
                            <View style={[styles.dot, { backgroundColor: lightGreen }]} />
                            <Text style={[styles.labelText, { color: lightGreen }]}>ACHIEVEMENT</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="What moved your life forward?"
                            placeholderTextColor={COLOR_TEXT_MUTED}
                            multiline
                            textAlignVertical="top"
                            value={achievement}
                            onChangeText={setAchievement}
                        />
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.buttonRow}>
                        <Pressable
                            style={styles.cancelButton}
                            onPress={() => navigation?.goBack()}
                        >
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>

                        <Pressable
                            style={styles.crownButton}
                            onPress={() => {
                                // Navigate and pass the state so the next screen can use it
                                navigation.navigate('EnhanceCrownEmotion', {
                                    day,
                                    month,
                                    year,
                                    dayOfWeek,
                                    intention,
                                    reflection,
                                    achievement
                                });
                            }}
                        >
                            <Text style={styles.crownButtonText}>Crown this day</Text>
                        </Pressable>
                    </View>

                </ScrollView>

                {/* Bottom Tab Bar */}
                <View style={styles.bottomTabContainer}>
                    <BottomTabBar activeTab="map" />
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default DocumentDayScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    keyboardAvoid: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#F8F8F8'
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    backButton: {
        width: 36,
        height: 36,
        borderRadius: 18,
        borderWidth: 1,
        borderColor: COLOR_FUTURE,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerTitles: {
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLOR_TEXT_MAIN
    },
    headerSubtitle: {
        fontSize: 13,
        color: gray,
        marginTop: 2
    },
    statusBadge: {
        backgroundColor: '#F4F4F6',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16
    },
    statusBadgeText: {
        fontSize: 12,
        color: gray,
        fontWeight: '500'
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
        paddingBottom: 40,
    },
    titleSection: {
        marginBottom: 32
    },
    mainTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: COLOR_TEXT_MAIN,
        marginBottom: 6
    },
    mainSubtitle: {
        fontSize: 15,
        color: gray,
        fontWeight: '400'
    },

    inputSection: {
        marginBottom: 24
    },
    labelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 8
    },
    labelText: {
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.8,
        textTransform: 'uppercase'
    },
    textInput: {
        backgroundColor: white,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 16,
        height: 110,
        padding: 16,
        fontSize: 15,
        color: COLOR_TEXT_MAIN,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 1,
    },

    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 16,
        marginBottom: 20
    },
    cancelButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white
    },
    cancelButtonText: {
        color: gray,
        fontSize: 16,
        fontWeight: '600'
    },
    crownButton: {
        flex: 1,
        backgroundColor: yellow,
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    crownButtonText: {
        color: white,
        fontSize: 16,
        fontWeight: '700'
    },

    bottomTabContainer: {
        borderTopWidth: 1,
        borderTopColor: '#F5F5F5',
        backgroundColor: white
    },
});