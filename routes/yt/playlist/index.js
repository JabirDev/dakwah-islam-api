const yt = require('../lib')

const channelId = async (req, res) => {
    const channelId = req.params.channelId
    const response = await yt.getPlaylist(channelId)
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
