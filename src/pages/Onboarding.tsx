import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, SafeAreaView, InteractionManager } from 'react-native';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

import PaginationDots from '../components/PaginationDots';
import Screen1 from './IntroScreens/Screen1';
import Screen2 from './IntroScreens/Screen2';
import Screen3 from './IntroScreens/Screen3';

const { width } = Dimensions.get('window');

const Onboarding: React.FC<any> = ({ navigation, route }) => {
    const { colors } = useAppTheme();
    const scrollViewRef = useRef<ScrollView>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const birthDate = route?.params?.birthDate || new Date(1996, 0, 1).toISOString();

    useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            void import('./EnhanceCrown');
            void import('./LifeMap');
        });

        return () => task.cancel();
    }, []);

    const handleScroll = (event: any) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(scrollPosition / width);
        setActiveIndex(currentIndex);
    };

    const goToNext = () => {
        if (activeIndex < 2) {
            scrollViewRef.current?.scrollTo({ x: (activeIndex + 1) * width, animated: true });
        } else {
            navigation.navigate('EnhanceCrown');
        }
    };

    const skipOnboarding = () => {
        navigation.navigate('EnhanceCrown');
    };

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background }
    });

    return (
        <SafeAreaView style={[styles.safeArea, dynamicStyles.container]}>
            <View style={styles.container}>
                <View style={styles.topSection}>
                    <PaginationDots activeIndex={activeIndex} total={3} />
                </View>

                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={handleScroll}
                    bounces={false}
                    style={styles.scrollView}
                >
                    <View style={{ width }}>
                        <Screen1 birthDate={birthDate} onNext={goToNext} onSkip={skipOnboarding} />
                    </View>
                    <View style={{ width }}>
                        <Screen2 birthDate={birthDate} onNext={goToNext} onSkip={skipOnboarding} />
                    </View>
                    <View style={{ width }}>
                        <Screen3 onNext={goToNext} onSkip={skipOnboarding} />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    topSection: {
        paddingTop: 20,
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    scrollView: {
        flex: 1,
    },
});