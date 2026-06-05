import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { useAppTheme } from '../hooks/useAppTheme';
import { yellow } from '../utils/colors';
import { BookHeartIcon } from '../utils/icons';
import CircularBadge from '../components/CircularBadge';

const ReflectionSaved: React.FC<any> = ({ navigation }) => {
    const { colors } = useAppTheme();

    // Dynamically calculate today's date to match Figma design perfectly
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        datePill: { backgroundColor: colors.surfaceMuted },
        subtitle: { color: colors.textSecondary },
        italicText: { color: colors.textSecondary },
        primaryButton: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary
        },
        primaryButtonText: { color: colors.background },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.content}>

                <CircularBadge Icon={BookHeartIcon} iconCircleSize={100} />

                <Text style={[styles.title, dynamicStyles.title]}>Reflection Saved</Text>

                <View style={[styles.datePill, dynamicStyles.datePill]}>
                    <View style={styles.dot} />
                    <Text style={styles.dateText}>{formattedDate}</Text>
                </View>

                <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                    Your thoughts are now part of{'\n'}your life story
                </Text>

                <Text style={[styles.italicText, dynamicStyles.italicText]}>
                    Each reflection deepens your{'\n'}understanding of the path you're walking
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.primaryButton, dynamicStyles.primaryButton]}
                        activeOpacity={0.8}
                        onPress={() => {
                            // Navigate cleanly back to the insights tab
                            navigation.navigate('Insights');
                        }}
                    >
                        <Text style={[styles.primaryButtonText, dynamicStyles.primaryButtonText]}>Continue</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default ReflectionSaved;

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
    title: { fontSize: 32, fontWeight: '800', textAlign: 'center', letterSpacing: -0.5, marginBottom: 16 },
    datePill: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, borderWidth: 1, borderColor: yellow, marginBottom: 32 },
    dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: yellow, marginRight: 8 },
    dateText: { fontSize: 14, color: yellow, fontWeight: '600' },
    subtitle: { fontSize: 16, textAlign: 'center', lineHeight: 24, marginBottom: 32 },
    italicText: { fontSize: 14, textAlign: 'center', fontStyle: 'italic', lineHeight: 22, marginBottom: 48 },
    buttonContainer: { width: '100%', alignItems: 'center' },
    primaryButton: { width: '90%', paddingVertical: 18, borderRadius: 16, alignItems: 'center', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 },
    primaryButtonText: { fontSize: 16, fontWeight: '500' },
});