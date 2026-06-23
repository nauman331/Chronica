import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    lifeSpan: number;
}

const initialState: SettingsState = {
    lifeSpan: 80,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLifeSpan(state, action: PayloadAction<number>) {
            state.lifeSpan = action.payload;
        }
    }
});

export const { setLifeSpan } = settingsSlice.actions;
export default settingsSlice.reducer;