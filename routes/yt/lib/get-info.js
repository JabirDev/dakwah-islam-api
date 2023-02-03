const ytch = require('yt-channel-info')

const getInfo = async (channelId) => {
    const payload = {
        channelId: channelId,
        channelIdType: 3
    }
    const response = await ytch.getChannelInfo(payload)
    return response
}

module.exports = getInfo
