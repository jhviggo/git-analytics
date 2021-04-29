async function countFileChanges(log, exclude=[], sortBy='changeCount') {
  // filename: { lineCount, changeCount }
  // lineCount is the amount of lines that have been changed
  // changeCount is the amount of times the file has been modified
  const hotspot = {};

  for (const commit of log.commits) {
    for (const file of commit.fileChanges) {
      const fileName = file.isRename ? file.newName : file.name;

      // exclude files
      if (exclude && exclude.includes(fileName)) continue;
      
      // file exists in hotspot
      if (Object.keys(hotspot).includes(fileName)) {
        hotspot[fileName].lineCount += Number(file.lineCount);
        hotspot[fileName].changeCount += 1;
      }
      // file does not exist
      else {
        hotspot[fileName] = {
          lineCount: Number(file.lineCount),
          changeCount: 1,
          fileName,
        };
      }

    }
  }
  
  // Array of values sorted descending by sortBy key
  return Object
    .values(hotspot)
    .sort((a, b) => b[sortBy] - a[sortBy]);
}

async function knowledgeMap(log) {
  // { file: { counts: { devName: 123 }, totalCount: 123} }
  const map = {};

  for (const commit of log.commits) {
    for (const file of commit.fileChanges) {
      // add line if it does not exist
      if (!Object.keys(map).includes(file.name)) {
        map[file.name] = {
          fileName: file.name,
          counts: {},
        }
      }

      // add developer to counts if they do not exist
      const oldCount = Object.keys(map[file.name].counts).includes(commit.developer.name)
        ? map[file.name].counts[commit.developer.name]
        : 0;

      map[file.name].counts[commit.developer.name] = Number(oldCount) + Number(file.lineCount);
    }
  }

  for (const key of Object.keys(map)) {
    map[key].totalCount = Object.values(map[key].counts).reduce((a, b) => a + b, 0);
  }

  return Object.values(map).sort((a, b) => b.totalCount - a.totalCount);
}

module.exports = {
  countFileChanges,
  knowledgeMap,
};
