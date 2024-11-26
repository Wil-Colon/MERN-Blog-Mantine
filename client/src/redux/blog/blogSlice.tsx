import { createSlice } from '@reduxjs/toolkit';
import { addComment } from '../actions/blog';

const initialState = {
    blogs: null as any,
    loading: true as any,
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
            // state.blogs = state.blogs;
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
        addCommentStart: (state) => {
            // state.blogs = state.blogs;
            state.loading = true;
            state.error = false;
        },
        addCommentSuccess: (state, action) => {
            let blogIndex = state.blogs.findIndex(
                (blog) => blog._id === action.payload._id
            );

            state.blogs[blogIndex] = action.payload;
            state.loading = false;
            state.error = false;
        },
        addCommentFailure: (state, action) => {
            state.blogs = null;
            state.loading = false;
            state.error = action.payload;
        },
        deleteCommentStart: (state) => {
            // state.blogs = state.blogs;
            state.loading = true;
            state.error = false;
        },
        deleteCommentSuccess: (state, action) => {
            let blogIndex = state.blogs.findIndex(
                (blog) => blog._id === action.payload.id
            );

            state.blogs[blogIndex].comments = action.payload;
            state.loading = false;
            state.error = false;
        },
        deleteCommentFailure: (state, action) => {
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
    addCommentStart,
    addCommentSuccess,
    addCommentFailure,
    deleteCommentStart,
    deleteCommentSuccess,
    deleteCommentFailure,
} = blogSlice.actions;
export default blogSlice.reducer;
