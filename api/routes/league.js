const express = require('express')
const router = express.Router()

const { getLeague, createLeague } = require('../controllers/leagues')

router.route('/:id').get(getLeague)

router.route('/').post(createLeague)

module.exports = router
