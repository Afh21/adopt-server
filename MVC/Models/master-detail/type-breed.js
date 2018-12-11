const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const type_breeds_Schema = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  }
});

module.exports = TypeBreeds = mongoose.model("type-breeds", type_breeds_Schema);
