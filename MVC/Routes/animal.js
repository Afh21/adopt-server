const router = require("express").Router();
const passport = require("passport");
const middleware = require("../../config/validations/middleware/permission");

const {
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
  getProfileAnimal,
  getListAnimalsAdoptedAndPending,
  updatePhotoByAnimal
} = require("../Controllers/animal");

router.get("/", passport.authenticate("jwt", { session: false }), getAnimal);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  createAnimal
);

router.post(
  "/update/photo/:animalId",
  // passport.authenticate("jwt", { session: false }),
  // middleware.verifyRol,
  updatePhotoByAnimal
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

router.get(
  "/other/animals",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getListAnimalsAdoptedAndPending
);

router.delete(
  "/delete/:animalId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  deleteAnimal
);

module.exports = router;
