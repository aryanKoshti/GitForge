const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const commitRepo = async (message) => {

    const repoPath = path.resolve(process.cwd(), ".gitforge");
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    try {
        const files = await fs.readdir(stagedPath);

        if (files.length === 0) {
            console.log("No files staged for commit.");
            return;
        }
        const commitID = uuidv4();
        const commitDir = path.join(commitPath, commitID);
        await fs.mkdir(commitDir, { recursive: true });

        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file)
            );
        }

        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify({
                message,
                date: new Date().toISOString()
            }, null, 2)
        );
        console.log(
            `Commit ${commitID} created with message: ${message}`
        );
    } catch (err) {
        console.error("Error committing files:", err);
    }
};

module.exports = { commitRepo };