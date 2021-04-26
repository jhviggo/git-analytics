class Commit {
  // variables
  hash;
  developer;
  date;
  message;
  fileChanges;
  fileChangesOverview;

  // constructor
  constructor(hash) {
    this.hash = hash;
    this.fileChanges = [];
    this.message = '';
  }

  // setters
  setDeveloper(dev) {
    this.developer = dev;
    return this;
  }

  setDate(date) {
    this.date = date;
    return this;
  }

  setMessage(m) {
    this.message = m;
    return this;
  }

  setFileChanges(changes) {
    this.fileChanges = changes;
    return this;
  }

  setFileChangesOverview(overview) {
    this.fileChangesOverview = overview;
    return this;
  }

  // methods
  addFileChange(change) {
    this.fileChanges.push(change);
  }

  amendMessage(m) {
    this.message += m;
  }
}

module.exports = Commit;
