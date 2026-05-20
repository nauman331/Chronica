import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EnhanceCrown from '../pages/EnhanceCrown'
import EnhanceCrownEmotion from '../pages/EnhanceCrownEmotion'
import Profile from '../pages/Profile'
import LifeMap from '../pages/LifeMap'
import Insights from '../pages/Insights'
import MonthViewScreen from '../pages/MonthViewScreen'
import YearViewScreen from '../pages/YearViewScreen'
import DayDetailScreen from '../pages/DayDetailScreen'
import DocumentDayScreen from '../pages/DocumentDayScreen'


type AuthStackParamList = {
    EnhanceCrown: undefined
    EnhanceCrownEmotion: undefined
    Profile: undefined
    LifeMap: undefined
    Insights: undefined
    YearView: undefined
    MonthView: undefined
    DayDetail: undefined
    DocumentDay: undefined
}

const Stack = createStackNavigator<AuthStackParamList>()

const AuthNav: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="EnhanceCrown"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="DayDetail" component={DayDetailScreen} />
            <Stack.Screen name="YearView" component={YearViewScreen} />
            <Stack.Screen name="MonthView" component={MonthViewScreen} />
            <Stack.Screen name="EnhanceCrown" component={EnhanceCrown} />
            <Stack.Screen name="EnhanceCrownEmotion" component={EnhanceCrownEmotion} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="LifeMap" component={LifeMap} />
            <Stack.Screen name="Insights" component={Insights} />
            <Stack.Screen name="DocumentDay" component={DocumentDayScreen} />
        </Stack.Navigator>
    )
}

export default AuthNav
