import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import GetStarted from '../pages/GetStarted'
import Onboarding from '../pages/Onboarding'


type UnAuthStackParamList = {
    Screen1: undefined
    Screen2: undefined
    Screen3: undefined
    GetStarted: undefined
    Onboarding: undefined
}

const Stack = createStackNavigator<UnAuthStackParamList>()

const UnAuthNav: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="GetStarted"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Onboarding" component={Onboarding} />
        </Stack.Navigator>
    )
}

export default UnAuthNav
