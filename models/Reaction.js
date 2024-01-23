const { Schema, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

//Reaction Schema - Child (Subdocument)
const reactionSchema = new Schema({
  reactionID: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => {
      return new Date(createdAtVal).toLocaleString();
    },
  },
},
{
    toJSON: {
        getters: true
    },
    id: false
});

module.exports = reactionSchema;
