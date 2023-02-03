const express = require('express')
const router = express.Router()
const yt = require('../yt')

/* GET channel listing. */
router.get('/', function (req, res, next) {
  yt.getInfo.allChannels(res)
})

router.get('/:channelId', async function (req, res, next) {
  yt.getInfo.channelId(req, res)
})

module.exports = router
