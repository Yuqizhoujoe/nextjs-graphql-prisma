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

export const validateAmount = (val) => {
  const amount = parseInt(val);
  return amount && amount >= 0;
};

export function validateImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

export function formatCurrency(price) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(price);
}
