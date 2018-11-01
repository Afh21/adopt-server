const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : " ";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : " ";
  data.phone = !isEmpty(data.phone) ? data.phone : " ";
  data.identity = !isEmpty(data.identity) ? data.identity : " ";
  data.email = !isEmpty(data.email) ? data.email : " ";
  data.password = !isEmpty(data.password) ? data.password : " ";
  data.password2 = !isEmpty(data.password2) ? data.password2 : " ";

  if (Validator.isEmpty(data.name)) {
    errors.name = "**Name field is required";
  }

  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "**Lastname field is required";
  }

  if (Validator.isEmpty(data.identity)) {
    errors.identity = "**Identity  field is required";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "**Phone field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "**Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "**Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "**Confirm password field is required";
  }

  // ======================================================

  if (!Validator.isLength(data.lastname, { min: 2, max: 30 })) {
    errors.lastname = "Lastname must be between 2 and 30 characters";
  }

  if (!Validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 characters";
  }

  if (!Validator.isLength(data.identity, { min: 8, max: 11 })) {
    errors.identity = "Identity must be almost 11 characters";
  }

  if (!Validator.isLength(data.phone, { min: 7, max: 10 })) {
    errors.phone = "Phone must be between 7 and 10 characters";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
    errors.password = "Password must be at least 8 characteres";
  }

  // ======================================================

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "The password aren't equals";
  }

  return { errors, isValid: isEmpty(errors) };
};
