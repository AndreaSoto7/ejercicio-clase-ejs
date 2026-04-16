const { checkUser } = require("../middlewares/check-user.js");

module.exports = app => {
    let router = require('express').Router();

    const controller = require('../controllers/mascota.controller');

    router.get('/', checkUser, controller.mascotasGet);
    router.get('/create', checkUser, controller.mascotaCreateGet);
    router.post('/create', checkUser, controller.mascotaCreatePost);
    router.get('/:id', checkUser, controller.mascotaUpdateGet);
    router.post('/:id', checkUser, controller.mascotaUpdatePost);
    router.post('/:id/delete', checkUser, controller.mascotaDelete);

    app.use('/mascotas', router);

}