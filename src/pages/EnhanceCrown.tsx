import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, Platform } from 'react-native';
import React from 'react';
import BottomTabBar from '../components/BottomTabBar';
import { blue, yellow, lightBlue, lightGreen } from '../utils/colors';
import { BellIcon, SparkIcon, ReflectionIcon, ArrowUpIcon } from '../utils/icons';

const darkText = blue;
const mutedText = '#8A8F99';
const borderLight = '#F0F0F0';


const EnhanceCrown: React.FC<{ navigation: any }> = ({ navigation }) => {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerSubtitle}>Today's Ritual</Text>
                        <Text style={styles.headerTitle}>{dayName}</Text>
                        <Text style={styles.headerDate}>{formattedDate}</Text>
                    </View>

                    <Pressable style={styles.bellButton}>
                        <BellIcon />
                        <View style={styles.notificationDot} />
                    </Pressable>
                </View>

                <View style={styles.divider} />
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    <View style={styles.ritualItem}>
                        <View style={styles.iconRow}>
                            <View style={[styles.iconBox, { backgroundColor: "#FFFBEB" }]}>
                                <SparkIcon color={yellow} />
                            </View>
                            <Text style={[styles.itemTitle, { color: yellow }]}>Intention</Text>
                        </View>
                        <Text style={styles.itemSubtitle}>What matters most today?</Text>
                    </View>

                    <View style={styles.ritualItem}>
                        <View style={styles.iconRow}>
                            <View style={[styles.iconBox, { backgroundColor: '#EFF6FF' }]}>
                                <ReflectionIcon />
                            </View>
                            <Text style={[styles.itemTitle, { color: lightBlue }]}>Reflection</Text>
                        </View>
                        <Text style={styles.itemSubtitle}>What did today teach you?</Text>
                    </View>

                    <View style={styles.ritualItem}>
                        <View style={styles.iconRow}>
                            <View style={[styles.iconBox, { backgroundColor: '#F4F4F8' }]}>
                                <ArrowUpIcon />
                            </View>
                            <Text style={[styles.itemTitle, { color: lightGreen }]}>Achievement</Text>
                        </View>
                        <Text style={styles.itemSubtitle}>What moved your life forward?</Text>
                    </View>
                </ScrollView>

                <View style={styles.bottomActionContainer}>
                    <View style={styles.divider} />
                    <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('EnhanceCrownEmotion')}>
                        <Text style={styles.primaryButtonText}>Crown This Day</Text>
                        <SparkIcon color="#FFFFFF" />
                    </Pressable>
                </View>
                <BottomTabBar activeTab="today" />

            </View>
        </SafeAreaView>
    );
};

export default EnhanceCrown;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: Platform.OS === 'android' ? 40 : 20,
        paddingBottom: 20,
    },
    headerSubtitle: { fontSize: 12, color: mutedText, fontWeight: '500', marginBottom: 4 },
    headerTitle: { fontSize: 26, fontWeight: '800', color: darkText, marginBottom: 4 },
    headerDate: { fontSize: 13, color: mutedText },
    bellButton: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#EFF6FF', justifyContent: 'center', alignItems: 'center', position: 'relative' },
    notificationDot: { position: 'absolute', top: 12, right: 12, width: 6, height: 6, borderRadius: 3, backgroundColor: '#FF4B4B', borderWidth: 1.5, borderColor: '#EFF6FF' },
    divider: { height: 1, backgroundColor: borderLight, width: '100%' },

    scrollContent: {
        paddingVertical: 40,
        gap: 50,
        alignItems: 'center',
    },
    ritualItem: { alignItems: 'center', justifyContent: 'center' },
    iconRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
    iconBox: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
    itemTitle: { fontSize: 18, fontWeight: '700' },
    itemSubtitle: { fontSize: 14, color: mutedText },

    bottomActionContainer: {
        backgroundColor: '#FFFFFF',
        paddingBottom: 24,
    },
    primaryButton: {
        backgroundColor: yellow,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        gap: 8,
        shadowColor: yellow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    primaryButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
});