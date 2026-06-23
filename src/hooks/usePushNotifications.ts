import { useEffect } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useNavigation } from '@react-navigation/native';
import useSubmit from './useSubmit';
import Toast from 'react-native-toast-message';

export const usePushNotifications = () => {
    const { submit } = useSubmit({ isAuth: true });
    const navigation = useNavigation<any>();

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
                        await submit('notifications/device-tokens', { token }, { method: 'POST' });
                        console.log("Token registered successfully");
                    }
                }
            } catch (error) {
                console.error('Failed to register push token:', error);
            }
        };

        requestUserPermission();

        const unsubscribeTokenRefresh = messaging().onTokenRefresh(async (newToken) => {
            await submit('notifications/device-tokens', { token: newToken }, { method: 'POST' });
        });

        const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived in the foreground!', remoteMessage);

            const title = remoteMessage.notification?.title || 'Chronica';
            const body = remoteMessage.notification?.body || 'You have a new update.';

            const tapTarget = remoteMessage.data?.tap_target;
            const type = remoteMessage.data?.type;

            Toast.show({
                type: 'chronicaNotification',
                text1: title,
                text2: body,
                position: 'top',
                visibilityTime: 5000,
                props: {
                    onPressOk: () => {
                        Toast.hide();
                        if (tapTarget === 'Today' || type === 'morning' || type === 'evening') {
                            navigation.navigate('DocumentDay', {
                                dateStr: new Date().toISOString().split('T')[0]
                            });
                        } else if (tapTarget === 'Reflections' || type === 'weekly') {
                            navigation.navigate('WriteReflection');
                        }
                    }
                }
            });
        });

        return () => {
            unsubscribeTokenRefresh();
            unsubscribeForeground();
        };
    }, [navigation]);
};