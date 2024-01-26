const { User, Thought, Reaction } = require('../models');
const mongoose = require('mongoose');

const connection = require('../config/connection');

// Seed data
const users = [
    {
        username: 'Karina123',
        email: 'karinagarcia@email.com',
        thought: [],
    },{
        username: 'John345',
        email: 'johndoe@email.com',
        thought: [],
    },
    {
        username: 'Jane678',
        email: 'janedoe@email.com',
        thought:[],
    }
];

console.log(connection);

connection.once("open", async() => {
    console.log('connected sucessfully');

    await User.deleteMany({});

    await User.collection.insetMany(users);

    console.table(users);
    console.info('Seeding complete!');
    process.exit(0);
});