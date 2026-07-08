import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

import { useAppTheme } from '../../hooks/useAppTheme';
import { white, yellow } from '../../utils/colors';

const { height } = Dimensions.get('window');

const SparkleIcon = ({ size = 28, color = "#FFFFFF" }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path d="M12 2C12 7.5228 16.4772 12 22 12C16.4772 12 12 16.4772 12 22C12 16.4772 7.5228 12 2 12C7.5228 12 12 7.5228 12 2Z" fill={color} />
    </Svg>
);

const Screen3 = ({ onSkip, onBegin }: any) => {
    const { colors, isDark } = useAppTheme();

    const handleBeginRitual = () => {
        if (onBegin) {
            onBegin();
            return;
        }
        if (onSkip) {
            onSkip();
        }
    };

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        bodyText: { color: '#8C8B9C' },
        bottomSection: {
            backgroundColor: colors.background,
            borderTopColor: isDark ? colors.border : '#F3EFE6'
        },
        skipText: { color: '#B4B4B4' },
        iconCircle: { backgroundColor: isDark ? '#FFFFFF' : colors.primary },
        button: { backgroundColor: isDark ? '#FFFFFF' : yellow },
        buttonText: { color: isDark ? '#1A1523' : white },
        buttonIcon: { color: isDark ? '#1A1523' : white },
    });

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.centerSection}>

                <View style={[styles.iconCircle, dynamicStyles.iconCircle]}>
                    <SparkleIcon size={32} color={isDark ? '#1A1523' : '#FFFFFF'} />
                </View>

                <Text style={[styles.title, dynamicStyles.title]}>The Daily{'\n'}Ritual</Text>

                <Text style={styles.subtitleYellow}>Three questions. Every day.</Text>

                <Text style={[styles.bodyText, dynamicStyles.bodyText]}>
                    Set your intention. Reflect on what happened.{'\n'}Name what moved your life forward.
                </Text>

                <Text style={[styles.subtitleYellow, { marginTop: 44 }]}>Today</Text>

                <Text style={[styles.bodyText, dynamicStyles.bodyText]}>
                    what matters most,{'\n'}what did you learn,{'\n'}and what moved you forward?
                </Text>
            </View>

            <View style={[styles.bottomSection, dynamicStyles.bottomSection]}>
                <Pressable style={[styles.button, dynamicStyles.button]} onPress={handleBeginRitual}>
                    <Text style={[styles.buttonText, dynamicStyles.buttonText]}>Begin Today's Ritual</Text>
                    <SparkleIcon size={14} color={isDark ? '#1A1523' : white} />
                </Pressable>

                {onSkip && (
                    <Pressable style={styles.skipButton} hitSlop={10} onPress={onSkip}>
                        <Text style={[styles.skipText, dynamicStyles.skipText]}>Skip intro</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
};

export default Screen3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 80,
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: -30,
    },
    iconCircle: {
        width: 88,
        height: 88,
        borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 42,
        letterSpacing: -0.5,
        marginBottom: 20,
    },
    subtitleYellow: {
        color: yellow,
        fontSize: 16.5,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: -0.2,
        marginBottom: 12,
    },
    bodyText: {
        fontSize: 13,
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: 26,
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: height > 800 ? 50 : 34,
        borderTopWidth: 1,
    },
    button: {
        backgroundColor: yellow,
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 6,
    },
    buttonText: {
        color: white,
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 0.2,
    },
    skipButton: {
        alignSelf: 'flex-end',
        marginTop: 20,
    },
    skipText: {
        fontSize: 14,
        fontWeight: '500',
    },
});