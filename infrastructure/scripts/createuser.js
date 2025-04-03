const {
  AdminCreateUserCommand,
  AdminGetUserCommand,
} = require("@aws-sdk/client-cognito-identity-provider");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const {
  CognitoIdentityProviderClient,
} = require("@aws-sdk/client-cognito-identity-provider");
const { v4: uuid } = require("uuid");

const getDynamoClient = () => {
  const client = DynamoDBDocumentClient.from(new DynamoDBClient());
  return client;
};

const getCognitoClient = () => {
  const client = new CognitoIdentityProviderClient();
  return client;
};

const getUserFromCognito = async ({ cognito, userPoolId, userName }) => {
  const getUserInput = {
    UserPoolId: userPoolId,
    Username: userName,
  };

  try {
    const user = await cognito.send(new AdminGetUserCommand(getUserInput));

    const attr = user?.UserAttributes.find(
      (item) => item.Name === "custom:userBid"
    );

    return attr?.Value;
  } catch (error) {
    if (error.message.includes("User does not exist")) {
      return null;
    }
    throw new Error(`getting user failed ${error.message}`);
  }
};

const createCognitoUser = async ({
  cognito,
  userPoolId,
  userName,
  firstName,
  lastName,
  phoneNumber,
  email,
}) => {
  const newUserBid = uuid();

  const cognitoInput = {
    UserPoolId: userPoolId,
    Username: userName,
    DesiredDeliveryMediums: ["EMAIL"],
    UserAttributes: [
      {
        Name: "given_name",
        Value: firstName,
      },
      {
        Name: "family_name",
        Value: lastName,
      },
      {
        Name: "phone_number",
        Value: phoneNumber,
      },
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "custom:userBid",
        Value: newUserBid,
      },
    ],
  };

  await cognito.send(new AdminCreateUserCommand(cognitoInput));

  return { userName, userBid: newUserBid };
};

const getUserFromDB = async ({ tableName, dynamo, userName }) => {
  const input = {
    TableName: tableName,
    KeyConditions: {
      pk: {
        AttributeValueList: ["0"],
        ComparisonOperator: "EQ",
      },
      sk: {
        AttributeValueList: [`user#userName:${userName}`],
        ComparisonOperator: "BEGINS_WITH",
      },
    },
  };

  const { Items } = dynamo.send(new QueryCommand(input));

  if (!Items || Items.length === 0) {
    return null;
  }

  return Items[0];
};

const putUserInDB = async ({
  dynamo,
  tableName,
  userName,
  userBid,
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  const dynamoInput = {
    TableName: tableName,
    Item: {
      pk: "0",
      sk: `user#userName:${userName}`,
      firstName,
      lastName,
      email,
      phoneNumber,
      userBid,
    },
  };

  await dynamo.send(new PutCommand(dynamoInput));

  return {
    userName,
  };
};

const main = async () => {
  const {
    userPoolId,
    tableName,
    userName,
    firstName,
    lastName,
    phoneNumber,
    email,
  } = process.env;

  const cognito = getCognitoClient();
  const dynamo = getDynamoClient();

  let userBid = await getUserFromCognito({
    cognito,
    userPoolId,
    userName,
  });

  if (!userBid) {
    const { userBid: coguserBid } = await createCognitoUser({
      cognito,
      dynamo,
      userPoolId,
      tableName,
      userName,
      firstName,
      lastName,
      phoneNumber,
      email,
    });

    userBid = coguserBid;
  }

  const dbUser = await getUserFromDB({ dynamo, tableName, userName });

  if (!dbUser && userBid) {
    await putUserInDB({
      dynamo,
      tableName,
      userName,
      userBid,
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  }

  console.log("debug success", userBid);
};

main();
