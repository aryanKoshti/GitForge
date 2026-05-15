const fs = require('fs/promises');
const path = require('path');

const {
    ListObjectsV2Command,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

const { s3, S3_BUCKET } = require('../config/aws-config');

const streamToBuffer = async (stream) => {
    const chunks = [];

    for await (const chunk of stream) {
        chunks.push(chunk);
    }

    return Buffer.concat(chunks);
};

const pullRepo = async () => {

    const repoPath = path.resolve(process.cwd(), ".gitforge");

    const commitsPath = path.join(repoPath, "commits");

    try {

        const listCommand = new ListObjectsV2Command({
            Bucket: S3_BUCKET,
            Prefix: "commits/"
        });

        const data = await s3.send(listCommand);

        const objects = data.Contents || [];

        for (const obj of objects) {

            const key = obj.Key;

            const localFilePath = path.join(repoPath, key);

            await fs.mkdir(
                path.dirname(localFilePath),
                { recursive: true }
            );

            const getCommand = new GetObjectCommand({
                Bucket: S3_BUCKET,
                Key: key
            });

            const response = await s3.send(getCommand);

            const fileContent = await streamToBuffer(response.Body);

            await fs.writeFile(localFilePath, fileContent);

        }

        console.log("All commits pulled from S3 successfully!");

    } catch (err) {

        console.error("Unable to pull commits from S3:", err);

    }
};

module.exports = { pullRepo };