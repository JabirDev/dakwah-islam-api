const channelIds = require('../other/id-list')
const yt = require('../lib')
const paginator = require('../other/paginator')

const fromAllChannels = async (req, res) => {
    const page = req.query.page || 1
    const per_page = req.query.per_page || 10
    let videos = []
    Promise.all(channelIds.map(async (channelId) => {
        const response = await yt.getVideo(channelId)
        const items = response.items
        return items
    })).then((resArray) => {
        resArray.map((item) => {
            videos.push(...item)
        })
        const paginedVideos = paginator(videos, page, per_page)
        res.json({
            error: false,
            message: 'Videos fetched successfully',
            ...paginedVideos
        })
    }).catch((err) => {
        res.json({
            error: true,
            message: err.message
        })
    })
}

const fromChannelId = async (req, res) => {
    const page = req.query.page || 1
    const per_page = req.query.per_page || 10
    const channelId = req.params.channelId
    const response = await yt.getVideo(channelId)
    if (response) {
        const paginedVideos = paginator(response.items, page, per_page)
        res.json({
            error: false,
            message: 'Videos fatched successfully',
            ...paginedVideos
        })
    } else {
        res.json({
            error: true,
            message: 'Videos not found'
        })
    }
}

module.exports = {
    fromAllChannels, fromChannelId
}
