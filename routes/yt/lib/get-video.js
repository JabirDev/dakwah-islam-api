const ytch = require('yt-channel-info')

const getVideo = async (channelId) => {
    const payload = {
        channelId: channelId,
        sortBy: 'newest',
        channelIdType: 3
    }
    const response = await ytch.getChannelVideos(payload)
    return response
}

module.exports = getVideo