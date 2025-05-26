import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './editblog.scss';

export default function EditBlog() {
    const { id } = useParams(); // blog ID from route
    const [formData, setFormData] = useState({
        type: '',
        username: '',
        title: '',
        body: '',
    });
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [galleryPhotos, setGalleryPhotos] = useState([]);
    const [existingCover, setExistingCover] = useState('');
    const [existingGallery, setExistingGallery] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api/blog/${id}`
                );
                const blog = res.data;
                setFormData({
                    type: blog.type,
                    username: blog.userName,
                    title: blog.title,
                    body: blog.body,
                });

                setExistingCover(blog.coverPhoto);
                setExistingGallery(blog.galleryPhotos);
            } catch (err) {
                setMessage('Error loading blog.');
            }
        };

        fetchBlog();
    }, [id]);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleFileChange = (e, type) => {
        const files = Array.from(e.target.files);
        if (type === 'coverPhoto') setCoverPhoto(files[0]);
        else setGalleryPhotos(files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formDataObj = new FormData();
        Object.keys(formData).forEach((key) =>
            formDataObj.append(key, formData[key])
        );
        if (coverPhoto) formDataObj.append('coverphoto', coverPhoto);
        galleryPhotos.forEach((file) =>
            formDataObj.append('galleryphotos', file)
        );

        try {
            const res = await axios.put(
                `http://localhost:3000/api/blog/updateblog/${id}`,
                formDataObj,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );

            setMessage(res.data.message || 'Blog updated!');
        } catch (error) {
            setMessage('Error updating blog.');
        }

        setLoading(false);
    };

    return (
        <div className="create-blog">
            <h2>Edit Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Type:</label>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value="blog">Blog</option>
                    <option value="thought">Thought</option>
                </select>

                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <label>Body:</label>
                <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                />

                <label>Current Cover Photo:</label>
                {existingCover && (
                    <img
                        src={existingCover}
                        alt="cover"
                        style={{ width: '100%', maxHeight: '200px' }}
                    />
                )}

                <label>New Cover Photo (optional):</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'coverPhoto')}
                />

                <label>Current Gallery:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {existingGallery?.map((url, i) => (
                        <img
                            key={i}
                            src={url}
                            alt={`gallery-${i}`}
                            style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                            }}
                        />
                    ))}
                </div>

                <label>New Gallery Photos (optional):</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'galleryPhotos')}
                />

                <button type="submit">
                    {loading ? 'Updating...' : 'Update Blog'}
                </button>
            </form>

            {message && <p className="success">{message}</p>}
        </div>
    );
}
