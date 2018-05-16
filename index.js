const config = require('./config.js')
const express = require('express')
const utils = require('./utils')
const { spawn } = require('child_process');

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

const importer = spawn('node',['training.importer.js'])


importer.stdout.on('data', (data) => {
    console.log(`[TRAINING IMPORT]: ${data}`);
});

importer.stderr.on('data', (data) => {
    console.log(`[TRAINING IMPORT]: ${data}`);
});

importer.on('close', (code) => {
    console.log(`[TRAINING IMPORT]: Fin ${code}`);
});

//;
