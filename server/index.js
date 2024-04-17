require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");
const path = require('path');

// Serve the build files from a sibling folder
const buildDir = path.join(__dirname, '..', 'client', 'build');
app.use(express.static(buildDir));
app.use(express.json());

// Middleware
morgan.token("reqBody", (request, response) => {
  return `{"name":"${request.body.name}", "number":"${request.body.number}"}`;
});
morgan.format(
  "tinyExt",
  ":method :url :status :res[content-length] - :response-time ms :reqBody"
);
app.use(morgan("tinyExt"));
app.use(cors());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

// Get home page
app.get("/", (request, response) => {
  response.sendFile(path.join(buildDir, 'index.html'));
});

// Get all items
app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

// Get database info
app.get("/info", (request, response) => {
  Person.count({}).then((count) => {
    let length = count;
    let currentDate = new Date();
    response.send(
      `<p>Phonebook has info for ${length} people</p><br>${currentDate}`
    );
  });
});

// Get a particular item by id
app.get("/api/persons/:id", (request, response, next) => {
  //const id = +request.params.id;
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
      /* console.log(error);
      response.status(400).send({ error: "malformatted id" });
     */
    });

  /* const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  } */
});

// Delete a particula item by id
app.delete("/api/persons/:id", (request, response, next) => {
  //const id = +request.params.id;
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
  /* persons = persons.filter((person) => person.id !== id);
  response.status(204).end(); */
});

// Update an item
app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(request.params.id, person, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// Create a new item
app.post("/api/persons", (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing, please ensure to add name and number",
    });
  } else if (persons.some((person) => person.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: genrateId(),
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));

  /* persons = persons.concat(person);
  response.json(person); */
});

// Random id generator
const genrateId = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
