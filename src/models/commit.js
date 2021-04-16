class Commit {
  // variables
  hash;
  isMerge;
  developer;
  commitDate;
  commitMessage;
  fileChanges;
  fileChangesOverview;

  // constructor
  constructor(hash, isMerge) {
    this.hash = hash;
    this.isMerge = isMerge;
    this.fileChanges = [];
  }

  // setters
  setDeveloper(dev) {
    this.developer = dev;
    return this;
  }

  setDate(d) {
    this.commitDate = d;
    return this;
  }

  setMessage(m) {
    this.commitMessage = m;
    return this;
  }

  setFileChanges(changes) {
    this.fileChanges = changes;
    return this;
  }

  // methods
  addFileChange(change) {
    this.fileChanges.push(change);
  }
}

module.exports = Commit;
