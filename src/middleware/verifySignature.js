import crypto from 'crypto';
import { logWithTimestamp } from '../utils/logger.js';

export function verifySignature(req, secret) {
    const signature = req.headers['x-hub-signature-256'];
    if (!signature) {
        logWithTimestamp('error', 'No signature found in headers');
        return false;
    }

    const hmac = crypto.createHmac('sha256', secret)
    const digest = `sha256=${hmac.update(JSON.stringify(req.body)).digest('hex')}`;
    const isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));

    if (!isValid) {
        logWithTimestamp('warn', 'Invalid webhook signature');
    }

    return isValid;
}
