const express = require('express')
const router = express.Router()
const yt = require('../yt')

router.get('/:channelId', async function (req, res) {
    yt.getPlaylist.channelId(req, res)
})

module.exports = router
