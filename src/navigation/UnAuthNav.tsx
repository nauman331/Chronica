import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withSafeArea } from '../components/SafeArea';

import GetStarted from '../pages/GetStarted';
import Onboarding from '../pages/Onboarding';
import EnhanceCrown from '../pages/EnhanceCrown';
import EnhanceCrownEmotion from '../pages/EnhanceCrownEmotion';
import Profile from '../pages/Profile';
import LifeMap from '../pages/LifeMap';
import Insights from '../pages/Insights';
import MonthViewScreen from '../pages/MonthViewScreen';
import YearViewScreen from '../pages/YearViewScreen';
import DayDetailScreen from '../pages/DayDetailScreen';
import DocumentDayScreen from '../pages/DocumentDayScreen';
import SplashScreen from '../pages/SplashScreen';

type UnAuthStackParamList = {
    Screen1: undefined;
    Screen2: undefined;
    Screen3: undefined;
    GetStarted: undefined;
    Onboarding: undefined;
    EnhanceCrown: undefined;
    EnhanceCrownEmotion: undefined;
    Profile: undefined;
    LifeMap: undefined;
    Insights: undefined;
    YearView: undefined;
    MonthView: undefined;
    DayDetail: undefined;
    DocumentDay: undefined;
    SplashScreen: undefined;
};

const Stack = createStackNavigator<UnAuthStackParamList>();


const UnAuthNav: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="EnhanceCrown" component={withSafeArea(EnhanceCrown)} />
            <Stack.Screen name="EnhanceCrownEmotion" component={withSafeArea(EnhanceCrownEmotion)} />
            <Stack.Screen name="Profile" component={withSafeArea(Profile)} />
            <Stack.Screen name="LifeMap" component={withSafeArea(LifeMap)} />
            <Stack.Screen name="Insights" component={withSafeArea(Insights)} />
            <Stack.Screen name="YearView" component={withSafeArea(YearViewScreen)} />
            <Stack.Screen name="MonthView" component={withSafeArea(MonthViewScreen)} />
            <Stack.Screen name="DayDetail" component={withSafeArea(DayDetailScreen)} />
            <Stack.Screen name="DocumentDay" component={withSafeArea(DocumentDayScreen)} />

            <Stack.Screen name="GetStarted" component={withSafeArea(GetStarted)} />
            <Stack.Screen name="Onboarding" component={withSafeArea(Onboarding)} />
            <Stack.Screen name="SplashScreen" component={withSafeArea(SplashScreen)} />
        </Stack.Navigator>
    );
};

export default UnAuthNav;