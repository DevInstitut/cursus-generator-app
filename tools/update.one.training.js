const sh = require("shelljs")
const utils = require('../utils');
const {WORK_DIR, TRAINING_DIR} = require('./tools.config')

const lg = console.log

const gitUrl = process.argv[2]


lg('...Updating', gitUrl)
const repoName = utils.findRepoName(gitUrl)
const repoDir =`${WORK_DIR}/${repoName}`

const cmds = [
    `cd ${WORK_DIR} && git pull ${gitUrl}`,
    `cd ${repoDir} && ../../node_modules/.bin/gitbook install && ../../node_modules/.bin/gitbook build`,
    `rm -rf ./${TRAINING_DIR}/${repoName}`,
    `cp -r ${repoDir}/_book ./${TRAINING_DIR}/${repoName}`]

cmds.forEach(sh.exec)