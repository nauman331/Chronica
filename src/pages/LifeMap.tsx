import React, { useMemo } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Pressable } from 'react-native';
import { Canvas, Group, Skia, Path, Blur, Shadow } from '@shopify/react-native-skia';
import BottomTabBar from '../components/BottomTabBar';

// Import custom theme hook
import { useAppTheme } from '../hooks/useAppTheme';

// Keep strict functional state colors constant
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

interface YearRowProps {
    year: number;
    age: number;
    weeks: ('past' | 'documented' | 'crowned' | 'future')[];
    onPress: (year: number) => void;
}

const YearRow = React.memo(({ year, age, weeks, onPress }: YearRowProps) => {
    // Get dynamic colors inside the memoized component
    const { colors } = useAppTheme();

    const paths = useMemo(() => {
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
    }, [weeks]);

    const canvasHeight = (2 * CELL_SIZE) + (GLOW_PADDING * 2);
    const canvasWidth = (NODES_PER_ROW * CELL_SIZE) + (GLOW_PADDING * 2);

    return (
        <Pressable style={styles.yearRowContainer} onPress={() => onPress(year)}>
            <Text style={[styles.yearLabel, { marginTop: GLOW_PADDING, color: colors.textSecondary }]}>{year}</Text>
            <View style={styles.canvasContainer}>
                <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
                    <Group>
                        <Group color={COLOR_PAST}><Path path={paths.pPast} /></Group>
                        <Group color={COLOR_DOCUMENTED}><Path path={paths.pDocumented} /></Group>

                        {/* Scattered Background Halo */}
                        <Group color={COLOR_CROWNED} opacity={0.15}>
                            <Blur blur={4} />
                            <Path path={paths.pCrownedHalo} />
                        </Group>

                        {/* Core Crowned Dot */}
                        <Group color={COLOR_CROWNED}>
                            <Shadow dx={0} dy={0} blur={6} color={COLOR_CROWNED} />
                            <Path path={paths.pCrowned} />
                        </Group>

                        {/* Instead of keeping COLOR_FUTURE exactly the same, 
                          we can use the dynamic border color so future dots look 
                          integrated into dark mode correctly (faint background dots).
                        */}
                        <Group color={colors.border}><Path path={paths.pFuture} /></Group>
                    </Group>
                </Canvas>
            </View>
            <Text style={[styles.ageLabel, { marginTop: GLOW_PADDING, color: colors.textSecondary }]}>{age}y</Text>
        </Pressable>
    );
});

const LifeMap = ({ navigation }: any) => {
    // --- 1. Get dynamic colors ---
    const { colors } = useAppTheme();

    const yearsData = useMemo(() => {
        const data: Omit<YearRowProps, 'onPress'>[] = [];
        const currentYear = 2026;
        const currentWeekInYear = 20;

        for (let i = 0; i <= 32; i++) {
            const year = 2000 + i;
            const age = i;
            const weeks: ('past' | 'documented' | 'crowned' | 'future')[] = [];

            for (let w = 0; w < WEEKS_PER_YEAR; w++) {
                if (year > currentYear || (year === currentYear && w >= currentWeekInYear)) {
                    weeks.push('future');
                } else {
                    const rand = Math.random();
                    if (rand > 0.90) weeks.push('crowned');
                    else if (rand > 0.70) weeks.push('documented');
                    else weeks.push('past');
                }
            }
            data.push({ year, age, weeks });
        }
        return data;
    }, []);

    // --- 2. Dynamic Styles based on active theme ---
    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        headerSubtitle: { color: colors.textSecondary },
        statsLargeNumber: { color: colors.text },
        statsDays: { color: colors.textSecondary },
        todayButton: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary, // Keeps shadow tied to the button color
        },
        todayButtonText: {
            color: colors.background // Inverts correctly against primary button color
        },
        progressBarContainer: { backgroundColor: colors.surfaceMuted },
        // progressBarFill stays COLOR_CROWNED to represent the golden ratio/crown metric
        legendText: { color: colors.textSecondary },
        divider: { backgroundColor: colors.border },
        bottomTabContainer: {
            borderTopColor: colors.border,
            backgroundColor: colors.background
        },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.header}>
                <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>Your Life Map</Text>
                <View style={styles.statsRow}>
                    <Text style={[styles.statsLargeNumber, dynamicStyles.statsLargeNumber]}>
                        11,791 <Text style={[styles.statsDays, dynamicStyles.statsDays]}>days</Text>
                    </Text>
                    <Pressable style={[styles.todayButton, dynamicStyles.todayButton]} onPress={() => navigation.navigate("EnhanceCrown")}>
                        <Text style={[styles.todayButtonText, dynamicStyles.todayButtonText]}>Today ✦</Text>
                    </Pressable>
                </View>
                <Text style={[styles.headerSubtitleBottom, dynamicStyles.headerSubtitle]}>1,684 weeks - 40% of life lived</Text>

                <View style={[styles.progressBarContainer, dynamicStyles.progressBarContainer]}>
                    <View style={styles.progressBarFill} />
                </View>
            </View>

            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLOR_PAST }]} />
                    <Text style={[styles.legendText, dynamicStyles.legendText]}>Past</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLOR_DOCUMENTED }]} />
                    <Text style={[styles.legendText, dynamicStyles.legendText]}>Documented</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLOR_CROWNED }]} />
                    <Text style={[styles.legendText, dynamicStyles.legendText]}>Crowned</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: colors.border }]} />
                    <Text style={[styles.legendText, dynamicStyles.legendText]}>Future</Text>
                </View>
            </View>

            <View style={[styles.divider, dynamicStyles.divider]} />

            <View style={styles.listWrapper}>
                <FlatList
                    data={yearsData}
                    keyExtractor={(item) => item.year.toString()}
                    renderItem={({ item }) => (
                        <YearRow
                            year={item.year}
                            age={item.age}
                            weeks={item.weeks}
                            onPress={(y) => navigation.navigate('YearView', { year: y, age: item.age })}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    initialNumToRender={10}
                    windowSize={5}
                />
            </View>

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="map" />
            </View>
        </SafeAreaView>
    );
};

export default LifeMap;

// --- 3. Static Layout Styles (No Colors Here) ---
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
    progressBarFill: { height: '100%', backgroundColor: COLOR_CROWNED, borderRadius: 3, width: '40%' }, // Keep Crowned yellow
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