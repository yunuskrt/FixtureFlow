const express = require('express')
const router = express.Router()
const { updateMatches } = require('../controllers/matches')

router.route('/').put(updateMatches)

module.exports = router
