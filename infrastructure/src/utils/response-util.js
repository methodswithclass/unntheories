export const response = (data) => {
  const { headers, ...rest } = data || {};
  const responseBody = {
    success: 'true',
    ...rest,
  };

  const respObj = {
    statusCode: 200,
    headers: {
      ...headers,
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      // "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(responseBody),
  };

  return respObj;
};
