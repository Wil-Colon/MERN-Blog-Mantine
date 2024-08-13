import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import profileReducer from './profile/profileSlice';
import blogSlice from './blog/blogSlice';

const rootReducer = combineReducers({
    user: userReducer,
    profile: profileReducer,
    blogs: blogSlice,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
