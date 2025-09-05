// express
const express = require("express");

// app
const app = express();
app.use(express.json());

const persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1> Persons page </h1>");
});

// get info page
app.get("/info", (request, response) => {
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

// get all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// get one person
app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.statusMessage = "This person doesn't exist";
    response.status(404).end();
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on ${PORT} port`);
});
