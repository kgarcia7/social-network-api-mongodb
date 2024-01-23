const { Schema, model } = require("mongoose");
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

//Thought Schema - Parent Document
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => {
      return new Date(createdAtVal).toLocaleString();
    },
  },
  username: {
    type: String,
    require: true,
  },
  reactions: [reactionSchema], // Array of nested documents using the reactionSchema
},
{
  toJSON: {
    getters: true
  },
  id: false
});

// Create a virtual called reactionCount
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// Initialize our Thought model
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;
