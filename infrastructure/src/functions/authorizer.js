import { CognitoJwtVerifier } from "aws-jwt-verify";

const accessJwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.userPoolId,
  clientId: process.env.appClientId,
  tokenUse: "access",
});

const handler = async (event) => {
  console.log(`debug event: ${JSON.stringify(event)}`);

  const {
    headers: { Authorization: authToken = "" },
    methodArn,
  } = event;

  try {
    const decodedAccessJWT = await accessJwtVerifier.verify(authToken);

    const policyDocument = {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: methodArn,
        },
      ],
    };

    const context = {
      userBid: decodedAccessJWT["custom:userBid"],
      userName: decodedAccessJWT.username,
      role: "ADMIN",
    };

    const response = {
      principalId: decodedAccessJWT.sub,
      policyDocument,
      context,
    };

    console.log(
      `debug access: ${JSON.stringify(
        decodedAccessJWT
      )}, response: ${JSON.stringify(response)}`
    );

    return response;
  } catch (err) {
    console.error("error invalid auth token:", err.message);
    throw new Error("Unauthorized");
  }
};

export { handler };
