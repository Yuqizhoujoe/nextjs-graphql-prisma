import _ from "lodash";

export function validateEmail(elementValue) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(elementValue);
}

export const validatePassword = (password) => {
  return password && password.length > 0;
};

export const validateConfirmedPassword = (password, confirmPassoword) => {
  return _.isEqual(password, confirmPassoword);
};

export const validate = (val) => {
  if (!val) return false;

  if (typeof val === "string") return !_.isEmpty(val);

  if (typeof val === "number") return val > 0;

  return true;
};

export function validateImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
