// db
const mongoose = require("mongoose");

// additional
require("dotenv").config();

const url = process.env.MONGODB_URL;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    console.log(document);
  },
});

module.exports = mongoose.model("Person", personSchema);
