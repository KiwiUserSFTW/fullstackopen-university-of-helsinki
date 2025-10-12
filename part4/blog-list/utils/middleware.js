const errorHandler = (error, request, response, next) => {
  switch (error.name) {
    case "ValidationError":
      return response.status(400).json({ error: error.message });
    default:
      response.status(500).json({ error: "Internal server error" });
  }
  next(error);
};

module.exports = {
  errorHandler,
};
