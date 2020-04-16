const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.get("/", (req, res) => {
  res.send("<h1> Hello </h1>");
});

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return res.status(422).json({
      error: "please add all the fields."
    });
  }
  User.findOne({ email: email })
    .then(saveUser => {
      if (saveUser)
        return res.status(422).json({
          error: "Email already registered."
        });

      bcrypt
        .hash(password, 12)
        .then(hashPassword => {
          const user = new User({
            email,
            password: hashPassword,
            name
          });
          user
            .save()
            .then(user => res.json({ message: "user saved successfully" }))
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).json({
      error: "please add all the fields."
    });

  User.findOne({ email: email })
    .then(savedUser => {
      if (!savedUser)
        return res.status(422).json({
          error: "Invalid Email or Password."
        });

      bcrypt
        .compare(password, savedUser.password)
        .then(doMatch => {
          if (doMatch) {
            const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);

            res.json({
              message: "Successfully signed in!!!",
              token
            });
          } else {
            return res
              .status(422)
              .json({ error: "Invalid Email or Password." });
          }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

module.exports = router;
