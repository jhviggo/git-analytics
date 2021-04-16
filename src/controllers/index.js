const { exec } = require('../utils/process');

async function executeCommand(path) {
  try {
    const output = await exec('git log', path);
    return output;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  executeCommand,
};
