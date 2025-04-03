const storage = {};

const resolveValue = (value) => {
  return value === "null"
    ? null
    : value === "undefined"
    ? undefined
    : value === "true"
    ? true
    : value === "false"
    ? false
    : value;
};

export const setStore = (key, value) => {
  storage[key] = value;
};

export const getStore = (key) => {
  return resolveValue(storage[key]);
};

export const setLocal = (key, value) => {
  localStorage.setItem(key, value);
};

export const getLocal = (key) => {
  return resolveValue(localStorage.getItem(key));
};
