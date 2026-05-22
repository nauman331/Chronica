import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { enableScreens } from 'react-native-screens'
import AuthNav from './AuthNav'
import UnAuthNav from './UnAuthNav'
import { useSelector } from 'react-redux'

enableScreens(true)

const CombinedNav: React.FC = () => {
    const token = useSelector((state: any) => state.auth.token)

    return (
        <NavigationContainer>
            {token ? <AuthNav /> : <UnAuthNav />}
        </NavigationContainer>
    )
}

export default CombinedNav
