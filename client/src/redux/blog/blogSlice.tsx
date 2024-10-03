import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    blogs: null as any,
    loading: false as any,
    error: false as any,
};

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getBlogsStart: (state) => {
            state.blogs = null;
            state.loading = true;
            state.error = false;
        },
        getBlogsSuccess: (state, action) => {
            state.blogs = action.payload;
            state.loading = false;
            state.error = false;
        },
        getBlogsError: (state, action) => {
            state.blogs = null;
            state.loading = false;
            state.error = action.payload;
        },
        likeBlogStart: (state) => {
            state.blogs = state.blogs;
            state.loading = true;
            state.error = false;
        },
        likeBlogSuccess: (state, action) => {
            let blogIndex = state.blogs.findIndex(
                (blog) => blog._id === action.payload._id
            );

            state.blogs[blogIndex] = action.payload;
            state.loading = false;
            state.error = false;
        },
        likeBlogFailure: (state, action) => {
            state.blogs = null;
            state.loading = false;
            state.error = action.payload;
        },

        resetErrors: (state) => {
            state.error = false;
        },
    },
});

export const {
    getBlogsStart,
    getBlogsSuccess,
    getBlogsError,
    likeBlogStart,
    likeBlogSuccess,
    likeBlogFailure,
} = blogSlice.actions;
export default blogSlice.reducer;
