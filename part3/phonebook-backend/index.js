// express
const express = require("express");

// middlewares
const morgan = require("morgan");

// mongodb
const Person = require("./models/person");

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
app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    const personsLength = persons.length;
    const date = new Date();
    const body = `
    <div>
    <h3> Phonebook has info for ${personsLength} people</h3>
    <h3> ${date} </h3>
    </div>
    `;
    response.send(body);
  });
});

// get all persons
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// get one person
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Person.findById(id)
    .then((person) => {
      response.json(person);
    })
    .catch((error) => {
      response.status(404).json({
        error: "person doesn't exist",
      });
    });
});

// delete one person
app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

// add new person
app.post("/api/persons/", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "missing name or number",
    });
  }

  Person.find({ name: request.body.name }).then((existingPersons) => {
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

    person.save().then((person) => {
      response.json(person);
    });
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
