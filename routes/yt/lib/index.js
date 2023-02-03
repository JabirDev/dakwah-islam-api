const ytch = require('yt-channel-info')

const getInfo = async (channelId) => {
    const payload = {
        channelId: channelId,
        channelIdType: 3
    }
    const response = await ytch.getChannelInfo(payload)
    return response
}

const getPlaylist = async (channelId) => {
    const payload = {
        channelId: channelId,
        sortBy: 'newest',
        channelIdType: 3
    }
    const response = await ytch.getChannelPlaylistInfo(payload)
    return response
}

const getSearch = async (channelId, query) => {
    const payload = {
        channelId: channelId,
        query: query,
        channelIdType: 3
    }
    const response = await ytch.searchChannel(payload)
    return response
}

const getVideo = async (channelId) => {
    const payload = {
        channelId: channelId,
        sortBy: 'newest',
        channelIdType: 3
    }
    const response = await ytch.getChannelVideos(payload)
    return response
}

module.exports = {
    getInfo, getPlaylist, getSearch, getVideo
}
