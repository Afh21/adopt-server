const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const db = require("./config/constants").mongoURI;
const passport = require("passport");

// Routes
const auth = require("./MVC/Routes/auth/auth");
// const type_animal = require("./MVC/Routes/master/type-animal");
const type_breed = require("./MVC/Routes/master/type-breed");
const type_rh = require("./MVC/Routes/master/type-rh");
const animal = require("./MVC/Routes/animal");
const user = require("./MVC/Routes/users");
const dashboard = require("./MVC/Routes/dashboard");
const adoption = require("./MVC/Routes/adoption");

// Middleware's
const app = express();

// Set folder public
app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "public"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connection MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Routes
app.use("/dashboard/all", dashboard);
app.use("/adoption/request", adoption);
app.use("/master/users", user);
app.use("/master/animal", animal);
app.use("/master/detail/rh", type_rh);
app.use("/master/detail/breed", type_breed);
// app.use("/master/detail/animal", type_animal);
app.use("/auth", auth); // Register & Login

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server run in port ${port}`));
