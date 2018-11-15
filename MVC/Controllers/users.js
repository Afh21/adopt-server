const User = require("../Models/User");

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

  deleteUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await User.findOneAndRemove({ _id: userId }).then(
        userDelete => {
          return res.status(200).json({
            ok: true,
            message: "Congrats! user deleted successfully",
            data: userDelete
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Ups! Something happened at deleted.",
        error
      });
    }
  }
};
