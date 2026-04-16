const db = require("../models");

exports.getMascotaList = async () => {
    return await db.mascota.findAll();
}

exports.createMascota = async (nombre, tipo) => {
    return await db.mascota.create({
        nombre,
        tipo
    });
}

exports.getMascotaById = async (id) => {
    return await db.mascota.findByPk(id);
}

exports.updateMascota = async (id, nombre, tipo) => {
    const mascota = await this.getMascotaById(id);
    mascota.nombre = nombre;
    mascota.tipo = tipo;
    return await mascota.save();
}

exports.deleteMascota = async (id) => {
    const mascota = await this.getMascotaById(id);
    return await mascota.destroy();
}