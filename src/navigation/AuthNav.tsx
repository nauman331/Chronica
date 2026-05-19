import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import EnhanceCrown from '../pages/EnhanceCrown'

type AuthStackParamList = {
    EnhanceCrown: undefined
}

const Stack = createStackNavigator<AuthStackParamList>()

const AuthNav: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="EnhanceCrown"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="EnhanceCrown" component={EnhanceCrown} />
        </Stack.Navigator>
    )
}

export default AuthNav
