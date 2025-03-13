import { createLogger, format, Logger, transports } from 'winston';

const { combine, timestamp, colorize, json, errors, splat, simple } = format;

const logFormat =
  process.env.NODE_ENV === 'development'
    ? combine(
        colorize(),
        simple(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        splat()
      )
    : combine(timestamp(), errors({ stack: true }), splat(), json());

const levelFilter = (level: string) =>
  format((info) => {
    return info.level === level ? info : false;
  })();

const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'SarcoCloud' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({
      filename: 'logs/http.log',
      level: 'http',
      format: levelFilter('http'),
    }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

logger.on('error', (err) => {
  console.error('Logger error:', err);
});
// export test
export default logger;
