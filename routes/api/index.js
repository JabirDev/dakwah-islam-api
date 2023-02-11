const express = require('express')
const router = express.Router()
const yt = require('../yt')

/* GET channel listing. */
router.get('/channels', function (req, res, next) {
  yt.getInfo.allChannels(res)
})

router.get('/channel/:channelId', async function (req, res, next) {
  yt.getInfo.channelId(req, res)
})

/* GET playlist */
router.get('/playlist/:channelId', async function (req, res) {
  yt.getPlaylist.channelId(req, res)
})

router.get('/video/:videoId', function (req, res, next) {
  yt.getVideos.singleVideo(req, res)
})

/* GET videos listing. */
router.get('/videos', function (req, res, next) {
  yt.getVideos.fromAllChannels(req, res)
})

router.get('/videos/:channelId', function (req, res, next) {
  yt.getVideos.fromChannelId(req, res)
})

/* GET search query. */
router.get('/search', function (req, res, next) {
  yt.getSearch.search(req, res)
})

module.exports = router
