const { bucketName, region } = require("../data/s3Config");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { v4 } = require('uuid');

//Reference for using aws sdk for s3: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-photo-album-full.html
async function uploadImage(image, userid) {
    const uniqueKey = v4();
    const fullKey = userid + "/" + uniqueKey + "-" + image.originalname;
    const s3 = new S3Client({ region: region });
    const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: fullKey,
        Body: image.buffer,
        Metadata: {
            name: image.originalname
        }
    });
    const s3Response = await s3.send(putObjectCommand);
    return fullKey.split("/")[1];
}

module.exports = { uploadImage };