export const getTimestamp = () => {
  return new Date().toISOString();
};

export const printMessages = (messages) => {
  return messages.reduce((accum, item) => `${accum}#${item}`, "");
};
