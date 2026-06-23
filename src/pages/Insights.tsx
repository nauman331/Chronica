import React, { useMemo } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import BottomTabBar from '../components/BottomTabBar';

import { useAppTheme } from '../hooks/useAppTheme';
import useFetch from '../hooks/useFetch';

import { yellow } from '../utils/colors';
import { ShareIcon, SolidSparkleIcon } from '../utils/icons';

const getCurrentWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diffToMonday = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);

    const start = new Date(new Date().setDate(diffToMonday));
    const end = new Date(new Date(start).setDate(start.getDate() + 6));

    const formatDate = (date: Date) => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    };

    return {
        start_date: formatDate(start),
        end_date: formatDate(end)
    };
};

const Insights = ({ navigation }: any) => {
    const { colors } = useAppTheme();

    const { start_date, end_date } = useMemo(() => getCurrentWeekDates(), []);

    const { data: reflectionsData, loading } = useFetch(
        `reflections/?start_date=${start_date}&end_date=${end_date}`,
        { isAuth: true }
    );

    const weeklyRituals = useMemo(() => {
        if (!reflectionsData) return 0;
        if (Array.isArray(reflectionsData)) return reflectionsData.length;
        if ((reflectionsData as any).results) return (reflectionsData as any).results.length;
        return 0;
    }, [reflectionsData]);

    const latestReflection = useMemo(() => {
        if (Array.isArray(reflectionsData) && reflectionsData.length > 0) return reflectionsData[0];
        if ((reflectionsData as any)?.results && (reflectionsData as any).results.length > 0) return (reflectionsData as any).results[0];
        return null;
    }, [reflectionsData]);

    const hasReflectionText = latestReflection?.reflection_text?.trim().length > 0;

    const dynamicStyles = StyleSheet.create({
        container: { backgroundColor: colors.background },
        headerSubtitle: { color: colors.textSecondary },
        headerTitle: { color: colors.text },
        shareButton: { backgroundColor: colors.surfaceMuted, borderColor: yellow },
        card: { backgroundColor: colors.surface, borderColor: colors.border },
        iconCircle: { backgroundColor: colors.surfaceMuted },
        mainHeading: { color: colors.text },
        subHeading: { color: colors.textSecondary },
        writeButton: { backgroundColor: colors.background, borderColor: colors.border },
        writeButtonText: { color: colors.text },
        motivationCard: { backgroundColor: colors.surfaceMuted },
        motivationText: { color: colors.textSecondary },
        boldText: { color: colors.text },
        quoteCard: { backgroundColor: colors.surface, borderColor: colors.border },
        quoteText: { color: colors.text },
        quoteAuthor: { color: colors.textSecondary },
        bottomTabContainer: { backgroundColor: colors.background, borderTopColor: colors.border },
    });

    return (
        <SafeAreaView style={[styles.container, dynamicStyles.container]}>
            <View style={styles.content}>

                <View style={styles.header}>
                    <View>
                        <Text style={[styles.headerSubtitle, dynamicStyles.headerSubtitle]}>Your Progress</Text>
                        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>Insights</Text>
                    </View>
                    <TouchableOpacity
                        style={[styles.shareButton, dynamicStyles.shareButton]}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate('ShareProgress')}
                    >
                        <View style={styles.iconWrapper}>
                            <ShareIcon color={yellow} size={14} />
                        </View>
                        <Text style={styles.shareText}>Share</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.card, dynamicStyles.card]}>
                    <View style={styles.momentumContainer}>
                        <View style={[styles.iconCircle, dynamicStyles.iconCircle]}>
                            <SolidSparkleIcon color={colors.text} size={24} />
                        </View>

                        <Text style={[styles.mainHeading, dynamicStyles.mainHeading]}>
                            You're building{'\n'}momentum
                        </Text>

                        {loading ? (
                            <ActivityIndicator color={yellow} style={{ marginBottom: 28 }} />
                        ) : (
                            <Text style={[styles.subHeading, dynamicStyles.subHeading]}>
                                {weeklyRituals} {weeklyRituals === 1 ? 'ritual' : 'rituals'} this week.{'\n'}That's progress worth celebrating.
                            </Text>
                        )}

                        <TouchableOpacity
                            style={[styles.writeButton, dynamicStyles.writeButton]}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('WriteReflection')}
                        >
                            <Text style={[styles.writeButtonText, dynamicStyles.writeButtonText]}>Write Reflection</Text>
                        </TouchableOpacity>

                        <View style={[styles.motivationCard, dynamicStyles.motivationCard]}>
                            <Text style={[styles.motivationText, dynamicStyles.motivationText]}>
                                <Text style={[styles.boldText, dynamicStyles.boldText]}>Keep going. </Text>
                                Small steps matter more than perfect streaks.
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={[styles.quoteCard, dynamicStyles.quoteCard]}>
                    <View style={styles.quoteContainer}>
                        <Text style={[styles.quoteText, dynamicStyles.quoteText]}>
                            {hasReflectionText
                                ? `"${latestReflection.reflection_text}"`
                                : '"The day is the only unit of time I can get my head around."'}
                        </Text>
                        <Text style={[styles.quoteAuthor, dynamicStyles.quoteAuthor]}>
                            {hasReflectionText ? "— Your Weekly Reflection" : "— Tim Ferriss"}
                        </Text>
                    </View>
                </View>

            </View>

            <View style={[styles.bottomTabContainer, dynamicStyles.bottomTabContainer]}>
                <BottomTabBar activeTab="insights" />
            </View>
        </SafeAreaView>
    );
};

export default Insights;

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    headerSubtitle: { fontSize: 12, fontWeight: '400', marginBottom: 2 },
    headerTitle: { fontSize: 32, fontWeight: '800', letterSpacing: -0.5 },
    shareButton: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 15 },
    iconWrapper: { marginRight: 6, marginTop: 1 },
    shareText: { color: yellow, fontWeight: '500', fontSize: 14 },
    card: { borderRadius: 24, paddingHorizontal: 20, paddingVertical: 24, marginBottom: 16, borderWidth: 1, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
    momentumContainer: { alignItems: 'center' },
    iconCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    mainHeading: { fontSize: 32, fontWeight: '800', textAlign: 'center', lineHeight: 38, letterSpacing: -1, marginBottom: 12 },
    subHeading: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 28 },
    writeButton: { width: '100%', paddingVertical: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center', marginBottom: 16 },
    writeButtonText: { fontSize: 15, fontWeight: '600' },
    motivationCard: { width: '100%', paddingVertical: 18, paddingHorizontal: 16, borderRadius: 16, alignItems: 'center' },
    motivationText: { fontSize: 14, textAlign: 'center', lineHeight: 22 },
    boldText: { fontWeight: '700' },
    quoteCard: { borderRadius: 20, paddingHorizontal: 20, paddingVertical: 20, borderWidth: 1, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 20, elevation: 1 },
    quoteContainer: { alignItems: 'center' },
    quoteText: { fontSize: 15, fontStyle: 'italic', textAlign: 'center', lineHeight: 22, marginBottom: 12 },
    quoteAuthor: { fontSize: 13, fontWeight: '400' },
    bottomTabContainer: { justifyContent: 'flex-end', borderTopWidth: 1 },
});