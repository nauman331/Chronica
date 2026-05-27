import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeOption = "system" | "light" | "dark";

interface ThemeState {
    themeOption: ThemeOption;
}

const initialState: ThemeState = {
    themeOption: "system",
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeOption>) {
            state.themeOption = action.payload;
        }
    }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;