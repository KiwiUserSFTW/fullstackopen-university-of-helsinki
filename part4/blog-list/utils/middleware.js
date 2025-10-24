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

module.exports = {
  errorHandler,
};
