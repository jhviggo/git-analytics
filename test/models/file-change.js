const assert = require('assert');

const FileChange = require('../../src/models/file-change');

describe('models/file-change', () => {
  it('should be able to initialize file-change', () => {
    const change = new FileChange('file.js', 55)
      .setIsRename(true)
      .setNewName('newfilename.js');

    assert.strictEqual(change.name, 'file.js');
  });
});