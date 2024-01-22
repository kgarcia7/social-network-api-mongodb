const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

//functions needed: getUser, getSingleUser, createNewUser, updateUser, deleteUser

module.exports = {
  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userID })

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create New User
  async createNewUser(req, res) {
    try {
      const users = await User.create(req.body);
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // update a User
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.userID }, req.body, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id! '});
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a User
  async deleteUser(req, res) {
    try { 
      const user = await User.findOneAndDelete({ _id: req.params.userID });

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id! '});
      }

      res.json({ message: 'User successfully deleted! '});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // add a Friend
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate({ _id: req.params.friendID }, { $addToSet: { friends: req.params.friendID } }, { new: true});

      if (!user) {
        return res.status(404),json({ message: 'No user with this id! '});
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);    
    }
  },
  //remove a Friend 
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId}, { $pull: { friends: req.params.friendID }});

      if (!user) {
        return res.status(404).json({ message: 'No user found with this id!'});
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
