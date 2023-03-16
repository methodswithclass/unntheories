import AWS from 'aws-sdk';

const handler = async (event, context) => {
  console.log('debug event', event);

  const db = AWS.DynamoDB({ region: 'us-east-1' });

  const { ENV } = process.env;
  const { blog } = event;

  const params = {
    TableName: `${ENV}-blogs-table`,
    Item: blog,
  };

  try {
    const results = await db.putItem(params).promise();

    console.log('debug success', results);
    return results;
  } catch (error) {
    console.error('error posting blog', blog.id, error.message);
    throw error;
  }
};

export { handler };
