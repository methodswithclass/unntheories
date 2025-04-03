import {
  AdminCreateUserCommand,
  AdminGetUserCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { getTimestamp, printMessages } from "../utils/utils";

const getUserFromCognito = async ({ cognito, userPoolId, userNameField }) => {
  console.log("debug get user from cognito");
  const getUserInput = {
    UserPoolId: userPoolId,
    Username: userNameField,
  };

  try {
    const user = await cognito.send(new AdminGetUserCommand(getUserInput));

    return user?.Username;
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
  userNameField,
  firstName,
  lastName,
  phoneNumber,
  email,
}) => {
  console.log("debug create cognito user");
  const cognitoInput = {
    UserPoolId: userPoolId,
    Username: userNameField,
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
    ],
  };

  try {
    await cognito.send(new AdminCreateUserCommand(cognitoInput));

    return userNameField;
  } catch (error) {
    console.log("debug error creating user in cognito", error.message);
    return null;
  }
};

const getUserFromDB = async ({ tableName, dynamo, userNameField }) => {
  console.log("debug get user from db", userNameField);
  const input = {
    TableName: tableName,
    KeyConditions: {
      pk: {
        AttributeValueList: ["0"],
        ComparisonOperator: "EQ",
      },
      sk: {
        AttributeValueList: [`user#userName:${userNameField}`],
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

const createUserInDB = async ({
  dynamo,
  tableName,
  userNameField,
  userName,
  userBid,
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  console.log("debug create user in db", userNameField);
  const timestamp = getTimestamp();
  const dynamoInput = {
    TableName: tableName,
    Item: {
      pk: "0",
      sk: `user#userName:${userNameField}`,
      firstName,
      lastName,
      email,
      phoneNumber,
      userBid,
      createdBy: userName,
      createdOn: timestamp,
      updatedBy: userName,
      updatedOn: timestamp,
    },
  };

  await dynamo.send(new PutCommand(dynamoInput));

  return {
    userName: userNameField,
  };
};

const createUser = async ({
  cognito,
  dynamo,
  userPoolId,
  tableName,
  userNameField,
  userName,
  firstName,
  lastName,
  phoneNumber,
  email,
}) => {
  console.log("debug createUser", userNameField);
  const messages = [];
  let result = await getUserFromCognito({
    cognito,
    userPoolId,
    userNameField,
  });

  if (!result) {
    result = await createCognitoUser({
      cognito,
      dynamo,
      userPoolId,
      tableName,
      userNameField,
      firstName,
      lastName,
      phoneNumber,
      email,
    });
    messages.push("user created in cognito");
  }

  if (!result) {
    return { message: "no user created", success: false };
  }

  const dbUser = await getUserFromDB({
    dynamo,
    tableName,
    userNameField,
  });

  if (!dbUser) {
    const { userName: newUserName } = await createUserInDB({
      dynamo,
      tableName,
      userNameField,
      userName,
      userBid,
      firstName,
      lastName,
      email,
      phoneNumber,
    });

    messages.push("user created in db");

    if (!newUserName) {
      return { message: "no user created", success: false };
    }

    return {
      message: printMessages(messages),
      success: true,
      userNameField: newUserName,
    };
  }

  return {
    message: printMessages(messages),
    success: true,
    userNameField: result,
  };
};

const getUser = async (payload) => {
  return getUserFromDB(payload);
};

const updateUserInDB = async ({
  tableName,
  dynamo,
  userName,
  userNameField,
  firstName,
  lastName,
  email,
  phoneNumber,
}) => {
  console.log("debug updateUserInBD", userNameField);
  const currentUser = await getUserFromDB({ tableName, dynamo, userNameField });
  const timestamp = getTimestamp();
  const dynamoInput = {
    TableName: tableName,
    Item: {
      ...currentUser,
      firstName,
      lastName,
      email,
      phoneNumber,
      updatedBy: userName,
      updatedOn: timestamp,
    },
  };

  await dynamo.send(new PutCommand(dynamoInput));

  return {
    userName: userNameField,
  };
};

const updateUser = async (payload) => {
  return updateUserInDB(payload);
};

const listUsers = async ({ tableName, dynamo }) => {
  console.log("debug listUsers");
  const input = {
    TableName: tableName,
    KeyConditions: {
      pk: {
        AttributeValueList: ["0"],
        ComparisonOperator: "EQ",
      },
      sk: {
        AttributeValueList: [`user#userName:`],
        ComparisonOperator: "BEGINS_WITH",
      },
    },
  };

  console.log("debug input", JSON.stringify(input));

  const { Items } = await dynamo.send(new QueryCommand(input));

  console.log("debug items", Items);

  return Items;
};

export default { createUser, updateUser, getUser, listUsers };
