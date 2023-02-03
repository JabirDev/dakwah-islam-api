const ytch = require('yt-channel-info')

const getPlaylist = async (channelId) => {
    const payload = {
        channelId: channelId,
        sortBy: 'newest',
        channelIdType: 3
    }
    const response = await ytch.getChannelPlaylistInfo(payload)
    return response
}

module.exports = getPlaylist
