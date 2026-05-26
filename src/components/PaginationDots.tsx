import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppTheme } from '../hooks/useAppTheme';
import { yellow } from '../utils/colors';

interface PaginationDotsProps {
    activeIndex?: number;
    total?: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ activeIndex = 0, total = 3 }) => {
    const { isDark } = useAppTheme();

    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: total }).map((_, index) => {
                const isActive = activeIndex === index;
                return (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            isActive ? styles.activeDot : [styles.inactiveDot, {
                                // High-contrast gray for light mode, muted surface for dark mode
                                backgroundColor: isDark ? '#3D2D5E' : '#E5E5EA'
                            }]
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default PaginationDots;

const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8, // Slightly increased gap for better readability
    },
    dot: {
        height: 6,
        borderRadius: 3,
    },
    inactiveDot: {
        width: 6,
    },
    activeDot: {
        width: 24, // Pill shape for active
        backgroundColor: yellow,
    },
});