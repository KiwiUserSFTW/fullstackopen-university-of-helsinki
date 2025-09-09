const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("add password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://danielkostenko0305_db_user:${password}@cluster0.bw3ehuu.mongodb.net/personsApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length >= 4) {
  if (process.argv.length !== 5) {
    console.log(`add number as argument`);
    mongoose.connection.close();
    process.exit(1);
  }
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number,
  });

  person
    .save()
    .then((result) => {
      console.log(`added ${name} number ${number} to phonebook`);
    })
    .finally(() => mongoose.connection.close());
} else {
  Person.find({})
    .then((result) => {
      console.log("phonebook:");
      result.forEach((person) => {
        console.log(person.name, person.number);
      });
    })
    .finally(() => mongoose.connection.close());
}
