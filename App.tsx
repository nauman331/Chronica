import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector, useDispatch } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

import CombinedNav from './src/navigation/CombinedNav';
import { store, persistor, RootState } from "./src/store/store";
import { setuser, logout } from './src/store/slices/authSlice';
import { apiURL } from './src/utils/exports';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { yellow } from './src/utils/colors';

const toastConfig = {
  chronicaNotification: ({ text1, text2, props }: any) => (
    <View style={styles.toastContainer}>
      <View style={styles.toastTextContent}>
        <Text style={styles.toastTitle}>{text1}</Text>
        <Text style={styles.toastBody}>{text2}</Text>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={props.onPressOk || (() => Toast.hide())}
      >
        <Text style={styles.actionText}>OK</Text>
      </TouchableOpacity>
    </View>
  )
};


const AppContent: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.auth);

  const getUser = async () => {
    try {
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
      <Toast config={toastConfig} />
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

const styles = StyleSheet.create({
  toastContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    marginTop: 10,
  },
  toastTextContent: {
    flex: 1,
    paddingRight: 10,
  },
  toastTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  toastBody: {
    color: '#A0A0A0',
    fontSize: 13,
    lineHeight: 18,
  },
  actionButton: {
    backgroundColor: 'rgba(201, 162, 39, 0.15)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  actionText: {
    color: yellow,
    fontWeight: '700',
    fontSize: 13,
  }
});