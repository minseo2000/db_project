
const express = require('express');
const router = express.Router();
const { queryDatabase } = require('./db');

// 영화 목록을 조회하는 API
router.get('/api/getMovieList', async (req, res) => {
    const query = `
      SELECT title, description, view_count, release_date, video_img_url
      FROM video;
    `;
  
    try {
      const movies = await queryDatabase(query, {});
      res.status(200).json(movies); 
    } catch (err) {
      res.status(400).json({ err:'영화 목록이 없습니다.' });
    }
  });
//영화 상세 정보를 조회하는 API
  router.post('/api/getDetailMovie', async (req, res) => {
    const videoId = req.body.videoId; //video_id를 가져옵니다.
    const query = `
    SELECT video_url, sequence 
    FROM video_detail 
    WHERE video_id = @videoId;
  `;

  try {
    const DetailMovieData = await queryDatabase(query, {videoId});
    res.status(200).json(DetailMovieData); 
  } catch (err) {
    res.status(400).json({ err:'해당 영화 정보는 없습니다' });
  }
  
  });
module.exports = router;
