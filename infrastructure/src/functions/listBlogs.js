import AWS from 'aws-sdk';
import { response } from '../utils/response-util';

const handler = async (event, context) => {
  console.log('debug event', event);

  const db = new AWS.DynamoDB({ region: 'us-east-1' });

  const { ENV } = process.env;

  const queries = [{ genre: 'blogs' }, { genre: 'poetry' }];

  try {
    const promises = queries.map(async (query) => {
      const { genre } = query;

      const params = {
        TableName: `${ENV}-blogs-table`,
        KeyConditions: {
          genre: {
            AttributeValueList: [{ S: genre }],
            ComparisonOperator: 'EQ',
          },
        },
      };

      const blogs = await db
        .query(params)
        .promise()
        .catch((error) => {
          if (error.code === 'ResourceNotFoundException') {
            return [];
          }
          throw error;
        });

      return {
        genre,
        blogs,
      };
    });

    const results = await Promise.all(promises);

    const resultObj = results.reduce((accum, item) => {
      return {
        ...accum,
        [item.genre]: item.blogs,
      };
    }, {});

    return response(resultObj);
  } catch (error) {
    console.error('error listing blogs', error.message);
    throw error;
  }
};

export { handler };
