import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../pages/SplashScreen'
import { withSafeArea } from '../components/SafeArea'
import EnhanceCrown from '../pages/EnhanceCrown'
import EnhanceCrownEmotion from '../pages/EnhanceCrownEmotion'
import Profile from '../pages/Profile'
import LifeMap from '../pages/LifeMap'
import Insights from '../pages/Insights'
import MonthViewScreen from '../pages/MonthViewScreen'
import YearViewScreen from '../pages/YearViewScreen'
import DayDetailScreen from '../pages/DayDetailScreen'
import DocumentDayScreen from '../pages/DocumentDayScreen'
import WriteReflection from '../pages/WriteReflection'
import WhatDidYouLearn from '../pages/WhatDidYouLearn';
import ReflectionSaved from '../pages/ReflectionSaved'
import Settings from '../pages/Settings'
import SubscriptionScreen from '../pages/SubscriptionScreen'
import WidgetsScreen from '../pages/WidgetsScreen'
import Notifications from '../pages/Notifications'
import ShareProgress from '../pages/ShareProgress'
import { usePushNotifications } from '../hooks/usePushNotifications'


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
    WriteReflection: undefined
    WhatDidYouLearn: undefined
    ReflectionSaved: undefined
    SplashScreen: undefined
    Settings: undefined
    SubscriptionScreen: undefined
    WidgetsScreen: undefined
    Notifications: undefined
    ShareProgress: undefined
}

const Stack = createStackNavigator<AuthStackParamList>()

const AuthNav: React.FC = () => {
    usePushNotifications();
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}
        >
            <Stack.Screen name="SplashScreen" component={withSafeArea(SplashScreen)} />
            <Stack.Screen name="EnhanceCrown" component={withSafeArea(EnhanceCrown)} />
            <Stack.Screen name="EnhanceCrownEmotion" component={withSafeArea(EnhanceCrownEmotion)} />
            <Stack.Screen name="Profile" component={withSafeArea(Profile)} />
            <Stack.Screen name="LifeMap" component={withSafeArea(LifeMap)} />
            <Stack.Screen name="Insights" component={withSafeArea(Insights)} />
            <Stack.Screen name="YearView" component={withSafeArea(YearViewScreen)} />
            <Stack.Screen name="MonthView" component={withSafeArea(MonthViewScreen)} />
            <Stack.Screen name="DayDetail" component={withSafeArea(DayDetailScreen)} />
            <Stack.Screen name="DocumentDay" component={withSafeArea(DocumentDayScreen)} />
            <Stack.Screen name="WriteReflection" component={withSafeArea(WriteReflection)} />
            <Stack.Screen name="WhatDidYouLearn" component={withSafeArea(WhatDidYouLearn)} />
            <Stack.Screen name="ReflectionSaved" component={withSafeArea(ReflectionSaved)} />
            <Stack.Screen name="Settings" component={withSafeArea(Settings)} />
            <Stack.Screen name="SubscriptionScreen" component={withSafeArea(SubscriptionScreen)} />
            <Stack.Screen name="WidgetsScreen" component={withSafeArea(WidgetsScreen)} />
            <Stack.Screen name="Notifications" component={withSafeArea(Notifications)} />
            <Stack.Screen name="ShareProgress" component={withSafeArea(ShareProgress)} />
        </Stack.Navigator>
    )
}

export default AuthNav
