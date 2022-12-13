const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const nunjuncks = require('nunjucks');
const session = require('express-session');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');

const app = express();
// const passportConfig = require('./passport/index');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

passportConfig();
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html'); // 템플릿엔진 설정
nunjuncks.configure('views', {
    express: app,
    watch: true,
});

sequelize.sync({ force: true })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    })

const sessionMiddleware = session({
    resave: false,
    saveuninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use(indexRouter);
// app.use('/auth', authRouter);

// 에러처리
app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});