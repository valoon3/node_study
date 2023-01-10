const http = require('http');

http.createServer((req, res) => {
    console.log(req.url, res.method);
    res.end('hello node');
})
    .listen(3065, () => {
        console.log('서버 실행 중');
    });