const yt = require('../lib')
const ytfps = require('ytfps')
const paginator = require('../other/paginator')

const channelId = async (req, res) => {
    const page = req.query.page || 1
    const per_page = req.query.per_page || 10
    const channelId = req.params.channelId
    const response = await yt.getPlaylist(channelId)
    if (response) {
        const paginedPlaylist = paginator(response.items, page, per_page)
        res.json({
            error: false,
            message: 'Playlist fetched successfully',
            ...paginedPlaylist,
            continuation: response.continuation
        })
    } else {
        res.json({
            error: true,
            message: 'Playlist not found'
        })
    }
}

const playlistId = async (req, res) => {
    const playlistId = req.params.playlistId
    const response = await ytfps(playlistId)
    return res.json({
        error: false,
        message: 'Playlist fetched successfully',
        data: response
    })
}

module.exports = {
    channelId, playlistId
}
