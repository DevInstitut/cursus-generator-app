const config = require('./config.js')
const express = require('express')
const trImports =require('./training.importer')
const utils = require('./utils')

config.cursusList.forEach(
    c => c.trainings.forEach(
        t => t.gitUrl= `formation/${utils.findRepoName(t.git)}`)
    )

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {cfg: config})
})

app.listen(8080)

trImports.importAllTrainings();
