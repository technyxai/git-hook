import chalk from 'chalk';
import dayjs from 'dayjs';
import fs from 'fs';

const logFilePath = './logs/server.log';

export function logWithTimestamp(level, message) {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const colorizedMessage = {
        info: chalk.blue(`[INFO] [${timestamp}] ${message}`),
        warn: chalk.yellow(`[WARN] [${timestamp}] ${message}`),
        error: chalk.red(`[ERROR] [${timestamp}] ${message}`),
        success: chalk.green(`[SUCCESS] [${timestamp}] ${message}`),
    }[level] || `[LOG] [${timestamp}] ${message}`;
    console.log(colorizedMessage);
    logToFile(level, message);
}

export function logToFile(level, message) {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const logMessage = `[${level.toUpperCase()}] [${timestamp}] ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, { flag: 'a' });
}
