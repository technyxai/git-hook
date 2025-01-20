import { logWithTimestamp } from '../utils/logger.js';
import { exec } from 'child_process';
import { verifySignature } from '../middleware/verifySignature.js';

export function handleWebhook(req, res, config) {
    const event = req.headers['x-github-event'];

    if (event === 'push') {
        const payload = req.body;
        const pushedBranch = payload.ref.split('/').pop();
        const repoName = payload.repository.name;

        const matchingConfig = config.projects.find(project => 
            project.branch === pushedBranch && project.repo === repoName
        );

        if (matchingConfig) {
            if (!verifySignature(req, matchingConfig.secret)) {
                logWithTimestamp('error', `Webhook signature verification failed for project: ${matchingConfig.name}`);
                return res.status(401).send('Invalid signature');
            }

            logWithTimestamp('info', `Push event detected on branch: ${pushedBranch} for repository: ${repoName} and project: ${matchingConfig.name}`);
            
            exec(`sh ${matchingConfig.script} ${matchingConfig.name} ${repoName} ${pushedBranch} ${matchingConfig.location}`, (error, stdout, stderr) => {
                if (error) {
                    logWithTimestamp('error', `Error executing script: ${error.message}`);
                    return;
                }

                if (stderr) {
                    logWithTimestamp('warn', `Script stderr: ${stderr}`);
                }

                logWithTimestamp('success', `Script output: ${stdout}`);
            });
        } else {
            logWithTimestamp('warn', `No matching configuration found for branch: ${pushedBranch}, repository: ${repoName}`);
        }
    }

    res.status(200).send('Webhook received');
}
