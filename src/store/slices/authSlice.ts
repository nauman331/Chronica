import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    refresh: string | null;
    userdata: Record<string, any> | null;
}

const initialState: AuthState = {
    token: null,
    refresh: null,
    userdata: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; refresh: string; userdata?: Record<string, any> | null }>) {
            state.token = action.payload.token;
            state.refresh = action.payload.refresh;

            if (action.payload.userdata) {
                state.userdata = action.payload.userdata;
            }
        },
        setuser(state, action: PayloadAction<Record<string, any> | null>) {
            state.userdata = action.payload;
        },
        logout(state) {
            state.token = null;
            state.refresh = null;
            state.userdata = null;
        },
    },
})

export const { login, logout, setuser } = authSlice.actions;
export default authSlice.reducer;