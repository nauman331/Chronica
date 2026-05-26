import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions, Platform } from 'react-native';
import { Canvas, Group, Skia, Path, Blur, Shadow } from '@shopify/react-native-skia';

// Import custom theme hook
import { useAppTheme } from '../../hooks/useAppTheme';

// Fixed Colors for mapping states
import {
    COLOR_CROWNED,
    COLOR_DOCUMENTED,
    COLOR_UNDOCUMENTED
} from '../../utils/colors';

const { height } = Dimensions.get('window');
const NODES_PER_ROW = 26;
const RADIUS = 3.2;
const SPACING = 3.5;
const CELL_SIZE = (RADIUS * 2) + SPACING;

const CROWN_RADIUS = RADIUS * 1.2;
const HALO_RADIUS = RADIUS * 2.5;
const GLOW_PADDING = 8;

const YearRow = ({ year, age, dotsCount }: any) => {
    // Get colors inside YearRow for text labels
    const { colors } = useAppTheme();

    const paths = useMemo(() => {
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
        return { pUndocumented, pDocumented, pCrowned, pCrownedHalo };
    }, [dotsCount]);

    const baseCanvasHeight = Math.ceil(dotsCount / NODES_PER_ROW) * CELL_SIZE;
    const canvasHeight = baseCanvasHeight > 0 ? baseCanvasHeight + (GLOW_PADDING * 2) : 0;

    return (
        <View style={styles.yearRowContainer}>
            <Text style={[styles.yearLabel, { marginTop: GLOW_PADDING - 1, color: colors.textSecondary }]}>{year}</Text>

            <Canvas style={[styles.yearCanvas, { height: canvasHeight, marginLeft: 12 - GLOW_PADDING }]}>
                <Group>
                    <Group color={COLOR_UNDOCUMENTED}><Path path={paths.pUndocumented} /></Group>
                    <Group color={COLOR_DOCUMENTED}><Path path={paths.pDocumented} /></Group>

                    {/* Scattered Background Halo */}
                    <Group color={COLOR_CROWNED} opacity={0.15}>
                        <Blur blur={4} />
                        <Path path={paths.pCrownedHalo} />
                    </Group>

                    {/* Core Crowned Dot with glow */}
                    <Group color={COLOR_CROWNED}>
                        <Shadow dx={0} dy={0} blur={6} color={COLOR_CROWNED} />
                        <Path path={paths.pCrowned} />
                    </Group>
                </Group>
            </Canvas>

            <Text style={[styles.ageLabel, { marginTop: GLOW_PADDING - 1, color: colors.textSecondary }]}>{age}y</Text>
        </View>
    );
};

const Screen2 = ({ birthDate, onNext, onSkip }: any) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    const bDate = useMemo(() => new Date(birthDate), [birthDate]);
    const today = new Date();

    const yearsData = useMemo(() => {
        const years = [];
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

            years.push({ year, age, dotsCount });
            current.setFullYear(current.getFullYear() + 1);
            current.setMonth(0);
            current.setDate(1);
            age++;
        }
        return years;
    }, [bDate]);

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        title: { color: colors.text },
        subtitle: { color: colors.textSecondary },
        card: {
            backgroundColor: colors.surface,
            borderColor: colors.border
        },
        legendText: { color: colors.textSecondary },
        bottomSection: {
            backgroundColor: colors.background,
            borderTopColor: colors.border
        },
        button: {
            backgroundColor: colors.primary,
            ...Platform.select({
                ios: { shadowColor: colors.primary }
            })
        },
        buttonText: { color: colors.background }, // Inverts against primary button
        skipText: { color: colors.textSecondary },
    });

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.header}>
                <Text style={[styles.title, dynamicStyles.title]}>Your Life in Days</Text>
                <Text style={[styles.subtitle, dynamicStyles.subtitle]}>Each dot represents one day. You've lived thousands already — and each one deserves to be remembered.</Text>
            </View>

            <View style={[styles.card, dynamicStyles.card]}>
                <FlatList
                    data={yearsData}
                    keyExtractor={(item) => item.year.toString()}
                    renderItem={({ item }) => <YearRow year={item.year} age={item.age} dotsCount={item.dotsCount} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: height * 0.38 }}
                />
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
                <Pressable style={styles.skipButton} onPress={onSkip}>
                    <Text style={[styles.skipText, dynamicStyles.skipText]}>Skip intro</Text>
                </Pressable>
            </View>
        </View>
    );
};
export default Screen2;

// --- 3. Static Layout Styles (No Colors Here) ---
const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-between', paddingTop: 80 },
    header: { paddingHorizontal: 36, alignItems: 'center', marginTop: 24 },
    title: { fontSize: 32, fontWeight: '800', textAlign: 'center', marginBottom: 16 },
    subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
    card: {
        marginHorizontal: 24, borderRadius: 24, paddingTop: 24, paddingHorizontal: 20,
        shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.04, shadowRadius: 20,
        elevation: 1, borderWidth: 1
    },
    listContent: { paddingBottom: 10 },
    yearRowContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
    yearLabel: { width: 35, fontSize: 11, fontFamily: 'Courier', marginTop: -1 },
    yearCanvas: { flex: 1, marginLeft: 12, marginRight: 6 },
    ageLabel: { width: 25, fontSize: 11, textAlign: 'right', fontFamily: 'Courier', marginTop: -1 },
    legendContainer: { flexDirection: 'row', justifyContent: 'center', gap: 16, paddingTop: 16, paddingBottom: 24 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 10, height: 10, borderRadius: 5 },
    legendText: { fontSize: 12, fontWeight: '500' },
    bottomSection: {
        marginTop: 24, paddingHorizontal: 24, paddingBottom: height > 800 ? 50 : 30,
        borderTopWidth: 1, paddingTop: 24
    },
    button: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowOpacity: 0.4,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 12 },
            },
            android: {
                elevation: 10,
            }
        })
    },
    buttonText: { fontSize: 16, fontWeight: '500' },
    skipButton: { alignSelf: 'flex-end', marginTop: 24 },
    skipText: { fontSize: 14, fontWeight: '500' },
});