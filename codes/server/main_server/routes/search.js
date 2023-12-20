const express = require('express');
const router = express.Router();
const queryDatabase = require('./db.js')

router.get('/api/search-videos', async (req, res) => {
    try {
        // 쿼리 스트링에서 searchvalue 파라미터를 받습니다.
        const searchvalue = req.query.searchvalue;
        const searchvaluetitge = `%${searchvalue}%`;
        let query = `
            SELECT video_id, actor_name, genre_name, title, video_img_url, description
            FROM (
                SELECT *, ROW_NUMBER() OVER (PARTITION BY video_id, title, video_img_url, description ORDER BY video_id) as rn
                FROM search_view
                WHERE actor_name LIKE @searchvaluetitge
                   OR genre_name LIKE @searchvaluetitge
                   OR title LIKE @searchvaluetitge
            ) as subquery
            WHERE rn = 1;
        `;
    
        const params = {
            searchvaluetitge: searchvaluetitge,
        };

        let results = await queryDatabase(query, params);

        // 이미지 URL에 접두사 추가
        const baseUrl = "http://minseotest.iptime.org:50011/image/";
        results = results.map(item => ({
            ...item,
            video_img_url: baseUrl + item.video_img_url
        }));

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