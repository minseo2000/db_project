const express = require('express');
const router = express.Router();
const queryDatabase = require('./db.js')

router.post('/api/search-videos', async (req, res) => {
    try {
        const searchvalue = req.body.searchvalue;
        const searchvaluetitge = `%${searchvalue}%`;
        // 장르, 배우, 영화 제목에 따라 다른 쿼리 실행
        let query = `
        SELECT video_id, actor_name, genre_name, title, video_img_url, description
        FROM search_view
        WHERE actor_name LIKE @searchvalue
           OR genre_name LIKE @searchvaluetitge
           OR title LIKE @searchvaluetitge;
        `;
        const params = {
            searchvalue: searchvalue,
            searchvaluetitge: searchvaluetitge
        };

        const results = await queryDatabase(query, params);

        // 결과 반환
        if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: '검색 결과가 없습니다.' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;