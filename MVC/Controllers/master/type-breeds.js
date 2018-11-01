const validateTypeBreeds = require("../../../config/validations/master/type-breeds");
const TypeBreeds = require("../../Models/master-detail/type-breed");

module.exports = {
  getBreeds: async (req, res) => {
    try {
      const breed = await TypeBreeds.find({});
      return res.status(200).json({
        Ok: true,
        message: "Congrats!, Breeds List - GET",
        data: breed
      });
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  },

  createBreeds: (req, res) => {
    const body = req.body;
    const { errors, isValid } = validateTypeBreeds(body);

    if (!isValid) {
      return res.status(400).json({
        message: "Ups! something happened with the record",
        errors: errors,
        ok: false
      });
    }

    TypeBreeds.findOne({ name: body.name }).then(breed => {
      if (breed) {
        errors.name = "Breed already exists!";
        return res.status(400).json({
          ok: false,
          message: "Ups! something happened with the record",
          errors: errors
        });
      }

      const newBreed = new TypeBreeds({ name: body.name });
      newBreed
        .save()
        .then(breed =>
          res.status(200).json({
            ok: true,
            message: "Congrats! Breed created successfully",
            data: breed
          })
        )
        .catch(err => console.log(err));
    });
  },

  updateBreed: (req, res) => {
    const { breedId } = req.params;
    const body = req.body;
    const { errors, isValid } = validateTypeBreeds(body);

    if (!isValid) {
      return res.status(400).json({
        ok: false,
        message: "Ups! something happened with the record",
        errors: errors
      });
    }

    TypeBreeds.findOne({ _id: breedId })
      .then(type => {
        if (!type) {
          errors.name = "Breed don't exist!";
          return res.status(400).json({
            ok: false,
            message: "Ups! type breed don't exists",
            errors: errors
          });
        }

        TypeBreeds.findOneAndUpdate({ _id: breedId }, body)
          .then(breed =>
            res.status(200).json({
              ok: true,
              message: "Congrats! Breed updated.",
              data: breed
            })
          )
          .catch(err =>
            res.status(400).json({
              ok: false,
              message: "Ups! Something happened at Updated",
              errors: err
            })
          );
      })
      .catch(err =>
        res.status(500).json({
          ok: false,
          message: "Ups! Something happened with Id. ",
          errors: err
        })
      );
  },

  deleteBreed: (req, res) => {
    try {
      const { breedId } = req.params;
      TypeBreeds.findOne({ _id: breedId }).then(type => {
        if (!type) {
          return res.status(400).json({
            ok: false,
            message: "Ups! Type Breed don't exists"
          });
        }

        type
          .remove()
          .then(() =>
            res.status(200).json({
              ok: true,
              message: "Congrats!, Type Breed deleted",
              data: type
            })
          )
          .catch(err => console.log(err));
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Ups! Something happened at deleted ",
        errors: error
      });
    }
  }
};
