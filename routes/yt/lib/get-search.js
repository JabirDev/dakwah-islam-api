const ytch = require('yt-channel-info')

const getSearch = async (channelId, query) => {
    const payload = {
        channelId: channelId,
        query: query,
        channelIdType: 3
    }
    const response = await ytch.searchChannel(payload)
    return response
}

module.exports = getSearch
