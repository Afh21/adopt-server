const router = require("express").Router();
const middleware = require("../../../config/validations/middleware/permission");
const passport = require("passport");

const {
  createTypeAnimal,
  getTypeAnimals,
  updateTypeAnimal,
  deleteTypeAnimal
} = require("../../Controllers/master/type-animal");

// Get type - animal
router.get(
  "/type-animal",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getTypeAnimals
);

// Create type - animal
router.post(
  "/type-animal",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  createTypeAnimal
);

// Update type - animal
router.put(
  "/type-animal/:typeId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  updateTypeAnimal
);

// Delete type - animal
router.delete(
  "/type-animal/:typeId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  deleteTypeAnimal
);

module.exports = router;

// 01 8000 94 4430
// Lunes Sabado 7:00 am -  7:00 pm
