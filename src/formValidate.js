export const usernameValidate = {
  required: {
    value: true,
    message: "Please enter a username",
  },
  minLength: {
    value: 3,
    message: "Your username must be at least 3 characters long",
  },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: "Your username cannot contain any special symbols",
  },
};

export const emailValidate = {
  required: {
    value: true,
    message: "Please enter an email address",
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Your email address is not valid",
  },
};

export const passwordValidate = {
  required: {
    value: true,
    message: "Please enter a password",
  },
  minLength: {
    value: 6,
    message: "Your password must be at least 6 characters long",
  },
};