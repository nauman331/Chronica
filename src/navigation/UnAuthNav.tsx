import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { withSafeArea } from '../components/SafeArea';

import GetStarted from '../pages/GetStarted';
import Onboarding from '../pages/Onboarding';
import SplashScreen from '../pages/SplashScreen';



type UnAuthStackParamList = {
    Screen1: undefined;
    Screen2: undefined;
    Screen3: undefined;
    GetStarted: undefined;
    Onboarding: undefined;
    SplashScreen: undefined;
};

const Stack = createStackNavigator<UnAuthStackParamList>();


const UnAuthNav: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{ headerShown: false, animation: 'slide_from_bottom' }}
        >
            <Stack.Screen name="SplashScreen" component={withSafeArea(SplashScreen)} />
            <Stack.Screen name="GetStarted" component={withSafeArea(GetStarted)} />
            <Stack.Screen name="Onboarding" component={withSafeArea(Onboarding)} />
        </Stack.Navigator>
    );
};

export default UnAuthNav;