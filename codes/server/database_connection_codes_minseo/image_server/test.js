app.get("/image/:fileName", (req, res) => {
    const fileName = req.params.fileName;
    const filePath = `./images/${fileName}`; // 확장자가 이미지 파일 이름에 포함되어 있다고 가정

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