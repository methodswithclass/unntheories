import { response } from "../utils/response-util";
import { parseEvent } from "../utils/request-util";
import { getClients } from "../utils/client-util";

export const getHandler =
  ({ Services = {}, userName, userPoolId }) =>
  async (event) => {
    try {
      const { env, appName } = process.env;

      const tableName = `${env}-${appName}-table`;
      const clients = getClients();

      const parsed = parseEvent({ event });

      const { operation = "none", input = {} } = parsed;
      console.log(
        "debug operation",
        operation,
        "by",
        userName,
        "input",
        JSON.stringify(input)
      );

      const runProcess = Services[operation];

      if (typeof runProcess !== "function") {
        throw new Error(`error no process for operation: ${operation}`);
      }

      const data = await runProcess({
        ...input,
        ...clients,
        tableName,
        userName,
        userPoolId,
      });

      return response({ operation, data });
    } catch (error) {
      console.error("error in process", error.message);
      throw error;
    }
  };
