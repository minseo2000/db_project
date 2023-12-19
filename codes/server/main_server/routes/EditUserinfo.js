const express = require('express');
const router = express.Router();
const queryDatabase = require('./db.js')
const {checkCardID} = require('./checkOverlap');
const {checkPhoneNumber} = require('./checkOverlap');
const {checkPassword} = require('./checkOverlap');
const {checkEmail} = require('./checkOverlap.js');
const DecodedToken = require('./DecodedToken');

router.post('/api/editEmail', checkEmail, async(req, res) => {
    try{
        const email = req.email;
        const user_id_c = req.user_id_c;
        const query = 'UPDATE user_table SET email = @email WHERE user_id_c = @user_id_c';
        
        const result = await queryDatabase(query, {
            email : email,
            user_id_c : user_id_c   
        })
        res.json({message : '이메일 수정 완료'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Server error"});
    }

});

router.post('/api/editPassword',checkPassword, async function(req, res){
    try{
        const pass_word = req.pass_word;
        const user_id_c = req.user_id_c;

        const query = 'UPDATE user_table SET pass_word = @pass_word WHERE user_id_c = @user_id_c';
        const result = await queryDatabase(query, {
            pass_word : pass_word,
            user_id_c : user_id_c
        })
        res.json({message : '비밀번호 수정 완료'});               
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Server error"});
    }   
});

router.post('/api/editPhoneNumber',checkPhoneNumber,async function(req, res){
    try{
        const ph_num = req.ph_num;
        const user_id_c = req.user_id_c;
        const query = 'UPDATE user_table SET ph_num = @ph_num WHERE user_id_c = @user_id_c';
        const result = await queryDatabase(query, {
            ph_num : ph_num,
            user_id_c : user_id_c
        })
        res.json({message : '휴대폰 번호 수정 완료'});               
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Server error"});
    }   

});

router.post('/api/getUserInfo', async(req, res) => {
    try{
        const token = req.body.token;
        const user_id_c = await DecodedToken(token);
        const query = 'select * from user_table where user_id_c = @user_id_c';
        const result = await queryDatabase(query, {
            user_id_c : user_id_c
        });
        res.json({data : result});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Server error"})
    }
})

router.post('/api/editCardID',checkCardID, async function(req, res){
    try{
        const card_id = req.card_id;
        const user_id_c = req.user_id_c;
        const get_query = 'select birth_date from user_table where user_id_c = @user_id_c';
        
        const get_result = await queryDatabase(get_query, {user_id_c : user_id_c});
        let birth_date = get_result[0].birth_date;

        birth_date = new Date(birth_date);
        birth_date = birth_date.toISOString();
        birth_date = birth_date.substring(0, birth_date.indexOf("T"));
        console.log(birth_date);

        const query = 'DELETE FROM user_table WHERE birth_date = @birth_date; \
        DELETE FROM card_table WHERE birth_date = @birth_date;\
        INSERT INTO card_table (card_id, birth_date) VALUES (@card_id, @birth_date);\
        INSERT INTO user_table (card_id, birth_date) VALUES (@card_id, @birth_date);';
        const result = await queryDatabase(query, {
            card_id : card_id,
            birth_date : birth_date
        })
        res.json({message : '카드 정보 수정 완료'});               
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : "Server error"});
    }   
})


/*router.post('/editServiceGrade', async function(req, res){
    try{
        const pass_word = req.body.pass_word;
        const token = req.body.token;
        const user_id_c = await DecodedToken(token);
        const query = 'UPDATE user_table SET pass_word = @pass_word WHERE user_id_c = @user_id_c';
        const result = await queryDatabase(query, {
            pass_word : pass_word,
            user_id_c : user_id_c
        })
        res.json({message : '비밀번호 수정 완료'});               
    }
    catch(err){
        res.status(500).message({message : "Server error"});
    }   
})*/

module.exports =router;