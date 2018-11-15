const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAnimal(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.animal = !isEmpty(data.animal) ? data.animal : "";
  data.rh = !isEmpty(data.rh) ? data.rh : "";
  data.breed = !isEmpty(data.breed) ? data.breed : "";
  data.genre = !isEmpty(data.genre) ? data.genre : "";
  data.height = !isEmpty(data.height) ? data.height : "";
  data.weight = !isEmpty(data.weight) ? data.weight : "";
  data.state = !isEmpty(data.state) ? data.state : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "**Name field is required";
  }

  if (validator.isEmpty(data.animal)) {
    errors.animal = "**Animal field is required";
  }

  if (validator.isEmpty(data.rh)) {
    errors.rh = "**Rh field is required";
  }

  if (validator.isEmpty(data.breed)) {
    errors.breed = "**Breed field is required";
  }

  if (validator.isEmpty(data.genre)) {
    errors.genre = "**Genre field is required";
  }

  if (validator.isEmpty(data.height)) {
    errors.height = "**Height field is required";
  }

  if (validator.isEmpty(data.weight)) {
    errors.weight = "**Weight field is required";
  }

  if (validator.isEmpty(data.state)) {
    errors.state = "**State field is required";
  }

  if (!validator.isLength(data.name, { min: 3, max: 50 })) {
    errors.name = "** Name must be between 3 and 50 characters";
  }

  if (!validator.isLength(data.height, { min: 1, max: 2 })) {
    errors.name = "** Height must be not major to 100";
  }

  if (!validator.isLength(data.weight, { min: 1, max: 2 })) {
    errors.name = "** Weight must be not major to 100";
  }

  return { errors, isValid: isEmpty(errors) };
};
