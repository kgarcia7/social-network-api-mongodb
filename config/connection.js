const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://socialnetworkdb:socialnetworkapi@cluster0.wv3y6nm.mongodb.net/');

module.exports = mongoose.connection;