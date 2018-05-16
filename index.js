const config = require('./config.js')
const express = require('express')
const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {cfg: config})
})

app.listen(3000)
