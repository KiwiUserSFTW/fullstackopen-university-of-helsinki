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
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: (number) => /^\d{2,3}-\d+$/.test(number),
      message: (props) =>
        `${props.number} isn't right number format use XX-XXXXXXX or XXX-XXXXXXXX`,
    },
  },
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
