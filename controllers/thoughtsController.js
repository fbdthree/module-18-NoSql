
const {User, Thought } = require('../models');

module.exports = {
  // Get all thoughtsData
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughtsData) => {
        const studentObj = {
          thoughtsData,
         
        };
        return res.json(studentObj);
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Get a single thoughtData
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .lean()
      .then(async (thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thoughtData with that ID' })
          : res.json(
              thoughtData
             
            )
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thoughtData
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => {
        console.log(thoughtData)
        res.json(thoughtData)})
      .catch((err) => {
        console.log(err)
        res.status(500).json(err)});
  },
  // Delete a thoughtData and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) =>
       
          res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add an assignment to a thoughtData
  addReaction(req, res) {
    console.log('You are adding an assignment');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res
              .status(404)
              .json({ message: 'No thoughtData found with that ID :(' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove assignment from a thoughtData
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res
              .status(404)
              .json({ message: 'No thoughtData found with that ID :(' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((userdata) =>
         res.json(userdata)
      )
      .catch((err) => res.status(500).json(err));
  },
};
