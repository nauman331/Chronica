import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import CircularBadge from '../../components/CircularBadge';
import { login } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';

// Import custom theme hook
import { useAppTheme } from '../../hooks/useAppTheme';

// Keep strict brand colors for accents and icons
import { white, yellow } from '../../utils/colors';

const { height } = Dimensions.get('window');

const StarIcon = ({ size = 24, color = white }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M12 0C12 7.5 16.5 12 24 12C16.5 12 12 16.5 12 24C12 16.5 7.5 12 0 12C7.5 12 12 7.5 12 0Z" fill={color} />
    </Svg>
);

const Screen3 = ({ onSkip }: any) => {
    const dispatch = useDispatch();

    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    const handleBeginRitual = () => {
        dispatch(login('true'));
    };

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        bodyText: { color: colors.textSecondary },
        bottomSection: {
            backgroundColor: colors.background,
            borderTopColor: colors.border
        },
        skipText: { color: colors.textSecondary }
    });

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.centerSection}>
                <CircularBadge
                    Icon={StarIcon}
                    badgeColor={colors.primary}
                    shadowColor={colors.primary}
                    shadowOpacity={0.14}
                    innerShadowOpacity={0.34}
                    shadowRadius={34}
                    innerShadowRadius={16}
                    iconColor={colors.background} // Inverts so the star is visible inside the badge
                    iconSize={32}
                    outerSize={160}
                    innerSize={62}
                    iconCircleSize={96}
                    marginBottom={20}
                />
                <Text style={[styles.title, dynamicStyles.title]}>The Daily{'\n'}Ritual</Text>

                {/* Yellow text stays static for branding */}
                <Text style={styles.subtitleYellow}>Three questions. Every day.</Text>

                <Text style={[styles.bodyText, dynamicStyles.bodyText]}>Set your intention. Reflect on what happened.{'\n'}Name what moved your life forward.</Text>

                <Text style={[styles.subtitleYellow, { marginTop: 40 }]}>Today</Text>
                <Text style={[styles.bodyText, dynamicStyles.bodyText]}>what matters most,{'\n'}what did you learn,{'\n'}and what moved you forward?</Text>
            </View>

            <View style={[styles.bottomSection, dynamicStyles.bottomSection]}>
                {/* Yellow button stays static for branding */}
                <Pressable style={styles.button} onPress={handleBeginRitual}>
                    <Text style={styles.buttonText}>Begin Today's Ritual</Text>
                    <StarIcon size={14} color={white} />
                </Pressable>

                <Pressable style={styles.skipButton} onPress={onSkip}>
                    <Text style={[styles.skipText, dynamicStyles.skipText]}>Skip intro</Text>
                </Pressable>
            </View>
        </View>
    );
};
export default Screen3;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 80
    },
    centerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        marginTop: -20
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        textAlign: 'center',
        lineHeight: 40,
        marginBottom: 20
    },
    subtitleYellow: {
        color: yellow, // Stays yellow
        fontSize: 16,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 12
    },
    bodyText: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 24
    },
    bottomSection: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: height > 800 ? 50 : 30,
        borderTopWidth: 1,
    },
    button: {
        backgroundColor: yellow,
        paddingVertical: 18,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 16,
        elevation: 8
    },
    buttonText: {
        color: white,
        fontSize: 16,
        fontWeight: '500'
    },
    skipButton: {
        alignSelf: 'flex-end',
        marginTop: 24
    },
    skipText: {
        fontSize: 14,
        fontWeight: '500'
    },
});