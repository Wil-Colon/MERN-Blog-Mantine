import './createBlog.scss';
import { useState } from 'react';
import axios from 'axios';
import BodyContainer from '../../../components/BodyContainer/BodyContainer';
import { Button } from '@mantine/core';

export default function CreateBlog() {
    const [formData, setFormData] = useState({
        type: 'blog',
        author: '',
        username: '',
        title: '',
        body: '',
    });
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [galleryPhotos, setGalleryPhotos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [clickOnce, setClickOnce] = useState(false);

    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        if (type === 'coverPhoto') {
            setCoverPhoto(files[0]);
        } else {
            setGalleryPhotos(files);
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        if (!formData.title.trim()) tempErrors.title = 'Title is required!';
        if (!formData.body.trim())
            tempErrors.body = 'Body content is required!';
        if (!coverPhoto) tempErrors.coverPhoto = 'Cover photo is required!';
        if (galleryPhotos.length < 1)
            tempErrors.galleryPhotos = 'At least 1 gallery photo required!';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) =>
            formDataObj.append(key, formData[key])
        );
        formDataObj.append('coverphoto', coverPhoto);
        galleryPhotos.forEach((file) =>
            formDataObj.append('galleryphotos', file)
        );

        try {
            const res = await axios.post(
                'http://localhost:3000/api/blog/createBlog',
                formDataObj,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            setMessage('Blog created successfully!');
            setFormData({
                type: 'blog',
                author: '',
                username: '',
                title: '',
                body: '',
            });
            setCoverPhoto(null);
            setGalleryPhotos([]);
            setClickOnce(true);
        } catch (error) {
            setMessage('Error creating blog.');
            setClickOnce(false);
        }

        setLoading(false);
    };

    return (
        <BodyContainer size="xs" fluid pb={50}>
            <div className="create-blog">
                <h2>Create Blog</h2>
                <form onSubmit={handleSubmit}>
                    {/* Type Selection */}
                    <label>Type:</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="blog">Blog</option>
                        <option value="thought">Thought</option>
                    </select>

                    {/* Title */}
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    {errors.title && <p className="error">{errors.title}</p>}

                    {/* Body */}
                    <label>Content:</label>
                    <textarea
                        name="body"
                        placeholder="Write your blog..."
                        value={formData.body}
                        onChange={handleChange}
                        required
                    />
                    {errors.body && <p className="error">{errors.body}</p>}

                    {/* Cover Photo */}
                    <label>Cover Photo:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'coverPhoto')}
                        required
                    />
                    {errors.coverPhoto && (
                        <p className="error">{errors.coverPhoto}</p>
                    )}

                    {/* Gallery Photos */}
                    <label>Gallery Photos (Max 5):</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'galleryPhotos')}
                        required
                    />
                    {errors.galleryPhotos && (
                        <p className="error">{errors.galleryPhotos}</p>
                    )}

                    {/* Submit Button */}
                    <Button
                        className="button"
                        type="submit"
                        disabled={clickOnce}
                    >
                        {loading ? 'Uploading...' : 'Create Blog'}
                    </Button>
                </form>

                {message && <p className="success">{message}</p>}
            </div>
        </BodyContainer>
    );
}
