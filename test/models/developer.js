const assert = require('assert');

const Developer = require('../../src/models/developer');
const Commit = require('../../src/models/commit');

describe('models/developer', () => {
  it('should be able to initialize developer', () => {
    const commit = new Commit('hash123', false);
    const developer = new Developer('viggo', 'viggo@email.com')
    developer.addCommit(commit);

    assert.strictEqual(developer.name, 'viggo');
    assert.strictEqual(developer.email, 'viggo@email.com');
    assert.strictEqual(developer.commits.length, 1);
  });
});