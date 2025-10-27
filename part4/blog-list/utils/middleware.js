const jwt = require("jsonwebtoken");
const User = require("../models/user");

const errorHandler = (error, request, response, next) => {
  switch (error.name) {
    case "ValidationError":
      return response.status(400).json({ error: error.message });

    case "MongoServerError":
      if (error.message.includes("E11000 duplicate key error")) {
        return response
          .status(400)
          .json({ error: "expected `username` to be unique" });
      }
      return response.status(500).json({ error: "MongoDB server error" });

    default:
      response.status(500).json({ error: "Internal server error" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  if (!token) {
    return response.status(401).json({ error: "unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    const user = await User.findById(decodedToken.id);
    if (!user) {
      return response.status(400).json({ error: "user not exist" });
    }

    request.user = user;
    next();
  } catch {
    return response.status(401).json({ error: "token invalid" });
  }
};

module.exports = {
  errorHandler,
  tokenExtractor,
  userExtractor,
};
