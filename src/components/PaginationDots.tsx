import React from 'react';
import { View, StyleSheet } from 'react-native';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Keep brand yellow for the active dot indicator
import { yellow } from '../utils/colors';

interface PaginationDotsProps {
    activeIndex?: number;
    total?: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ activeIndex = 0, total = 3 }) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        dot: {
            backgroundColor: colors.surfaceMuted,
        },
        activeDot: {
            backgroundColor: yellow, // Stays yellow as brand accent
        }
    });

    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: total }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        dynamicStyles.dot,
                        activeIndex === index && [styles.activeDot, dynamicStyles.activeDot]
                    ]}
                />
            ))}
        </View>
    );
};

export default PaginationDots;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    paginationContainer: {
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
        width: 24,
        height: 6,
        borderRadius: 3,
    },
});