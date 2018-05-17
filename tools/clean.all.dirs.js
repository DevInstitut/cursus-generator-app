const sh = require("shelljs")
const {WORK_DIR, TRAINING_DIR} = require('./tools.config')

sh.rm('-rf', WORK_DIR);
sh.mkdir('-p', WORK_DIR);

sh.rm('-rf', TRAINING_DIR);
sh.mkdir('-p', TRAINING_DIR);
