const validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateTypeRh(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "**Rh field is required";
  }

  if (!validator.isLength(data.name, { min: 2, max: 10 })) {
    errors.name = "** Rh must be max 10 characters";
  }

  return { errors, isValid: isEmpty(errors) };
};
