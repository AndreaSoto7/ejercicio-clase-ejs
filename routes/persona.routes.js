const { checkUser } = require("../middlewares/check-user.js");

module.exports = app => {
    let router = require('express').Router();
    const controller = require('../controllers/persona.controller.js');

    router.get('/', checkUser, controller.personasGet);
    router.get('/create', checkUser, controller.personaCreateGet);
    router.post('/create', checkUser, controller.personaCreatePost);
    router.get('/:id', checkUser, controller.personaUpdateGet);
    router.post('/:id', checkUser, controller.personaUpdatePost);
    router.post('/:id/delete', checkUser, controller.personaDelete);

    app.use('/personas', router);

}