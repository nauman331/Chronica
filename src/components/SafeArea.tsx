import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAppTheme } from '../hooks/useAppTheme';

export const withSafeArea = (ScreenComponent: React.FC<any>) => {
    return (props: any) => {
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