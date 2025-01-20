import fs from 'fs';

export function loadConfig(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (error) {
        throw new Error(`Failed to load config file: ${error.message}`);
    }
}
