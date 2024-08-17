const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFileToS3 = (file) => {
  const fileContent = Buffer.from(file.buffer, "binary");

  const fileExtension = path.extname(file.originalname);
  const uniqueKey = `${uuidv4()}${fileExtension}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: uniqueKey,
    Body: fileContent,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

module.exports = uploadFileToS3;
