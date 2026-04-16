const { checkUser } = require("../middlewares/check-user");

    exports.personasGet = async (req, res) => {
        const personas = await db.persona.findAll();
        res.render('personas/list-persona', { personas });
    };
    exports.personaCreateGet = (req, res) => {
        res.render('personas/form-persona', { persona: null });
    };
    exports.personaCreatePost = async (req, res) => {
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        const persona = await db.persona.create({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        });
        res.redirect('/personas');
    };
    exports.personaUpdateGet = async (req, res) => {
        const { id } = req.params;
        const persona = await db.persona.findByPk(id);
        res.render('personas/form-persona', { persona });
    };
    exports.personaUpdatePost = async (req, res) => {
        const { id } = req.params;
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        const persona = await db.persona.findByPk(id);
        persona.nombre = nombre;
        persona.apellido = apellido;
        persona.edad = edad;
        persona.ciudad = ciudad;
        persona.fechaNacimiento = fechaNacimiento;
        await persona.save();
        res.redirect('/personas');
    };
    exports.personaDelete = async (req, res) => {
        const { id } = req.params;
        const persona = await db.persona.findByPk(id);
        await persona.destroy();
        res.redirect('/personas');
    };
    