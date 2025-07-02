import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './editblog.scss';

export default function EditBlog() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        type: '',
        userName: '',
        title: '',
        body: '',
    });
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [galleryPhotos, setGalleryPhotos] = useState([]);
    const [existingCover, setExistingCover] = useState('');
    const [existingGallery, setExistingGallery] = useState([]);
    const [removedGallery, setRemovedGallery] = useState([]);
    const [originalData, setOriginalData] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:3000/api/blog/${id}`
                );
                setFormData({
                    type: data.type,
                    userName: data.userName,
                    title: data.title,
                    body: data.body,
                });
                setExistingCover(data.coverPhoto);
                setExistingGallery(data.galleryPhotos);
                setOriginalData(data);
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

    const handleRemoveGalleryImage = (url) => {
        setExistingGallery(existingGallery.filter((img) => img !== url));
        setRemovedGallery([...removedGallery, url]);
    };

    const hasChanges = () => {
        if (!originalData) return false;
        const fieldsChanged = ['type', 'title', 'body'].some(
            (field) => formData[field] !== originalData[field]
        );
        return (
            fieldsChanged ||
            coverPhoto ||
            galleryPhotos.length > 0 ||
            removedGallery.length > 0
        );
    };

    const uploadImage = async (file) => {
        const fileData = new FormData();
        fileData.append('image', file);
        const { data } = await axios.post(
            'http://localhost:3000/api/blog/updateandupload',
            fileData,
            {
                headers: { 'Content-Type': 'multipart/form-data' },
            }
        );
        return data.url;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hasChanges()) return;
        if (existingGallery.length + galleryPhotos.length < 1) {
            setMessage('At least one gallery photo must remain.');
            return;
        }

        setLoading(true);

        try {
            let coverUrl = existingCover;
            if (coverPhoto) {
                coverUrl = await uploadImage(coverPhoto);
            }

            const newGalleryUrls = await Promise.all(
                galleryPhotos.map(uploadImage)
            );
            const finalGallery = [...existingGallery, ...newGalleryUrls];

            const updated = {
                ...formData,
                coverPhoto: coverUrl,
                galleryPhotos: finalGallery,
            };

            const { data } = await axios.put(
                `http://localhost:3000/api/blog/updateblog/${id}`,
                updated
            );
            setMessage(data.message);
        } catch (err) {
            console.error(err);
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
                <label>New Cover Photo:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'coverPhoto')}
                />

                <label>Gallery Images:</label>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {existingGallery.map((url, i) => (
                        <div key={i} style={{ position: 'relative' }}>
                            <img
                                src={url}
                                style={{
                                    width: '100px',
                                    height: '100px',
                                    objectFit: 'cover',
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(url)}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    background: 'red',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '10px',
                                    height: '10px',
                                }}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                <label>Add New Gallery Photos:</label>
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'galleryPhotos')}
                />

                <button type="submit" disabled={!hasChanges() || loading}>
                    {loading ? 'Updating...' : 'Update Blog'}
                </button>
            </form>
            {message && <p className="success">{message}</p>}
        </div>
    );
}
