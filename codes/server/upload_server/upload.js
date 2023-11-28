const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const fs = require('fs');
const port = 50012;
const crypto = require('crypto');

const sha256 = (data) => {
    const hash = crypto.createHash('sha256');
    hash.update(data);
    return hash.digest('hex');
};

const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 * 1024 },
    storage: multer.diskStorage({
        filename(req, file, done) {
            const originalname = file.originalname;
            const extname = path.extname(originalname);
            const basename = path.basename(originalname, extname);

            console.log('영화 제목 : ', basename);

            const hashedFileName = sha256(basename); // 영화 제목을 해싱하여 암호화
            console.log('암호화된 제목 : ', hashedFileName);

            done(null, hashedFileName + extname);
        },
        destination(req, file, done) {
            console.log('업로드 중');
            done(null, path.join(__dirname, 'files'));
        },
    }),
});

const uploadMiddleware = upload.single('myFile');
app.use(uploadMiddleware);

const publicPath = path.join(__dirname, 'views');
app.use(express.static(publicPath));


app.post('/upload', (req,res) => {
    // const contentLength = req.headers['content-length'];
    // const progress = contentLength ? (req.bytesReceived / contentLength) * 100 : 0;

    // console.log(`Upload Progress: ${progress.toFixed(2)}%`);

    res.status(200).send('upload');

});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});