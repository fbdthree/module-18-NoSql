const { Schema, model } = require('mongoose');
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+@.+\.com/
    },
    thoughts:[ {
      type: Schema.Types.ObjectId,
      ref:"thoughts"
    }],
    friends:[ {
      type: Schema.Types.ObjectId,
      ref:"users"
    },]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Users = model('users', userSchema);

module.exports = Users;
