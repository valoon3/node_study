const SocketIO = require('soket.io');
const WebSocket = require('ws');

module.exports = (server) => {
    // wss 에 이벤트 리스너 붙이기
    const wss = new WebSocket.Server({ server });

    const io = SocketIO(server, {path: '/socket.io'});

    wss.on('connection', (socket) => { // 웹 소켓 연결 시
        // 익스프레스 서버와 연결한 후, 웹 소켓 객체 (ws)에 이벤트 리스너 message, error, close 를 연결
        const req = socket.request;
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('새로운 클라이언트 접속', ip, socket.id, req.ip);

        // ws.on('message', (message) => { // 클라이언트로부터 메시지 수신 시
        //     console.log(message.toString());
        // });
        // ws.on('error', err => {
        //     console.error(err)
        // });
        // ws.on('close', () => {
        //     console.log('클라이언트 접속 해제', ip);
        //     // close 이벤트에서 clearInterval 에서 setInterval을 정리해주지 않는다면 메모리 누수가 발생한다.
        //     clearInterval(ws.interval);
        // });
        //
        // ws.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전소
        //     if(ws.readyState === ws.OPEN) {
        //         ws.send('서버에서 클라이언트로 메시지를 보냅니다.');
        //     }
        // }, 3000);

        socket.on('disconnet', () => {// 연결 종료 시
            console.log('클라이언트 접속 해제', ip, socket.id);
            clearInterval(socket.interval);
        });
        socket.on('error', (error) => {// 에러 시
            console.error(error);
        });
        socket.on('reply', data => { // 클라이언트로부터 메시지 수신 시
            console.log(data);
        })
        socket.interval = setInterval(() => { // 3초마다 클라이언트로 메시지 전송
            socket.emit('news', 'HelLO Socket.IO');
        }, 3000);
    });

}