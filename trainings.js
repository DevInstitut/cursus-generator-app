const fs = require('fs')
const sh = require("shelljs")
const config = require('./config')
const utils = require('./utils');

const spawn = require('child_process').spawn;


const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

const lg = console.log

const WORK_DIR = './work'
const TRAINING_DIR = './public/formation'

const cleanAllDirs = () => {
    sh.rm('-rf', WORK_DIR);
    sh.mkdir('-p', WORK_DIR);

    sh.rm('-rf', TRAINING_DIR);
    sh.mkdir('-p', TRAINING_DIR);
}


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

const updateOneTraining = (gitUrl) => {
    lg('...Updating from ', gitUrl)
    const repoName = utils.findRepoName(gitUrl)
    const cmds = [
        `cd ${WORK_DIR} && git pull ${gitUrl}`,
        `cd ${repoDir} && ../../node_modules/.bin/gitbook install && ../../node_modules/.bin/gitbook build`,
        `rm -rf ./${TRAINING_DIR}/${repoName}`,
        `cp -r ${repoDir}/_book ./${TRAINING_DIR}/${repoName}`]

    cmds.forEach(sh.exec)
}

function importAllTrainings() {
    cleanAllDirs();

    const gitUrls = [].concat.apply([],
        config.cursusList.map(c => c.trainings))
        .map(t => t.git)

    gitUrls.forEach(importOneTraining)
}

module.exports = { importAllTrainings, importOneTraining, updateOneTraining }