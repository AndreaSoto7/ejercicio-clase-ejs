const { Op } = require("sequelize")
const db = require("../models");

    exports.home = (req, res) => {
        res.send('Hello World!')
    };
    exports.helloGet = (req, res) => {
        res.sendFile(__dirname + '/../hello.html')
    };

    exports.helloEjs = (req, res) => {
        res.render('prueba-ejs', { name: 'Juan', lastName: 'Perez' });
    };
    exports.formGet = (req, res) => {
        res.render('form-ejemplo');
    };
    exports.formPost = (req, res) => {
        const { name, lastName } = req.body;
        res.render('prueba-ejs', { name, lastName });
    };
    exports.search = async(req, res) => {
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