import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions, Platform } from 'react-native';
import { Canvas, Group, Skia, Path, Blur, Shadow } from '@shopify/react-native-skia';

import { useAppTheme } from '../../hooks/useAppTheme';
import { COLOR_CROWNED, COLOR_DOCUMENTED, COLOR_UNDOCUMENTED } from '../../utils/colors';

const { height } = Dimensions.get('window');
const NODES_PER_ROW = 26;
const RADIUS = 3.2;
const SPACING = 3.5;
const CELL_SIZE = (RADIUS * 2) + SPACING;

const CROWN_RADIUS = RADIUS * 1.2;
const HALO_RADIUS = RADIUS * 2.5;
const GLOW_PADDING = 8;

type YearState = {
    year: number;
    age: number;
    dotsCount: number;
};

type YearPaths = {
    pUndocumented: ReturnType<typeof Skia.Path.Make>;
    pDocumented: ReturnType<typeof Skia.Path.Make>;
    pCrowned: ReturnType<typeof Skia.Path.Make>;
    pCrownedHalo: ReturnType<typeof Skia.Path.Make>;
};

type YearViewModel = YearState & {
    paths: YearPaths;
    canvasHeight: number;
};

const YearRow = memo(({ year, age, canvasHeight, paths }: YearViewModel) => {
    return (
        <View style={styles.yearRowContainer}>
            <Text style={[styles.yearLabel, { marginTop: GLOW_PADDING - 1, color: '#B4B4B4' }]}>{year}</Text>

            <Canvas style={[styles.yearCanvas, { height: canvasHeight, marginLeft: 12 - GLOW_PADDING }]}>
                <Group>
                    <Group color={COLOR_UNDOCUMENTED}><Path path={paths.pUndocumented} /></Group>
                    <Group color={COLOR_DOCUMENTED}><Path path={paths.pDocumented} /></Group>

                    <Group color={COLOR_CROWNED} opacity={0.15}>
                        <Blur blur={4} />
                        <Path path={paths.pCrownedHalo} />
                    </Group>

                    <Group color={COLOR_CROWNED}>
                        <Shadow dx={0} dy={0} blur={6} color={COLOR_CROWNED} />
                        <Path path={paths.pCrowned} />
                    </Group>
                </Group>
            </Canvas>

            <Text style={[styles.ageLabel, { marginTop: GLOW_PADDING - 1, color: '#B4B4B4' }]}>{age}y</Text>
        </View>
    );
});

const Screen2 = ({ birthDate, onNext, onSkip }: any) => {
    const { colors, isDark } = useAppTheme();
    const bDate = useMemo(() => new Date(birthDate), [birthDate]);
    const today = new Date();

    const yearsData = useMemo<YearViewModel[]>(() => {
        const years: YearViewModel[] = [];
        let current = new Date(bDate);
        let age = 0;

        while (current <= today) {
            const year = current.getFullYear();
            const yearStart = new Date(year, 0, 1);
            const yearEnd = new Date(year, 11, 31);
            const start = current > yearStart ? current : yearStart;
            const end = today < yearEnd ? today : yearEnd;
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            const dotsCount = Math.min(Math.ceil(diffDays / 7), 52);

            const pUndocumented = Skia.Path.Make();
            const pDocumented = Skia.Path.Make();
            const pCrowned = Skia.Path.Make();
            const pCrownedHalo = Skia.Path.Make();

            for (let d = 0; d < dotsCount; d++) {
                const col = d % NODES_PER_ROW;
                const row = Math.floor(d / NODES_PER_ROW);
                const cx = col * CELL_SIZE + RADIUS + GLOW_PADDING;
                const cy = row * CELL_SIZE + RADIUS + GLOW_PADDING;
                const rand = Math.random();

                if (rand > 0.95) {
                    pCrownedHalo.addCircle(cx, cy, HALO_RADIUS);
                    pCrowned.addCircle(cx, cy, CROWN_RADIUS);
                }
                else if (rand > 0.70) {
                    pDocumented.addCircle(cx, cy, RADIUS);
                }
                else {
                    pUndocumented.addCircle(cx, cy, RADIUS);
                }
            }

            const baseCanvasHeight = Math.ceil(dotsCount / NODES_PER_ROW) * CELL_SIZE;
            const canvasHeight = baseCanvasHeight > 0 ? baseCanvasHeight + (GLOW_PADDING * 2) : 0;

            years.push({
                year,
                age,
                dotsCount,
                canvasHeight,
                paths: { pUndocumented, pDocumented, pCrowned, pCrownedHalo },
            });

            current.setFullYear(current.getFullYear() + 1);
            current.setMonth(0);
            current.setDate(1);
            age++;
        }

        return years;
    }, [bDate, today]);

    const dynamicStyles = useMemo(() => StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        subtitle: { color: '#8C8B9C' },
        card: {
            backgroundColor: isDark ? colors.surface : '#FFFFFF',
            borderColor: isDark ? colors.border : '#F3EFE6',
            shadowOpacity: isDark ? 0 : 0.04,
            elevation: isDark ? 0 : 2,
        },
        legendText: { color: '#8C8B9C' },
        bottomSection: {
            backgroundColor: colors.background,
            borderTopColor: isDark ? colors.border : '#F3EFE6'
        },
        button: {
            backgroundColor: isDark ? '#FFFFFF' : colors.primary,
        },
        buttonText: { color: isDark ? '#1A1523' : colors.background },
        skipText: { color: '#B4B4B4' },
    }), [colors.background, colors.border, colors.primary, colors.surface, colors.text, isDark]);
    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.header}>
                <Text style={[styles.title, dynamicStyles.title]}>Your Life in Days</Text>
                <Text style={[styles.subtitle, dynamicStyles.subtitle]}>
                    Each dot represents one day. You've lived{'\n'}thousands already — and each one deserves{'\n'}to be remembered.
                </Text>
            </View>

            <View style={[styles.card, dynamicStyles.card]}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={{ maxHeight: height * 0.4 }}
                    contentContainerStyle={styles.listContent}
                >
                    {yearsData.map((item) => (
                        <YearRow
                            key={item.year}
                            year={item.year}
                            age={item.age}
                            dotsCount={item.dotsCount}
                            canvasHeight={item.canvasHeight}
                            paths={item.paths}
                        />
                    ))}
                </ScrollView>
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLOR_UNDOCUMENTED }]} />
                        <Text style={[styles.legendText, dynamicStyles.legendText]}>Undocumented</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLOR_DOCUMENTED }]} />
                        <Text style={[styles.legendText, dynamicStyles.legendText]}>Documented</Text>
                    </View>
                    <View style={styles.legendItem}>
                        <View style={[styles.legendDot, { backgroundColor: COLOR_CROWNED }]} />
                        <Text style={[styles.legendText, dynamicStyles.legendText]}>Crowned</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.bottomSection, dynamicStyles.bottomSection]}>
                <Pressable style={[styles.button, dynamicStyles.button]} onPress={onNext}>
                    <Text style={[styles.buttonText, dynamicStyles.buttonText]}>Continue</Text>
                </Pressable>

                <Pressable style={styles.skipButton} hitSlop={10} onPress={onSkip}>
                    <Text style={[styles.skipText, dynamicStyles.skipText]}>Skip intro</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default Screen2;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-between', paddingTop: 80 },
    header: { paddingHorizontal: 32, alignItems: 'center', marginTop: 12, marginBottom: 32 },
    title: { fontSize: 32, fontWeight: '800', textAlign: 'center', letterSpacing: -0.5, marginBottom: 16 },
    subtitle: { fontSize: 15, fontWeight: '400', textAlign: 'center', lineHeight: 24, letterSpacing: 0.1 },
    card: {
        marginHorizontal: 24, borderRadius: 20, paddingTop: 24, paddingHorizontal: 20,
        shadowColor: '#000000', shadowOffset: { width: 0, height: 8 }, shadowRadius: 20,
        borderWidth: 1
    },
    listContent: { paddingBottom: 10 },
    yearRowContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
    yearLabel: { width: 35, fontSize: 11, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', marginTop: -1 },
    yearCanvas: { flex: 1, marginLeft: 12, marginRight: 6 },
    ageLabel: { width: 25, fontSize: 11, textAlign: 'right', fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', marginTop: -1 },
    legendContainer: { flexDirection: 'row', justifyContent: 'center', gap: 16, paddingTop: 16, paddingBottom: 24 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { fontSize: 11.5, fontWeight: '500' },
    bottomSection: {
        marginTop: 10, paddingHorizontal: 24, paddingTop: 24, paddingBottom: height > 800 ? 50 : 34,
        borderTopWidth: 1
    },
    button: {
        height: 56,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
    },
    buttonText: { fontSize: 16, fontWeight: '500', letterSpacing: 0.2 },
    skipButton: { alignSelf: 'flex-end', marginTop: 20 },
    skipText: { fontSize: 14, fontWeight: '500' },
});