const fs = require('fs/promises');
const path = require('path');

const initRepo = async () => {
    const repoPath = path.resolve(process.cwd(), ".github");
    const commitsPath = path.join(repoPath, "commits");

    try {
        await fs.mkdir(repoPath, { recursive: true});
        await fs.mkdir(commitsPath, { recursive: true});
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({ bucket: process.env.S3_BUCKET })
        )
        console.log("Repositary initialized!!")
    } catch (err) {
        console.error("Error initialising repositary", err)
    }
}

module.exports = { initRepo }