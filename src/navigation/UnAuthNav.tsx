import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Screen1 from '../pages/IntroScreens/Screen1'
import Screen2 from '../pages/IntroScreens/Screen2'
import Screen3 from '../pages/IntroScreens/Screen3'
import GetStarted from '../pages/GetStarted'
import EnhanceCrown from '../pages/EnhanceCrown'

type UnAuthStackParamList = {
    Screen1: undefined
    Screen2: undefined
    Screen3: undefined
    GetStarted: undefined
    EnhanceCrown: undefined
}

const Stack = createStackNavigator<UnAuthStackParamList>()

const UnAuthNav: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="GetStarted"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="Screen1" component={Screen1} />
            <Stack.Screen name="Screen2" component={Screen2} />
            <Stack.Screen name="Screen3" component={Screen3} />
            <Stack.Screen name="EnhanceCrown" component={EnhanceCrown} />
        </Stack.Navigator>
    )
}

export default UnAuthNav
