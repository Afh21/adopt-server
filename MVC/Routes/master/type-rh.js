const router = require("express").Router();
const middleware = require("../../../config/validations/middleware/permission");
const passport = require("passport");

const {
  createRh,
  updateRh,
  deleteRh,
  getRh
} = require("../../Controllers/master/type-rh");

router.get(
  "/type-rh",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getRh
);

router.post(
  "/type-rh",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  createRh
);

router.put(
  "/type-rh/:rhId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  updateRh
);

router.delete(
  "/type-rh/:rhId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  deleteRh
);

module.exports = router;
