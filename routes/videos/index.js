const express = require('express')
const router = express.Router()
const yt = require('../yt')

/* GET videos listing. */
router.get('/', function (req, res, next) {
    yt.getVideos.fromAllChannels(req, res)
})

router.get('/:channelId', async function (req, res) {
    yt.getVideos.fromChannelId(req, res)
})

module.exports = router
