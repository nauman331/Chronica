import * as Keychain from 'react-native-keychain';
import { Storage } from 'redux-persist';

export const secureStorage: Storage = {
    setItem: async (key, value) => {
        await Keychain.setGenericPassword(key, value, { service: key });
        return Promise.resolve(true);
    },
    getItem: async (key) => {
        const credentials = await Keychain.getGenericPassword({ service: key });
        if (credentials) {
            return Promise.resolve(credentials.password);
        }
        return Promise.resolve(null);
    },
    removeItem: async (key) => {
        await Keychain.resetGenericPassword({ service: key });
        return Promise.resolve();
    },
};