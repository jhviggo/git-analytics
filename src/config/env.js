const config = {
  'PORT': process.env.PORT || 1337,
  'LOGGING_LEVEL': process.env.LOGGING_LEVEL || 'short',
  'CMD_PATH': process.env.CMD_PATH || '.',
  'STDIO_MAXBUFFER_KB': process.env.STDIO_MAXBUFFER_KB || 200,
};

module.exports = config;
