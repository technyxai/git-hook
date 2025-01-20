import express from 'express';
import { logWithTimestamp, logToFile } from './utils/logger.js';
import { loadConfig } from './utils/configLoader.js';
import { handleWebhook } from './controllers/webhookHandler.js';

const config = loadConfig('config.json');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.post('/webhook/github', (req, res) => handleWebhook(req, res, config));

app.listen(port, () => {
    logWithTimestamp('success', `Webhook server listening on port ${port}`);
    logToFile('success', `Webhook server started on port ${port}`);
});
