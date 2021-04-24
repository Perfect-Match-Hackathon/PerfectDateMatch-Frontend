import { EMAIL_REGEX, NUMBER_REGEX } from "./constants";

/**
 * Validates email & Password
 * @param { string } email
 * @param { string} password
 * @return { errors[] }
 */
export function validateSignIn(email, password) {
  const _errors = [];

  //? Check parameters are not undefined.
  if (!email) {
    _errors.push({ field: "email", message: "This field is required" });
  }

  if (!password) {
    _errors.push({ field: "password", message: "This field is required" });
  }

  //? Validate email to RFC 2822
  if (!EMAIL_REGEX.test(email.toLowerCase())) {
    _errors.push({ field: "email", message: "Invalid Email" });
  }

  return _errors;
}

/**
 * Validates email & Password
 * @param { string } email
 * @param { string} password
 * @param { string } confirmPassword
 * @param { string } firstName
 * @param { string } lastName
 * @return { [] | [errors] }
 */
export function validateSignUp(
  email,
  password,
  confirmPassword,
  firstName,
  lastName
) {
  const _errors = [];

  //? Check parameters are not undefined.
  if (!email) {
    _errors.push({ field: "email", message: "This field is required" });
  }

  if (!password) {
    _errors.push({ field: "password", message: "This field is required" });
  }

  if (!confirmPassword) {
    _errors.push({
      field: "confirmPassword",
      message: "This field is required",
    });
  }

  if (!firstName) {
    _errors.push({ field: "firstName", message: "This field is required" });
  }

  if (!lastName) {
    _errors.push({ field: "lastName", message: "This field is required" });
  }

  //? Validate email to RFC 2822
  if (!EMAIL_REGEX.test(email.toLowerCase())) {
    _errors.push({ field: "email", message: "Invalid Email" });
  }

  //? Validate password matches confirmPassword;
  if (password !== confirmPassword) {
    _errors.push(
      { field: "password", message: "Password does not match" },
      { field: "confirmPassword", message: "Password does not match" }
    );
  }

  //? If firstname / lastname contains numbers
  if (NUMBER_REGEX.test(firstName)) {
    _errors.push({
      field: "firstName",
      message: "First name cannot contain numbers",
    });
  }

  if (NUMBER_REGEX.test(lastName)) {
    _errors.push({
      field: "lastName",
      message: "Last name cannot contain numbers",
    });
  }

  return _errors;
}
