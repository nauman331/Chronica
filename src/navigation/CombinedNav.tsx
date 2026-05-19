import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import AuthNav from './AuthNav'
import UnAuthNav from './UnAuthNav'

enableScreens(true)

const CombinedNav: React.FC = () => {
    const token = null

    return (
        <NavigationContainer>
            {token ? <AuthNav /> : <UnAuthNav />}
        </NavigationContainer>
    )
}

export default CombinedNav
