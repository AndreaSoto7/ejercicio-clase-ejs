const { sha1Encode } = require("../utils/text.utils");

module.exports = (app, db) => {

    app.get('/login', (req, res) => {
        res.render('auth/form-login');
    });
    app.post('/login', async (req, res) => {
        const { email, password } = req.body;
        const usuario = await db.usuario.findOne({
            where: {
                email
            }
        });
        if (!usuario) {
            return res.render('auth/form-login', { error: 'Usuario o contraseña incorrectas' });
        }
        const encodedPassword = sha1Encode(password);

        if (encodedPassword !== usuario.password) {
            return res.render('auth/form-login', { error: 'Usuario o contraseña incorrectas' });
        }
        req.session.user = {
            id: usuario.id,
            email: usuario.email
        }
        res.redirect('/personas');
    });
    app.get('/register', (req, res) => {
        res.render('auth/form-register');
    });
    app.post('/register', async (req, res) => {
        const { email, password, nombreCompleto } = req.body;
        const existingUser = await db.usuario.findOne({
            where: {
                email
            }
        });
        if (existingUser) {
            return res.render('auth/form-register', { error: 'El email ya está registrado' });
        }
        const encodedPassword = sha1Encode(password);
        await db.usuario.create({
            email,
            password: encodedPassword,
            nombreCompleto
        });
        res.redirect('/login');
    });
    app.get('/logout', (req, res) => {
        req.session.user = null;
        res.redirect('/login');
    });
}