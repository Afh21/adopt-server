const router = require("express").Router();
const passport = require("passport");
const middleware = require("../../config/validations/middleware/permission");

const {
  createAnimal,
  getAnimal,
  updateAnimal,
  deleteAnimal
} = require("../Controllers/animal");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getAnimal
);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  createAnimal
);

router.put(
  "/edit/:animalId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  updateAnimal
);

router.delete(
  "/delete/:animalId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  deleteAnimal
);

module.exports = router;
