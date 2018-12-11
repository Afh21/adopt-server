const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    required: true,
    trim: true
  },
  identity: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  coords: {
    lat: {
      type: Schema.Types.Decimal128,
      required: true
    },
    lng: {
      type: Schema.Types.Decimal128,
      required: true
    }
  },
  address: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date
  },
  rol: {
    type: String,
    enum: ["administrator", "guest"],
    default: "guest"
  },
  avatar: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  updateAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
