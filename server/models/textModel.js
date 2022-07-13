const { DynamoDBClient, GetItemCommand, CreateTableCommand, ResourceInUseException} = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, DeleteCommand } = require("@aws-sdk/lib-dynamodb")

//The following source was referenced to understand how use GetItemCommand 
//https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/getitemcommand.html

//The following source was referenced to understand how use DynamoDBDocumentClient and DeleteCommand
//https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.DeleteItem.html

//The following source was referenced to understand how to create tables
//https://docs.amazonaws.cn/en_us/amazondynamodb/latest/developerguide/example_dynamodb_CreateTable_section.html

async function getText(tableName, key) {
    const db = new DynamoDBClient({region: 'us-east-1'});
    const getitemcommand = new GetItemCommand({
        TableName: tableName, 
        Key: {
        id: { S: key },
        }
    });
    const dbResponse = await db.send(getitemcommand);
    var text = {
        text: dbResponse.Item.text.S,
        id: dbResponse.Item.id.S
    }
    return text;
}

async function deleteText(userId, id) {
    const db = new DynamoDBClient({region: 'us-east-1'});
    const doc = DynamoDBDocumentClient.from(db);
    await doc.send(new DeleteCommand({
        TableName: userId,
        Key: {
            id: id
        }
    }))
}

async function createTable(userid) {
    const db = new DynamoDBClient({region: 'us-east-1'});
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
    } catch (e) {
        if (e instanceof ResourceInUseException) {
            console.log("user table already exists");
        } else {
            throw e;
        }
    }
}

module.exports = {getText, deleteText, createTable};