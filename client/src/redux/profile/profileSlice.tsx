import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userProfile: null as any,
    allProfiles: null as any,
    loading: false as any,
    error: false as any,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        getUserProfileStart: (state) => {
            state.userProfile = null;
            state.loading = true;
        },
        getUserProfileSuccess: (state, action) => {
            state.userProfile = action.payload;
            state.loading = false;
        },
        getUserProfileError: (state, action) => {
            state.userProfile = null;
            state.loading = false;
            state.error = action.payload;
        },
        getAllProfilesStart: (state) => {
            state.allProfiles = null;
            state.loading = true;
        },
        getAllProfilesSuccess: (state, action) => {
            state.allProfiles = action.payload;
            state.loading = false;
        },
        getAllProfilesError: (state, action) => {
            state.allProfiles = null;
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    getUserProfileStart,
    getUserProfileSuccess,
    getUserProfileError,
    getAllProfilesStart,
    getAllProfilesSuccess,
    getAllProfilesError,
} = profileSlice.actions;
export default profileSlice.reducer;
