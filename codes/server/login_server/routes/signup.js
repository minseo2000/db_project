const express = require('express');
const app = express();
const router = express.Router();
const sha = require('sha256');
const {queryDatabase} = require('./db');

router.post('/signup', async(req, res, next) => {
    try{
        const user_id_c = req.body.user_id_c;
        let card_id = req.body.card_id;
        const pass_word = sha(req.body.pass_word);
        const ph_num = req.body.ph_num;
        const user_name = req.body.user_name;
        const birth_date = req.body.birth_date;
        const email = req.body.email;
        const service_grade = req.body.service_grade;
        
       
        const checkquery = 'select user_id_c, ph_num, email from user_table ';
        const checkresult = await queryDatabase(checkquery, {
            user_id_c : user_id_c,
            ph_num : ph_num,
            email : email
        })
        console.log(card_id)
        for(let i = 0; i < checkresult.length; i++){
            /*if(user_id == checkresult[i].user_id && ph_num == checkresult[i].ph_num && email == checkresult[i].email){
                res.status(400).json({message : '아이디, 휴대폰 번호, 유저 중복'});
                break;
            }
            else if(user_id == checkresult[i].user_id && email == checkresult[i].email){
                res.status(401).json({message : '아이디, 이메일 중복'});
                break;
            }
            else if(user_id == checkresult[i].user_id && ph_num == checkresult[i].ph_num){
                res.status(402).json({message : '아이디, 폰번호 중복'});
                break;
            }
            else if(ph_num == checkresult[i].ph_num && email == checkresult[i].email){
                res.status(403).json({message : '폰번호, 이메일 중복'})
                break;
            }*/
            if(user_id_c == checkresult[i].user_id_c){
                res.status(403).json({message : '아이디 중복'});
                break;
            }
            else if(ph_num == checkresult[i].ph_num){
                res.status(409).json({message : '폰번호 중복'});
                break;
            }
            else if(email == checkresult[i].email){
                res.status(423).json({message : '이메일 중복'});
                break;
            }
            else{
                res.status(200).json({message : '중복 없음'})
                break;
            }
        }
        
        if(card_id.length == 0){
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
        res.status(200);
        
    }
    catch(err){
        res.send(err);
    }
})


 


module.exports = router;