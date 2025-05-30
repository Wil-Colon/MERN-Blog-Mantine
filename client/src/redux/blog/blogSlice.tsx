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
        getSingleBlogStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        getSingleBlogSuccess: (state, action) => {
            state.blogs = action.payload;
            state.loading = false;
            state.error = false;
        },
        getSingleBlogError: (state, action) => {
            state.blogs = null;
            state.loading = false;
            state.error = action.payload;
        },
        getBlogsStart: (state) => {
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
        getRecentBlogsStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        getRecentBlogsSuccess: (state, action) => {
            state.blogs = action.payload;
            state.loading = false;
            state.error = false;
        },
        getRecentBlogsError: (state, action) => {
            state.blogs = null;
            state.loading = false;
            state.error = action.payload;
        },
        likeBlogStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        likeBlogSuccess: (state, action) => {
            Array.isArray(state.blogs)
                ? (state.blogs = state.blogs.map((blog) =>
                      blog._id === action.payload.id
                          ? { ...blog, likes: action.payload.likes }
                          : blog
                  ))
                : (state.blogs.likes = action.payload.likes);

            state.loading = false;
            state.error = false;
        },
        likeBlogFailure: (state, action) => {
            state.blogs = null;
            state.loading = false;
            state.error = action.payload;
        },
        addCommentStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        addCommentSuccess: (state, action) => {
            state.blogs = action.payload;
            state.loading = false;
            state.error = false;
        },
        addCommentFailure: (state, action) => {
            state.blogs = null;
            state.loading = false;
            state.error = action.payload;
        },
        deleteCommentStart: (state) => {
            state.loading = true;
            state.error = false;
        },
        deleteCommentSuccess: (state, action) => {
            // state.blogs = state.blogs.map((blog) =>
            //     blog._id === action.payload.id
            //         ? { ...blog, comments: action.payload.comments }
            //         : blog
            // );
            state.blogs = { ...state.blogs, comments: action.payload.comments };
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
    getSingleBlogStart,
    getSingleBlogSuccess,
    getSingleBlogError,
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
    getRecentBlogsStart,
    getRecentBlogsSuccess,
    getRecentBlogsError,
} = blogSlice.actions;
export default blogSlice.reducer;
