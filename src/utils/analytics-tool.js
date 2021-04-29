async function countFileChanges(log, exclude=[], sortBy='changeCount') {
  // filename: { lineCount, changeCount }
  // lineCount is the amount of lines that have been changed
  // changeCount is the amount of times the file has been modified
  const hotspot = {};

  for (const commit of log.commits) {
    for (const file of commit.fileChanges) {
      const fileName = file.isRename ? file.newName : file.name;

      // exclude files
      if (exclude.includes(fileName)) continue;
      
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

module.exports = {
  countFileChanges,
};
