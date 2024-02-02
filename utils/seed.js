const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");

const connection = require("../config/connection");

// Seed data
const users = [
  {
    username: "Karina123",
    email: "karinagarcia@email.com",
  },
  {
    username: "John345",
    email: "johndoe@email.com",
  },
  {
    username: "Jane678",
    email: "janedoe@email.com",
  },
];


console.log(connection);

connection.once("open", async () => {
  console.log("Connected successfully!");

  // Clear existing data
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Insert users
  await User.collection.insertMany(users);


  console.table(users);
  console.info("Seeding complete!");
  process.exit(0);
});
