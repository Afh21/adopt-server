var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TypeRhSchema = new Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  }
});

module.exports = Rh = mongoose.model("type-rhs", TypeRhSchema);
