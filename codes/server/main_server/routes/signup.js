const express = require('express');
const app = express();
const router = express.Router();
const sha = require('sha256');
const queryDatabase = require('./db');

router.post('/api/signup', async(req, res, next) => {
    try{
        const user_id_c = req.body.user_id_c;
        let card_id = req.body.card_id;
        const pass_word = sha(req.body.pass_word);
        const ph_num = req.body.ph_num;
        const user_name = req.body.user_name; //실명
        const birth_date = req.body.birth_date; //생일
        const email = req.body.email; //이메일
        const service_grade = req.body.service_grade;
        let isOverlap = false; 
        
       
        const checkquery = 'select user_id_c, ph_num, email from user_table ';
        const checkresult = await queryDatabase(checkquery, {
            user_id_c : user_id_c,
            ph_num : ph_num,
            email : email,
            card_id : card_id
        })
        
        for(let i = 0; i < checkresult.length; i++){//주옥 확인
            if(user_id_c == checkresult[i].user_id_c){
                res.status(403).json({message : '아이디 중복'});
                isOverlap = true;
                break;
            }
            else if(ph_num == checkresult[i].ph_num){
                res.status(409).json({message : '폰번호 중복'});
                isOverlap = true;
                break;
            }
            else if(email == checkresult[i].email){
                res.status(423).json({message : '이메일 중복'});
                isOverlap = true;
                break;
            }
            else if(card_id == checkresult[i].card_id){
                res.status(402).json({message : "카드번호 중복"});
                isOverlap = true;
                break;
            }
        }
        if(isOverlap == false){
            if(card_id.length == 0 | card_id == undefined){
                let query = 'insert into card_table (card_id, birth_date) VALUES (@card_id, @birth_date)';
                card_id = Math.floor(Math.random()*(100000));
                await queryDatabase(query, {
                    card_id : card_id,
                    birth_date : birth_date
                })
            }
    
            else{
                let query = 'insert into card_table (card_id, birth_date) VALUES (@card_id, @birth_date)';
                await queryDatabase(query, {
                    card_id : card_id,
                    birth_date : birth_date
                })
            }
            
            
            const query = 'insert into user_table (user_id_c,card_id,pass_word, ph_num, user_name, birth_date, email,service_grade)\
                    VALUES(@user_id_c,@card_id, @pass_word, @ph_num, @user_name, @birth_date, @email, @service_grade)'
    
            const result = await queryDatabase(query, {
                user_id_c : user_id_c,
                card_id : card_id,
                pass_word : pass_word,
                ph_num : ph_num,
                user_name : user_name,
                birth_date : birth_date,
                email : email,
                service_grade : service_grade
            })
            console.log('성공');
            res.json({message : '회원가입 성공'});
            
        }
    }
        
    catch(err){
        console.log(err);
        res.json({message : '서버 오류 발생'});
    }
})


module.exports = router;