// Validations Input
const validateTypeAnimal = require("../../../config/validations/master/type-animal");
const TypeAnimal = require("../../Models/master-detail/type-animals");

module.exports = {
  // Create Type Animal
  createTypeAnimal: async (req, res) => {
    const body = req.body;
    const { errors, isValid } = validateTypeAnimal(body);

    // check validation
    if (!isValid) {
      return res.status(400).json({
        message: "Ups! something happened with the record",
        errors: errors,
        ok: false
      });
    }

    TypeAnimal.findOne({ name: body.name }).then(type => {
      if (type) {
        errors.name = "Type animal already exists";
        return res.status(400).json({
          ok: false,
          message: "Ups! something happened with the record",
          errors: errors
        });
      }

      const typeAnimal = new TypeAnimal({ name: body.name });

      typeAnimal
        .save()
        .then(type =>
          res.json({
            ok: true,
            message: "Congrats! Type created successfully",
            data: type,
            errors: errors
          })
        )
        .catch(err => console.log(err));
    });
  },

  // Get Type Animals.
  getTypeAnimals: async (req, res) => {
    try {
      const types = await TypeAnimal.find({});
      res.status(200).json({
        message: "Congrats! Type Animals - GET",
        data: types,
        ok: true
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Ups! Something happened - GET ",
        errors: error
      });
    }
  },

  // Update Type Animal
  updateTypeAnimal: (req, res) => {
    const body = req.body;
    const { typeId } = req.params;

    const { errors, isValid } = validateTypeAnimal(body);

    if (!isValid) {
      return res.status(400).json({
        ok: false,
        message: "Ups! something happened with the record",
        errors: errors
      });
    }

    // Update by _id
    TypeAnimal.findOne({ _id: typeId }).then(type => {
      if (!type) {
        return res.status(400).json({
          ok: false,
          message: "Ups! type animal don't exists",
          errors: errors
        });
      }

      TypeAnimal.findOneAndUpdate({ _id: typeId }, body)
        .then(typeX =>
          res.status(200).json({
            ok: true,
            message: "Congrats! Type Animal updated.",
            data: typeX
          })
        )
        .catch(err =>
          res.status(400).json({
            ok: false,
            message: "Ups! Something happened at Updated",
            errors: err
          })
        );
    });
  },

  // Delete Type Animal
  deleteTypeAnimal: (req, res) => {
    try {
      const { typeId } = req.params;
      TypeAnimal.findOne({ _id: typeId }).then(type => {
        if (!type) {
          return res.status(400).json({
            ok: false,
            message: "Ups! Type Animal don't exists"
          });
        }

        type.remove().then(() =>
          res.status(200).json({
            ok: true,
            message: "Congrats!, TypeAnimal deleted",
            data: type
          })
        );
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Ups! Something happened with deleted ",
        errors: error
      });
    }
  }
};
