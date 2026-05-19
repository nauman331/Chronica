import React from 'react';
import { View, StyleSheet } from 'react-native';
import { yellow } from '../utils/colors';

interface PaginationDotsProps {
    activeIndex?: number;
    total?: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ activeIndex = 0, total = 3 }) => {
    return (
        <View style={styles.paginationContainer}>
            {Array.from({ length: total }).map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        activeIndex === index && styles.activeDot
                    ]}
                />
            ))}
        </View>
    );
};

export default PaginationDots;

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
        backgroundColor: '#E0DEE3',
    },
    activeDot: {
        width: 24,
        height: 6,
        borderRadius: 3,
        backgroundColor: yellow,
    },
});