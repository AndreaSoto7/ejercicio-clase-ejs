const { checkUser } = require("../middlewares/check-user");

module.exports = (app, db) => {
    app.get('/mascotas', checkUser, async (req, res) => {
        const mascotas = await db.mascota.findAll();
        res.render('mascotas/list-mascota', { mascotas });
    });
    app.get('/mascotas/create', checkUser, (req, res) => {
        res.render('mascotas/form-mascota', { mascota: null });
    });
    app.post('/mascotas/create', checkUser, async (req, res) => {
        const { nombre, tipo } = req.body;
        const mascota = await db.mascota.create({
            nombre,
            tipo
        });
        res.redirect('/mascotas');
    });
    app.get('/mascotas/:id', checkUser, async (req, res) => {
        const { id } = req.params;
        const mascota = await db.mascota.findByPk(id);
        res.render('mascotas/form-mascota', { mascota });
    });
    app.post('/mascotas/:id', checkUser, async (req, res) => {
        const { id } = req.params;
        const { nombre, tipo } = req.body;
        const mascota = await db.mascota.findByPk(id);
        mascota.nombre = nombre;
        mascota.tipo = tipo;
        await mascota.save();
        res.redirect('/mascotas');
    });
    app.post('/mascotas/:id/delete', checkUser, async (req, res) => {
        const { id } = req.params;
        const mascota = await db.mascota.findByPk(id);
        await mascota.destroy();
        res.redirect('/mascotas');
    });
}
