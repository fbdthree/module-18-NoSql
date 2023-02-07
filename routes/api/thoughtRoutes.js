const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addThought,
  removeThought,
} = require('../../controllers/thoughtsController');

// /api/students
router.route('/').get(getThought).post(createThought);

// /api/students/:studentId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/students/:studentId/assignments
router.route('/:thoughtId').post(addReaction);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
