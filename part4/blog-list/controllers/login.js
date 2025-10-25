const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jws = require("jsonwebtoken");
const User = require("../models/user");

loginRouter.post("/", async (request, response, next) => {
  try {
    const { username, password } = request.body;
    const user = await User.findOne({ username });

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return response.status(401).json({
        error: "invalid username or password",
      });
    }

    const token = jws.sign(password, process.env.SECRET);
    response
      .status(201)
      .json({ token, username: user.username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
