const express = require('express');
const router = express.Router();
const queryDatabase = require('./db.js')




//영상 중단 시간 저장
router.post('/api/save-play-time', async (req, res) => {
    try {
        console.log('----------', req.body)
        const profile_id = req.body.profile_id;
        const video_id = req.body.video_id;
        const stop_time = req.body.stop_Time;

        const query = `
            IF EXISTS (SELECT * FROM play_time WHERE profile_id = @profile_id AND video_id = @video_id)
                UPDATE play_time
                SET time = @time
                WHERE profile_id = @profile_id AND video_id = @video_id
            ELSE
                INSERT INTO play_time (profile_id, video_id, time, date)
                VALUES (@profile_id, @video_id, @time, GETDATE());
        `;

        await queryDatabase(query, {
            profile_id: profile_id,
            video_id: video_id,
            time: stop_time
        });
        res.status(200).json({ message: '성공적으로 저장되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});
//영상 재생할때 해당 영상 중단 시간 가져오기
router.post('/api/load-play-time', async (req, res) => {
    try {
        const profile_id = req.body.profile_id;
        const video_id = req.body.video_id;

        const query = `
               SELECT time FROM play_time WHERE profile_id = @profile_id AND video_id = @video_id;
            `;

        const result = await queryDatabase(query, {
            profile_id: profile_id,
            video_id: video_id,
        });

        // 결과 검사 및 조건부 응답
        if (result.length > 0 && result[0].time != null) {
            // 결과가 있고, time 값이 null이 아닌 경우
            res.status(200).json({ time: result[0].time });
        } else {
            // 결과가 비어 있거나 time 값이 null인 경우
            res.status(200).json({ time: 0 });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;