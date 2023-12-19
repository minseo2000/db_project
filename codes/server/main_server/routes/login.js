const express = require('express');
const router = express.Router();
const sha = require('sha256');
const queryDatabase = require('./db');
const jwt = require('jsonwebtoken');
const isAdmin = require('./User');

router.post('/api/login', async(req, res) => {

    try{
        const user_id_c = req.body.user_id_c;
        const pass_word = sha(req.body.pass_word);
        const selectUser = 'select  pass_word from user_table where user_id_c = @user_id_c';
        const result = await queryDatabase(selectUser, {user_id_c});
        if(result[0] != undefined){
            if (pass_word == result[0].pass_word){   
                const result = await getToken(user_id_c);
                res.status(200).json({message : '로그인 성공하였습니다.', token : result});
            } else {
                res.status(400).json({message : '사용자의 비밀번호가 일치하지 않습니다.'});
            }
        }
        
        else{
            res.status(401).json({message : '사용자의 아이디가 존재하지 않습니다.'});
        }
    }
    catch(err){
        res.status(500).json({message : '서버 오류가 발생하였습니다.'});
        console.log(err);
    }
});

async function getToken(user_id_c){
    try{
        const token = await jwt.sign({ user_id_c : user_id_c}, process.env.SECRET_KEY);
        return token;
    }
    catch{
        console.error(error);
        throw error
    }
}

module.exports = router;