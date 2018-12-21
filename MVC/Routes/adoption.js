const router = require("express").Router();
const passport = require("passport");
const middleware = require("../../config/validations/middleware/permission");

const {
  createAdoption,
  getAdoptions,
  cancelAdoption,
  acceptAdoption
} = require("../Controllers/adoptions");

// GUEST

router.post(
  "/adoption",
  passport.authenticate("jwt", { session: false }),
  createAdoption
);

router.delete(
  "/adoption/:adoptionId",
  passport.authenticate("jwt", { session: false }),
  cancelAdoption
);

// ADMINISTRATORS

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  // middleware.verifyRol,   -> Comentado para prueba en el caso de ver adopciones en el mapa.
  getAdoptions
);

router.post(
  "/adoption/accept/:adoptionId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  acceptAdoption
);

module.exports = router;
