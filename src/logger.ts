import winston from 'winston'

const logger =  winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp({ format: "YY-MM-DD HH-mm-ss" }),
        winston.format.printf(({ level, timestamp, message }) => {
            return `[${timestamp}] ${level}: ${message}`
        })
    ),
    transports: [
        new winston.transports.Console({ format: winston.format.printf(({ level, message }) => {
            return `${level}: ${message}`
        }) }),
        new winston.transports.File({ filename: "./logs/error.js", level: "error", maxsize: 500000, maxFiles: 4 }),
        new winston.transports.File({ filename: "./logs/warn.js", level: "warn", maxsize: 500000, maxFiles: 4 }),
        new winston.transports.File({ filename: "./logs/info.js", level: "info", maxsize: 500000, maxFiles: 4 }),
    ]
})

export default logger;