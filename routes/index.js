module.exports = app => {
    require('./home.routes')(app);
    require('./auth.routes')(app);
    require('./persona.route')(app);
    require('./mascota.route')(app);    
}