const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  response.json(users);
});

const passwordCheck = (password) => {
  if (!password) return "password should be given";
  if (password.length < 3) return "password should be at least 3 symbols";
  return true;
};

usersRouter.post("/", async (request, response, next) => {
  try {
    const { username, name, password } = request.body;

    const passwordCorrect = passwordCheck(password);

    if (passwordCorrect !== true) {
      response.status(400).json({ error: passwordCorrect });
      return;
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      username,
      passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).send(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
