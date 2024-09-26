const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        type: {
            type: String,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
        avatar: {
            type: String,
        },
        userName: {
            type: String,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,
        },
        coverPhoto: {
            type: String,
        },
        galleryPhotos: [String],
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users',
                },
                selection: String,
            },
        ],
        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user',
                },
                text: {
                    type: String,
                    required: true,
                },
                avatar: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);

exports.Blog = Blog;
