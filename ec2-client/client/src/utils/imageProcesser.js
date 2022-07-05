import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { DynamoDBClient, GetItemCommand, CreateTableCommand, ResourceInUseException} from "@aws-sdk/client-dynamodb";
import { v4 } from 'uuid';

//Reference for using aws sdk for s3: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/s3-example-photo-album-full.html
//References for using aws sdk for dynamoDB: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/getitemcommand.html
//https://docs.amazonaws.cn/en_us/amazondynamodb/latest/developerguide/example_dynamodb_CreateTable_section.html
export async function processImage(image) {

    //move credentials and constants into a config file
    const params = {region: "us-east-1",  credentials:{
        accessKeyId: "",
        secretAccessKey: "",
        sessionToken: ""
    }} 

    const userid = "<usedr-id>"//user id for table and bucket names
    const bucketName = "<bucket-name>";//name of bucket created using cloud formation
    const uniqueKey = v4();
    const fullKey = userid+"/"+uniqueKey;
    var text = "";
    
    try {
        const s3 = new S3Client(params);
        const db = new DynamoDBClient(params);

        await createTable(db, userid);
        await uploadToBucket(image, s3, bucketName, fullKey);
        text = await getText(db, userid, uniqueKey);
        console.log(text);  

    } catch (e) {
        console.log(e);
        alert("Error processing image, try again");
    }
    return text;
}

async function uploadToBucket(image, s3, bucketName, key) {
    const putObjectCommand = new PutObjectCommand({
        Bucket: bucketName, 
        Key: key,
        Body: image,
        Metadata: {
            name: image.name
        }
    });
    const s3Response = await s3.send(putObjectCommand);
    console.log(s3Response);
}

async function createTable(db, userid) {
    const createTableCommand = new CreateTableCommand({
        AttributeDefinitions: [
            {
                AttributeName: "id",
                AttributeType: "S",
            }
        ],
        KeySchema: [
            {
                AttributeName: "id",
                KeyType: "HASH",
            }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
            },
        TableName: userid,
        StreamSpecification: {
            StreamEnabled: false,
        },
    });
    try {
        const dbResponse = await db.send(createTableCommand);
        console.log(dbResponse);
    } catch (e) {
        if (e instanceof ResourceInUseException) {
            console.log("user table already exists");
        } else {
            throw e;
        }
    }
}

async function getText(db, tableName, key) {
    await new Promise(r => setTimeout(r, 6000)); //change this

    const getitemcommand = new GetItemCommand({
        TableName: tableName, 
        Key: {
        id: { S: key },
        }
    });
    const dbResponse = await db.send(getitemcommand);
    console.log(dbResponse);
    var text = dbResponse.Item.text.S;
    return text;
}
