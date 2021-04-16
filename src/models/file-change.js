class FileChange {
  // variables
  name;
  isRename;
  newName;
  lineCount;

  // constructor
  constructor(name, lineCount) {
    this.name = name;
    this.lineCount = lineCount;
  }

  setIsRename(v) {
    this.isRename = v;
    return this;
  }

  setNewName(name) {
    this.newName = name;
    return this;
  }
}

module.exports = FileChange;
