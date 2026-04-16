const { checkUser } = require("../middlewares/check-user.js");

module.exports = app => {
    let router = require('express').Router();

    const controller = require('../controllers/auth.controller');

    router.get('/login', controller.loginGet);
    router.post('/login', controller.loginPost);
    router.get('/register', controller.registerGet);
    router.post('/register', controller.registerPost);
    router.get('/logout', checkUser, controller.logoutPost);

    app.use('/auth', router);

}