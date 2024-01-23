const { Thought, User } = require("../models");
//functions needed: getThoughts, getSingleThought, createNewThought, updateThought, removeThought

const thoughtController = {
  //get all thoughts
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find();

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtID });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      //pushing the created thought's _id to the associated user's thoughts array field
      const user = await User.findOneAndUpdate(
        { _id: req.body.userID },
        { $push: {
          thoughts: thought._id
        }},
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({
            message: "Thought created but no user associated with this ID",
          });
      }

      res.json({ message: "Thought successfully created!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  //update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtID },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a Thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtID,
      });

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add reaction to thought
  async addReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtID },
        {
          $addToSet: {
            reactions: req.body,
          },
        },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // remove reaction from thought
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtID },
        {
          $pull: {
            reactions: {
              reactionID: req.params.reactionID,
            },
          },
        },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
