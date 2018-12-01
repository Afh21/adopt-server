const router = require("express").Router();
const passport = require("passport");
const middleware = require("../../config/validations/middleware/permission");

const { getAllDataforDashboard } = require("../Controllers/dashboard");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  middleware.verifyRol,
  getAllDataforDashboard
);

module.exports = router;
