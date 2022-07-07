import json
import boto3

def lambda_handler(event, context):

    try:
        print(event)
    
        bucket = event["Records"][0]["s3"]["bucket"]["name"]
        key = event["Records"][0]["s3"]["object"]["key"]

        textractClient = boto3.client('textract')
    
        #reference for using textract: https://docs.aws.amazon.com/textract/latest/dg/lambda.html
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

        tableName = key.split("/")[0]
        id = key.split("/")[1]
        
        #reference for usiing dynamodb: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/dynamodb.html#DynamoDB.Client.update_item
        dynamodb = boto3.resource('dynamodb')
        response = dynamodb.Table(tableName).put_item(Item={"id": id, "text": content})
        
        print(response)
        
    except Exception as e:
        print(e)