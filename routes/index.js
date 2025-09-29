const routes = require('express').Router();

const myController = require('../controllers');

routes.get('/', myController.personFunction);


module.exports = routes;