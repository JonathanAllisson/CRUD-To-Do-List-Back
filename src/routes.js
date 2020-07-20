const express = require('express');

const routes = express.Router();

const userController = require('./controllers/userController');
const taskController = require('./controllers/taskController');
const sessionController = require('./controllers/sessionController');

const auth = require('./middlewares/auth');

routes.get('/user', userController.index);
routes.post('/user', userController.create);
routes.post('/signin', sessionController.login);
routes.get('/task', auth, taskController.index);
routes.post('/task', auth, taskController.create);
routes.put('/task', auth, taskController.update);
routes.delete('/task:id', auth, taskController.delete);

module.exports = routes;
