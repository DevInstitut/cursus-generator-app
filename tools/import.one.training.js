const sh = require("shelljs")
const utils = require('../utils');
const {WORK_DIR, TRAINING_DIR} = require('./tools.config')
const fs = require('fs')
const lg = console.log

const gitUrl = process.argv[2]


lg('...Importing', gitUrl)
const repoName = utils.findRepoName(gitUrl)
const repoDir =`${WORK_DIR}/${repoName}`

const cmds = fs.existsSync(repoDir) ? [
    `cd ${repoDir} && git pull ${gitUrl}`,
    `cd ${repoDir} && ../../node_modules/.bin/gitbook install && ../../node_modules/.bin/gitbook build`,
    `rm -rf ./${TRAINING_DIR}/${repoName}`,
    `cp -r ${repoDir}/_book ./${TRAINING_DIR}/${repoName}`] : [
    `cd ${WORK_DIR} && git clone ${gitUrl}`,
    `cd ${repoDir} && ../../node_modules/.bin/gitbook install && ../../node_modules/.bin/gitbook build`,
    `cp -r ${repoDir}/_book ./${TRAINING_DIR}/${repoName}`]

cmds.forEach(sh.exec)
