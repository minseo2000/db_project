// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.set('view engine', 'ejs');
const { dbConnection } = require('./routes/db');
app.use(bodyParser.json());
const login = require('./routes/login');
const sha = require('sha256');
const axios = require('axios');
const signup = require('./routes/signup');
const {queryDatabase} = require('./routes/db');
const {fetchSummonerData} = require('./routes/db');
const session = require('express-session'); 
const pgSession = require('connect-pg-simple')(session);


app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitiaziled: true,
}))

app.route('/login')
    .get(login)
    .post(login)

app.route('/register')
    .get((req, res) => {
    res.render('register.ejs');
    })
    .post((req, res) => {
    res.redirect('register');
    });

app.route('/signup')
    .post(signup)


app.get('/getId', async(req, res) => {
    try{
        const pool = await dbConnection;
        const result = await pool.request()
                .query('select id from userstate')
        res.json(result.recordset);
        
    }catch(err){
        res.status(500).send('Server error');
    }
})

app.post('/getinfo', async(req, res) => {
    try{
        const id = req.body.id;
        const LOLname = req.body.LOLname;
  
        const pool = await dbConnection;
        const result = await pool.request()
                .query('select LOLname, id from userstate')
        const index = result.recordset.findIndex(row => row.id == id);
        const LOLindex = result.recordset.findIndex(row => row.LOLname == LOLname);

        if(index != -1){
            res.status(400).json({message : '중복된 아이디입니다.'});
        }
        else if(LOLindex != -1){
            res.status(401).json({message : '중복된 닉네임입니다.'});
        }
        else{
            res.status(200).json({message : '중복되지 않습니디.'})
        }


    }catch(err){
        res.status(500).json({message : '입력값이 없습니다.'});
    }
})

app.get('/get-lol-data', async (req, res) => {
    try {
        const pool = await dbConnection;

        // 소환사 정보를 조회하는 쿼리를 실행합니다.
        const result = await pool.request()
            .query('SELECT LoLname, Tier, Wins, Losses, WinRate FROM lol_summoners'); // 적절한 테이블과 컬럼 이름으로 바꿔주세요.

        // 데이터베이스 연결을 해제합니다.

        // 조회 결과를 클라이언트에게 JSON 형식으로 전달합니다.
        res.json(result.recordset);
    } catch (err) {
        // 에러 처리
        console.error('Database query failed:', err);
        res.status(500).send('Server error');
    }
});


app.get('/login/main', (req, res) => {
    if(req.session && req.session.userId){
        const userInfo = req.session.userId;

        res.render('main.ejs',{
            userInfo,
        });
    }else{
        res.status(500).json({message : '로그인 하지 않았습니다.'});
    }
 
})

app.get('/logout', (req, res) =>{
    if(req.headers.cookie){
        const [, privatekey] = req.headers.cookie.split('=');
        const userInfo = session[privatekey];
        console.log(req.session);
        req.session.destroy((err) => {
            if(err){
                console.error(err);
                res.status(500).json({message : '서버 에러가 발생하였습니다.'});
            }else{
                res.setHeader('Set-Cookie', 'connect.id = delete;Max-age=0;path=/');
                console.log(req.session);
                res.render('login');
            }
        })
    }
    else{
        res.render('login');
    }
})
app.get('/searchUser', async(req, res) => {
    try{
        const LOLname = req.body.LOLname;
        const query = 'select LOLname, Tier, Wins, Losses, WinRate from lol_summoners where LOLname=@LOLname';
        const result = await queryDatabase(query, {LOLname});

        res.send(result);

        
    }
    catch(err){
        res.status(400).json({message : '존재하지 않는 사용자 정보입니다.'});
    }
})
app.get('/logout',function(req,res)
{
    res.redirect('/login');
})

app.listen(3000);

