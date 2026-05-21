import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/ThemeSlice"
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistedAuthConfig = {
    key: "auth",
    storage: AsyncStorage,
};
const persistedThemeConfig = {
    key: "theme",
    storage: AsyncStorage,
};

const persistedAuthReducer = persistReducer(persistedAuthConfig, authReducer);
const persistedThemeReducer = persistReducer(persistedThemeConfig, themeReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        theme: persistedThemeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;