const fs = require('fs/promises');
const path = require("path");

const revertRepo = async (commitID) => {

    const repoPath = path.resolve(process.cwd(), ".gitforge");

    const commitsPath = path.join(repoPath, "commits");

    try {

        const commitDir = path.join(commitsPath, commitID);

        const files = await fs.readdir(commitDir);

        const parentDir = path.resolve(repoPath, "..");

        for (const file of files) {

            if (file === "commit.json") continue;

            await fs.copyFile(
                path.join(commitDir, file),
                path.join(parentDir, file)
            );
        }

        console.log(
            `Commit ${commitID} reverted successfully!!`
        );

    } catch (err) {

        console.log("Unable to revert:", err);

    }
};

module.exports = {
    revertRepo
};