const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')
const channelRouter = require('./routes/channels')
const videoRouter = require('./routes/videos')
const playlistRouter = require('./routes/playlist')
const searchRouter = require('./routes/search')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/channels', channelRouter)
app.use('/videos', videoRouter)
app.use('/playlist', playlistRouter)
app.use('/search', searchRouter)

module.exports = app
