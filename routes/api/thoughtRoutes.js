const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
  updateThought
} = require('../../controllers/thoughtsController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updateThought)

router.route('/:thoughtId').post(addReaction);

router.route('/:thoughtId').delete(deleteThought)

router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

module.exports = router;
