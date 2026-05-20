import React from 'react'
import CombinedNav from './src/navigation/CombinedNav'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <CombinedNav />
    </SafeAreaProvider>
  )
}

export default App