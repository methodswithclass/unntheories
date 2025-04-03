import { NonAuth, getHandler } from "../core";

const handler = async (event) => {
  console.log("debug event", event);
  return getHandler({ Services: NonAuth })(event);
};

export { handler };
