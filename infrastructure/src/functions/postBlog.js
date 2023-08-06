import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { response } from '../utils/response-util';

const handler = async (event, context) => {
  console.log('debug event', event);

  const dbClient = DynamoDBDocumentClient.from(new DynamoDBClient());

  const { env, appName } = process.env;

  const TableName = `${env}-${appName}-table`;
  const { body = '' } = event;
  let parsed = {};
  try {
    parsed = JSON.parse(body);
  } catch (error) {
    console.error('debug error parsing body', body);
    throw error;
  }
  const { blog } = parsed;

  const blogObj = {
    pk: '0',
    sk: `item#${blog.genre}#${blog.name}`,
    ...blog,
  };

  try {
    const input = {
      TableName,
      Item: blogObj,
    };

    const command = new PutCommand(input);

    const results = await dbClient.send(command);

    console.log('debug success', results);
    return response({ data: results });
  } catch (error) {
    console.error('error posting blog', blog.id, error.message);
    throw error;
  }
};

export { handler };
