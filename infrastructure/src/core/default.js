export const callDummy = ({ userBid, userName }) => {
  return { success: "hello this is dummy", userBid, userName };
};

export const none = () => ({ success: "no process name" });

export default { callDummy, none };
