// express
const express = require("express");

// mongodb
const Person = require("./models/person");

// middlewares
const morgan = require("morgan");

// error handler
const errorHandlers = {
  CastError: (error, response) =>
    response.status(400).json({ error: "malformated id" }),
  ValidationError: (error, response) =>
    response.status(400).json({ error: error.message }),
};

const errorHandler = (error, request, response, next) => {
  console.error(error);
  const handler = errorHandlers[error.name];
  if (handler) {
    return handler(error, response);
  }

  next(error);
};

morgan.token("postbody", (request, response) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  } else {
    return " ";
  }
});

// app
const app = express();
app.use(express.json());
app.use(express.static("dist"));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :postbody"
  )
);

app.get("/", (request, response) => {
  response.send("<h1> Persons page </h1>");
});

// get info page
app.get("/info", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      const personsLength = persons.length;
      const date = new Date();
      const body = `
    <div>
    <h3> Phonebook has info for ${personsLength} people</h3>
    <h3> ${date} </h3>
    </div>
    `;
      response.send(body);
    })
    .catch((error) => next(error));
});

// get all persons
app.get("/api/persons", (request, response, next) => {
  Person.find({})
    .then((persons) => {
      response.json(persons);
    })
    .catch((error) => {
      next(error);
    });
});

// get one person
app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (!person) {
        response.status(404).end();
      } else {
        response.json(person);
      }
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

// add new person
app.post("/api/persons/", (request, response, next) => {
  const body = request.body;

  if (!body.name || !body.number) {
    const error = new Error("missing name or number");
    error.name = "ValidationError";
    return next(error);
  }

  Person.find({ name: request.body.name })
    .then((existingPersons) => {
      console.log(existingPersons);
      if (existingPersons.length >= 1) {
        return response.status(400).json({
          error: "name must be unique",
        });
      }

      const person = new Person({
        name: body.name,
        number: body.number,
      });

      person
        .save()
        .then((person) => {
          response.json(person);
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => next(error));
});

// delete one person
app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

// update person
app.put("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndUpdate(
    request.params.id,
    { number: request.body.number },
    { new: true, runValidators: true }
  )
    .then((updatedPerson) => {
      !updatedPerson ? response.status.end(404) : response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
