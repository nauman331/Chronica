import React, { useMemo, useCallback, memo, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable, InteractionManager } from 'react-native';
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

const CANVAS_HEIGHT = (2 * CELL_SIZE) + (GLOW_PADDING * 2);
const CANVAS_WIDTH = (NODES_PER_ROW * CELL_SIZE) + (GLOW_PADDING * 2);
const YEAR_ROW_GAP = 20;
const YEAR_ROW_STRIDE = CANVAS_HEIGHT + YEAR_ROW_GAP;
const ROWS_PER_CHUNK = 12;
const CHUNK_BUFFER_ROWS = 2;

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

const YEARS_DATA: YearData[] = buildYearsData();

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

const ALL_YEAR_PATHS: YearPaths[] = YEARS_DATA.map(d => buildPaths(d.weeks));

interface YearViewModel extends YearData {
    paths: YearPaths;
}

const YEARS_VIEW_MODEL: YearViewModel[] = YEARS_DATA.map((yearData, index) => ({
    ...yearData,
    paths: ALL_YEAR_PATHS[index],
}));

interface YearChunk {
    index: number;
    offsetY: number;
    height: number;
    rows: YearViewModel[];
}

const YEAR_CHUNKS: YearChunk[] = [];

for (let index = 0, offsetY = 0; index < YEARS_VIEW_MODEL.length; index += ROWS_PER_CHUNK) {
    const rows = YEARS_VIEW_MODEL.slice(index, index + ROWS_PER_CHUNK);
    const height = rows.length * YEAR_ROW_STRIDE;

    YEAR_CHUNKS.push({
        index: YEAR_CHUNKS.length,
        offsetY,
        height,
        rows,
    });

    offsetY += height;
}

const TOTAL_YEARS_HEIGHT = YEAR_CHUNKS.reduce((sum, chunk) => sum + chunk.height, 0);

interface YearRowProps {
    year: number;
    age: number;
    paths: YearPaths;
    textSecondaryColor: string;
    onPress: (year: number, age: number) => void;
}

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

interface YearChunkProps {
    chunk: YearChunk;
    textSecondaryColor: string;
    onPress: (year: number, age: number) => void;
}

const YearChunkSection = memo(({ chunk, textSecondaryColor, onPress }: YearChunkProps) => {
    return (
        <View style={[styles.chunkRow, { height: chunk.height }]}>
            {chunk.rows.map((item, rowIndex) => (
                <Pressable
                    key={`hit-${item.year}`}
                    style={[styles.rowPressTarget, { top: rowIndex * YEAR_ROW_STRIDE, height: YEAR_ROW_STRIDE }]}
                    onPress={() => onPress(item.year, item.age)}
                />
            ))}

            <View style={styles.yearColumn}>
                {chunk.rows.map((item) => (
                    <View
                        key={item.year}
                        style={[styles.chunkLabelCell, { height: YEAR_ROW_STRIDE }]}
                    >
                        <Text style={[styles.yearLabel, { marginTop: GLOW_PADDING, color: textSecondaryColor }]}>
                            {item.year}
                        </Text>
                    </View>
                ))}
            </View>

            <View style={styles.chunkCanvasWrap}>
                <Canvas style={{ width: CANVAS_WIDTH, height: chunk.height }}>
                    {chunk.rows.map((item, rowIndex) => {
                        const rowOffset = rowIndex * YEAR_ROW_STRIDE;

                        return (
                            <Group key={item.year} transform={[{ translateY: rowOffset }]}>
                                <Group color={COLOR_PAST}><Path path={item.paths.pPast} /></Group>
                                <Group color={COLOR_DOCUMENTED}><Path path={item.paths.pDocumented} /></Group>

                                <Group color={COLOR_CROWNED} opacity={0.15}>
                                    <Blur blur={4} />
                                    <Path path={item.paths.pCrownedHalo} />
                                </Group>

                                <Group color={COLOR_CROWNED}>
                                    <Shadow dx={0} dy={0} blur={6} color={COLOR_CROWNED} />
                                    <Path path={item.paths.pCrowned} />
                                </Group>

                                <Group color={COLOR_FUTURE}><Path path={item.paths.pFuture} /></Group>
                            </Group>
                        );
                    })}
                </Canvas>
            </View>

            <View style={styles.ageColumn}>
                {chunk.rows.map((item) => (
                    <View
                        key={item.year}
                        style={[styles.chunkLabelCell, { height: YEAR_ROW_STRIDE }]}
                    >
                        <Text style={[styles.ageLabel, { marginTop: GLOW_PADDING, color: textSecondaryColor }]}>
                            {item.age}y
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
});

// ─── LifeMap ──────────────────────────────────────────────────────────────────
const LifeMap = ({ navigation }: any) => {
    const { colors } = useAppTheme();
    const [viewportHeight, setViewportHeight] = useState(0);
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: Math.min(1, YEAR_CHUNKS.length - 1) });

    useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            void import('./EnhanceCrown');
        });

        return () => task.cancel();
    }, []);

    const updateVisibleRange = useCallback((offsetY: number, nextViewportHeight: number) => {
        if (nextViewportHeight <= 0) {
            return;
        }

        const bufferPx = YEAR_ROW_STRIDE * CHUNK_BUFFER_ROWS;
        const visibleTop = Math.max(0, offsetY - bufferPx);
        const visibleBottom = offsetY + nextViewportHeight + bufferPx;

        let start = 0;
        while (start < YEAR_CHUNKS.length - 1 && YEAR_CHUNKS[start].offsetY + YEAR_CHUNKS[start].height <= visibleTop) {
            start++;
        }

        let end = YEAR_CHUNKS.length - 1;
        while (end > start && YEAR_CHUNKS[end].offsetY >= visibleBottom) {
            end--;
        }

        setVisibleRange((current) => {
            if (current.start === start && current.end === end) {
                return current;
            }

            return { start, end };
        });
    }, []);

    const handleListLayout = useCallback((event: any) => {
        const nextViewportHeight = event.nativeEvent.layout.height;
        setViewportHeight(nextViewportHeight);
        updateVisibleRange(0, nextViewportHeight);
    }, [updateVisibleRange]);

    const handleScroll = useCallback((event: any) => {
        updateVisibleRange(event.nativeEvent.contentOffset.y, viewportHeight);
    }, [updateVisibleRange, viewportHeight]);

    // Stable callback — rows stay memo-friendly and navigation gets the data directly.
    const handleYearPress = useCallback((year: number, age: number) => {
        navigation.navigate('YearView', { year, age });
    }, [navigation]);

    const handleTodayPress = useCallback(() => {
        if (typeof navigation.replace === 'function') {
            navigation.replace('EnhanceCrown');
            return;
        }

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
                onLayout={handleListLayout}
                onScroll={handleScroll}
            >
                <View style={{ height: YEAR_CHUNKS[visibleRange.start]?.offsetY ?? 0 }} />
                {YEAR_CHUNKS.slice(visibleRange.start, visibleRange.end + 1).map((chunk) => (
                    <YearChunkSection
                        key={chunk.index}
                        chunk={chunk}
                        textSecondaryColor={colors.textSecondary}
                        onPress={handleYearPress}
                    />
                ))}
                <View style={{ height: Math.max(0, TOTAL_YEARS_HEIGHT - ((YEAR_CHUNKS[visibleRange.end]?.offsetY ?? 0) + (YEAR_CHUNKS[visibleRange.end]?.height ?? 0))) }} />
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
    chunkRow: { flexDirection: 'row', alignItems: 'flex-start' },
    rowPressTarget: { position: 'absolute', left: 0, right: 0, zIndex: 5 },
    yearColumn: { width: 36 },
    ageColumn: { width: 28 },
    chunkCanvasWrap: { flex: 1, alignItems: 'center' },
    chunkLabelCell: { justifyContent: 'flex-start' },
    yearRowContainer: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 },
    yearLabel: { width: 36, fontSize: 11, fontWeight: '400', textAlign: 'left' },
    canvasContainer: { flex: 1, alignItems: 'center' },
    ageLabel: { width: 28, fontSize: 11, fontWeight: '400', textAlign: 'right' },
    bottomTabContainer: { justifyContent: 'flex-end', borderTopWidth: 1 },
});