const { Router } = require('express')
const clientRoutes = Router()
const ClientsController = require('../controller/ClientsController')
const clientsController = new ClientsController()

clientRoutes.post('/', clientsController.create)
clientRoutes.put('/:id', clientsController.update)
clientRoutes.get('/', clientsController.index)
clientRoutes.delete('/:id', clientsController.delete)

module.exports = clientRoutes
