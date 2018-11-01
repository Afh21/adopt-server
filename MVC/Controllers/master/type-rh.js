const validateTypeRh = require("../../../config/validations/master/type-rh");
const TypeRh = require("../../Models/master-detail/type-rh");

module.exports = {
  getRh: async (req, res) => {
    try {
      const rh = await TypeRh.find({});
      return res.status(200).json({
        Ok: true,
        message: "Congrats!, Rh List - GET",
        data: rh
      });
    } catch (err) {
      return res.status(500).json({
        error: err
      });
    }
  },

  createRh: (req, res) => {
    const body = req.body;
    const { errors, isValid } = validateTypeRh(body);

    if (!isValid) {
      return res.status(400).json({
        message: "Ups! something happened at create",
        errors: errors,
        ok: false
      });
    }

    TypeRh.findOne({ name: body.name }).then(rh => {
      if (rh) {
        errors.name = "Rh already exists!";
        return res.status(400).json({
          ok: false,
          message: "Ups! something happened at create",
          errors: errors
        });
      }

      const newRh = new TypeRh({ name: body.name });
      newRh
        .save()
        .then(Rh =>
          res.status(200).json({
            ok: true,
            message: "Congrats! Rh created successfully",
            data: Rh
          })
        )
        .catch(err => console.log(err));
    });
  },

  updateRh: (req, res) => {
    const { rhId } = req.params;
    const body = req.body;
    const { errors, isValid } = validateTypeRh(body);

    if (!isValid) {
      return res.status(400).json({
        ok: false,
        message: "Ups! something happened with the record",
        errors: errors
      });
    }

    TypeRh.findOne({ _id: rhId })
      .then(type => {
        if (!type) {
          errors.name = "Rh don't exist!";
          return res.status(400).json({
            ok: false,
            message: "Ups! type Rh don't exists",
            errors: errors
          });
        }

        TypeRh.findOneAndUpdate({ _id: rhId }, body)
          .then(Rh =>
            res.status(200).json({
              ok: true,
              message: "Congrats! Rh updated.",
              data: Rh
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

  deleteRh: (req, res) => {
    try {
      const { rhId } = req.params;
      TypeRh.findOne({ _id: rhId }).then(type => {
        if (!type) {
          return res.status(400).json({
            ok: false,
            message: "Ups! Type Rh don't exists"
          });
        }

        type
          .remove()
          .then(() =>
            res.status(200).json({
              ok: true,
              message: "Congrats!, Type Rh deleted",
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
