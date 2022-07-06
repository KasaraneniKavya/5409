const { DynamoDBClient, GetItemCommand, CreateTableCommand, ResourceInUseException} = require("@aws-sdk/client-dynamodb");

//References for using aws sdk for dynamoDB: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/classes/getitemcommand.html
//https://docs.amazonaws.cn/en_us/amazondynamodb/latest/developerguide/example_dynamodb_CreateTable_section.html
async function getText(tableName, key) {
    console.log("key")
    console.log(key)
    const db = new DynamoDBClient({region: 'us-east-1'});
    const getitemcommand = new GetItemCommand({
        TableName: tableName, 
        Key: {
        id: { S: key },
        }
    });
    const dbResponse = await db.send(getitemcommand);
    var text = dbResponse.Item.text.S;
    return text;
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

module.exports = {getText, createTable};