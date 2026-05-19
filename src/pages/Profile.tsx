import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomTabBar from '../components/BottomTabBar';

const Profile: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Profile</Text>
            </View>

            <View style={styles.bottomTabContainer}>
                <BottomTabBar activeTab="profile" />
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
    },
    bottomTabContainer: {
        justifyContent: 'flex-end',
    },
});