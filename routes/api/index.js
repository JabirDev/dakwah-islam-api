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
router.get('/playlist/:playlistId', async function (req, res) {
  yt.getPlaylist.playlistId(req, res)
})

router.get('/:channelId/:type', function (req, res, next) {
  const type = req.params.type
  if (type === 'playlists') {
    yt.getPlaylist.channelId(req, res)
  } else if (type === 'videos') {
    yt.getVideos.fromChannelId(req, res)
  } else {
    yt.getVideos.singleVideo(req, res)
  }
})

router.get('/video/:videoId', function (req, res, next) {
  yt.getVideos.singleVideo(req, res)
})

/* GET videos listing. */
router.get('/videos', function (req, res, next) {
  yt.getVideos.fromAllChannels(req, res)
})

/* GET search query. */
router.get('/search', function (req, res, next) {
  yt.getSearch.search(req, res)
})

module.exports = router
