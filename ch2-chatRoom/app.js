const express = require('express');
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const nunjuncks = require('nunjucks');

const app = express();

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

app.use(morgan('dev'));
app.use(express.json);
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {

})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});