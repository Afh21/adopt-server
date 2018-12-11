const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const typeRh = require("./master-detail/type-rh");
const typeBreed = require("./master-detail/type-breed");

var animalSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, // Max
  animal: {
    type: String,
    enum: ["dog", "cat"],
    required: true
  }, // Perro
  rh: {
    type: Schema.Types.ObjectId,
    ref: "type-rhs",
    required: true
  }, // DEA1.0
  breed: {
    type: Schema.Types.ObjectId,
    ref: "type-breeds",
    required: true
  }, // Pincher
  genre: {
    type: String,
    required: true,
    enum: ["female", "male"]
  }, // male
  image: {
    type: String
  },
  color: {
    type: String,
    trim: true
  }, // Gris
  height: {
    type: String,
    required: true,
    trim: true
  }, // 20
  typeHeight: {
    type: String,
    default: "cm"
  }, // cm
  weight: {
    type: String,
    required: true,
    trim: true
  }, // 2
  typeWeight: {
    type: String,
    default: "kg"
  }, // kg
  born: {
    type: Date
  }, // 01-06-2018
  age: {
    type: Number
  }, // 6 months
  state: {
    type: String,
    enum: ["healthy", "sick"],
    required: true
  }, // Enfermo, Saludable
  status: {
    type: String,
    enum: ["enabled", "pending", "adopted"],
    default: "enabled"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = Animal = mongoose.model("animals", animalSchema);
