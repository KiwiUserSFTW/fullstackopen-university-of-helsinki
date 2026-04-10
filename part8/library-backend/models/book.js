const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String }],
});

schema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    ret.author = ret.author.toString();
    delete ret._id;
    return ret;
  },
});

module.exports = mongoose.model("Book", schema);
