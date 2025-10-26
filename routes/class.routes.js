const { createNewClass } = require('../controllers/class.controller')

const classRouter = require('express').Router()

classRouter.post('/create', createNewClass)

module.exports = classRouter