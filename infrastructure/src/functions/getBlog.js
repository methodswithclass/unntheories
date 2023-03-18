import AWS from 'aws-sdk';
import { response } from '../utils/response-util';

const handler = async (event, context) => {
  console.log('debug event', event);

  const db = new AWS.DynamoDB({ region: 'us-east-1' });

  const { ENV } = process.env;
  const { pathParameters = {} } = event;
  const { blog } = pathParameters;
  console.log('debug get blog', blog);

  const params = {
    TableName: `${ENV}-blogs-table`,
    Key: {
      id: { S: blog },
    },
  };

  try {
    const results = await db
      .getItem(params)
      .promise()
      .catch((error) => {
        if (error.code === 'ResourceNotFoundException') {
          return {};
        }
        throw error;
      });

    console.log('debug success', results);
    return response(results);
  } catch (error) {
    console.error('error getting blog', blog, error.message);
    throw error;
  }
};

export { handler };
