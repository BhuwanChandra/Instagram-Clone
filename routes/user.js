const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const User = mongoose.model("User");
const Post = mongoose.model("Post");

router.get("/user/:id", requireLogin, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then(user => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.status(200).json({ user, posts });
        });
    })
    .catch(err => {
      return res.status(404).json({ error: "User Not Found" });
    });
});

router.put("/follow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id }
    },
    {
      new: true
    },
    (err, user) => {
      if (err) return res.status(422).json({ error: err });
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId }
        },
        {
          new: true
        }
      )
        .select("-password")
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => res.status(422).json({ error: err }));
    }
  );
});

router.put("/unfollow", requireLogin, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id }
    },
    {
      new: true
    },
    (err, user) => {
      if (err) return res.status(422).json({ error: err });
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.followId }
        },
        {
          new: true
        }
      )
        .select("-password")
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => res.status(422).json({ error: err }));
    }
  );
});

router.post("/editprofile", requireLogin, (req, res) => {
  let { _id, name, email, pic } = req.body;
  if(!pic) pic = 'https://res.cloudinary.com/bbs779/image/upload/v1587651949/img_cwclog.png';
  if (!email || !name ) {
    return res.status(422).json({
      error: "please add all required fields."
    });
  }
  if(_id !== req.user._id.toString())
    return res.status(400).json({error: "You do no have access to this resource!!"});
  User.findByIdAndUpdate(_id, {name, email, pic}, {new : true})
  .select("-password")
  .then(result => {
      res.status(200).json(result);
  }).catch(err => res.status(422).json({error: err}));
});

module.exports = router;
