import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

import CombinedNav from './src/navigation/CombinedNav';
import { store, persistor, RootState } from "./src/store/store";
import { setuser, logout } from './src/store/slices/authSlice';
import { apiURL } from './src/utils/exports';

const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiURL}auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: data.message || 'Please log in again.',
        });
        dispatch(logout());
        return;
      }
      dispatch(setuser(data));
      console.log("User data fetched successfully:", data);

    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Failed to fetch user profile.',
      });
      console.error("Error fetching user data:", error);
      dispatch(logout());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token, dispatch]);

  return (
    <SafeAreaProvider>
      <CombinedNav />
      <Toast />
    </SafeAreaProvider>
  );
}

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContent />
      </PersistGate>
    </Provider>
  )
}

export default App;