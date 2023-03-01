const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const getTimeStamp = require('../utils/getTimeStamp');


// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timeStamp => getTimeStamp(timeStamp)
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [
      reactionSchema
    ]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thoughts = model('thoughts', thoughtSchema);

module.exports = Thoughts;
