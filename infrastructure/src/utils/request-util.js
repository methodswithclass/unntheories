export const parseEvent = ({ event }) => {
  const { body = "" } = event;
  let parsed = {};
  try {
    parsed = JSON.parse(body);
  } catch (error) {
    console.error("debug error parsing body", body);
    throw error;
  }

  return parsed;
};
