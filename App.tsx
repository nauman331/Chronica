import React from 'react'
import CombinedNav from './src/navigation/CombinedNav'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./src/store/store";
import Toast from 'react-native-toast-message';


const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <CombinedNav />
          <Toast />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App