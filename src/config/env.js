const config = {
  'PORT': process.env.PORT || 1337,
  'LOGGING_LEVEL': process.env.LOGGING_LEVEL || 'short',
  'CMD_PATH': process.env.CMD_PATH || '.'
};

module.exports = config;
