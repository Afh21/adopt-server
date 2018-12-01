const User = require("../Models/User");
const Animal = require("../Models/Animal");
const Adoption = require("../Models/Adoption");

module.exports = {
  getAllDataforDashboard: async (req, res) => {
    const animals = await Animal.find({}).count();
    const users = await User.find({}).count();
    const adoption = await Adoption.find({}).count();

    return res.status(200).json({
      data: { animals, users, adoption }
    });
  }
};
