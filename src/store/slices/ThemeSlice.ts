import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    theme: "dark" | "light";
}

const initialState: AuthState = {
    theme: "light",
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<"dark" | "light">) {
            state.theme = action.payload;
        }
    }
})

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;