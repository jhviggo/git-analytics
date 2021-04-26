const crypto = require('crypto');

const Log = require('../models/log');
const Commit = require('../models/commit');
const Developer = require('../models/developer');
const FileChange = require('../models/file-change');
const {
  COMMIT,
  AUTHOR,
  DATE,
} = require('../config/keywords');

class LogParser {
  logString;
  log;

  constructor(logString, logName) {
    this.logString = logString;

    // create log
    if (!logName) this.log = new Log(crypto.randomBytes(16).toString('hex').toUpperCase())
    else this.log = new Log(logName);
    
    // parse logString
    this.parse();
  }

  parse() {
    const authorMatcher = /\s(.+)\s<(.+)>$/;
    const dateMatcher = /^Date:\s*(.+)/;
    const changeMatcher = /(.+)\|\s*(\d+)\s*([\+-]+)?$/;
    const changeBinaryMatcher = /(.+)\| Bin (\d+ -> \d+ \w+)/
    const changeOverviewMatcher = /(\d+)[\s\w]+/g
    let currentCommit = null;
    let fileChangesReached = false;

    for (const line of this.logString.split('\n')) {
      // ----- commit hash
      if (line.startsWith(COMMIT)) {
        if (currentCommit) {
          this.log.addCommit(currentCommit);
          currentCommit = null;
          fileChangesReached = false;
        }
        const commitHash = line.split(' ')[1];
        currentCommit = new Commit(commitHash);
      }
      // ----- author
      else if (line.startsWith(AUTHOR)) {
        const match = line.match(authorMatcher);
        currentCommit.setDeveloper(new Developer(match[1], match[2]));
      }
      // ----- date
      else if (line.startsWith(DATE)) {
        const match = line.match(dateMatcher);
        currentCommit.setDate(match[1]);
      }
      // ----- file changes
      else if (line.match(changeMatcher) || line.match(changeBinaryMatcher)) {
        const match = line.match(changeMatcher);
        // change includes a name change
        if (line.includes('=>')) {
          const fileNames = match[1].split('=>');
          const fc = new FileChange(fileNames[0].replace('}', ''), match[2], match[3])
            .setIsRename(true)
            .setNewName(fileNames[1].replace('}', ''));
          currentCommit.addFileChange(fc);
        }
        // line change includes binary file
        else if (line.match(changeBinaryMatcher)) {
          const binMatch = line.match(changeBinaryMatcher);
          const fc = new FileChange(binMatch[1].trim(), 0, binMatch[2].trim()).setIsBinary(true);
          currentCommit.addFileChange(fc);
        }
        // change is not a name change
        else {
          currentCommit.addFileChange(new FileChange(match[1].trim(), match[2], match[3]));
        }
        fileChangesReached = true;
      }
      // ----- file changes overview
      // ----- commit message
      else if (line) {
        // line is a commit message
        if (!fileChangesReached) {
          currentCommit.amendMessage(line.trim() + '\n');
        }
        // line is the change overview
        else {
          const match = line.match(changeOverviewMatcher);
          const changesObject = {};
          for (const change of match) {
            const changeCount = parseInt(change) // parseInt will ignore non digit characters in string
            const changeType = change.replace(String(changeCount), '').trim();
            changesObject[changeType] = changeCount;            
          }
          currentCommit.setFileChangesOverview(changesObject);
        }
      }
    }
    this.log.addCommit(currentCommit);
  }
}

module.exports = LogParser;
