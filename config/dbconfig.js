const mongoose = require('mongoose');

const connect = mongoose.connect(process.env.MONGODB_URL);

const connection = mongoose.connection;

connection.on("connected", () => { console.log("Mongodb is connected") });

connection.on("error", (error) => { console.log("Error in Mongodb connection", error) });

module.exports = mongoose;