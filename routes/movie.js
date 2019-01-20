const express = require('express')
const router = express.Router()

const movieController = require('../controllers/app')

router.get('/', movieController.getMovies)
router.post('/', movieController.newMovie)

module.exports = router