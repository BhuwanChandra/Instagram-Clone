const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");
const { JWT_SECRET, MAIL_PASS, HOST } = require("../config/keys");
const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  host: "smtp.zoho.in",
  port: 465,
  secure: true,
  auth: {
    user: "bbs7779@bhuwan.codes",
    pass: MAIL_PASS
  }
});

const sendWelcomeMail = (user) => {
    let mailTemplate = `
    <br/>
    <h2>Successfully created account on Instabbs.</h2><br/>
    <h1>Welcome to Instagram!!</h1><br/>
    `;

    // setup email data with unicode symbols
    let mailOptions = {
      from: "bbs7779@bhuwan.codes",
      to: `${user.email}`,
      // ze3zt.bbs@inbox.testmail.app`,
      subject: "Welcome to Instagram!",
      html: mailTemplate
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
};

const sendResetMail = (user, token) => {
    let mailTemplate = `
    <p>
    <h1>You requested to reset your password!</h1>
    <h3>click on this <a href="${HOST}reset/${token}">link</a> to reset your password!</h3>
    <h3>This link is only valid for one hour.</h3>
    <h4>If you did not requested for reset password, you can ignore this email.</h4>
    </p>
    `;

    // setup email data with unicode symbols
    let mailOptions = {
      from: "bbs7779@bhuwan.codes",
      to: `${user.email}`,
      // ze3zt.bbs@inbox.testmail.app`,
      subject: "Password Reset",
      html: mailTemplate
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });
};


router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;
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
            name,
            pic
          });
          user
            .save()
            .then(user => {
              sendWelcomeMail(user);
              res.json({ message: "user saved successfully" });
            })
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
            const { _id, name, email, pic, followers, following } = savedUser;
            res.json({
              message: "Successfully signed in!!!",
              token,
              user: {_id, name, email, pic, followers, following}
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

router.post('/reset-password', (req, res) => {
  crypto.randomBytes(32, (err, buffer) => {
    if(err){
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({email: req.body.email})
    .then(user => {
      if(!user){
        return res.status(422).json({error: "user doesn't exists with this email!"})
      }
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000;
      user.save().then(result => {
        sendResetMail(result, token);
        res.json({message: "check your email to reset your password!"});
      })
    })
  })
})

router.post('/new-password', (req, res) => {
  const newPassword = req.body.password;
  const token = req.body.token;
  User.findOne({resetToken: token, expireToken: {$gt: Date.now()}})
  .then(user => {
    if(!user){
      return res.status(422).json({error: 'Try again, session expired!'})
    }
    bcrypt.hash(newPassword, 12).then(hashPassword => {
      user.password = hashPassword;
      user.resetToken = undefined;
      user.expireToken = undefined;
      user.save().then(result => {
        res.json({message: "password updated successfully!"})
      });
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({error: "Try again, session expired!"})
  })
})

module.exports = router;
