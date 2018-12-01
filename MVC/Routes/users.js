const router = require("express").Router();
const passport = require("passport");
const middleware = require("../../config/validations/middleware/permission");

const {
  getAllUsers,
  deleteUser,
  getProfileAndAdoptions,
  updateUser
} = require("../Controllers/users");

// GUEST
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getAllUsers
);

router.get(
  "/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  getProfileAndAdoptions
);

router.put(
  "/update/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  updateUser
);

// ADMINISTRATOR
router.delete(
  "/delete/:userId",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  deleteUser
);

module.exports = router;
