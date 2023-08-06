import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { response } from '../utils/response-util';

const handler = async (event, context) => {
  console.log('debug event', event);

  const dbClient = DynamoDBDocumentClient.from(new DynamoDBClient());

  const { env, appName } = process.env;

  const TableName = `${env}-${appName}-table`;

  try {
    const input = {
      TableName,
      KeyConditionExpression: 'pk = :pk',
      ExpressionAttributeValues: {
        ':pk': '0',
      },
      ExpressionAttributeNames: {
        '#name': 'name',
        '#date': 'date',
        '#by': 'by',
      },
      ProjectionExpression:
        '#date,genre,image,#name,published,title,#by,content,description',
    };

    const command = new QueryCommand(input);

    const items = await dbClient.send(command).then((res) => res.Items);

    return response({ blogs: items || [] });
  } catch (error) {
    console.error('error listing blogs', error.message);
    throw error;
  }
};

export { handler };
