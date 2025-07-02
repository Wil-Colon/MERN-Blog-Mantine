const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const S3_BUCKET = process.env.AWS_BUCKET_NAME;

// 🔹 Multer Storage Configuration (Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 🔹 Function to Upload Files to S3
const uploadToS3 = async (file) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    const params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
    };

    try {
        await s3.send(new PutObjectCommand(params));
        return `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
        console.error('S3 Upload Error:', error);
        return null;
    }
};

// 🔹 Middleware for Handling File Uploads & Storing Links
const handleFileUploads = async (req, res, next) => {
    try {
        // Check if files exist
        if (!req.files || (!req.files.coverphoto && !req.files.galleryphotos)) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        // Upload Cover Photo
        const coverPhotoUrl = req.files.coverphoto
            ? await uploadToS3(req.files.coverphoto[0])
            : null;

        // Upload Gallery Photos
        const galleryPhotoUrls = req.files.galleryphotos
            ? await Promise.all(req.files.galleryphotos.map(uploadToS3))
            : [];

        // Validate Uploads
        if (!coverPhotoUrl || galleryPhotoUrls.includes(null)) {
            return res.status(500).json({ message: 'Image upload failed' });
        }

        // Store URLs in `req.body` for next middleware
        req.body.coverPhoto = coverPhotoUrl;
        req.body.galleryPhotos = galleryPhotoUrls;

        next();
    } catch (error) {
        console.error('File Upload Middleware Error:', error);
        res.status(500).json({ message: 'Error processing file uploads' });
    }
};

const updateAndUpload = async (req, res) => {
    try {
        const url = await uploadToS3(req.file); // from your uploadMiddleware
        res.json({ url });
    } catch (err) {
        res.status(500).json({ message: 'Upload failed' });
    }
};

module.exports = { upload, handleFileUploads, updateAndUpload, uploadToS3 };
