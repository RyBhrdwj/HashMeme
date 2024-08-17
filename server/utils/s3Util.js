const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const uploadFileToS3 = (file) => {
  const fileContent = Buffer.from(file.buffer, "binary");

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${uuidv4()}-${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

module.exports = uploadFileToS3;
