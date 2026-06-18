import { useEffect } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import useSubmit from './useSubmit';

export const usePushNotifications = () => {
    const { submit } = useSubmit({ isAuth: true });

    useEffect(() => {
        const requestUserPermission = async () => {
            try {
                if (Platform.OS === 'android' && Platform.Version >= 33) {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
                    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                        console.log('Notification permission denied by user');
                        return;
                    }
                }

                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (enabled) {
                    const token = await messaging().getToken();
                    if (token) {
                        // REMOVED TRAILING SLASH
                        await submit('notifications/device-tokens', { token }, { method: 'POST' });
                        console.log("Token registered successfully");
                    }
                }
            } catch (error) {
                console.error('Failed to register push token:', error);
            }
        };

        requestUserPermission();

        // 1. Refresh Listener
        const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
            // REMOVED TRAILING SLASH
            await submit('notifications/device-tokens', { token: newToken }, { method: 'POST' });
        });

        // 2. NEW: Foreground Listener (App is open)
        const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived in the foreground!', remoteMessage);
            const title = remoteMessage.notification?.title || 'Chronica';
            const body = remoteMessage.notification?.body || 'You have a new update.';
            Alert.alert(title, body);
        });

        return () => {
            unsubscribeTokenRefresh();
            unsubscribeForeground();
        };
    }, []);
};