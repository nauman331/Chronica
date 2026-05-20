import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable, Platform, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { blue, gray, white, yellow } from '../utils/colors';
import googleIcon from '../assets/logo.png'; // Assuming corrected multicolored Google 'G' icon
import facebookIcon from '../assets/facebook.png'; // Assuming corrected blue Facebook logo
import gmailIcon from '../assets/gmail.png'; // Assuming corrected multi-color Gmail 'M' icon

const GetStarted: React.FC<any> = ({ navigation }) => {
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isDateSelected, setIsDateSelected] = useState(false);

    const onDateChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShowPicker(Platform.OS === 'ios');
        setDate(currentDate);

        if (event.type === 'set' || selectedDate) {
            setIsDateSelected(true);
        }
    };

    const formatDate = (dateToFormat: Date) => {
        const day = dateToFormat.getDate().toString().padStart(2, '0');
        const month = (dateToFormat.getMonth() + 1).toString().padStart(2, '0');
        const year = dateToFormat.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleContinue = () => {
        navigation.navigate('Onboarding', { birthDate: date.toISOString() });
    };

    return (
        <SafeAreaView style={styles.container}>

            {/* Centered Main Content Wrapper */}
            <View style={styles.mainContent}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Welcome to{'\n'}
                        <Text style={styles.accent}>CHRONICA</Text>
                    </Text>
                    <Text style={styles.subtitle}>
                        You have one life.{'\n'}You are living it right now.
                    </Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Your Birth Date</Text>

                        <Pressable
                            style={styles.input}
                            onPress={() => setShowPicker(true)}
                        >
                            <Text style={{ color: isDateSelected ? blue : '#A0A0A0', fontSize: 15 }}>
                                {isDateSelected ? formatDate(date) : "dd/mm/yyyy"}
                            </Text>
                        </Pressable>

                        {showPicker && (
                            <DateTimePicker
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                                maximumDate={new Date()}
                            />
                        )}
                    </View>

                    {/* Button with colored drop shadow effect */}
                    <Pressable style={styles.primaryButton} onPress={handleContinue}>
                        <Text style={styles.primaryButtonText}>Begin Your Journey</Text>
                    </Pressable>

                    <Pressable style={styles.secondaryButton} onPress={handleContinue}>
                        <Text style={styles.secondaryButtonText}>Already have an account</Text>
                    </Pressable>

                    <View style={styles.dividerContainer}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>Or continue with</Text>
                        <View style={styles.line} />
                    </View>

                    <View style={styles.socialContainer}>
                        <Pressable style={styles.socialButton}>
                            <Image source={googleIcon} style={styles.iconImage} />
                        </Pressable>
                        <Pressable style={styles.socialButton}>
                            <Image source={facebookIcon} style={styles.iconImage} />
                        </Pressable>
                        <Pressable style={styles.socialButton}>
                            <Image source={gmailIcon} style={styles.iconImage} />
                        </Pressable>
                    </View>
                </View>
            </View>

            {/* Pushed Footer Section */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    Your data stays private and is stored{'\n'}locally on your device
                </Text>
            </View>

        </SafeAreaView>
    );
};

export default GetStarted;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    header: { alignItems: 'center', marginBottom: 32 },
    title: { fontSize: 32, lineHeight: 40, color: blue, fontWeight: '800', textAlign: 'center' },
    accent: { color: yellow },
    subtitle: { marginTop: 16, color: gray, textAlign: 'center', lineHeight: 22, fontSize: 15 },
    card: { borderRadius: 24, backgroundColor: "#fff", padding: 24, borderWidth: 1, borderColor: '#F0F0F0', shadowColor: blue, shadowOpacity: 0.06, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 1 },

    inputGroup: { gap: 8, marginBottom: 24 },
    inputLabel: { color: blue, fontSize: 14, fontWeight: '600', marginLeft: 4 },
    input: { borderWidth: 1, borderColor: yellow, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, backgroundColor: white, justifyContent: 'center' },

    primaryButton: {
        backgroundColor: blue,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: blue,
                shadowOpacity: 0.3,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 8 },
            },
            android: {
                elevation: 6,
            }
        })
    },
    primaryButtonText: { color: white, fontSize: 15, fontWeight: '600' },
    secondaryButton: { borderWidth: 1, borderColor: '#E8E4DC', paddingVertical: 15, borderRadius: 16, alignItems: 'center', backgroundColor: white, marginBottom: 16 },
    secondaryButtonText: { color: blue, fontSize: 14, fontWeight: '500' },
    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
    line: { flex: 1, height: 1, backgroundColor: '#F0EAE1' },
    dividerText: { marginHorizontal: 12, color: '#A0A0A0', fontSize: 13 },
    socialContainer: { flexDirection: 'row', justifyContent: 'center', gap: 24 },
    socialButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: white, justifyContent: 'center', alignItems: 'center' },
    iconImage: { width: 24, height: 24, resizeMode: 'contain' },

    footer: {
        paddingBottom: 24,
        paddingHorizontal: 24,
        alignItems: 'center',
    },
    footerText: {
        color: '#A0A0A0',
        textAlign: 'center',
        lineHeight: 20,
        fontSize: 13,
        fontWeight: '400',
    },
});