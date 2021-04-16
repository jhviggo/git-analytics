class Log {
  // variables
  name;
  commits;

  // constructor
  constructor(name) {
    this.name = name;
    this.commits = [];
  }

  // methods
  addCommit(commit) {
    this.commits.push(commit);
  }
}

module.exports = Log;
