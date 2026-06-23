import React, { useMemo, useCallback, memo, useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Pressable,
    InteractionManager,
    ActivityIndicator,
    DimensionValue
} from 'react-native';
import { Canvas, Group, Skia, Path, Blur, Shadow } from '@shopify/react-native-skia';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import BottomTabBar from '../components/BottomTabBar';
import { useAppTheme } from '../hooks/useAppTheme';
import useFetch from '../hooks/useFetch';

import {
    COLOR_CROWNED,
    COLOR_DOCUMENTED,
    COLOR_PAST,
    COLOR_FUTURE,
} from '../utils/colors';

// --- Configuration Constants ---
const NODES_PER_ROW = 26;
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

type WeekState = 'past' | 'documented' | 'crowned' | 'future';

interface YearPaths {
    pPast: ReturnType<typeof Skia.Path.Make>;
    pDocumented: ReturnType<typeof Skia.Path.Make>;
    pCrowned: ReturnType<typeof Skia.Path.Make>;
    pCrownedHalo: ReturnType<typeof Skia.Path.Make>;
    pFuture: ReturnType<typeof Skia.Path.Make>;
}

interface YearViewModel {
    year: number;
    age: number;
    weeks: WeekState[];
    paths: YearPaths;
}

interface YearChunk {
    index: number;
    offsetY: number;
    height: number;
    rows: YearViewModel[];
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
                    <View key={item.year} style={[styles.chunkLabelCell, { height: YEAR_ROW_STRIDE }]}>
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
                    <View key={item.year} style={[styles.chunkLabelCell, { height: YEAR_ROW_STRIDE }]}>
                        <Text style={[styles.ageLabel, { marginTop: GLOW_PADDING, color: textSecondaryColor }]}>
                            {item.age}y
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
});

const LifeMap = ({ navigation }: any) => {
    const { colors } = useAppTheme();

    const selectedLifeSpan = useSelector((state: RootState) => state.settings.lifeSpan);

    const { data: apiData, loading } = useFetch('life-map/', { isAuth: true });

    const [viewportHeight, setViewportHeight] = useState(0);
    const [visibleRange, setVisibleRange] = useState({ start: 0, end: 1 });

    useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            void import('./EnhanceCrown');
        });
        return () => task.cancel();
    }, []);

    const { yearChunks, totalHeight, lifeStats } = useMemo(() => {
        const data = apiData as any;
        if (!data || !data.birth_date) {
            return {
                yearChunks: [],
                totalHeight: 0,
                lifeStats: { days: '0', weeks: '0', percentage: '0' }
            };
        }

        const bDate = new Date(data.birth_date);

        const lifeSpan = selectedLifeSpan || data.life_span_years || 80;
        const statesMap = data.states || {};
        const now = new Date();

        const viewModels: YearViewModel[] = [];

        const birthYear = bDate.getFullYear();
        const endYear = birthYear + lifeSpan - 1;

        for (let year = birthYear; year <= endYear; year++) {
            const yearLabel = year;
            const age = year - birthYear;
            const yearStartDate = new Date(year, 0, 1);

            const weeks: WeekState[] = new Array(52);

            for (let w = 0; w < 52; w++) {
                const weekStartDate = new Date(yearStartDate);
                weekStartDate.setDate(yearStartDate.getDate() + (w * 7));

                if (weekStartDate > now) {
                    weeks[w] = 'future';
                } else {
                    let weekState: WeekState = 'future';

                    for (let d = 0; d < 7; d++) {
                        const checkDate = new Date(weekStartDate);
                        checkDate.setDate(weekStartDate.getDate() + d);

                        if (checkDate > now) break;
                        if (checkDate < bDate) continue;

                        const dateStr = `${checkDate.getFullYear()}-${(checkDate.getMonth() + 1).toString().padStart(2, '0')}-${checkDate.getDate().toString().padStart(2, '0')}`;
                        const dayState = statesMap[dateStr];

                        const isCrowned = dayState === 'crowned' || dayState?.is_crowned || dayState?.state === 'crowned';
                        const isDoc = dayState === 'documented' || dayState?.is_documented || dayState?.state === 'documented';

                        if (isCrowned) {
                            weekState = 'crowned';
                            break;
                        } else if (isDoc || dayState) {
                            weekState = 'documented';
                        } else if (weekState === 'future') {
                            weekState = 'past';
                        }
                    }
                    weeks[w] = weekState;
                }
            }

            viewModels.push({
                year: yearLabel,
                age,
                weeks,
                paths: buildPaths(weeks)
            });
        }

        // Slice into virtualized chunks
        const chunks: YearChunk[] = [];
        let offsetY = 0;

        for (let index = 0; index < viewModels.length; index += ROWS_PER_CHUNK) {
            const rows = viewModels.slice(index, index + ROWS_PER_CHUNK);
            const height = rows.length * YEAR_ROW_STRIDE;
            chunks.push({ index: chunks.length, offsetY, height, rows });
            offsetY += height;
        }

        const daysLived = data.days_lived || 0;
        const totalLifeDays = lifeSpan * 365.2425;
        let dynamicPercentage = (daysLived / totalLifeDays) * 100;
        if (dynamicPercentage > 100) dynamicPercentage = 100;

        return {
            yearChunks: chunks,
            totalHeight: offsetY,
            lifeStats: {
                days: daysLived.toLocaleString(),
                weeks: Math.floor(daysLived / 7).toLocaleString(),
                percentage: dynamicPercentage.toFixed(1)
            }
        };
    }, [apiData, selectedLifeSpan]);
    const updateVisibleRange = useCallback((offsetY: number, nextViewportHeight: number, chunks: YearChunk[]) => {
        if (nextViewportHeight <= 0 || chunks.length === 0) return;

        const bufferPx = YEAR_ROW_STRIDE * CHUNK_BUFFER_ROWS;
        const visibleTop = Math.max(0, offsetY - bufferPx);
        const visibleBottom = offsetY + nextViewportHeight + bufferPx;

        let start = 0;
        while (start < chunks.length - 1 && chunks[start].offsetY + chunks[start].height <= visibleTop) {
            start++;
        }

        let end = chunks.length - 1;
        while (end > start && chunks[end].offsetY >= visibleBottom) {
            end--;
        }

        setVisibleRange((current) => {
            if (current.start === start && current.end === end) return current;
            return { start, end };
        });
    }, []);

    const handleListLayout = useCallback((event: any) => {
        const nextViewportHeight = event.nativeEvent.layout.height;
        setViewportHeight(nextViewportHeight);
        updateVisibleRange(0, nextViewportHeight, yearChunks);
    }, [updateVisibleRange, yearChunks]);

    const handleScroll = useCallback((event: any) => {
        updateVisibleRange(event.nativeEvent.contentOffset.y, viewportHeight, yearChunks);
    }, [updateVisibleRange, viewportHeight, yearChunks]);

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

    const dynamicContainerStyle = useMemo(() => ({ backgroundColor: colors.background }), [colors.background]);
    const dynamicProgressBarContainer = useMemo(() => ({ backgroundColor: colors.surfaceMuted }), [colors.surfaceMuted]);
    const dynamicTodayButton = useMemo(() => ({ backgroundColor: colors.primary, shadowColor: colors.primary }), [colors.primary]);
    const dynamicTodayButtonText = useMemo(() => ({ color: colors.background }), [colors.background]);
    const dynamicDivider = useMemo(() => ({ backgroundColor: colors.border }), [colors.border]);
    const dynamicBottomTab = useMemo(() => ({ borderTopColor: colors.border, backgroundColor: colors.background }), [colors.border, colors.background]);

    return (
        <SafeAreaView style={[styles.container, dynamicContainerStyle]}>
            <View style={styles.header}>
                <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Your Life Map</Text>
                <View style={styles.statsRow}>
                    <Text style={[styles.statsLargeNumber, { color: colors.text }]} numberOfLines={1} ellipsizeMode="clip">
                        {lifeStats.days} <Text style={[styles.statsDays, { color: colors.textSecondary }]}>days</Text>
                    </Text>
                    <Pressable style={[styles.todayButton, dynamicTodayButton]} onPress={handleTodayPress}>
                        <Text style={[styles.todayButtonText, dynamicTodayButtonText]}>Today ✦</Text>
                    </Pressable>
                </View>
                <Text style={[styles.headerSubtitleBottom, { color: colors.textSecondary }]}>
                    {lifeStats.weeks} weeks - {lifeStats.percentage}% of life lived
                </Text>
                <View style={[styles.progressBarContainer, dynamicProgressBarContainer]}>
                    <View style={[styles.progressBarFill, { width: `${lifeStats.percentage}%` as DimensionValue }]} />
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

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : (
                <ScrollView
                    style={styles.listWrapper}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    scrollEventThrottle={16}
                    onLayout={handleListLayout}
                    onScroll={handleScroll}
                >
                    <View style={{ height: yearChunks[visibleRange.start]?.offsetY ?? 0 }} />

                    {yearChunks.slice(visibleRange.start, visibleRange.end + 1).map((chunk) => (
                        <YearChunkSection
                            key={chunk.index}
                            chunk={chunk}
                            textSecondaryColor={colors.textSecondary}
                            onPress={handleYearPress}
                        />
                    ))}

                    <View style={{ height: Math.max(0, totalHeight - ((yearChunks[visibleRange.end]?.offsetY ?? 0) + (yearChunks[visibleRange.end]?.height ?? 0))) }} />
                </ScrollView>
            )}

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
    statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4, width: '100%' },
    statsLargeNumber: { flexShrink: 1, minWidth: 0, fontSize: 34, fontWeight: 'bold', letterSpacing: -0.5 },
    statsDays: { fontSize: 16, fontWeight: '400', letterSpacing: 0 },
    todayButton: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 24, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 12, elevation: 8, zIndex: 2, flexShrink: 0 },
    todayButtonText: { fontSize: 14, fontWeight: '500' },
    headerSubtitleBottom: { fontSize: 13, fontWeight: '400' },
    progressBarContainer: { height: 5, borderRadius: 3, marginTop: 12, width: '100%', overflow: 'hidden' },
    progressBarFill: { height: '100%', backgroundColor: COLOR_CROWNED, borderRadius: 3 },
    legendContainer: { flexDirection: 'row', gap: 16, paddingHorizontal: 24, paddingBottom: 16 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 8, height: 8, borderRadius: 4 },
    legendText: { fontSize: 12, fontWeight: '400' },
    divider: { height: 1, marginBottom: 24 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listWrapper: { flex: 1 },
    listContent: { paddingHorizontal: 24, paddingBottom: 40 },
    chunkRow: { flexDirection: 'row', alignItems: 'flex-start' },
    rowPressTarget: { position: 'absolute', left: 0, right: 0, zIndex: 5 },
    yearColumn: { width: 36 },
    ageColumn: { width: 28 },
    chunkCanvasWrap: { flex: 1, alignItems: 'center' },
    chunkLabelCell: { justifyContent: 'flex-start' },
    yearLabel: { width: 36, fontSize: 11, fontWeight: '400', textAlign: 'left' },
    ageLabel: { width: 28, fontSize: 11, fontWeight: '400', textAlign: 'right' },
    bottomTabContainer: { justifyContent: 'flex-end', borderTopWidth: 1 },
});
