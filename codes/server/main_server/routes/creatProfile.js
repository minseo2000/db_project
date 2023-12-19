const express = require('express');
const  queryDatabase  = require('./db');
const router = express.Router();


router.post('/api/createProfile', async(req, res) => {
    try{
        const nickname = req.body.nickname;
    const profile_img_url = req.body.profile_img_url;
    //profile_img_url 은 파일서버에서 사진 가지고 올 예정
    const query = 'insert into profile(profile_img_url, nickname) VALUES (@profile_img_url, @nickname)';
    const result = await queryDatabase(query, {
        profile_img_url : profile_img_url,
        nickname : nickname
    });
    res.json({message : '프로필 생성 완료'});
    }
    catch(err){
        res.status(500).json({message : '서버 오류'});
    }

})

router.get('/api/getImages', async(req, res) => {
    //img가 아직 존재하지 않아서 알고리즘만 짜놓음
    try{
        const query = 'select prodile_img_url from profile_img_url';
        const result = await queryDatabase(query, {});
        res.json(result);
    }
    catch{
        res.status(500).json({message : '이미지 목록 전송 실패'});
    }
})

