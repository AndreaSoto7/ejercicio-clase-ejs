module.exports = (app, db) => {
    require('./home.controller')(app, db);
    require('./persona.controller')(app, db);
    require('./mascota.controller')(app, db);
    require('./auth.controller')(app, db);
}