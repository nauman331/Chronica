import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EnhanceCrown from '../pages/EnhanceCrown'
import Profile from '../pages/Profile'
import LifeMap from '../pages/LifeMap'
import Insights from '../pages/Insights'


type AuthStackParamList = {
    EnhanceCrown: undefined
    Profile: undefined
    LifeMap: undefined
    Insights: undefined
}

const Stack = createStackNavigator<AuthStackParamList>()

const AuthNav: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="EnhanceCrown"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="EnhanceCrown" component={EnhanceCrown} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="LifeMap" component={LifeMap} />
            <Stack.Screen name="Insights" component={Insights} />
        </Stack.Navigator>
    )
}

export default AuthNav
