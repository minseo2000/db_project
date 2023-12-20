const router = require('express').Router();
const queryDatabase = require('./db');
const {getMovieurl} = require('./Movieurl');
const {getMovieImage} = require('./Movieurl');
const {getDate} = require('./Movieurl');


router.post('/api/getMovieInfo', async(req, res) => {
    try{
        const video_id = req.body.video_id;

        const query = 'select video_url,sequence,title, description from movie_view where video_id = @video_id'; //비디오
        //const img_query = 'select video_img_url from video where video_id'; // 이미지
        
        let video_result = await queryDatabase(query, {video_id : video_id}); // 비디오 url
        
        video_result = await getMovieurl(video_result);
        
        res.json(video_result);
    }
    catch(err){
        res.status(404).json(err);
    }
    
});


router.post('/api/startMovie', async(req, res) => {
    try{
        const video_id = req.body.video_id;
        const view_query = 'select view_count from video where video_id = @video_id'
        const query = 'update video set view_count = @view_count where video_id = @video_id';
        
        const view_result = await queryDatabase(view_query, {video_id : video_id});
        if(view_result.length == 0 | view_result == undefined){
            res.status(404).json({message : "존재하지 않는 비디오 ID"})
        }
        else{
            let view_count = view_result[0].view_count;
            view_count += 1;

            const result = await queryDatabase(query, {video_id : video_id, view_count : view_count});
            
            res.json({message : "조회수 증가"});
        }
    }
    catch(err){
        res.status(500).json({message: "Server error"})
    }
    
})

router.post('/api/getMovieGenre', async function(req, res,next){
    try{

        const genre_query = 'select video_id from genre_view where video_genre_id = @video_genre_id';
        let video_genre_id = req.body.video_genre_id;
        const array = [];
        let video_id = 0;
        const get_query = 'select video_id, title, description, release_date, video_img_url from movie_view where video_id = @video_id';

        const result = await queryDatabase(genre_query, {video_genre_id : video_genre_id});
        for(let i = 0; i < result.length; i++){
            video_id = result[i].video_id;
            const result2 = await queryDatabase(get_query, {video_id : video_id});
            array.push(result2[0]);
        }
        
        req.array = array;
        next();
    }
    catch(err){
        res.status(404).json({message : "장르 찾을 수 없음"});
    }
}, async(req, res) => {
    try{
        let array = req.array;
        console.log(array);

        array = await getMovieImage(array);
        array = await getDate(array);

        res.json(array);
    }catch(err){
        res.status(500).json({message : "Server error"});
    }
}
)

router.get('/api/getMovieList', async(req, res) => {
    try{
          const query = 'SELECT DISTINCT  (video_id) video_id, video_img_url,release_date, view_count FROM movie_view;';

          let result = await queryDatabase(query, {});
     
          result = await getMovieImage(result);
          result = await getDate(result);

          const get_query = 'select * from genre_view';
          const genres = await queryDatabase(get_query, {});

          const mergedData = result.map(video => {
            const matchingGenres = genres.filter(genre => genre.video_id === video.video_id);
            return {
              video_id: video.video_id,
              video_img_url: video.video_img_url,
              release_date: video.release_date,
              view_count: video.view_count,
              genres: matchingGenres.map(genre => genre.genre_name),
            };
          });
            res.json(mergedData);
    }catch(err){
        console.log('이상하네');
        res.status(404).json({message : "영화 목록이 없습니다."});
    }
    

})

module.exports = router;

