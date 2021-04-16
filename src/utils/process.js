const { 'exec': exec_process } = require("child_process");
const { CMD_PATH } = require('../config/env');

/**
 * Promisify the child_process.exec function. It uses regular promise instead
 * of util.promisify, so it can handle custom error-handling, if needed.
 * 
 * @param {string} command the terminal command to run
 * @param {string} the complete path of where to execute the command
 * @throws the Promise may get rejected with either an error or the stderr output
 * @returns {Promise<object>} the command standart output
 */
async function exec(command, cmdPath) {
  if (!cmdPath) {
    cmdPath = CMD_PATH;
  }

  return new Promise((resolve, rejects) => {
    exec_process(command, { cwd: cmdPath }, (error, stdout, stderr) => {
      if (error) rejects(error);
      else if (stderr) rejects(stderr);
      resolve(stdout);
    });
  });
}

module.exports = {
  exec,
}
