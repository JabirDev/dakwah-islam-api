const getPlaylist = require('../lib/get-playlist')

const channelId = async (req, res) => {
    const channelId = req.params.channelId
    const response = await getPlaylist(channelId)
    if (response) {
        res.json({
            error: false,
            message: 'Playlist fetched successfully',
            data: response.items,
            continuation: response.continuation
        })
    } else {
        res.json({
            error: true,
            message: 'Playlist not found'
        })
    }
}

module.exports = {
    channelId
}
