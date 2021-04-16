class Developer {
  // variables
  name;
  email;
  commits;

  // constructor
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.commits = [];
  }

  // methods
  addCommit(commit) {
    this.commits.push(commit);
  }
}

module.exports = Developer;
