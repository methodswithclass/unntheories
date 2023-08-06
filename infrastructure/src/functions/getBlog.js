import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb';
import { response } from '../utils/response-util';

const handler = async (event, context) => {
  console.log('debug event', event);

  const dbClient = DynamoDBDocumentClient.from(new DynamoDBClient());

  const { env, appName } = process.env;

  const TableName = `${env}-${appName}-table`;
  const { pathParameters = {} } = event;
  const { blog } = pathParameters;
  console.log('debug get blog', blog);

  const requests = ['blogs', 'poetry'];

  try {
    const promises = requests.map((item) => {
      const input = {
        TableName,
        Key: {
          pk: '0',
          sk: `item#${item}#${blog}`,
        },
      };

      const command = new GetCommand(input);

      return dbClient.send(command).then((res) => res.Item);
    });

    const results = await Promise.all(promises);

    console.log('debug results', results);

    const item = results.find((item) => !!item);

    console.log('debug success', item);
    return response({ blog: item });
  } catch (error) {
    console.error('error getting blog', blog, error.message);
    throw error;
  }
};

export { handler };
