const Adoption = require("../Models/Adoption");
const Animal = require("../Models/Animal");

module.exports = {
  // Funciones para "INVITADOS"
  createAdoption: async (req, res) => {
    try {
      const { id } = req.user;
      const body = req.body;

      const query = await Adoption.find({}).exec();
      let valid = false;

      query.map(animal => {
        if (animal.animal.toString() === body.animal.toString()) {
          valid = true;
        }
        return valid;
      });

      if (valid) {
        return res.json({ message: "No puedes adoptar, lo siento. " });
      }

      const adoptionCreated = new Adoption({
        user: id,
        animal: body.animal
      });

      return adoptionCreated
        .save()
        .then(animalSaved => {
          return res.status(200).json({
            ok: true,
            message: "Congrats! Adoption successfully",
            data: animalSaved
          });
        })
        .then(() => {
          let updateStatusAnimal = { status: "pending" };
          Animal.findOneAndUpdate(
            { _id: body.animal.toString() },
            { $set: updateStatusAnimal }
          )
            .then(animalUpdate => {
              res.json({
                message: "Update status animal a 'pending' ",
                animalUpdate
              });
            })
            .catch(err => console.log);
        })
        .catch(err => {
          console.log;
        });
    } catch (err) {}
  },

  cancelAdoption: async (req, res) => {
    try {
      const { _id } = req.user;
      const { adoptionId } = req.params;

      await Adoption.findOne({ _id: adoptionId.toString() })
        .then(adoption => {
          // console.log("adopt ", adoption);

          if (adoption.user.toString() === _id.toString()) {
            adoption.remove();

            let updateAnimalStatus = { status: "enabled" };
            Animal.findOneAndUpdate(
              { _id: adoption.animal.toString() },
              { $set: updateAnimalStatus }
            )
              .then(() => {
                return res.status(200).json({
                  ok: true,
                  message: "Congrats! You have canceled this adoptions.",
                  data: adoption
                });
              })
              .catch(err => console.log);
          }
        })
        .catch(err => {
          return res.status(500).json({
            ok: false,
            message: "Ups! Something happened at cancel your request",
            error: err
          });
        });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Ups! Server fail. Try Again",
        error: error
      });
    }
  },

  // Funciones para "ADMINISTRADORES"
  getAdoptions: async (req, res) => {
    try {
      const animals = await Adoption.find({}).populate("user animal");
      return res.status(200).json({
        ok: true,
        message: "Congrats! List adoptions ",
        data: animals
      });
    } catch (error) {
      return res.status(500).json({
        ok: true,
        message: "Ups! Something happened at list ",
        error: error
      });
    }
  },

  acceptAdoption: async (req, res) => {
    const { adoptionId } = req.params;

    Adoption.findOneAndUpdate({ _id: adoptionId }, { confirmed: true })
      .then(adoption => {
        Animal.findOneAndUpdate(
          { _id: adoption.animal.toString() },
          { status: "adopted" }
        )
          .then(() => {
            return res.status(200).json({
              ok: true,
              message: "Request of adoption upgrade. ",
              data: adoption
            });
          })
          .catch(err => console.log);
      })
      .catch(err => {
        return res.status(500).json({
          ok: false,
          message: "Server fail, try again.",
          data: err
        });
      });
  }
};
