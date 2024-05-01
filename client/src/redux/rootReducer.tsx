import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import profileReducer from './profile/profileSlice';

const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
