exports.verifyRol = (req, res, next) => {
  // Get User from JWT
  let user = req.user;

  if (user === null || user === undefined) {
    return res.status(401).json({
      ok: false,
      message: "Please, Sign In"
    });
  }

  if (user.rol !== "administrator") {
    return res.status(401).json({
      ok: false,
      message: "You don't have permissions for it."
    });
  }
  next();
};
