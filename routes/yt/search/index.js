const channelIds = require('../other/id-list')
const getSearch = require('../lib/get-search')
const paginator = require('../other/paginator')

const search = async (req, res) => {
    const page = req.query.page
    const per_page = req.query.per_page
    const query = req.query.query
    let videos = []
    Promise.all(channelIds.map(async (channelId) => {
        const response = await getSearch(channelId, query)
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

module.exports = {
    search
}
