const mongoose = require("mongoose");

module.exports = (DB_URI) =>
  // connection to mongo db
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Error while Connecting to MongoDB", error);
    });
