const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const Adoption = require("../Models/Adoption");
const Animal = require("../Models/Animal");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({
        ok: true,
        message: "Congrats! Users - GET",
        data: users
      });
    } catch (error) {
      return res.status(500).json({
        ok: true,
        message: "Ups! Something happened at list",
        errors: error
      });
    }
  },

  getProfileAndAdoptions: async (req, res) => {
    try {
      const { userId } = req.params;
      const list = [];
      const adoptions = await Adoption.find({})
        .populate("animal")
        .exec()
        .then(adoption => {
          adoption.map(data => {
            if (data.user.toString() === userId.toString()) {
              list.push(data);
            }
          });
        })
        .then(() => {
          return res.status(200).json({
            data: list
          });
        });
    } catch (error) {
      return res.status(500).json({
        ok: true,
        message: "Ups! Something happened at profile",
        errors: error
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userId } = req.params;
      let updateUser = req.body;

      if (req.body.password) {
        updateUser.password = bcrypt.hashSync(req.body.password, 10);
      }

      await User.findOneAndUpdate(
        { _id: userId },
        { $set: updateUser },
        { new: true }
      ).then(userUpdate => {
        return res.status(200).json({
          ok: true,
          message: "Congrats, User updated successfully",
          data: userUpdate
        });
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Ups! Something happened at updated.",
        error
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;

      const adoptions = await Adoption.find({}).exec();

      adoptions.map(adoption => {
        if (adoption.user.toString() === userId.toString()) {
          Animal.findOneAndUpdate(
            { _id: adoption.animal.toString() },
            { status: "enabled" }
          )
            .then(() => {})
            .catch(err => console.log(err));

          adoption.remove();
        }
      });

      User.findOneAndRemove({ _id: userId })
        .then(() => {
          return res
            .status(200)
            .json({ message: "User deleted, adoptions deleted" });
        })
        .catch(err => console.log(err));
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Ups! Something happened at deleted.",
        error
      });
    }
  }
};
