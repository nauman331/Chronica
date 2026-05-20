import { SafeAreaView } from 'react-native-safe-area-context';

export const withSafeArea = (ScreenComponent: React.FC<any>) => {
    return (props: any) => (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} edges={['top', 'bottom']}>
            <ScreenComponent {...props} />
        </SafeAreaView>
    );
};