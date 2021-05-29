const assert = require('assert');
const LogParser = require('../../src/utils/git-parser');

describe('utils/git-parser', () => {
  it('Should create matching Log object', () => {
    const logString = "commit 8a017954af37bc54785fccbe9e5664d0e18d5cbc (origin/map-emails, map-emails)\nAuthor: Viggo Petersen <vig56@hotmail.com>\nDate:   Sat May 29 19:27:55 2021 +0200\n\nMap emails and group users\n\\nissue #52, #49\n\n- add author matcher in parser\n- add author regex group to parser\n- map users by email instead of name\n- display email on knowledge map hover\n- map EMAIL_MATCH to object in env config\n\nREADME.md                          |  7 ++++++-\nsrc/config/env.js                  | 12 +++++++++++-\nsrc/router.js                      |  1 -\nsrc/utils/analytics-tool.js        | 14 +++++++-------\nsrc/utils/git-parser.js            | 13 ++++++++++++-\nsrc/views/scripts/global.js        |  4 ++--\nsrc/views/scripts/knowledge-map.js |  6 +++---\n7 files changed, 41 insertions(+), 16 deletions(-)\n";

    const parser = new LogParser(logString);
    assert.strictEqual(parser.log.commits[0].hash, '8a017954af37bc54785fccbe9e5664d0e18d5cbc');
    assert.strictEqual(parser.log.commits[0].fileChanges.length, 7);
    assert.strictEqual(parser.log.commits.length, 1);
  });
});