const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const animal = require("./Animal");
const user = require("./User");

var adoptionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  animal: {
    type: Schema.Types.ObjectId,
    ref: "animals"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Adoption = mongoose.model("adoptions", adoptionSchema);
