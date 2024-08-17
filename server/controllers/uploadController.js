const uploadFileToS3 = require('../utils/s3Util');

class UploadController {
  static async uploadImage(req, res) {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    try {
      const s3Response = await uploadFileToS3(req.file);

      res.status(200).send({
        message: "File uploaded successfully",
        file: s3Response,
      });
    } catch (error) {
      console.error("Error uploading file to S3:", error);
      
      res.status(500).send("Error uploading file");
    }
  }
}

module.exports = UploadController;
