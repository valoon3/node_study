const express = require('express');

const app = express();
const postRouter = require('./routes/post');

app.use('post', postRouter)

app
    .get('/', (req, res) => {
        res.send('hello express');
    })
    .get('/', (req, res) => {
        res.send('hello api');
    })


    .listen(3065, () => {
        console.log('서버 실행 중');
    });