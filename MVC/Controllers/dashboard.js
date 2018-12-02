const User = require("../Models/User");
const Animal = require("../Models/Animal");
const Adoption = require("../Models/Adoption");

module.exports = {
  getAllDataforDashboard: async (req, res) => {
    // ===========================================
    const animals = await Animal.find({});
    const animalsNoAdopted = animals.filter(currentValue => {
      return currentValue.status === "enabled";
    });
    const animalsPending = animals.filter(currentValue => {
      return currentValue.status === "pending";
    });
    const animalsAdopted = animals.filter(currentValue => {
      return currentValue.status === "adopted";
    });
    const dogs = animals.filter(currentValue => {
      return currentValue.animal === "dog";
    });
    const cats = animals.filter(currentValue => {
      return currentValue.animal === "cat";
    });

    // ===========================================
    const users = await User.find({});
    const userAdministrators = users.filter(currentValue => {
      return currentValue.rol === "administrator";
    });
    const userGuest = users.filter(currentValue => {
      return currentValue.rol === "guest";
    });

    // ===========================================
    const adoptionList = await Adoption.find({}).populate("animal");
    const adoption = await Adoption.find({});
    const adoptionPending = adoption.filter(currentValue => {
      return currentValue.confirmed === false;
    });
    const adoptionTrue = adoption.filter(currentValue => {
      return currentValue.confirmed === true;
    });

    return res.status(200).json({
      data: {
        dataForAnimals: {
          enabled: Number(animalsNoAdopted.length),
          pending: Number(animalsPending.length),
          adopted: Number(animalsAdopted.length),
          total:
            Number(animalsNoAdopted.length) +
            Number(animalsPending.length) +
            Number(animalsAdopted.length),
          type: {
            dogs: Number(dogs.length),
            cats: Number(cats.length)
          }
        },
        dataForUsers: {
          administrators: Number(userAdministrators.length),
          guests: Number(userGuest.length),
          total:
            Number(`${userGuest.length} `) +
            Number(`${userAdministrators.length}`)
        },
        dataForAdoptions: {
          true: adoptionTrue.length,
          false: adoptionPending.length,
          total:
            Number(`${adoptionTrue.length} `) +
            Number(`${adoptionPending.length}`),
          adoptions: adoptionList
        }
      }
    });
  }
};
