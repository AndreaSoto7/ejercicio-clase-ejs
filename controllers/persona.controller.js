const { checkUser } = require("../middlewares/check-user");
const { getPersonaList, createPersona, getPersonaById, updatePersona } = require("../services/personas.service");

    exports.personasGet = async (req, res) => {
        const personas = await getPersonaList()
        res.render('personas/list-persona', { personas });
    };
    exports.personaCreateGet = (req, res) => {
        res.render('personas/form-persona', { persona: null });
    };
    exports.personaCreatePost = async (req, res) => {
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        const persona = await createPersona(nombre, apellido, edad, ciudad, fechaNacimiento);
        res.redirect('/personas');
    };
    exports.personaUpdateGet = async (req, res) => {
        const { id } = req.params;
        const persona = await await getPersonaById(id);
        res.render('personas/form-persona', { persona });
    };
    exports.personaUpdatePost = async (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        const persona = await updatePersona(id, nombre, apellido, edad, ciudad, fechaNacimiento);
        res.redirect('/personas');
    };
    exports.personaDelete = async (req, res) => {
        const { id } = req.params;
        await deletePersona(id);
        res.redirect('/personas');
    };
    