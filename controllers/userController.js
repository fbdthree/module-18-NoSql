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
      .then((userdata) =>
         res.json(userData)
      )
      .catch((err) => res.status(500).json(err));
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
      .then(() => res.json({ message: 'Course and students deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
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
};
