const { sha1Encode } = require("../utils/text.utils");
const { findUserByEmail, createUser } = require("../services/auth.service");

    exports.loginGet = (req, res) => {
        res.render('auth/form-login');
    };
    exports.loginPost = async (req, res) => {
        const { email, password } = req.body;
        const usuario = await findUserByEmail(email);
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
    };
    exports.registerGet = (req, res) => {
        res.render('auth/form-register');
    };
    exports.registerPost = async (req, res) => {
        const { email, password, nombreCompleto } = req.body;
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.render('auth/form-register', { error: 'El email ya está registrado' });
        }
        const encodedPassword = sha1Encode(password);
        await createUser(email, encodedPassword, nombreCompleto);
        res.redirect('/login');
    };
    exports.logoutPost = (req, res) => {
        req.session.user = null;
        res.redirect('/login');
    };
    