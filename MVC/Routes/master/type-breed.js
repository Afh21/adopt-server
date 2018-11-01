const router = require("express").Router();
const middleware = require("../../../config/validations/middleware/permission");
const passport = require("passport");

const {
  getBreeds,
  updateBreed,
  deleteBreed,
  createBreeds
} = require("../../Controllers/master/type-breeds");

router.get(
  "/type-breed",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getBreeds
);

router.post(
  "/type-breed",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  createBreeds
);

router.put(
  "/type-breed/:breedId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  updateBreed
);

router.delete(
  "/type-breed/:breedId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  deleteBreed
);

module.exports = router;
