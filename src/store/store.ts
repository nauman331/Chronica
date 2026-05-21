import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authReducer from "./slices/authSlice";
import themeReducer from "./slices/ThemeSlice";

import { secureStorage } from "./secureStorage";
import { mmkvStorage } from "./mmkvStorage";

const persistedAuthConfig = {
    key: "auth",
    storage: secureStorage,
};

const persistedThemeConfig = {
    key: "theme",
    storage: mmkvStorage,
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