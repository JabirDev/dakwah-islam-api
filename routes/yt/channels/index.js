const channelIds = require('../other/id-list')
const yt = require('../lib')

const getData = (response) => {
    const author = response.author
    const channelId = response.authorUrl.replace('http://www.youtube.com/', '')
    const url = response.authorUrl
    const banner = response.authorBanners[5].url
    const avatar = response.authorThumbnails[2].url
    const subscriberText = response.subscriberText
    const subscriberCount = response.subscriberCount
    const description = response.description
    const channelLinks = response.channelLinks
    const data = {
        author, channelId, url, banner, avatar, subscriberText, subscriberCount, description, channelLinks
    }
    return data
}

const allChannels = async (res) => {
    Promise.all(channelIds.map(async (channelId) => {
        const response = await yt.getInfo(channelId)
        const data = getData(response)
        return data
    })).then((resArray) => {
        res.json({
            error: false,
            message: 'Channels fetched successfully',
            data: resArray
        })
    }).catch((err) => {
        res.json({
            error: true,
            message: err.message
        })
    })
}

const channelId = async (req, res) => {
    const channelId = req.params.channelId
    const response = await yt.getInfo(channelId)
    if (response) {
        const data = getData(response)
        res.json({
            error: false,
            message: 'Channel fetched successfully',
            data
        })
    } else {
        res.json({
            error: true,
            message: 'Failed to get channel information'
        })
    }
}

module.exports = {
    allChannels, channelId
}