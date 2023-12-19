const express = require('express');
const app = express();
const path = require('path');
const signup = require('./routes/signup')
const login = require('./routes/login')
const cors = require('cors');
const morgan = require('morgan');
const EditUserinfo = require('./routes/EditUserinfo');
require('dotenv').config();
const checkOverlap = require('./routes/checkOverlap');
const port = process.env.PORT;
const queryDatabase = require('./routes/db');
const movie = require('./routes/movie');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/build')));
app.use(morgan('dev'));

app.use(login);
app.use(signup);
app.use(EditUserinfo);
app.use(movie);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'))
});


app.listen(port, (req, res) => {
    console.log(`${port}번호에서 서버 실행중`);
});