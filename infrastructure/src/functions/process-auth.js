import { Auth, getHandler } from "../core";

const handler = async (event) => {
  console.log("debug event", event);
  const { userName } = event?.requestContext?.authorizer || {};
  const { userPoolId } = process.env;
  return getHandler({ Services: Auth, userName, userPoolId })(event);
};

export { handler };
