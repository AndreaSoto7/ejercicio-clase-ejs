const { checkUser } = require("../middlewares/check-user");
const db = require("../models");

    exports.mascotasGet =  async (req, res) => {
        const mascotas = await db.mascota.findAll();
        res.render('mascotas/list-mascota', { mascotas });
    };
    exports.mascotaCreateGet = (req, res) => {
        res.render('mascotas/form-mascota', { mascota: null });
    };
    exports.mascotaCreatePost = async (req, res) => {
        const { nombre, tipo } = req.body;
        const mascota = await db.mascota.create({
            nombre,
            tipo
        });
        res.redirect('/mascotas');
    };
    exports.mascotaUpdateGet = async (req, res) => {
        const { id } = req.params;
        const mascota = await db.mascota.findByPk(id);
        res.render('mascotas/form-mascota', { mascota });
    };
    exports.mascotaUpdatePost = async (req, res) => {
        const { id } = req.params;
        const { nombre, tipo } = req.body;
        const mascota = await db.mascota.findByPk(id);
        mascota.nombre = nombre;
        mascota.tipo = tipo;
        await mascota.save();
        res.redirect('/mascotas');
    };
    exports.mascotaDelete = async (req, res) => {
        const { id } = req.params;
        const mascota = await db.mascota.findByPk(id);
        await mascota.destroy();
        res.redirect('/mascotas');
    };
    