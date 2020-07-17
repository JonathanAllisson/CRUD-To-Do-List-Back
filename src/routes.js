const express = require('express');

const routes = express.Router();

const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const sessionController = require('./controllers/sessionController');

routes.post('/', sessionController.login);
routes.get('/user', userController.index);
routes.post('/user', userController.create);
routes.get('/task', taskController.index);
routes.post('/task', taskController.create);

module.exports = routes;
