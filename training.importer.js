const fs = require('fs')
const sh = require("shelljs")
const config = require('./config')
const utils = require('./utils');

const lg = console.log

const WORK_DIR = './work'
const TRAINING_DIR = './public/formation'

sh.rm('-rf', WORK_DIR);
sh.mkdir('-p', WORK_DIR);

sh.rm('-rf', TRAINING_DIR);
sh.mkdir('-p', TRAINING_DIR);

const importOneTraining = (gitUrl) => {
    lg('...Importing', gitUrl)
    const repoName = utils.findRepoName(gitUrl)
    const repoDir =`${WORK_DIR}/${repoName}`

    const cmds = [
        `cd ${WORK_DIR} && git clone ${gitUrl}`,
        `cd ${repoDir} && ../../node_modules/.bin/gitbook install && ../../node_modules/.bin/gitbook build`,
        `cp -r ${repoDir}/_book ./${TRAINING_DIR}/${repoName}`]

    cmds.forEach(sh.exec)
}

function importAllTrainings() {

    const gitUrls = [].concat.apply([],
        config.cursusList.map(c => c.trainings))
        .map(t => t.git)

    gitUrls.forEach(importOneTraining)
}

importAllTrainings()