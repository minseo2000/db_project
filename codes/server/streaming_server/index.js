const express = require("express");
const fs = require("fs");

const cors = require("cors");
const app = express();
const port = 50011;

app.use(express.static("public"));
app.use(cors());
app.get("/image/:fileName", (req, res) => {
    const fileName = req.params.fileName;
    const filePath = `../../../../../../../../work/images/${fileName}`; // 확장자가 이미지 파일 이름에 포함되어 있다고 가정

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`File access error for ${filePath}.`);
            res.sendStatus(404); // 파일이 없으면 404 Not Found
            return;
        }

        res.setHeader("Content-Type", "image/png"); // 적절한 MIME 타입 설정
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

app.get("/pro_image/:fileName", (req, res) => {
    const fileName = req.params.fileName;
    const filePath = `../../../../../../../../work/pro_images/${fileName}`; // 확장자가 이미지 파일 이름에 포함되어 있다고 가정

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`File access error for ${filePath}.`);
            res.sendStatus(404); // 파일이 없으면 404 Not Found
            return;
        }

        res.setHeader("Content-Type", "image/png"); // 적절한 MIME 타입 설정
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    });
});

// 파일 경로를 '/video/:fileName' 형식으로 받음
app.get("/video/:fileName", (req, res) => {
    const fileName = req.params.fileName;
    const filePath = `../../../../../../../../work/videos/${fileName}`;

    // 이하 로직은 기존과 동일
    const options = {};

    let start;
    let end;

    const range = req.headers.range;
    if (range) {
        const bytesPrefix = "bytes=";
        if (range.startsWith(bytesPrefix)) {
            const bytesRange = range.substring(bytesPrefix.length);
            const parts = bytesRange.split("-");
            if (parts.length === 2) {
                const rangeStart = parts[0] && parts[0].trim();
                if (rangeStart && rangeStart.length > 0) {
                    options.start = start = parseInt(rangeStart);
                }
                const rangeEnd = parts[1] && parts[1].trim();
                if (rangeEnd && rangeEnd.length > 0) {
                    options.end = end = parseInt(rangeEnd);
                }
            }
        }
    }

 //   res.setHeader("content-type", "video/mp4");

    fs.stat(filePath, (err, stat) => {
        if (err) {
            console.error(`File stat error for ${filePath}.`);
            console.error(err);
            res.sendStatus(500);
            return;
        }

        let contentLength = stat.size;

        if (req.method === "HEAD") {
            res.statusCode = 200;
            res.setHeader("accept-ranges", "bytes");
            res.setHeader("content-length", contentLength);
            res.end();
        } else {        
            let retrievedLength;
            if (start !== undefined && end !== undefined) {
                retrievedLength = (end+1) - start;
            } else if (start !== undefined) {
                retrievedLength = contentLength - start;
            } else if (end !== undefined) {
                retrievedLength = (end+1);
            } else {
                retrievedLength = contentLength;
            }

            res.statusCode = start !== undefined || end !== undefined ? 206 : 200;
            res.setHeader("content-length", retrievedLength);

            if (range !== undefined) {  
                res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
                res.setHeader("accept-ranges", "bytes");
            }

            const fileStream = fs.createReadStream(filePath, options);
            fileStream.on("error", error => {
                console.log(`Error reading file ${filePath}.`);
                console.log(error);
                res.sendStatus(500);
            });
            
            fileStream.pipe(res);
        }
    });
});

app.listen(port, () => {
    console.log(`Open your browser and navigate to http://localhost:${port}`)
});
