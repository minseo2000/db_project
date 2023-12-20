const DecodedToken = require('./DecodedToken');
const queryDatabase = require('./db');
const {checkUserinfo} = require('./checkfunction');
const sha = require('sha256');


exports.checkEmail = async function(req, res, next){
    try{
        const token = req.body.token;
        const email = req.body.email;
        const user_id_c = await DecodedToken(token);
        const get_query = 'select email from user_table where user_id_c = @user_id_c';
        const checkresult = await checkUserinfo('email', email);
        const result = await queryDatabase(get_query, {
            user_id_c : user_id_c
        })
        console.log(checkresult);
        if(result[0].email == email){
            res.status(401).json({message : "기존과 같은 이메일"})
        }
        else if(email == '' | email == undefined){
            res.status(402).json({message : "공백 입력"});
        }
        else if(checkresult == true){
            res.status(403).json({message : "사용중인 이메일"});
        }
        else{
            req.email = email;
            req.user_id_c = user_id_c;
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'server error'});
    }
}


exports.checkPassword = async function(req, res,next){
    try{
        const token = req.body.token;
        const pass_word = sha(req.body.pass_word);
        const user_id_c = await DecodedToken(token);
        const get_query = 'select pass_word from user_table where user_id_c = @user_id_c';
        const result = await queryDatabase(get_query, {
            user_id_c : user_id_c
        })

        if(result[0].pass_word == pass_word){
            res.status(401).json({message : "기존과 같은 비밀번호"});
        }
        else if(pass_word == '' | pass_word == undefined){
            res.status(402).json({message : "공백 입력"});
        }
        else{
            req.user_id_c = user_id_c;
            req.pass_word = pass_word;
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'server error'});
    }
}


exports.checkPhoneNumber = async function (req, res, next){
    try{
        const token = req.body.token;
        const ph_num = req.body.ph_num;
        const user_id_c = await DecodedToken(token); // 복호화
        const get_query = 'select ph_num from user_table where user_id_c = @user_id_c'; //휴대폰 번호 가져온다.
        
        const checkresult = await checkUserinfo('ph_num', ph_num); // 중복결과 출력

        const result = await queryDatabase(get_query, {
            user_id_c : user_id_c
        })
        
        console.log(ph_num);

        if(result[0].ph_num == ph_num){
            res.status(401).json({message : "기존과 같은 휴대폰 번호"})
        }
        else if(ph_num == '' | ph_num == undefined){
            res.status(402).json({message : "공백 입력"});
        }
        else if(checkresult == true){
            res.status(403).json({message : '사용중인 휴대폰 번호'});
        }
        else{
            console.log('next')
            req.user_id_c = user_id_c;
            req.ph_num = ph_num;
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'server error'});
    }
}

exports.checkCardID = async function (req, res, next){
    try{
        const token = req.body.token;
        const card_id = req.body.card_id;
        console.log(token, card_id);
        const user_id_c = await DecodedToken(token);
        let isOverlap = await checkUserinfo('card_id', card_id);

        const get_query = 'select card_id from user_table where user_id_c = @user_id_c';
        const result = await queryDatabase(get_query, {
            user_id_c : user_id_c
        })
        
        
        if(result[0].card_id === card_id){
            res.status(401).json({message : "기존과 같은 카드 번호"})
        }
        else if(isOverlap == true){
            res.status(403).json({message : "사용중인 카드 번호 입니다."})
        }
        else if(card_id == '' | card_id == undefined){
            res.status(402).json({message : "공백 입력"});
        }
        else{
            req.user_id_c = user_id_c;
            req.card_id = card_id;
            next();
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'server error'});
    }

}

exports.checkDeletePassword = async function(req, res, next){
    try{
        const token = req.body.token;
        const pass_word = sha(req.body.pass_word);
        const user_id_c = await DecodedToken(token);

        
        const pw_query = 'select pass_word from user_table where user_id_c = @user_id_c';
        const pw_result = await queryDatabase(pw_query, {user_id_c : user_id_c});
        
        if(pw_result[0].pass_word == pass_word){
            req.user_id_c = user_id_c;
            next();
        }
        else{
            res.status(403).message({message : "사용자의 비밀번호가 일치하지 않습니다."});
        }


    }catch(err){
        res.status(500).json({message : "Server error"});
    }
}

/*
router.post('/checkCardID', async(req, res) =>{
    try{
        const token = req.body.token;
        const card_id = req.body.card_id;
        const user_id_c = await DecodedToken(token);

        const get_query = 'select card_id from user_table where user_id_c = @user_id_c';
        const result = await queryDatabase(get_query, {
            user_id_c : user_id_c
        })

        if(result[0].card_id === card_id){
            res.status(401).json({message : "기존과 같은 카드 번호"})
        }
        else if(card_id == '' | card_id == undefined){
            res.status(402).json({message : "공백 입력"});
        }
        else{
            res.json({message : '증복 없음'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'server error'});
    }
})*/