import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import { white, yellow, blue, gray, COLOR_TEXT_MAIN, lightyellow } from '../utils/colors';

import { ShareIcon, SolidSparkleIcon } from '../utils/icons';

const Insights = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>

                {/* Header Section */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerSubtitle}>Your Progress</Text>
                        <Text style={styles.headerTitle}>Insights</Text>
                    </View>
                    <TouchableOpacity style={styles.shareButton} activeOpacity={0.7}>
                        <View style={styles.iconWrapper}>
                            <ShareIcon color={yellow} size={14} />
                        </View>
                        <Text style={styles.shareText}>Share</Text>
                    </TouchableOpacity>
                </View>

                {/* Main Momentum Card */}
                <View style={styles.card}>
                    <View style={styles.momentumContainer}>
                        <View style={styles.iconCircle}>
                            <SolidSparkleIcon color={COLOR_TEXT_MAIN} size={24} />
                        </View>

                        <Text style={styles.mainHeading}>
                            You're building{'\n'}momentum
                        </Text>

                        <Text style={styles.subHeading}>
                            2 rituals this week.{'\n'}That's progress worth celebrating.
                        </Text>

                        <TouchableOpacity
                            style={styles.writeButton}
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate('WriteReflection')}
                        >
                            <Text style={styles.writeButtonText}>Write Reflection</Text>
                        </TouchableOpacity>

                        <View style={styles.motivationCard}>
                            <Text style={styles.motivationText}>
                                <Text style={styles.boldText}>Keep going. </Text>
                                Small steps matter more than perfect streaks.
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Quote Card */}
                <View style={styles.quoteCard}>
                    <View style={styles.quoteContainer}>
                        <Text style={styles.quoteText}>
                            "The day is the only unit of time I can get my head around."
                        </Text>
                        <Text style={styles.quoteAuthor}>— Tim Ferriss</Text>
                    </View>
                </View>

            </View>

            <View style={styles.bottomTabContainer}>
                <BottomTabBar activeTab="insights" />
            </View>
        </SafeAreaView>
    );
};

export default Insights;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerSubtitle: {
        fontSize: 12,
        color: gray,
        fontWeight: '400',
        marginBottom: 2,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: blue,
        letterSpacing: -0.5,
    },
    shareButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: yellow,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 15,
        backgroundColor: lightyellow,
    },
    iconWrapper: {
        marginRight: 6,
        marginTop: 1,
    },
    shareText: {
        color: yellow,
        fontWeight: '500',
        fontSize: 14,
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 24,
        paddingHorizontal: 20,
        paddingVertical: 24,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    momentumContainer: {
        alignItems: 'center',
    },
    iconCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: lightyellow,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    mainHeading: {
        fontSize: 32,
        fontWeight: '800',
        color: blue,
        textAlign: 'center',
        lineHeight: 38,
        letterSpacing: -1,
        marginBottom: 12,
    },
    subHeading: {
        fontSize: 15,
        color: gray,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 28,
    },

    writeButton: {
        width: '100%',
        paddingVertical: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EAEAEA',
        alignItems: 'center',
        backgroundColor: white,
        marginBottom: 16,
    },
    writeButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: COLOR_TEXT_MAIN,
    },
    motivationCard: {
        width: '100%',
        backgroundColor: lightyellow,
        paddingVertical: 18,
        paddingHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    motivationText: {
        fontSize: 14,
        color: gray,
        textAlign: 'center',
        lineHeight: 22,
    },
    boldText: {
        fontWeight: '700',
        color: COLOR_TEXT_MAIN,
    },

    quoteCard: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 20,
        elevation: 1,
    },
    quoteContainer: {
        alignItems: 'center',
    },
    quoteText: {
        fontSize: 15,
        fontStyle: 'italic',
        color: COLOR_TEXT_MAIN,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 12,
    },
    quoteAuthor: {
        fontSize: 13,
        color: gray,
        fontWeight: '400',
    },

    // --- Navigation ---
    bottomTabContainer: {
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        backgroundColor: '#FFFFFF',
    },
});