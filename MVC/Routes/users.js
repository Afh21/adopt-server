const router = require("express").Router();
const passport = require("passport");
const middleware = require("../../config/validations/middleware/permission");

const { getAllUsers, deleteUser } = require("../Controllers/users");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getAllUsers
);

router.delete(
  "/delete/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  deleteUser
);

module.exports = router;
