const AWS = require('aws-sdk');

AWS.config.update({
    // accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-south-1"
});

const s3 = new AWS.S3();
const S3_BUCKET = "test-bucket-code-1234";

module.exports = { s3, S3_BUCKET };