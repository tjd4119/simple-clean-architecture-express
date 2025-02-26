import { createLogger, format, transports, Logger } from 'winston';

const { combine, timestamp, colorize, json, errors, splat, simple } = format;

const logFormat = process.env.NODE_ENV === 'development'
  ? combine(
    colorize(),
    simple(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    splat()
  )
  : combine(
    timestamp(),
    errors({ stack: true }),
    splat(),
    json()
  );

const logger: Logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'my-service-name' },
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

logger.on('error', (err) => {
  console.error('Logger error:', err);
});

export default logger;
