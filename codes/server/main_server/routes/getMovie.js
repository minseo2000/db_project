const router = require('express').Router();

router.post('/getMovie', async(req, res) => {
    const query = 'select * from video_detail';
    let result = await queryDatabase(query, {});
    console.log(result);
    const url = "http://minseotest.iptime.org:50011/video/";
    result = result += url;
    res.json({movieUrl : result});
})

router.post('/getMovieDetail', async(req, res) => {
    const query = 'select video_img_url from video';
    const result = await queryDatabase(query, {});
    console.log(result);
})