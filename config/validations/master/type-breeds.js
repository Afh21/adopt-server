const validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function validateTypeBreeds(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "**Name field is required";
  }

  if (!validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = "** Name must be between 3 and 50 characters";
  }

  return { errors, isValid: isEmpty(errors) };
};
