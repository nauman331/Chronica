import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import custom theme hook (adjust path if your HOC is in a different folder depth)
import { useAppTheme } from '../hooks/useAppTheme';

export const withSafeArea = (ScreenComponent: React.FC<any>) => {
    return (props: any) => {
        // --- 1. Get dynamic colors ---
        const { colors } = useAppTheme();

        return (
            <SafeAreaView
                style={{ flex: 1, backgroundColor: colors.background }}
                edges={['top', 'bottom']}
            >
                <ScreenComponent {...props} />
            </SafeAreaView>
        );
    };
};