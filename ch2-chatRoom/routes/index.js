const express = require('express');
const {isLoggedIn, isNotLoggedIn} = require("./middlewares");

const fs = require('fs');
const multer = require('multer');
const path = require('path');

const {Good, Auction, User } = require('../models');


const router = express.Router();

router.use((req, res, next) => {
    console.log('path : /, 이거는 받는다.');
    res.locals.user = req.user;
    next();
});

router.get('/', async (req, res, next) => {
    try {
        const goods = await Good.findAll({ where : { SoldId: null} });

        res.render('main', {
            title: 'NodeAuction',
            goods,
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.get('/join', isNotLoggedIn, (req, res, next) => {
    res.render('join', { title: '회원가입 - NodeAution', });
});

router.get('/good', isLoggedIn, (req, res, next) => {
    res.render('good', { title: '상품 등록 - nodeAuction' });
});

try {
    fs.readdirSync('uploads');
} catch (err) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destincation(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});

router.post('/good', isLoggedIn, upload.single('img'), async (req, res, next) => {
    try {
        const { name, price } = req.body;
        await Good.create({
            OwnerId: req.user.id,
            name,
            img: req.file.filename,
            price,
        });
    } catch(err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;