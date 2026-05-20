import React, { useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Pressable
} from 'react-native';
import { Canvas, Group, Skia, Path } from '@shopify/react-native-skia';
import BottomTabBar from '../components/BottomTabBar'; // Adjust path if needed

const { width } = Dimensions.get('window');

// --- Layout Constants ---
const NODES_PER_ROW = 26;
const WEEKS_PER_YEAR = 52;
const RADIUS = 2.5;
const SPACING = 4;
const CELL_SIZE = (RADIUS * 2) + SPACING;

// --- Colors based on Figma ---
const COLOR_PAST = '#7A818C';
const COLOR_DOCUMENTED = '#8CB9FF';
const COLOR_CROWNED = '#E4BA2E';
const COLOR_FUTURE = '#EBEBEB';
const COLOR_TEXT_MAIN = '#111111';
const COLOR_TEXT_MUTED = '#8A8F99';

interface YearRowProps {
    year: number;
    age: number;
    weeks: ('past' | 'documented' | 'crowned' | 'future')[];
}

// 1. Skia Canvas Row (Highly performant week rendering)
const YearRow = React.memo(({ year, age, weeks }: YearRowProps) => {
    const paths = useMemo(() => {
        const pPast = Skia.Path.Make();
        const pDocumented = Skia.Path.Make();
        const pCrowned = Skia.Path.Make();
        const pFuture = Skia.Path.Make();

        weeks.forEach((state, d) => {
            const col = d % NODES_PER_ROW;
            const row = Math.floor(d / NODES_PER_ROW);
            const cx = col * CELL_SIZE + RADIUS;
            const cy = row * CELL_SIZE + RADIUS;

            switch (state) {
                case 'crowned': pCrowned.addCircle(cx, cy, RADIUS); break;
                case 'documented': pDocumented.addCircle(cx, cy, RADIUS); break;
                case 'past': pPast.addCircle(cx, cy, RADIUS); break;
                case 'future': pFuture.addCircle(cx, cy, RADIUS); break;
            }
        });

        return { pPast, pDocumented, pCrowned, pFuture };
    }, [weeks]);

    const canvasHeight = 2 * CELL_SIZE;
    const canvasWidth = NODES_PER_ROW * CELL_SIZE;

    return (
        <View style={styles.yearRowContainer}>
            <Text style={styles.yearLabel}>{year}</Text>
            <View style={styles.canvasContainer}>
                <Canvas style={{ width: canvasWidth, height: canvasHeight }}>
                    <Group>
                        <Group color={COLOR_PAST}><Path path={paths.pPast} /></Group>
                        <Group color={COLOR_DOCUMENTED}><Path path={paths.pDocumented} /></Group>
                        <Group color={COLOR_CROWNED}><Path path={paths.pCrowned} /></Group>
                        <Group color={COLOR_FUTURE}><Path path={paths.pFuture} /></Group>
                    </Group>
                </Canvas>
            </View>
            <Text style={styles.ageLabel}>{age}y</Text>
        </View>
    );
});

// 2. Main Screen Component
const LifeMap: React.FC = () => {

    // Mock Data Generator
    const yearsData = useMemo(() => {
        const data: YearRowProps[] = [];
        const currentYear = 2026;
        const currentWeekInYear = 20;

        for (let i = 0; i <= 32; i++) {
            const year = 2000 + i;
            const age = i;
            const weeks: YearRowProps['weeks'] = [];

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

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                <Text style={styles.headerSubtitle}>Your Life Map</Text>

                <View style={styles.statsRow}>
                    <Text style={styles.statsLargeNumber}>11,791 <Text style={styles.statsDays}>days</Text></Text>
                    <Pressable style={styles.todayButton}>
                        {/* Updated to use the sparkle/star icon from Figma */}
                        <Text style={styles.todayButtonText}>Today ✦</Text>
                    </Pressable>
                </View>

                <Text style={styles.headerSubtitleBottom}>1,684 weeks - 40% of life lived</Text>

                {/* NEW: Progress Bar aligned with Figma */}
                <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarFill} />
                </View>
            </View>

            {/* Legend Section */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_PAST }]} /><Text style={styles.legendText}>Past</Text></View>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_DOCUMENTED }]} /><Text style={styles.legendText}>Documented</Text></View>
                <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_CROWNED }]} /><Text style={styles.legendText}>Crowned</Text></View>
                {/* Future text standalone, matching Figma layout */}
                <View style={styles.legendItem}><Text style={styles.legendText}>Future</Text></View>
            </View>

            <View style={styles.divider} />

            {/* Skia FlatList */}
            <View style={styles.listWrapper}>
                <FlatList
                    data={yearsData}
                    keyExtractor={(item) => item.year.toString()}
                    renderItem={({ item }) => <YearRow year={item.year} age={item.age} weeks={item.weeks} />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                />
            </View>

            {/* Bottom Nav */}
            <View style={styles.bottomTabContainer}>
                <BottomTabBar activeTab="map" />
            </View>
        </SafeAreaView>
    );
}

export default LifeMap;

// --- Styles ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 16,
    },
    headerSubtitle: {
        fontSize: 14,
        color: COLOR_TEXT_MUTED,
        fontWeight: '400',
        marginBottom: 2,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    statsLargeNumber: {
        fontSize: 34,
        fontWeight: 'bold',
        color: COLOR_TEXT_MAIN,
        letterSpacing: -0.5,
    },
    statsDays: {
        fontSize: 16,
        fontWeight: '400',
        color: COLOR_TEXT_MUTED,
        letterSpacing: 0,
    },
    todayButton: {
        backgroundColor: '#191528',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 24,
    },
    todayButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    headerSubtitleBottom: {
        fontSize: 13,
        color: COLOR_TEXT_MUTED,
        fontWeight: '400',
    },
    progressBarContainer: {
        height: 5,
        backgroundColor: '#F3F3F3',
        borderRadius: 3,
        marginTop: 12,
        width: '100%',
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: COLOR_CROWNED,
        borderRadius: 3,
        width: '40%', // Representing the 40% lived
    },
    legendContainer: {
        flexDirection: 'row',
        gap: 16, // Using gap instead of space-between to align them closer to the left like Figma
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: 12,
        color: COLOR_TEXT_MUTED,
        fontWeight: '400',
    },
    divider: {
        height: 1,
        backgroundColor: '#F4F4F4',
        marginBottom: 24,
    },
    listWrapper: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    yearRowContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    yearLabel: {
        width: 36,
        fontSize: 11,
        color: COLOR_TEXT_MUTED,
        fontWeight: '400',
        textAlign: 'left',
        marginTop: 0,
    },
    canvasContainer: {
        flex: 1,
        alignItems: 'center',
    },
    ageLabel: {
        width: 28,
        fontSize: 11,
        color: COLOR_TEXT_MUTED,
        fontWeight: '400',
        textAlign: 'right',
        marginTop: 0,
    },
    bottomTabContainer: {
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#F4F4F4',
    },
});