const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const app = express();
const port = 50012;

app.set('view engine', 'ejs');

const Dom = 'files';
const sha256 = (data) => {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
};

const storage = multer.diskStorage({
    filename(req, file, done) {
        const originalname = file.originalname;
        const extname = path.extname(originalname);
        const basename = path.basename(originalname, extname);
        const hashedFileName = sha256(basename);
        done(null, hashedFileName + extname);
    },
    destination(req, file, done) {
        done(null, path.join(__dirname, Dom));
    }
});

const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 * 1024 },
    storage: storage
});

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', upload.single('videoFile'), (req, res) => {
    console.log('업로드 완료: ', req.file);
    res.status(200).send('Upload successful');
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
