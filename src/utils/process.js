const { 'exec': exec_process } = require("child_process");

/**
 * Promisify the child_process.exec function.
 * 
 * @param {string} command the terminal command to run
 * @throws the Promise may get rejected with either an error or the stderr output
 * @returns {Promise<object>} the command standart output
 */
async function exec(command) {
    return new Promise((resolve, rejects) => {
        exec_process(command, (error, stdout, stderr) => {
            if (error) rejects(error);
            else if (stderr) rejects(stderr);
            resolve(stdout);
        });
    });
}

module.exports = {
    exec,
}
