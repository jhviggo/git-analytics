const assert = require('assert');

const Log = require('../../src/models/log');
const Commit = require('../../src/models/commit');

describe('models/log', () => {
  it('should be able to initialize Log', () => {
    const commit1 = new Commit('id1234', false);
    const log = new Log('test-log')
    log.addCommit(commit1);

    assert.strictEqual(log.name, 'test-log');
    assert.strictEqual(log.commits[0], commit1);
  });
});