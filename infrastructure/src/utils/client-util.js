import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

export const getDynamoClient = () => {
  const client = DynamoDBDocumentClient.from(new DynamoDBClient());
  return client;
};

export const getCognitoClient = () => {
  const client = new CognitoIdentityProviderClient();
  return client;
};

export const getClients = () => {
  const cognito = getCognitoClient();
  const dynamo = getDynamoClient();

  return {
    cognito,
    dynamo,
  };
};

export default {
  getDynamoClient,
  getCognitoClient,
  getClients,
};
