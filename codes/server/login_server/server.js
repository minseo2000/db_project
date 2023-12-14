const express = require('express');
const app = express();
const path = require('path');
const signup = require('./routes/signup')
const login = require('./routes/login')
const port = 50030;

const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/build')));

app.use(login);
app.use(signup);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.listen(port, (req, res) => {
    console.log(`${port}번호에서 서버 실행중`);
});