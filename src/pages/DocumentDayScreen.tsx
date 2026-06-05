import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import { ArrowLeftIcon } from '../utils/icons';
import { useAppTheme } from '../hooks/useAppTheme';
import useSubmit from '../hooks/useSubmit';

import { yellow, lightBlue, lightGreen } from '../utils/colors';

const DocumentDayScreen = ({ navigation, route }: any) => {
    const { colors } = useAppTheme();
    const { submit, loading } = useSubmit({ isAuth: true });

    const {
        day, month, year, dayOfWeek, status, dateStr,
        existingData
    } = route?.params || {};

    const dayData = existingData?.life_day || existingData;

    const [intention, setIntention] = useState('');
    const [reflection, setReflection] = useState('');
    const [achievement, setAchievement] = useState('');
    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (dayData) {
            setIntention(dayData.intention || '');
            setReflection(dayData.reflection || '');
            setAchievement(dayData.achievement || '');
        }
    }, [dayData]);

    const handleInputFocus = () => {
        setTimeout(() => { scrollRef.current?.scrollToEnd({ animated: true }); }, 120);
    };

    const handleSave = async () => {
        const payload = {
            date: dateStr,
            intention: intention.trim(),
            reflection: reflection.trim(),
            achievement: achievement.trim()
        };

        const endpoint = dayData ? `life-days/${dateStr}` : 'life-days/';
        const method = dayData ? 'PATCH' : 'POST';

        const response = await submit(endpoint, payload, { method });

        if (response) {
            const savedRecord = response.life_day || response;
            navigation.navigate('EnhanceCrownEmotion', {
                day, month, year, dayOfWeek, dateStr,
                intention, reflection, achievement,
                existingData: savedRecord
            });
        }
    };

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        header: { backgroundColor: colors.background, borderBottomColor: colors.border },
        backButton: { backgroundColor: colors.background, borderColor: colors.border },
        headerTitle: { color: colors.text },
        headerSubtitle: { color: colors.textSecondary },
        statusBadge: { backgroundColor: colors.surfaceMuted },
        statusBadgeText: { color: colors.textSecondary },
        mainTitle: { color: colors.text },
        mainSubtitle: { color: colors.textSecondary },
        textInput: { backgroundColor: colors.surface, borderColor: colors.border, color: colors.text },
        cancelButton: { borderColor: colors.border, backgroundColor: colors.background },
        cancelButtonText: { color: colors.textSecondary },
        bottomTabContainer: { borderTopColor: colors.border, backgroundColor: colors.background }
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <KeyboardAvoidingView style={styles.keyboardAvoid} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View style={[styles.header, dynamicStyles.header]}>
                    <View style={styles.headerLeft}>
                        <Pressable style={[styles.backButton, dynamicStyles.backButton]} onPress={() => navigation?.goBack()}>
                            <ArrowLeftIcon color={colors.text} />
                        </Pressable>
                        <View style={styles.headerTitles}>
                            <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{month} {day}, {year}</Text>
                            <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>{dayOfWeek}</Text>
                        </View>
                    </View>
                    <View style={[styles.statusBadge, dynamicStyles.statusBadge]}>
                        <Text style={[styles.statusBadgeText, dynamicStyles.statusBadgeText]}>{status}</Text>
                    </View>
                </View>

                <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" bounces={false}>
                    <View style={styles.titleSection}>
                        <Text style={[styles.mainTitle, dynamicStyles.mainTitle]}>Document {month} {day}</Text>
                        <Text style={[styles.mainSubtitle, dynamicStyles.mainSubtitle]}>Preserve this day in your life story</Text>
                    </View>

                    <View style={styles.inputSection}>
                        <View style={styles.labelRow}>
                            <View style={[styles.dot, { backgroundColor: yellow }]} />
                            <Text style={[styles.labelText, { color: yellow }]}>INTENTION</Text>
                        </View>
                        <TextInput style={[styles.textInput, dynamicStyles.textInput]} placeholder="What was your intention for this day?" placeholderTextColor={colors.textSecondary} multiline textAlignVertical="top" value={intention} onChangeText={setIntention} onFocus={handleInputFocus} />
                    </View>

                    <View style={styles.inputSection}>
                        <View style={styles.labelRow}>
                            <View style={[styles.dot, { backgroundColor: lightBlue }]} />
                            <Text style={[styles.labelText, { color: lightBlue }]}>REFLECTION</Text>
                        </View>
                        <TextInput style={[styles.textInput, dynamicStyles.textInput]} placeholder="What did this day teach you?" placeholderTextColor={colors.textSecondary} multiline textAlignVertical="top" value={reflection} onChangeText={setReflection} onFocus={handleInputFocus} />
                    </View>

                    <View style={styles.inputSection}>
                        <View style={styles.labelRow}>
                            <View style={[styles.dot, { backgroundColor: lightGreen }]} />
                            <Text style={[styles.labelText, { color: lightGreen }]}>ACHIEVEMENT</Text>
                        </View>
                        <TextInput style={[styles.textInput, dynamicStyles.textInput]} placeholder="What moved your life forward?" placeholderTextColor={colors.textSecondary} multiline textAlignVertical="top" value={achievement} onChangeText={setAchievement} onFocus={handleInputFocus} />
                    </View>

                    <View style={styles.buttonRow}>
                        <Pressable style={[styles.cancelButton, dynamicStyles.cancelButton]} onPress={() => navigation?.goBack()}>
                            <Text style={[styles.cancelButtonText, dynamicStyles.cancelButtonText]}>Cancel</Text>
                        </Pressable>

                        <Pressable style={styles.saveButton} onPress={handleSave} disabled={loading}>
                            {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.saveButtonText}>Crown this day</Text>}
                        </Pressable>
                    </View>
                </ScrollView>

                <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                    <BottomTabBar activeTab="map" />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default DocumentDayScreen;

const styles = StyleSheet.create({
    container: { flex: 1 },
    keyboardAvoid: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
    headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    backButton: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
    headerTitles: { justifyContent: 'center' },
    headerTitle: { fontSize: 16, fontWeight: '700' },
    headerSubtitle: { fontSize: 13, marginTop: 2 },
    statusBadge: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
    statusBadgeText: { fontSize: 12, fontWeight: '500' },
    scrollContent: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 60 },
    titleSection: { marginBottom: 24 },
    mainTitle: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
    mainSubtitle: { fontSize: 15, fontWeight: '400' },
    inputSection: { marginBottom: 16 },
    labelRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    dot: { width: 6, height: 6, borderRadius: 3, marginRight: 8 },
    labelText: { fontSize: 11, fontWeight: '800', letterSpacing: 0.8, textTransform: 'uppercase' },
    textInput: { height: 85, borderWidth: 1, borderRadius: 16, padding: 16, paddingTop: 16, fontSize: 15 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginTop: 16, marginBottom: 12 },
    cancelButton: { flex: 1, borderWidth: 1, borderRadius: 16, paddingVertical: 18, alignItems: 'center', justifyContent: 'center' },
    cancelButtonText: { fontSize: 16, fontWeight: '600' },

    // Updated Save Button to match old Crown Button
    saveButton: {
        flex: 1,
        borderRadius: 16,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: yellow,
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6
    },
    saveButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

    bottomTabContainer: { borderTopWidth: 1 },
});