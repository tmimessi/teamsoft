const { Router } = require('express')

const clientsRouter = require('./client.routes')

const routes = Router()

routes.use('/clients', clientsRouter)

module.exports = routes
