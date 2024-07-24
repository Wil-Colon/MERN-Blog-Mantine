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
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model('Blog', BlogSchema);

exports.Blog = Blog;
