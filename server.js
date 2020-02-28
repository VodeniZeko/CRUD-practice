const express = require("express");
const bodyParser = require("body-parser");
const CORS = require("cors");
const port = 5000;

const app = express();

const token =
  "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98";

app.use(bodyParser.json());
app.use(CORS());

let animals = [
  {
    name: "Lion",
    sound: "RAWRRRRRRR!",
    classification: {
      species: "Panthera leo"
    },
    id: 1
  },
  {
    name: "Hippo",
    sound: "BLUB BLUB BLUB!",
    classification: {
      species: "Hippopotamus amphibius"
    },
    id: 2
  },
  {
    name: "Plains Zebra",
    sound: "NEIGHHHHHH!",
    classification: {
      species: "Equus quagga"
    },
    id: 3
  },
  {
    name: "Capuchin Monkey",
    sound: "EE EE EE EE!",
    classification: {
      species: "Cebinae"
    },
    id: 4
  },
  {
    name: "African Elephant",
    sound: "OOOOOOOOOO!",
    classification: {
      species: "Loxodonta"
    },
    id: 5
  },
  {
    name: "Black Rhino",
    sound: "HRRRRRRRR!",
    classification: {
      species: "Diceros bicornis"
    },
    id: 6
  },
  {
    name: "Mountain Gorilla",
    sound: "OO EE OO EE!",
    classification: {
      species: "Gorilla beringei beringei"
    },
    id: 7
  },
  {
    name: "Lemur",
    sound: "IIIIIIIIII!",
    classification: {
      species: "Lemuroidea"
    },
    id: 8
  },
  {
    name: "Giant Panda",
    sound: "NOM NOM NOM!",
    classification: {
      species: "Ailuropoda melanoleuca"
    },
    id: 9
  },
  {
    name: "Penguin",
    sound: "GAK GAK GAK!",
    classification: {
      species: "Spheniscidae"
    },
    id: 10
  },
  {
    name: "Cheetah",
    sound: "PURRRRRRRR!",
    classification: {
      species: "Acinonyx jubatus"
    },
    id: 11
  }
];

let nextId = 12;

function authenticator(req, res, next) {
  const { authorization } = req.headers;
  if (authorization === token) {
    next();
  } else {
    res.status(403).json({ error: "User must be logged in to do that." });
  }
}

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "test" && password === "test") {
    req.loggedIn = true;
    setTimeout(() => {
      res.status(200).json({
        payload: token
      });
    }, 1000);
  } else {
    res
      .status(403)
      .json({ error: "Username or Password incorrect. Please see README" });
  }
});

app.get("/api/animals", authenticator, (req, res) => {
  res.send(animals);
});

app.post("/api/animals", authenticator, (req, res) => {
  if (req.body.name !== undefined && req.body.classification !== undefined) {
    const newAnimal = req.body;
    newAnimal.id = nextId;
    animals.push(newAnimal);
  }
  nextId = nextId + 1;
  res.status(201).json(animals);
});

app.put("/api/animals/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res
      .status(400)
      .send("Your request is missing the animal id! Please try again.");
  if (req.body.id === undefined || !req.body.name || !req.body.classification) {
    res
      .status(422)
      .send("Make sure your request body has all the fields it needs!");
  }
  animals = animals.map(animal => {
    if (`${animal.id}` === req.params.id) {
      return req.body;
    }
    return animal;
  });
  res.status(200).send(req.body);
});

app.delete("/api/animals/:id", authenticator, (req, res) => {
  if (!req.params.id)
    res
      .status(400)
      .send("Your request is missing the animal id! Please try again.");
  animals = animals.filter(animal => `${animal.id}` !== req.params.id);
  res.status(202).send(req.params.id);
});

app.get("/", function(req, res) {
  res.send(`The App is up and ready for safari 🦁 🐵`);
});

app.listen(port, () => {
  console.log(
    `The server is listening on port ${port} and is ready for safari 🦁 🐵`
  );
});
