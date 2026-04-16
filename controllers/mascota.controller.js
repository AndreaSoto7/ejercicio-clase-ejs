const { checkUser } = require("../middlewares/check-user");

module.exports = (app, db) => {
    mascotasGet =  async (req, res) => {
        const mascotas = await db.mascota.findAll();
        res.render('mascotas/list-mascota', { mascotas });
    };
    mascotaCreateGet = (req, res) => {
        res.render('mascotas/form-mascota', { mascota: null });
    };
    mascotaCreatePost = async (req, res) => {
        const { nombre, tipo } = req.body;
        const mascota = await db.mascota.create({
            nombre,
            tipo
        });
        res.redirect('/mascotas');
    };
    mascotaUpdateGet = async (req, res) => {
        const { id } = req.params;
        const mascota = await db.mascota.findByPk(id);
        res.render('mascotas/form-mascota', { mascota });
    };
    mascotaUpdatePost = async (req, res) => {
        const { id } = req.params;
        const { nombre, tipo } = req.body;
        const mascota = await db.mascota.findByPk(id);
        mascota.nombre = nombre;
        mascota.tipo = tipo;
        await mascota.save();
        res.redirect('/mascotas');
    };
    mascotaDelete = async (req, res) => {
        const { id } = req.params;
        const mascota = await db.mascota.findByPk(id);
        await mascota.destroy();
        res.redirect('/mascotas');
    };
}
