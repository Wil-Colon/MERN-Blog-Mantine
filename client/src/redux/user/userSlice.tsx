import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token')?.toString() as any,
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.currentUser = null;
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            localStorage.setItem('token', action.payload.token);
            state.token = action.payload.token;
            state.currentUser = null;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getUserStart: (state, action) => {
            state.currentUser = null;
            state.loading = true;
            state.error = null;
        },
        getUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        getUsersFailure: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    getUserStart,
    getUserSuccess,
    getUsersFailure,
} = userSlice.actions;
export default userSlice.reducer;
