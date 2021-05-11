const { exec } = require('../utils/process');
const LogParser = require('../utils/git-parser');
const { countFileChanges, knowledgeMap } = require('../utils/analytics-tool');

let log;

async function setParsedLog(path) {
  try {
    // --stat shows files changes
    // --stat-witdt is used to show entire file path
    // --no-merge removes branch merges
    const output = await exec('git log --stat --stat-width=250 --no-merges', path);
    const parser = new LogParser(output);
    countFileChanges(parser.log);
    log = parser.log;
    return parser.log;
  } catch (error) {
    console.log(error);
  }
  return null;
}

async function getGitLogStats(path) {
  if (!log) await setParsedLog(path);

  return log;
}

async function getCommit(hash, path) {
  if (!log) await setParsedLog(path);

  return log.commits.find(i => i.hash === hash);
}

async function getHotspots(path) {
  if (!log) await setParsedLog(path);

  const hotspots = await countFileChanges(log)

  const max = hotspots
    .reduce((a, b) => (a.changeCount > b.changeCount) ? a : b)
    .changeCount;

  hotspots.forEach(item => {
    item['value'] = item.changeCount / max * 100;
  })

  return {
    name: 'File Changes',
    children: hotspots,
  };
}

async function getKnowledgeMap(path) {
  if (!log) await setParsedLog(path);

  return await knowledgeMap(log);
}

module.exports = {
  getGitLogStats,
  getCommit,
  getHotspots,
  getKnowledgeMap,
};
