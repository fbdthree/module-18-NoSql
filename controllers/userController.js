const { User,Thought } = require('../models');

module.exports = {
  // Get all courses
  getUsers(req, res) {
    User.find()
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getUser(req, res) {
   User.findOne({ _id: req.params.id })
      .select('-__v')
      .then((userData) => {
         res.json(userData)
  })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)});
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((usedata) => res.json(usedata))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((userdata) =>
        res.json(userdata)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userdata) =>
         res.json(userdata)
      )
      .catch((err) => res.status(500).json(err));
  },
//add friend
 addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet:{friends:req.params.friendId} },
      {  new: true }
    )
      .then((userdata) =>{
        console.log(userdata)
         res.json(userdata)
  })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
  // remove friend
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull:{friends:req.params.friendId} },
      {  new: true }
    )
      .then((userdata) =>{
        console.log(userdata)
         res.json(userdata)
  })
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)
      })
  },
};
