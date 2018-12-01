const Animal = require("../Models/Animal");
const validateAnimal = require("../../config/validations/animal");
const Moment = require("moment");

module.exports = {
  getAnimal: async (req, res) => {
    try {
      const animals = await Animal.find({ status: "enabled" }).populate(
        "rh breed"
      );
      return res.status(200).json({
        ok: true,
        message: "Congrats! Animals list - GET",
        data: animals
      });
    } catch (error) {
      return res.status(500).json({
        ok: true,
        message: "Ups! Something happened at list",
        errors: error
      });
    }
  },

  getProfileAnimal: async (req, res) => {
    try {
      const { animalId } = req.params;
      const animals = await Animal.find({ _id: animalId });
      return res.status(200).json({
        ok: true,
        message: "Congrats! Animals Profile - GET",
        data: animals
      });
    } catch (error) {
      return res.status(500).json({
        ok: true,
        message: "Ups! Something happened at list",
        errors: error
      });
    }
  },

  createAnimal: async (req, res) => {
    try {
      const body = req.body;
      const { errors, isValid } = validateAnimal(body);

      if (!isValid) {
        return res.status(500).json({
          ok: false,
          message: "Ups! Something happened at created.",
          errors: errors
        });
      }

      const newAnimal = new Animal(body);

      if (body.born != "") {
        const now = Moment(Date.now());
        const born = Moment(new Date(body.born));
        newAnimal.age = parseFloat(now.diff(born, "years", true).toFixed(1));
      }

      if (!body.image) {
        newAnimal.image = null;
      }

      await newAnimal
        .save()
        .then(animalSave => {
          return res.status(200).json({
            ok: true,
            message: "Congrats! Animal save successfully",
            data: animalSave
          });
        })
        .catch(err => {
          return res.status(500).json({
            ok: false,
            message: "Fail at created.",
            error: err
          });
        });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: "Ups! Something happened at save",
        errors: error
      });
    }
  },

  updateAnimal: async (req, res) => {
    try {
      const { animalId } = req.params;
      const body = req.body;
      const { errors, isValid } = validateAnimal(body);

      if (!isValid) {
        return res.status(500).json({
          ok: false,
          message: "Ups! Something happened at updated.",
          errors: errors
        });
      }

      if (body.born) {
        const now = Moment(Date.now());
        const born = Moment(new Date(body.born));
        body.born = born;
        body.age = parseFloat(now.diff(born, "years", true).toFixed(1));
      }

      await Animal.findOneAndUpdate({ _id: animalId }, body)
        .then(animalUpdated => {
          return res.status(200).json({
            ok: true,
            message: "Congrats! Animal updated successfully.",
            data: animalUpdated
          });
        })
        .catch(err => {
          return res.status(500).json({
            ok: false,
            message: "Ups! Something happened at update",
            errors: err
          });
        });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Ups! Something happened with ID at update",
        errors: err
      });
    }
  },

  deleteAnimal: async (req, res) => {
    try {
      const { animalId } = req.params;
      const animal = await Animal.findOneAndRemove({ _id: animalId }).then(
        animalDelete => {
          return res.status(200).json({
            ok: true,
            message: "Congrats! Animal deleted successfully",
            data: animalDelete
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
