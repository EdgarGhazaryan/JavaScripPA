const express = require('express');
const repositoryRouter = express.Router();

const repositoryController = require('../controllers/repositoryController');

repositoryRouter.get('/api/repositories/count', repositoryController.getReposCount);

module.exports = repositoryRouter;