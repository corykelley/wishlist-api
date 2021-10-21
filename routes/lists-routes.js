const listsController = require('../controllers/lists-controller');
const listsRouter = require('express').Router();

listsRouter.get('/', listsController.index);
listsRouter.get('/:id([0-9]+)', listsController.show);
listsRouter.post('/new', listsController.create);
listsRouter.put('/:id([0-9]+)', listsController.update);
listsRouter.delete('/:id([0-9]+)', listsController.delete);

module.exports = listsRouter;
