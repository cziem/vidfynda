const express = require('express')
const router = express.Router()

const movieController = require('../controllers/app')

router.get('/', movieController.getMovies)

module.exports = router