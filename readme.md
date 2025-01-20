# GitHub Webhook Deployment Listener

## Abstract
This project listens for branch push webhook calls from GitHub and runs a script on the server to update code on deployment in real-time. It streamlines the deployment process, ensuring that any changes pushed to a specific branch are automatically reflected on the server.

---

## Dependencies
- **PM2**: Ensure PM2 is installed on your system to run this application as a startup process. PM2 is a process manager for Node.js applications, providing efficient runtime management.

To install PM2:
```sh
npm install pm2 -g
```

---

## Starting the Application as a PM2 Process
Run the following command to start the application as a PM2-managed process:
```sh
pm2 start npm --name git-hook -- run start
```

---

## Configuration
The application uses a `config.json` file to manage project-specific settings. Below is an example structure of the file:

```json
{
    "projects": [
        {
            "name": "pm2 name of application",
            "repo": "repo name in github",
            "branch": "branch name in github",
            "location": "/path/to/your/local/project/github/clone",
            "secret": "your secret",
            "script": "scripts/default.sh"
        }
        // Other projects go here, same structure as above
    ]
}
```

### Key Fields:
- **`name`**: The PM2 process name for the application.
- **`repo`**: The name of the GitHub repository.
- **`branch`**: The branch in the GitHub repository to listen for updates.
- **`location`**: The local directory path where the repository is cloned.
- **`secret`**: A secret key for verifying webhook calls.
- **`script`**: The path to the script to execute after a push event.

---

## Default Port
This program will run on **port 8050**. Ensure this port is available and not blocked by firewalls.

---

## Usage
1. Set up your GitHub repository webhook to point to your server's address, e.g., `http://your-server-address:8050`.
2. Push your code to the designated branch in GitHub.
3. Watch your deployment update in real-time!

---

## Contact
For any queries or support, feel free to reach out:
- **Email**: [sislamrafi333@gmail.com](mailto:sislamrafi333@gmail.com)

---

Happy coding! Just push your code to the deployment branch and boom! 🎉
