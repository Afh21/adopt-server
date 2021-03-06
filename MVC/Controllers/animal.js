const Animal = require("../Models/Animal");
const validateAnimal = require("../../config/validations/animal");
const Moment = require("moment");
const multer = require("multer");
const path = require("path");

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

  getListAnimalsAdoptedAndPending: async (req, res) => {
    try {
      const animals = await Animal.find({})
        .populate("breed rh")
        .exec();
      const list = animals.filter(currentValue => {
        return currentValue.status !== "enabled";
      });

      return res.status(200).json({
        ok: true,
        message: "Congrats! Animals List - GET",
        data: list
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
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

  updatePhotoByAnimal: async (req, res) => {
    const { animalId } = req.params;

    const storage = multer.diskStorage({
      destination: "./public/uploads/",
      filename: function(req, file, cb) {
        cb(null, "adoption-" + Date.now() + path.extname(file.originalname));
      }
    });

    const upload = multer({
      storage: storage,
      limits: { fileSize: 1000000 }
    }).single("photo");

    upload(req, res, err => {
      if (!err) {
        const pathImage = req.file.path.replace("public", "");
        const pathNew = pathImage.replace("\\", "/");

        Animal.findOneAndUpdate(
          { _id: animalId },
          { image: pathNew },
          { new: true }
        ).then(() => {
          return res.status(200).json({
            message: "Image upload successfully"
          });
        });
      }
    });
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
