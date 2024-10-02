const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Aplication_Upload_Files',
    password: 'FerariF12',
    port: 5432,
});

const uploadDir = 'Uploads_Files';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname.replace(/\s/g, '-'); 
        cb(null, originalName);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpg',
        'image/jpeg', 
        'image/png',  
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/zip',
        'application/x-zip-compressed',
        'application/x-rar-compressed',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/octet-stream'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('File type not supported'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'Home.html'));
});

app.get('/files', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'views', 'Uploaded-Files.html'));
});

app.get('/api/files', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM upload_files');
        const files = result.rows; 

        res.json(files);
    } catch (error) {
        console.error('Database query error:', error);
        res.status(500).send({ message: 'Error fetching files', error });
    }
});

app.post('/upload', upload.single('Files'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'File upload is required' });
    }

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send({ message: 'Title and description are required' });
    }

    try {
        const fileName = req.file.filename; 

        await pool.query(
            'INSERT INTO upload_files (file_path, title, description) VALUES ($1, $2, $3)',
            [fileName, title, description] 
        );

        res.redirect('/files?success=true');
    } catch (error) {
        console.error('Database insert error:', error);
        res.status(500).send({ message: 'Error saving to database', error });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});