import AWS from 'aws-sdk';
import { response } from '../utils/response-util';

const handler = async (event, context) => {
  console.log('debug event', event);

  const db = new AWS.DynamoDB.DocumentClient();

  const { ENV } = process.env;
  const { body = '' } = event;
  let parsed = {};
  try {
    parsed = JSON.parse(body);
  } catch (error) {
    console.error('debug error parsing body', body);
  }
  const { blog } = parsed;

  const params = {
    TableName: `${ENV}-blogs-table`,
    Item: blog,
  };

  try {
    const results = await db.put(params).promise();

    console.log('debug success', results);
    return response(results);
  } catch (error) {
    console.error('error posting blog', blog.id, error.message);
    throw error;
  }
};

export { handler };
