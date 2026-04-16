const { checkUser } = require("../middlewares/check-user");
const { getMascotaList, createMascota, getMascotaById, updateMascota } = require("../services/mascotas.service");


    exports.mascotasGet =  async (req, res) => {
        const mascotas = await getMascotaList()
        res.render('mascotas/list-mascota', { mascotas });
    };
    exports.mascotaCreateGet = (req, res) => {
        res.render('mascotas/form-mascota', { mascota: null });
    };
    exports.mascotaCreatePost = async (req, res) => {
        const { nombre, tipo } = req.body;
        const mascota = await createMascota(nombre, tipo);
        res.redirect('/mascotas');
    };
    exports.mascotaUpdateGet = async (req, res) => {
        const { id } = req.params;
        const mascota = await getMascotaById(id);
        res.render('mascotas/form-mascota', { mascota });
    };
    exports.mascotaUpdatePost = async (req, res) => {
        const { id } = req.params;
        const { nombre, tipo } = req.body;
        const mascota = await updateMascota(id, nombre, tipo);
        res.redirect('/mascotas');
    };
    exports.mascotaDelete = async (req, res) => {
        const { id } = req.params;
        await deleteMascota(id);
        res.redirect('/mascotas');
    };
    