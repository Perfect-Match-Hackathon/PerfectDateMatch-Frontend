import { EMAIL_REGEX } from "./constants";

/**
 * Validates email & Password
 * @param { string } email 
 * @param { string} password 
 * @return { errors[] }
 */
export default function validate(email, password) {
    const _errors = [];

    //? Check parameters are not undefined.
    if (!email) {
        _errors.push({ field: "email", message: "This field is required"});
    }

    if (!password) {
        _errors.push({ field: "password", message: "This field is required"});
    }

    //? Validate email to RFC 2822
    if (!EMAIL_REGEX.test(email.toLowerCase())) {
        _errors.push({ field: "email", message: "Invalid Email"});
    }

    return _errors;
}