const express = require('express');
const app = express();
const router = express.Router();
const {dbConnection} = require('./db');
const sha = require('sha256');
const {queryDatabase} = require('./db');
const express_session = require('express-session')
const MemoryStore = express_session.MemoryStore;
const sessionStore = new MemoryStore();

router.use(express_session({
    secret : 'zsmoqemdqwo',
    resave : false,
    saveUninitialized: true,
    store:sessionStore,
}))




/*
router.post('/login', async(req, res) => {
    const id = req.body.id;
    const password = sha(req.body.password);
    const query = 'select  password from userstate where id = @id';
   
    try{
        const result = await queryDatabase(query, {id});
        if(result[0] != undefined){
            if (password == result[0].password) {   

                req.session.userId = id;
                req.session.save();
                res.status(200).json({message : '로그인 성공하였습니다.'});
            } else {
                res.status(400).json({message : '사용자의 비밀번호가 일치하지 않습니다.'});
                console.log('비밀번호 불일치');
            }
        }
        
        else{
            res.status(401).json({message : '사용자의 아이디가 존재하지 않습니다.'});
            console.log('아이디 없음');
        }
    }
    catch(err){
        res.status(500).json({message : '서버 오류가 발생하였습니다.'});
        console.log(err);
    }
});
*/



module.exports = router;