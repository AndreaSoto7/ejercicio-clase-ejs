const { Op } = require("sequelize")
const { checkUser } = require("../middlewares/check-user")

module.exports = (app, db) => {

    home = (req, res) => {
        res.send('Hello World!')
    };
    helloGet = (req, res) => {
        res.sendFile(__dirname + '/../hello.html')
    };

    helloEjs = (req, res) => {
        res.render('prueba-ejs', { name: 'Juan', lastName: 'Perez' });
    };
    formGet = (req, res) => {
        res.render('form-ejemplo');
    };
    formPost = (req, res) => {
        const { name, lastName } = req.body;
        res.render('prueba-ejs', { name, lastName });
    };
    search =  async (req, res) => {
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
    };
}