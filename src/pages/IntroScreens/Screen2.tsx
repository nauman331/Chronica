import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Dimensions } from 'react-native';
import { Canvas, Group, Skia, Path } from '@shopify/react-native-skia';
import { blue, gray, white, COLOR_CROWNED, COLOR_DOCUMENTED, COLOR_TEXT_MUTED, COLOR_UNDOCUMENTED } from '../../utils/colors';

const { height } = Dimensions.get('window');
const NODES_PER_ROW = 26;
const RADIUS = 3.2;
const SPACING = 3.5;
const CELL_SIZE = (RADIUS * 2) + SPACING;

const YearRow = ({ year, age, dotsCount }: any) => {
    const paths = useMemo(() => {
        const pUndocumented = Skia.Path.Make();
        const pDocumented = Skia.Path.Make();
        const pCrowned = Skia.Path.Make();

        for (let d = 0; d < dotsCount; d++) {
            const col = d % NODES_PER_ROW;
            const row = Math.floor(d / NODES_PER_ROW);
            const cx = col * CELL_SIZE + RADIUS;
            const cy = row * CELL_SIZE + RADIUS;
            const rand = Math.random();

            if (rand > 0.95) pCrowned.addCircle(cx, cy, RADIUS);
            else if (rand > 0.70) pDocumented.addCircle(cx, cy, RADIUS);
            else pUndocumented.addCircle(cx, cy, RADIUS);
        }
        return { pUndocumented, pDocumented, pCrowned };
    }, [dotsCount]);

    const canvasHeight = Math.ceil(dotsCount / NODES_PER_ROW) * CELL_SIZE;

    return (
        <View style={styles.yearRowContainer}>
            <Text style={styles.yearLabel}>{year}</Text>
            <Canvas style={[styles.yearCanvas, { height: canvasHeight }]}>
                <Group>
                    <Group color={COLOR_UNDOCUMENTED}><Path path={paths.pUndocumented} /></Group>
                    <Group color={COLOR_DOCUMENTED}><Path path={paths.pDocumented} /></Group>
                    <Group color={COLOR_CROWNED}><Path path={paths.pCrowned} /></Group>
                </Group>
            </Canvas>
            <Text style={styles.ageLabel}>{age}y</Text>
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
                    <View style={styles.legendItem}><View style={[styles.legendDot, { backgroundColor: COLOR_CROWNED }]} /><Text style={styles.legendText}>Crowned</Text></View>
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
    bottomSection: { paddingHorizontal: 24, paddingBottom: height > 800 ? 50 : 30, borderTopWidth: 1, borderTopColor: '#F0EAE1', paddingTop: 24, backgroundColor: white },
    button: { backgroundColor: blue, paddingVertical: 18, borderRadius: 16, alignItems: 'center', shadowColor: blue, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 4 },
    buttonText: { color: white, fontSize: 16, fontWeight: '600' },
    skipButton: { alignSelf: 'flex-end', marginTop: 24 },
    skipText: { color: '#B4B4B4', fontSize: 14, fontWeight: '500' },
});