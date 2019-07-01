const router = require('express').Router;
const garageRoutes = require('./garage');

function construct(app) {

    app.use('/login', () => {
        res.json({'message': 'ok'});
    });
    app.use('/garage', garageRoutes);
    app.use('*', (_req, res) => {
        res.status(404).json({'message': 'Not Found'});
    });

}

module.exports = construct;