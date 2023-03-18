import AWS from 'aws-sdk';
import { response } from '../utils/response-util';

const handler = async (event, context) => {
  console.log('debug event', event);

  const db = new AWS.DynamoDB({ region: 'us-east-1' });

  const { ENV } = process.env;
  const { body = {} } = event;
  const { blog } = body;

  const params = {
    TableName: `${ENV}-blogs-table`,
    Item: blog,
  };

  try {
    const results = await db.putItem(params).promise();

    console.log('debug success', results);
    return response(results);
  } catch (error) {
    console.error('error posting blog', blog.id, error.message);
    throw error;
  }
};

export { handler };
