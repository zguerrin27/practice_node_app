const mongoose = require('mongoose');

const URI = "mongodb+srv://105ec333:105ec333@cluster0.vnsdi.mongodb.net/node_practice?retryWrites=true&w=majority"

const connectDB = async () => {
  await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to DB")
}

module.exports = connectDB;