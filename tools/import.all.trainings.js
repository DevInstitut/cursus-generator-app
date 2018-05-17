const config = require('../config')
const sh = require('shelljs')

require('./clean.all.dirs')

const gitUrls = [].concat.apply([],
    config.cursusList.map(c => c.trainings))
    .map(t => t.git)


gitUrls.forEach(url => {
    sh.exec(`node tools/import.one.training.js ${url}`)
})

