const assert = require('assert');

const Commit = require('../../src/models/commit');
const Developer = require('../../src/models/developer');
const FileChange = require('../../src/models/file-change');

describe('models/commit', () => {
  it('should be able to initialize Commit', () => {
    const developer = new Developer('viggo', 'viggo@email.com');
    const fileChange0 = new FileChange('file1.js', 10);
    const fileChange1 = new FileChange('file2.js', 26);
    const commit = new Commit('id1234', false)
      .setDate('some date')
      .setMessage('the commit message')
      .setDeveloper(developer)
      .setFileChanges([fileChange0]);

    assert.strictEqual(commit.hash, 'id1234');
    assert.strictEqual(commit.fileChanges.length, 1);
    assert.strictEqual(commit.fileChanges[0], fileChange0);

    commit.addFileChange(fileChange1);

    assert.strictEqual(commit.fileChanges.length, 2);
    assert.strictEqual(commit.fileChanges[1], fileChange1);
  });
});