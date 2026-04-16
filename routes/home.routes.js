const { checkUser } = require("../middlewares/check-user.js");

module.exports = app => {
    let router = require('express').Router();

    const controller = require('../controllers/home.controller');

    router.get('/', controller.home);
    router.get('/hello', controller.helloGet);
    router.get('/hello-ejs', controller.helloEjs);
    router.get('/form', controller.formGet);
    router.post('/form-submit', controller.formPost);
    router.get('/search', controller.search);

    app.use('/', router);

}