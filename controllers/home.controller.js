const { Op } = require("sequelize")
const { checkUser } = require("../middlewares/check-user")

module.exports = (app, db) => {

    app.get('/', (req, res) => {
        res.send('Hello World!')

    })
    app.get('/hello', (req, res) => {
        res.sendFile(__dirname + '/../hello.html')
    })

    app.get('/hello-ejs', (req, res) => {
        res.render('prueba-ejs', { name: 'Juan', lastName: 'Perez' });
    });
    app.get('/form', (req, res) => {
        res.render('form-ejemplo');
    });
    app.post('/form-submit', (req, res) => {
        const { name, lastName } = req.body;
        res.render('prueba-ejs', { name, lastName });
    });
    app.get('/search', checkUser, async (req, res) => {
        const { q } = req.query;
        const personas = await db.persona.findAll({
            where: {
                [Op.or]: [
                    {
                        nombre: {
                            [Op.like]: `%${q}%`
                        }
                    },
                    {
                        apellido: {
                            [Op.like]: `%${q}%`
                        }
                    }
                ]
            }
        });
        res.render('personas/list-persona', { personas });
    });
}