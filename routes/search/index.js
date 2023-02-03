const express = require('express')
const router = express.Router()
const yt = require('../yt')

/* GET videos listing. */
router.get('/', function (req, res, next) {
    yt.getSearch.search(req, res)
})

module.exports = router
