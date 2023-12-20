const express = require('express');
const  queryDatabase  = require('./db');
const router = express.Router();
const DecodedToken = require('./DecodedToken');
const {getProfileImage} = require('./Movieurl');
const {checkProfileinfo} = require('./checkfunction')


router.post('/api/createProfile', checkProfileImage, async(req, res) => {
    try{
        const nickname = req.nickname;
        let profile_image_url = req.profile_image_url;
        const token = req.token;
        const original_profile = req.original_profile;


        const user_id_c = await DecodedToken(token);
        const id_query = 'select user_id from user_table where user_id_c = @user_id_c';

        const id_result = await queryDatabase(id_query, {user_id_c : user_id_c});
        const user_id = id_result[0].user_id;

        const Overlap = await checkProfileinfo('nickname', nickname);

        if(Overlap == true){
            res.status(400).json({message : "닉네임 중복"});

        }else{
            const query = 'insert into profile(profile_img_url, nickname, user_id) VALUES (@profile_img_url, @nickname, @user_id)';

            const result = await queryDatabase(query, {
            profile_img_url : profile_image_url,
            nickname : nickname,
            user_id : user_id
            });

            //image_id, profile_id 값 불러오기
            const get_profile_id = 'select profile_id from profile where nickname = @nickname';
            const profile_result = await queryDatabase(get_profile_id, {nickname : nickname});
            const profile_id = profile_result[0].profile_id;

            

            const get_image_id = 'select profile_image_id from profile_image_table where profile_image_url = @profile_image_url';
            const image_result = await queryDatabase(get_image_id, {profile_image_url : original_profile});
            
            
            const profile_image_id = image_result[0].profile_image_id;
            //view에 저장
            const relation_query = 'insert into profile_image_relation(profile_id, profile_image_id) VALUES (@profile_id, @profile_image_id)';
            await queryDatabase(relation_query, {profile_image_id : profile_image_id, profile_id : profile_id});

            res.json({message : '프로필 생성 완료'});
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({message : '서버 오류'});
    }

})

router.get('/api/getImages', async(req, res) => {
    
    try{
        const query = 'select profile_image_url from profile_image_table';
        let result = await queryDatabase(query, {});
        result = getProfileImage(result);
        res.json(result);
    }
    catch{
        res.status(500).json({message : '이미지 목록 전송 실패'});
    }
})

router.post('/api/EditProfile', async(req, res, next) => {
    try{
        const nickname = req.body.nickname;
        let profile_img_url = req.body.profile_img_url;
        const profile_id = req.body.profile_id;

        profile_img_url = "http://minseotest.iptime.org:50011/" + profile_img_url;

        const query = 'UPDATE profile SET nickname = @nickname, profile_img_url = @profile_img_url where profile_id = @profile_id';
        const reuslt = await queryDatabase(query, {nickname : nickname, profile_img_url : profile_img_url, profile_id : profile_id});
        res.json({message : "프로필 수정 성공"});
    }
    catch{
        res.status(500).json({message : "Server error"});
    }
});

router.post('/api/getProfileDetail', async(req, res) => { // 기존 프로필 정보
    try{
        const profile_id = req.body.profile_id;
        if(profile_id == undefined){
            res.status(404).json({message : '프로필 아이디 정보가 없음'});
        }
        else{
            const query = 'select profile_img_url, nickname from profile where profile_id = @profile_id';
            const result = await queryDatabase(query, {profile_id : profile_id});
        
            res.json(result);
        }
    }
    catch(err){
        res.status(500).json({message : "Server error"});
    }
})

router.post('/api/getProfileList', async(req, res) => {//로그인시 프로필 리스트
    try{
        const token = req.body.token;
        const user_id_c = await DecodedToken(token);
        
        const id_query = 'select user_id from user_table where user_id_c = @user_id_c';
        const id_result = await queryDatabase(id_query, {user_id_c : user_id_c});
        const user_id = id_result[0].user_id;

        if(id_result != undefined | id_result.length != 0){
            const query = 'select * from profile where user_id = @user_id';
            let result = await queryDatabase(query, {user_id : user_id});

            res.json(result);
        }
        else{
            res.status(404).json({message : '프로필 생성 필요'});
        }
        
        
    }
    catch(err){
        res.status(500).json({message : "Server error"});
    }
})


router.post('/api/DeleteProfile', async(req, res)  => {
    try{
        const profile_id = req.body.profile_id;
        const check_query = 'select * from profile where profile_id = @profile_id';
        const query = "delete from profile where profile_id = @profile_id";
        const delete_query = 'delete from profile_image_relation where profile_id = @profile_id'

        const result = await queryDatabase(check_query, {profile_id : profile_id});
        
        if(result.length == 0 | result == undefined){
            res.status(404).json({message : "존재하지 않는 프로필 아이디"});
        }

        else{
            await queryDatabase(query, {profile_id : profile_id});
            await queryDatabase(delete_query, {profile_id : profile_id});
            
            res.json({message : "프로필 삭제 성공"})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Server error"});
    }
})

async function checkProfileImage(req, res, next){
    try{
        const nickname = req.body.nickname;
    let profile_image_url = req.body.profile_image_url;
    const token = req.body.token;

    if(profile_image_url == undefined){

        const random_query = 'select profile_image_url from profile_image_table';
        const random_result = await queryDatabase(random_query, {});

        const original_profile = random_result[0].profile_image_url;
        //url 붙이기 전

        profile_image_url = await getProfileImage(random_result);
        profile_image_url = profile_image_url[0].profile_image_url;

        req.nickname = nickname;
        req.profile_image_url = profile_image_url;
        req.original_profile = original_profile;
        req.token = token;
        next()

    }
    else{
        req.nickname = nickname;
        req.token = token;
        req.profile_image_url = profile_image_url;

        next();
    }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Server error"});
    }
}
module.exports = router;