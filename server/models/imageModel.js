const { bucketName, region } = require("../data/s3Config");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand} = require("@aws-sdk/client-s3");
const { v4 } = require('uuid');

//The following source was referenced to understand how use GetObjectCommand and PutObjectCommand 
//https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-photo-album-full.html

//The following source was referenced to understand how use DeleteObjectCommand 
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-mediastore-data/classes/deleteobjectcommand.html

//The following source was referenced to understand how use ListObjectsV2Command 
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/classes/listobjectsv2command.html

//The following source was referenced to learn how to create presigned urls for s3 objects 
//https://aws.amazon.com/blogs/developer/generate-presigned-url-modular-aws-sdk-javascript/

async function uploadImage(image, userid) {
    const uniqueKey = v4();
    const fullKey = userid + "/" + uniqueKey + "-" + image.originalname.split(/\s/).join("");
    const s3 = new S3Client({ region: region });
    const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName,
        Key: fullKey,
        Body: image.buffer,
        ContentType: image.mimetype,
        Metadata: {
            name: image.originalname
        }
    });
    await s3.send(putObjectCommand);
    return fullKey.split("/")[1];
}

async function deleteImage(userId, id) {
    const s3 = new S3Client({ region: region });
    const deleteObjectCommand = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: userId+"/"+id
    });
    await s3.send(deleteObjectCommand);
}

async function getImages(userid) {
    const images = [];
    const s3 = new S3Client({ region: region });
    const listObjectsV2Command = new ListObjectsV2Command({
        Bucket: bucketName,
        Prefix: userid + "/"
    });
    const listObjectsResponse = await s3.send(listObjectsV2Command);
    if (listObjectsResponse.Contents) {
        const imageKeys = listObjectsResponse.Contents.map(x => x.Key);
        for (let key of imageKeys) {
            let getObjectCommand = new GetObjectCommand({
                Bucket: bucketName,
                Key: key
            });
            let getObjectResponse = await s3.send(getObjectCommand);
            let url = await getSignedUrl(s3,getObjectCommand, {expiresIn: 300})
            let image = {
                url: url,
                fileName: getObjectResponse.Metadata.name,
                id: key.split("/")[1],
                date: getObjectResponse.LastModified
            }
            images.push(image);
        }
    }
    return images;
}

module.exports = { uploadImage, getImages , deleteImage};