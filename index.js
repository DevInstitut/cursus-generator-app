const config = require('./config.js')
const express = require('express')
const utils = require('./utils')
const ws = require('nodejs-websocket')
const spawn = require('child_process').spawn

config.cursusList.forEach(
    c => c.trainings.forEach(
        t => {
            t.gitUrl= `formation/${utils.findRepoName(t.git)}`
            t.state = false
        })
    )

const app = express()

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {cfg: config})
})

app.post('/update', (req, res) => {
    const up = spawn('node', ['tools/import.one.training.js', req.query.repoUrl])
    connectChildProcess(up)
})
app.listen(8080)


const server = ws.createServer( (newConnection) => {
    newConnection.on("close", (code, reason) => {
        console.log("Bye bye ! Connection closed", "code =", code, "reason =", reason)
    })

}).listen(8000)
const sendToClient = (msg) => server.connections.forEach( (savedConnection) => savedConnection.sendText(msg))
const connectChildProcess = (childProc) => {
    childProc.stdout.on('data', data => sendToClient(`[DATA]: ${data}`));
    childProc.stderr.on('data', data => sendToClient(`[DATA]: ${data}`));
    childProc.on('close', data => {

        config.cursusList.forEach(
            c => c.trainings.forEach(
                t => {
                    t.state = true
                })
        )
        sendToClient(`[FIN]: ${data}`)
    });
}


const importAll = () => {
    const iall = spawn('node', ['tools/import.all.trainings.js'])
    connectChildProcess(iall)
}

importAll()





