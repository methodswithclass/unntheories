import AWS from 'aws-sdk';
import { response } from '../utils/response-util';

const handler = async (event, context) => {
  console.log('debug event', event);

  const db = new AWS.DynamoDB.DocumentClient();

  const { ENV } = process.env;
  const { pathParameters = {} } = event;
  const { blog } = pathParameters;
  console.log('debug get blog', blog);

  const params = {
    TableName: `${ENV}-blogs-table`,
    ScanFilter: {
      id: {
        AttributeValueList: [blog],
        ComparisonOperator: 'EQ',
      },
    },
  };

  try {
    const results = await db.scan(params).promise();
    const { Items: blogs } = results;
    const [result = {}] = blogs;

    console.log('debug success', results);
    return response(result);
  } catch (error) {
    console.error('error getting blog', blog, error.message);
    throw error;
  }
};

export { handler };
