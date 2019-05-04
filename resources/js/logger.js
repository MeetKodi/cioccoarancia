import logger from 'loglevel';

// trace/debug/info/warn/error
logger.setLevel(window.config.logLevel);

export default logger;
