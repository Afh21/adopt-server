const router = require("express").Router();
const passport = require("passport");
const middleware = require("../../config/validations/middleware/permission");

const {
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getProfileAnimal
} = require("../Controllers/animal");

router.get("/", passport.authenticate("jwt", { session: false }), getAnimal);

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

router.get(
  "/:animalId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getProfileAnimal
);

router.delete(
  "/delete/:animalId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  deleteAnimal
);

module.exports = router;
