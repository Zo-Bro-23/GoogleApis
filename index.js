const express = require('express')
const app = express()
const callback = require('./api/callback')
const main = require('./api/main')

app.get('/', main)
app.get('/callback', callback)
app.listen(5210)