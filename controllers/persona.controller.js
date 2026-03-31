const { checkUser } = require("../middlewares/check-user");

module.exports = (app, db) => {
    app.get('/personas', checkUser, async (req, res) => {
        const personas = await db.persona.findAll();
        res.render('personas/list-persona', { personas });
    });
    app.get('/personas/create', checkUser, (req, res) => {
        res.render('personas/form-persona', { persona: null });
    });
    app.post('/personas/create', checkUser, async (req, res) => {
        const { nombre, apellido, edad, ciudad, fechaNacimiento } = req.body;
        const persona = await db.persona.create({
            nombre,
            apellido,
            edad,
            ciudad,
            fechaNacimiento
        });
        res.redirect('/personas');
    });
    app.get('/personas/:id', checkUser, async (req, res) => {
        const { id } = req.params;
        const persona = await db.persona.findByPk(id);
        res.render('personas/form-persona', { persona });
    });
    app.post('/personas/:id', checkUser, async (req, res) => {
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
    });
    app.post('/personas/:id/delete', checkUser, async (req, res) => {
        const { id } = req.params;
        const persona = await db.persona.findByPk(id);
        await persona.destroy();
        res.redirect('/personas');
    });
}