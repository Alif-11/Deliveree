const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()
const { DB_URL, SERVER_APP, SERVER_PORT } = process.env
console.log(process.env)

app.use(cors())
app.use(express.json())

const PatronsModel = require('./models/patrons')

mongoose.connect("mongodb://localhost/deliveree").then(() => {
  console.log("mongoose connection");
})
const db = mongoose.connection



db.once('open', () => {
  console.log("database open");
})

db.on('error', (err) => {
  console.log('database error')
  console.log(err)
})


app.get('/', (req, res) => {
  console.log("SERVER hit the home page");
  res.send("CLIENT hit the home page");
})

app.post("/name", (req, res) => {
  console.log(req);
  console.log(req.body);
  res.json({ message: "name endpoint response" });
})

app.post("/signup", async (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.body.password);

  let data = [];
  await PatronsModel.find({ username: req.body.username }).then(bob => {
    //console.log(bob);
    data = bob;
  });
  console.log("data");
  console.log(data);
  if (data.length === 0) { // this is a new signup
    data = {
      username: req.body.username,
      password: req.body.password
    }
    await PatronsModel.create(data);
  } else {
    data = [];
  }

  console.log("Ooga");
  console.log(data);

  res.json({
    message: "signup endpoint accessed and response",
    data,
  });

})

app.get("/getErrand", (req, res) => {
  res.json({ errands: "No Errands!" });
})

app.post("/createErrand", (req, res) => {
  console.log(req);
  console.log(req.body);
  res.json({ success: true });
})

app.post("/login", async (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.body.password);

  let data = [];
  await PatronsModel.find({ username: req.body.username }).then(bob => {
    //console.log(bob);
    data = bob;
  });
  console.log("data");
  console.log(data);
  if (data.length !== 0) { // this is an old login
    data = {
      username: req.body.username,
      password: req.body.password
    }
    await PatronsModel.create(data);
  } else {
    data = [];
  }

  console.log("Ooga");
  console.log(data);

  res.json({
    message: "login endpoint accessed and response",
    data,
  });
})

app.use('/filteredPokemon', (req, res) => {
  const data = [
    {
      name: 'Charmander',
      type: 'fire'
    },
    {
      name: 'Squirtle',
      type: 'water',
    },
    {
      name: 'Bulbasaur',
      type: 'grass',
    }];

  console.log(req.query);

  const filteredData = data.filter((pokemon, index) => {

    if (pokemon.type === req.query.type) {
      return pokemon;
    }
  });


  res.json(filteredData);
})

app.get('/pokemon', (req, res) => {
  const data = [
    {
      name: 'Charmander',
      type: 'fire'
    },
    {
      name: 'Squirtle',
      type: 'water',
    },
    {
      name: 'Bulbasaur',
      type: 'grass',
    }];

  res.json(data);
})

app.listen(8080, () => {
  console.log("Testing, testing. Server on 8080 here.")
})

console.log("Testing, testing. Basic express app here.")