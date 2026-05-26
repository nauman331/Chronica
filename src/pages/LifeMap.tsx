import React, { useMemo, useCallback, memo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { Canvas, Group, Skia, Path, Blur, Shadow } from '@shopify/react-native-skia';
import BottomTabBar from '../components/BottomTabBar';

import { useAppTheme } from '../hooks/useAppTheme';

import {
    COLOR_CROWNED,
    COLOR_DOCUMENTED,
    COLOR_PAST,
    COLOR_FUTURE,
} from '../utils/colors';

const NODES_PER_ROW = 26;
const WEEKS_PER_YEAR = 52;
const RADIUS = 2.5;
const SPACING = 4;
const CELL_SIZE = (RADIUS * 2) + SPACING;

const CROWN_RADIUS = RADIUS * 1.2;
const HALO_RADIUS = RADIUS * 2.5;
const GLOW_PADDING = 8;

// ─── Pre-computed canvas dimensions (static, computed once) ───────────────────
const CANVAS_HEIGHT = (2 * CELL_SIZE) + (GLOW_PADDING * 2);
const CANVAS_WIDTH = (NODES_PER_ROW * CELL_SIZE) + (GLOW_PADDING * 2);

// ─── Static week data generated once outside the component ───────────────────
// Math.random() was inside useMemo before — unstable across remounts.
// Moved here so it runs exactly once per app session.
const CURRENT_YEAR = 2026;
const CURRENT_WEEK_IN_YEAR = 20;
const TOTAL_YEARS = 32;

type WeekState = 'past' | 'documented' | 'crowned' | 'future';

interface YearData {
    year: number;
    age: number;
    weeks: WeekState[];
}

function buildYearsData(): YearData[] {
    const data: YearData[] = [];
    for (let i = 0; i <= TOTAL_YEARS; i++) {
        const year = 2000 + i;
        const age = i;
        const weeks: WeekState[] = new Array(WEEKS_PER_YEAR);

        for (let w = 0; w < WEEKS_PER_YEAR; w++) {
            if (year > CURRENT_YEAR || (year === CURRENT_YEAR && w >= CURRENT_WEEK_IN_YEAR)) {
                weeks[w] = 'future';
            } else {
                const rand = Math.random();
                if (rand > 0.90) weeks[w] = 'crowned';
                else if (rand > 0.70) weeks[w] = 'documented';
                else weeks[w] = 'past';
            }
        }
        data.push({ year, age, weeks });
    }
    return data;
}

// Stable reference — never recreated.
const YEARS_DATA: YearData[] = buildYearsData();

// ─── Pre-build all Skia paths once, outside React ────────────────────────────
// Previously each YearRow re-built paths inside useMemo with [weeks] dep.
// Since YEARS_DATA is static, we can build all paths once at module load.
interface YearPaths {
    pPast: ReturnType<typeof Skia.Path.Make>;
    pDocumented: ReturnType<typeof Skia.Path.Make>;
    pCrowned: ReturnType<typeof Skia.Path.Make>;
    pCrownedHalo: ReturnType<typeof Skia.Path.Make>;
    pFuture: ReturnType<typeof Skia.Path.Make>;
}

function buildPaths(weeks: WeekState[]): YearPaths {
    const pPast = Skia.Path.Make();
    const pDocumented = Skia.Path.Make();
    const pCrowned = Skia.Path.Make();
    const pCrownedHalo = Skia.Path.Make();
    const pFuture = Skia.Path.Make();

    weeks.forEach((state, d) => {
        const col = d % NODES_PER_ROW;
        const row = Math.floor(d / NODES_PER_ROW);
        const cx = col * CELL_SIZE + RADIUS + GLOW_PADDING;
        const cy = row * CELL_SIZE + RADIUS + GLOW_PADDING;

        switch (state) {
            case 'crowned':
                pCrownedHalo.addCircle(cx, cy, HALO_RADIUS);
                pCrowned.addCircle(cx, cy, CROWN_RADIUS);
                break;
            case 'documented': pDocumented.addCircle(cx, cy, RADIUS); break;
            case 'past': pPast.addCircle(cx, cy, RADIUS); break;
            case 'future': pFuture.addCircle(cx, cy, RADIUS); break;
        }
    });

    return { pPast, pDocumented, pCrowned, pCrownedHalo, pFuture };
}

// All paths built synchronously at module load — zero cost at render time.
const ALL_YEAR_PATHS: YearPaths[] = YEARS_DATA.map(d => buildPaths(d.weeks));

interface YearViewModel extends YearData {
    paths: YearPaths;
}

const YEARS_VIEW_MODEL: YearViewModel[] = YEARS_DATA.map((yearData, index) => ({
    ...yearData,
    paths: ALL_YEAR_PATHS[index],
}));

// ─── Static future-dot color ──────────────────────────────────────────────────
// Previously used colors.border (dynamic theme value) as a Skia color, which
// caused two problems: (1) Skia colors must be resolved strings at path-paint
// time, not reactive values; (2) it forced YearRow to depend on theme, making
// React.memo useless. COLOR_FUTURE is a static constant — correct approach.
// If you need a theme-aware future color, derive it once at the LifeMap level
// and pass it as a stable prop. Here we keep COLOR_FUTURE (from utils/colors).

// ─── YearRow ─────────────────────────────────────────────────────────────────
interface YearRowProps {
    year: number;
    age: number;
    paths: YearPaths;
    textSecondaryColor: string; // passed from parent to avoid useAppTheme per-row
    onPress: (year: number, age: number) => void;
}

// React.memo with a custom comparison — onPress is stable (useCallback in parent)
// so default shallow compare is fine, but explicit for clarity.
const YearRow = memo(({ year, age, paths, textSecondaryColor, onPress }: YearRowProps) => {
    const handlePress = useCallback(() => onPress(year, age), [onPress, year, age]);

    return (
        <Pressable style={styles.yearRowContainer} onPress={handlePress}>
            <Text style={[styles.yearLabel, { marginTop: GLOW_PADDING, color: textSecondaryColor }]}>
                {year}
            </Text>
            <View style={styles.canvasContainer}>
                <Canvas style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
                    <Group>
                        <Group color={COLOR_PAST}><Path path={paths.pPast} /></Group>
                        <Group color={COLOR_DOCUMENTED}><Path path={paths.pDocumented} /></Group>

                        <Group color={COLOR_CROWNED} opacity={0.15}>
                            <Blur blur={4} />
                            <Path path={paths.pCrownedHalo} />
                        </Group>

                        <Group color={COLOR_CROWNED}>
                            <Shadow dx={0} dy={0} blur={6} color={COLOR_CROWNED} />
                            <Path path={paths.pCrowned} />
                        </Group>

                        <Group color={COLOR_FUTURE}><Path path={paths.pFuture} /></Group>
                    </Group>
                </Canvas>
            </View>
            <Text style={[styles.ageLabel, { marginTop: GLOW_PADDING, color: textSecondaryColor }]}>
                {age}y
            </Text>
        </Pressable>
    );
});

// ─── LifeMap ──────────────────────────────────────────────────────────────────
const LifeMap = ({ navigation }: any) => {
    const { colors } = useAppTheme();

    // Stable callback — rows stay memo-friendly and navigation gets the data directly.
    const handleYearPress = useCallback((year: number, age: number) => {
        navigation.navigate('YearView', { year, age });
    }, [navigation]);

    const handleTodayPress = useCallback(() => {
        navigation.navigate('EnhanceCrown');
    }, [navigation]);

    // Dynamic styles in a single object — no StyleSheet.create in render.
    const dynamicContainerStyle = useMemo(() => ({ backgroundColor: colors.background }), [colors.background]);
    const dynamicProgressBarContainer = useMemo(() => ({ backgroundColor: colors.surfaceMuted }), [colors.surfaceMuted]);
    const dynamicTodayButton = useMemo(() => ({
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
    }), [colors.primary]);
    const dynamicTodayButtonText = useMemo(() => ({ color: colors.background }), [colors.background]);
    const dynamicDivider = useMemo(() => ({ backgroundColor: colors.border }), [colors.border]);
    const dynamicBottomTab = useMemo(() => ({
        borderTopColor: colors.border,
        backgroundColor: colors.background,
    }), [colors.border, colors.background]);

    return (
        <SafeAreaView style={[styles.container, dynamicContainerStyle]}>
            <View style={styles.header}>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Your Life Map</Text>
                <View style={styles.statsRow}>
                    <Text style={[styles.statsLargeNumber, { color: colors.text }]}>
                        11,791 <Text style={[styles.statsDays, { color: colors.textSecondary }]}>days</Text>
                    </Text>
                    <Pressable style={[styles.todayButton, dynamicTodayButton]} onPress={handleTodayPress}>
                        <Text style={[styles.todayButtonText, dynamicTodayButtonText]}>Today ✦</Text>
                    </Pressable>
                </View>
                <Text style={[styles.headerSubtitleBottom, { color: colors.textSecondary }]}>
                    1,684 weeks - 40% of life lived
                </Text>
                <View style={[styles.progressBarContainer, dynamicProgressBarContainer]}>
                    <View style={styles.progressBarFill} />
                </View>
            </View>

            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLOR_PAST }]} />
                    <Text style={[styles.legendText, { color: colors.textSecondary }]}>Past</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLOR_DOCUMENTED }]} />
                    <Text style={[styles.legendText, { color: colors.textSecondary }]}>Documented</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLOR_CROWNED }]} />
                    <Text style={[styles.legendText, { color: colors.textSecondary }]}>Crowned</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLOR_FUTURE }]} />
                    <Text style={[styles.legendText, { color: colors.textSecondary }]}>Future</Text>
                </View>
            </View>

            <View style={[styles.divider, dynamicDivider]} />

            <ScrollView
                style={styles.listWrapper}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                bounces={false}
                scrollEventThrottle={16}
            >
                {YEARS_VIEW_MODEL.map((item) => (
                    <YearRow
                        key={item.year}
                        year={item.year}
                        age={item.age}
                        paths={item.paths}
                        textSecondaryColor={colors.textSecondary}
                        onPress={handleYearPress}
                    />
                ))}
            </ScrollView>

            <View style={[styles.bottomTabContainer, dynamicBottomTab]}>
                <BottomTabBar activeTab="map" />
            </View>
        </SafeAreaView>
    );
};

export default LifeMap;

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
    headerSubtitle: { fontSize: 14, fontWeight: '400', marginBottom: 2 },
    statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
    statsLargeNumber: { fontSize: 34, fontWeight: 'bold', letterSpacing: -0.5 },
    statsDays: { fontSize: 16, fontWeight: '400', letterSpacing: 0 },
    todayButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.22,
        shadowRadius: 12,
        elevation: 8,
        zIndex: 2,
    },
    todayButtonText: { fontSize: 14, fontWeight: '500' },
    headerSubtitleBottom: { fontSize: 13, fontWeight: '400' },
    progressBarContainer: { height: 5, borderRadius: 3, marginTop: 12, width: '100%', overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: COLOR_CROWNED, borderRadius: 3, width: '40%' },
    legendContainer: { flexDirection: 'row', gap: 16, paddingHorizontal: 24, paddingBottom: 16 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { fontSize: 12, fontWeight: '400' },
    divider: { height: 1, marginBottom: 24 },
    listWrapper: { flex: 1 },
    listContent: { paddingHorizontal: 24, paddingBottom: 40 },
    yearRowContainer: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 },
    yearLabel: { width: 36, fontSize: 11, fontWeight: '400', textAlign: 'left' },
    canvasContainer: { flex: 1, alignItems: 'center' },
    ageLabel: { width: 28, fontSize: 11, fontWeight: '400', textAlign: 'right' },
    bottomTabContainer: { justifyContent: 'flex-end', borderTopWidth: 1 },
});