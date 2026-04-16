const { Op } = require("sequelize");
const db = require("../models");

exports.searchPersonas = async (query) => {
    return await db.persona.findAll({
        where: {
            [Op.or]: [
                {
                    nombre: { [Op.like]: `%${query}%` }
                },
                {  
                    apellido: { [Op.like]: `%${query}%` }
                }
            ]
        }
    });
}