import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions, Platform } from 'react-native';
// ADDED: Blur and Shadow imports from Skia
import { Canvas, Group, Skia, Path, Blur, Shadow } from '@shopify/react-native-skia';
import { blue, gray, white, COLOR_CROWNED, COLOR_DOCUMENTED, COLOR_TEXT_MUTED, COLOR_UNDOCUMENTED } from '../../utils/colors';

const { height } = Dimensions.get('window');
const NODES_PER_ROW = 26;
const RADIUS = 3.2;
const SPACING = 3.5;
const CELL_SIZE = (RADIUS * 2) + SPACING;

// NEW: Constants for the glow effect
const CROWN_RADIUS = RADIUS * 1.2;
const HALO_RADIUS = RADIUS * 2.5;
const GLOW_PADDING = 8; // Extra space to prevent canvas clipping the shadow

const YearRow = ({ year, age, dotsCount }: any) => {
    const paths = useMemo(() => {
        const pUndocumented = Skia.Path.Make();
        const pDocumented = Skia.Path.Make();
        const pCrowned = Skia.Path.Make();
        const pCrownedHalo = Skia.Path.Make(); // New path for the halo

        for (let d = 0; d < dotsCount; d++) {
            const col = d % NODES_PER_ROW;
            const row = Math.floor(d / NODES_PER_ROW);

            // Offset coordinates by GLOW_PADDING so outer shadows aren't cut off
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

    // Add padding to the total canvas height
    const baseCanvasHeight = Math.ceil(dotsCount / NODES_PER_ROW) * CELL_SIZE;
    const canvasHeight = baseCanvasHeight > 0 ? baseCanvasHeight + (GLOW_PADDING * 2) : 0;

    return (
        <View style={styles.yearRowContainer}>
            {/* Added marginTop to keep text aligned with the newly padded grid */}
            <Text style={[styles.yearLabel, { marginTop: GLOW_PADDING - 1 }]}>{year}</Text>

            {/* Adjusted horizontal margins slightly to compensate for the internal GLOW_PADDING */}
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

            {/* Added marginTop to keep text aligned */}
            <Text style={[styles.ageLabel, { marginTop: GLOW_PADDING - 1 }]}>{age}y</Text>
        </View>
    );
};

const Screen2 = ({ birthDate, onNext, onSkip }: any) => {
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

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Life in Days</Text>
                <Text style={styles.subtitle}>Each dot represents one day. You've lived thousands already — and each one deserves to be remembered.</Text>
            </View>

            <View style={styles.card}>
                <FlatList
                    data={yearsData}
                    keyExtractor={(item) => item.year.toString()}
                    renderItem={({ item }) => <YearRow year={item.year} age={item.age} dotsCount={item.dotsCount} />}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    style={{ maxHeight: height * 0.38 }}
                />
                <View style={styles.legendContainer}>
                    <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_UNDOCUMENTED }]} /><Text style={styles.legendText}>Undocumented</Text></View>
                    <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_DOCUMENTED }]} /><Text style={styles.legendText}>Documented</Text></View>

                    {/* Updated Legend to show the glow effect */}
                    <View style={styles.legendItem}>
                        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: COLOR_CROWNED, shadowColor: COLOR_CROWNED, shadowOpacity: 0.8, shadowRadius: 4, shadowOffset: { width: 0, height: 0 } }} />
                        <Text style={styles.legendText}>Crowned</Text>
                    </View>
                </View>
            </View>

            <View style={styles.bottomSection}>
                <Pressable style={styles.button} onPress={onNext}>
                    <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
                <Pressable style={styles.skipButton} onPress={onSkip}>
                    <Text style={styles.skipText}>Skip intro</Text>
                </Pressable>
            </View>
        </View>
    );
};
export default Screen2;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: white, justifyContent: 'space-between', paddingTop: 80 },
    header: { paddingHorizontal: 36, alignItems: 'center', marginTop: 24 },
    title: { color: blue, fontSize: 32, fontWeight: '800', textAlign: 'center', marginBottom: 16 },
    subtitle: { color: '#8A8F99', fontSize: 15, textAlign: 'center', lineHeight: 22 },
    card: { backgroundColor: white, marginHorizontal: 24, borderRadius: 24, paddingTop: 24, paddingHorizontal: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.04, shadowRadius: 20, elevation: 1, borderWidth: 1, borderColor: '#F4F4F4' },
    listContent: { paddingBottom: 10 },
    yearRowContainer: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
    yearLabel: { width: 35, fontSize: 11, color: COLOR_TEXT_MUTED, fontFamily: 'Courier', marginTop: -1 },
    yearCanvas: { flex: 1, marginLeft: 12, marginRight: 6 },
    ageLabel: { width: 25, fontSize: 11, color: COLOR_TEXT_MUTED, textAlign: 'right', fontFamily: 'Courier', marginTop: -1 },
    legendContainer: { flexDirection: 'row', justifyContent: 'center', gap: 16, paddingTop: 16, paddingBottom: 24 },
    legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    legendDot: { width: 10, height: 10, borderRadius: 5 },
    legendText: { fontSize: 12, color: gray, fontWeight: '500' },
    bottomSection: { marginTop: 24, paddingHorizontal: 24, paddingBottom: height > 800 ? 50 : 30, borderTopWidth: 1, borderTopColor: '#F0EAE1', paddingTop: 24, backgroundColor: white },
    button: {
        backgroundColor: blue,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 16,
        ...Platform.select({
            ios: {
                shadowColor: blue,
                shadowOpacity: 0.4,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 12 },
            },
            android: {
                elevation: 10,
            }
        })
    },
    buttonText: { color: white, fontSize: 16, fontWeight: '500' },
    skipButton: { alignSelf: 'flex-end', marginTop: 24 },
    skipText: { color: '#B4B4B4', fontSize: 14, fontWeight: '500' },
});