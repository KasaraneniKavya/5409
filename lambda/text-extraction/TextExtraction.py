import json
import boto3

def lambda_handler(event, context):

    print(event)
    bucket = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]
        
    try:
        #reference for using textract: https://docs.aws.amazon.com/textract/latest/dg/lambda.html
        textractClient = boto3.client('textract')
        response = textractClient.detect_document_text(Document={'S3Object': {'Bucket': bucket, 'Name': key}})
        blocks = response['Blocks']
        print(blocks)
        
        #Get lines of text
        lines = []
        for block in blocks:
            if block["BlockType"] == "LINE":
                lines.append(block["Text"])
            
        content = "\n".join(lines)
        print(content)
        if content:
            tableName = key.split("/")[0]
            id = key.split("/")[1]
            
            #reference for using dynamodb update: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.update_item
            dynamodb = boto3.resource('dynamodb')
            response = dynamodb.Table(tableName).put_item(Item={"id": id, "text": content})
            print(response)
        else:
            print("no text in ima")
            delete(bucket, key);
        
    except Exception as e:
        print(e)
        delete(bucket, key)
        
        
def delete(bucket, key):
    #reference for using s3 delete object: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/s3.html#S3.Client.delete_object
    s3Client = boto3.client('s3')
    s3Client.delete_object(
        Bucket = bucket,
        Key = key
    )
    print("image deleted")