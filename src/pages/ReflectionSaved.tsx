import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

import { white, yellow, blue, gray } from '../utils/colors';
import { BookHeartIcon } from '../utils/icons';
import CircularBadge from '../components/CircularBadge';

const ReflectionSaved: React.FC<any> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Using your default CircularBadge sizes! */}
                <CircularBadge Icon={BookHeartIcon} iconCircleSize={100} />

                {/* Main Heading */}
                <Text style={styles.title}>Reflection Saved</Text>

                {/* Date Pill */}
                <View style={styles.datePill}>
                    <View style={styles.dot} />
                    <Text style={styles.dateText}>April 15, 2026</Text>
                </View>

                {/* Subtitles */}
                <Text style={styles.subtitle}>
                    Your thoughts are now part of{'\n'}your life story
                </Text>

                <Text style={styles.italicText}>
                    Each reflection deepens your{'\n'}understanding of the path you're walking
                </Text>

                {/* Continue Button */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.primaryButton}
                        activeOpacity={0.8}
                        onPress={() => {
                            navigation.navigate('Insights');
                        }}
                    >
                        <Text style={styles.primaryButtonText}>Continue</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default ReflectionSaved;

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

    // Typography
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: blue,
        textAlign: 'center',
        letterSpacing: -0.5,
        marginBottom: 16,
    },

    // Date Pill
    datePill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f7f3e4',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: yellow,
        marginBottom: 32,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: yellow,
        marginRight: 8,
    },
    dateText: {
        fontSize: 14,
        color: yellow,
        fontWeight: '600',
    },

    // Subtitles
    subtitle: {
        fontSize: 16,
        color: gray,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
    },
    italicText: {
        fontSize: 14,
        color: '#999999',
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 22,
        marginBottom: 48,
    },

    // Button
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
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
        fontSize: 16,
        fontWeight: '500',
        color: white,
    },
});