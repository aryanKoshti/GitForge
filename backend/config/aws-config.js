const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    region: "ap-southeast-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const S3_BUCKET = "sampleakbucket";

module.exports = { s3, S3_BUCKET };