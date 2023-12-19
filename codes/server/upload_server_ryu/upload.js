const express = require('express');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');
const { queryDatabase } = require('./routes/db');

const app = express();
const port = 50012;

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');

// 파일 저장 경로 설정
const Dom = 'files';

// 파일 이름을 SHA256 해시로 변환하는 함수
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
        const folder = file.mimetype.startsWith('image/') ? '../../../../../../../../work/images' : '../../../../../../../../work/videos';
        done(null, path.join(__dirname, Dom, folder));
    }
});

// Multer 업로드 설정
const upload = multer({
    limits: { fileSize: 20 * 1024 * 1024 * 1024 },
    storage: storage
}).fields([
    { name: 'videoFiles', maxCount: 20 },
    { name: 'imageFile', maxCount: 1 }
]);

// 기본 라우트 설정
app.get('/', (req, res) => {
    res.render('index');
});

// 파일 업로드 라우트 설정
app.post('/upload', upload, async (req, res) => {
    if (!req.files || !req.files.videoFiles || !req.files.imageFile) {
        return res.status(400).send('No files were uploaded.');
    }
    
    
    const imageFile = req.files.imageFile[0];
    
    const title = req.body.title;
    const description = req.body.description;
    const releaseDate = req.body.release_date || new Date().toISOString();

    
    const imageFilePath =  imageFile.filename;

    const insertVideoQuery = `
        INSERT INTO video (title, description, video_img_url, release_date)
        OUTPUT INSERTED.video_id
        VALUES (@title, @description, @video_image_url, @release_date);
    `;

    try {
        const videoResult = await queryDatabase(insertVideoQuery, {
            title,
            description,
            video_image_url: imageFilePath,
            release_date: releaseDate
        });

        const videoId = videoResult[0].video_id;
        let sequence = 0;
        for(const videoFile of req.files.videoFiles)
        {
            const videoFilePath =  videoFile.filename;

            const insertVideoDetailQuery = `
                INSERT INTO video_detail (video_id, video_url, sequence)
                VALUES (@video_id, @video_url, @sequence);
            `;

            await queryDatabase(insertVideoDetailQuery, {
                video_id: videoId,
                video_url: videoFilePath,
                sequence: sequence
            });
            sequence++;
        }
        res.status(200).send({ message: 'Video and details uploaded successfully' });
    } catch (err) {
        console.error('Error during database operation', err);
        res.status(500).send({ message: 'Error during database operation', error: err });
    }
});

// 서버 시작
const server = app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

server.timeout = 5000000;
server.requestTimeout = 5000000;
server.headersTimeout = 5000000;
