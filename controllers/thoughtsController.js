// ObjectId() method for converting studentId string into an ObjectId for querying database
const { ObjectId } = require('mongoose').Types;
const {User, Thought } = require('../models');





module.exports = {
  // Get all thoughtsData
  getThoughts(req, res) {
    Thought.find()
      .then(async (thoughtsData) => {
        const studentObj = {
          thoughtsData,
          headCount: await headCount(),
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
          : res.json({
              thoughtData,
              grade: await grade(req.params.studentId),
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thoughtData
  createThought(req, res) {
    Thought.create(req.body)
      .then((thoughtData) => res.json(thoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thoughtData and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.studentId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No such thoughtData exists' })
          : Course.findOneAndUpdate(
              { thoughtsData: req.params.studentId },
              { $pull: { thoughtsData: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((course) =>
        !course
          ? res.status(404).json({
              message: 'Thought deleted, but no courses found',
            })
          : res.json({ message: 'Thought successfully deleted' })
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
      { $addToSet: { assignments: req.body } },
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
      { _id: req.params.studentId },
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
};
