const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { queryDatabase } = require('./routes/db');

const app = express();
const port = 50500;
app.set('view engine', 'ejs');
const Dom = 'files';

const sha256 = (data) => {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
};


// Multer 저장소 설정
const storage = multer.diskStorage({
filename(req, file, done) {
    const originalname = file.originalname;
    const extname = path.extname(originalname);
    const basename = path.basename(originalname, extname);
    const hashedFileName = sha256(basename) + extname;
    done(null, hashedFileName);
},
destination(req, file, done) {
    const folder ='pro_images';
    done(null, path.join(__dirname, Dom, folder));
}
});
app.get('/', (req, res) => {
    res.render('index1');
});

const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, 
    storage: storage
}).fields([
    { name: 'imageFiles', maxCount: 5 }
]);

app.post('/image_upload', upload, async (req, res) => {
    if (!req.files || !req.files.imageFiles) {
        return res.status(400).send('No files were uploaded.');
    }
    
    try {
        const imageFiles = req.files.imageFiles; 
        for(const imageFile of imageFiles) {
            const imageFilePath = imageFile.filename;

            const insertImageQuery = `
                INSERT INTO profile_image_table (profile_image_url)
                VALUES (@profile_image_url); 
            `;

            await queryDatabase(insertImageQuery, {
                profile_image_url: imageFilePath,
            });
        }
        res.status(200).send({ message: '이미지 추가 성공' });
    } catch (err) {
        console.error('Error during database operation', err);
        res.status(500).send({ message: 'Error during database operation' });
    }
});



app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
