// Modules
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

//
const UserModel = require("../../Models/User");
const keys = require("../../../config/constants");

// Validations Input
const validateRegisterInput = require("../../../config/validations/auth/register");
const validateLoginInput = require("../../../config/validations/auth/login");

module.exports = {
  // @route   POST -> auth/register
  // @desc    Register User
  // @access Public
  register: (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json({
        message: "Something in register unsuccessfully",
        errors: errors,
        ok: isValid
      });
    }

    UserModel.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "Email already exists";
        return res.status(400).json({
          message: "Something in register unsuccessfully",
          errors: errors,
          ok: isValid
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" //Default
        });

        const newUser = new User({
          name: req.body.name,
          lastname: req.body.lastname,
          identity: req.body.identity,
          phone: req.body.phone,
          address: req.body.address,
          email: req.body.email,
          avatar,
          password: req.body.password,
          password2: req.body.password2
        });

        if (req.body.rol) {
          newUser.rol = req.body.rol;
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user =>
                res.json({
                  message: "Register successfully",
                  data: user,
                  errors: errors,
                  ok: isValid
                })
              )
              .catch(err => console.log(err));
          });
        });
      }
    });
  },

  // @route   POST -> auth/login
  // @desc    Login User - Return JWT Token
  // @access Private
  login: async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json({
        message: "Login unsuccessfully",
        errors: errors,
        ok: isValid
      });
    }

    const { email, password } = req.body;

    // Find User by email
    await User.findOne({ email: email }).then(user => {
      // Check for User
      if (!user) {
        errors.email = "User not found";
        return res.status(404).json({
          message: "User doesn't exists",
          errors: errors,
          ok: false
        });
      }

      // Check Password
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            // User Matched
            const payload = {
              id: user.id,
              name: user.name,
              lastname: user.lastname,
              identity: user.identity,
              phone: user.phone,
              address: user.address,
              email: user.email,
              rol: user.rol,
              avatar: user.avatar
            }; // Create JWT Payload

            // Sign Token
            jwt.sign(
              payload,
              keys.secretJwt,
              { expiresIn: 7200 },
              (err, token) => {
                res.json({
                  message: "Token generate successfully",
                  ok: true,
                  token: "Bearer " + token,
                  errors: errors
                });
              }
            );
          } else {
            errors.password = "Password Incorrect";
            return res.status(400).json({
              message: "Ups! Password incorrect.",
              ok: false,
              errors: errors
            });
          }
        })
        .catch(err => console.log(err));
    });
  }
};
