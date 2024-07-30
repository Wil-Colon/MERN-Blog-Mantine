const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
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
        galleryPhotos: {
            type: String,
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'users',
                },
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
