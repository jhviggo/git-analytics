class FileChange {
  // variables
  name;
  isBinary;
  isRename;
  newName;
  lineCount;
  distribution;

  // constructor
  constructor(name, lineCount, distribution) {
    this.name = name;
    this.lineCount = lineCount;
    this.distribution = distribution;
  }

  setIsRename(v) {
    this.isRename = v;
    return this;
  }

  setIsBinary(isBinary) {
    this.isBinary = isBinary;
    return this;
  }

  setNewName(name) {
    this.newName = name;
    return this;
  }

  setDistribution(distribution) {
    this.distribution = distribution;
    return this;
  }
}

module.exports = FileChange;
