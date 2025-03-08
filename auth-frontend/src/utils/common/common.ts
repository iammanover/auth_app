import { Regex } from "../enum/Regex.enum";

// used for validate email
export const validateEmail = (email: string) => {
  const emailRegex = new RegExp(Regex.EMAIL);
  return emailRegex.test(email);
};

// used for validate password
export const validatePassword = (password: string) => {
  const passwordRegex = new RegExp(Regex.PASSWORD);
  return passwordRegex.test(password);
};
