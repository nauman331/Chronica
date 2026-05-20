import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GetStarted from '../pages/GetStarted'
import Onboarding from '../pages/Onboarding'


import EnhanceCrown from '../pages/EnhanceCrown'
import EnhanceCrownEmotion from '../pages/EnhanceCrownEmotion'
import Profile from '../pages/Profile'
import LifeMap from '../pages/LifeMap'
import Insights from '../pages/Insights'
import MonthViewScreen from '../pages/MonthViewScreen'
import YearViewScreen from '../pages/YearViewScreen'


type UnAuthStackParamList = {
    Screen1: undefined
    Screen2: undefined
    Screen3: undefined
    GetStarted: undefined
    Onboarding: undefined


    EnhanceCrown: undefined
    EnhanceCrownEmotion: undefined
    Profile: undefined
    LifeMap: undefined
    Insights: undefined
    YearView: undefined
    MonthView: undefined
}

const Stack = createStackNavigator<UnAuthStackParamList>()

const UnAuthNav: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="GetStarted"
            screenOptions={{ headerShown: false }}
        >

            <Stack.Screen name="EnhanceCrown" component={EnhanceCrown} />
            <Stack.Screen name="EnhanceCrownEmotion" component={EnhanceCrownEmotion} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="LifeMap" component={LifeMap} />
            <Stack.Screen name="Insights" component={Insights} />
            <Stack.Screen name="YearView" component={YearViewScreen} />
            <Stack.Screen name="MonthView" component={MonthViewScreen} />

            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
        </Stack.Navigator>
    )
}

export default UnAuthNav
