const emailMatcherFormatted = {};

// Maps the EMAIL_MATCH string into an object "emailA=emailB" = {emailA: 'emailB'}
if (process.env.EMAIL_MATCH) {
  process.env.EMAIL_MATCH.split(',')
    .map(i => i.split('='))
    .forEach(i => emailMatcherFormatted[i[0]] = i[1]);
}

const config = {
  'PORT': process.env.PORT || 1337,
  'LOGGING_LEVEL': process.env.LOGGING_LEVEL || 'short',
  'CMD_PATH': process.env.CMD_PATH || '.',
  'STDIO_MAXBUFFER_KB': process.env.STDIO_MAXBUFFER_KB || 5000,
  'EMAIL_MATCH': emailMatcherFormatted,
  'EMAIL_REGEX': process.env.EMAIL_REGEX || '',
};

module.exports = config;
