import { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import useSubmit from './useSubmit';

export const usePushNotifications = () => {
    const { submit } = useSubmit({ isAuth: true });

    useEffect(() => {
        const requestUserPermission = async () => {
            try {
                // 1. Android 13+ Permission handling
                if (Platform.OS === 'android' && Platform.Version >= 33) {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Notification permission denied by user');
                        return;
                    }
                }

                // 2. iOS Permission handling (also grabs the token on Android)
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (enabled) {
                    // 3. Get the FCM Token
                    const token = await messaging().getToken();

                    // 4. Register it with your Django backend
                    if (token) {
                        await submit('notifications/device-tokens', { token }, { method: 'POST' });
                        console.log("Token registered successfully");
                    }
                }
            } catch (error) {
                console.error('Failed to register push token:', error);
            }
        };

        requestUserPermission();

        // 5. Listen for token refreshes (if token expires, send new one to backend)
        const unsubscribe = messaging().onTokenRefresh(async (newToken) => {
            await submit('notifications/device-tokens/', { token: newToken }, { method: 'POST' });
        });

        return unsubscribe;
    }, []);
};