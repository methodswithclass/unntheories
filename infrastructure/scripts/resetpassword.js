const {
  AdminResetUserPasswordCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const {
  CognitoIdentityProviderClient,
} = require("@aws-sdk/client-cognito-identity-provider");

const getCognitoClient = () => {
  const client = new CognitoIdentityProviderClient();
  return client;
};

const main = async () => {
  const { userPoolId, userName } = process.env;

  const cognito = getCognitoClient();
  const input = {
    UserPoolId: userPoolId,
    Username: userName,
  };
  await cognito.send(new AdminResetUserPasswordCommand(input));
};

main();
