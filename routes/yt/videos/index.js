const ytdl = require('youtube-stream-url')
const channelIds = require('../other/id-list')
const yt = require('../lib')
const paginator = require('../other/paginator')

const getData = (video, avatar) => {
    return {
        type: video.type,
        title: video.title,
        videoId: video.videoId,
        author: {
            id: video.authorId,
            name: video.author,
            avatar: avatar,
        },
        videoThumbnails: video.videoThumbnails,
        viewCountText: video.viewCountText,
        viewCount: video.viewCount,
        publishedText: video.publishedText,
        lengthSeconds: video.lengthSeconds,
        liveNow: video.liveNow,
        premiere: video.premiere,
        premium: video.premium
    }
}

const channelInfo = async (videos, req, res) => {
    const page = req.query.page || 1
    const per_page = req.query.per_page || 10
    Promise.all(videos.map(async (video) => {
        const response = await yt.getInfo(video.authorId)
        const avatar = response.authorThumbnails[2].url
        const data = getData(video, avatar)
        return data
    })).then((resArray) => {
        const paginedVideos = paginator(resArray, page, per_page)
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

const fromAllChannels = async (req, res) => {
    let videos = []
    Promise.all(channelIds.map(async (channelId) => {
        const response = await yt.getVideo(channelId)
        const items = response.items
        return items
    })).then((resArray) => {
        resArray.map((item) => {
            videos.push(...item)
        })
        channelInfo(videos, req, res)
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

const singleVideo = async (req, res) => {
    const videoId = req.params.videoId
    const yturl = { url: "https://www.youtube.com/watch?v=" + videoId }
    const response = await ytdl.getInfo(yturl)
    if (response) {
        res.json({
            error: false,
            data: response.videoDetails
        })
    } else {
        res.json({
            error: true,
            message: 'Failed to get video'
        })
    }
}

module.exports = {
    fromAllChannels, fromChannelId, singleVideo
}
