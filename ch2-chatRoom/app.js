const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const nunjuncks = require('nunjucks');
const session = require('express-session');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');
const passport = require('passport');

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
app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/auth', authRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});