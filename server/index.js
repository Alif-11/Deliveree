const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()
const { DB_URL, SERVER_APP, SERVER_PORT } = process.env
console.log(process.env)

let corsOptions = {
   origin : ['https://deliveree-frontend.vercel.app', 'http://localhost:5173'],
}

app.use(cors())
app.use(express.json())

const PatronsModel = require('./models/patrons')
const ErrandsModel = require('./models/errands')
const RunnersModel = require('./models/runners')

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


// this currently only works with patrons
app.post("/signup", async (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.body.password);
  console.log("parent", req.body.parent);

  let data = [];
  if (req.body.parent == "patron") {
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
      const patronSchemaObject = new PatronsModel(data);
      patronSchemaObject.save();
    } else {
      data = [];
      console.log("This user already exists.")
    }
  } else if (req.body.parent == "runner") {
    await RunnersModel.find({ username: req.body.username }).then(bob => {
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
      let runnerSchemaObject = new RunnersModel(data);
      runnerSchemaObject.save();
    } else {
      data = [];
      console.log("This user already exists.")
    }

  }

  console.log("Ooga");
  console.log(data);

  res.json({
    message: "signup endpoint accessed and response",
    data,
  });

})

app.get("/getErrand", async (req, res) => {
  let errands_list = []
  await ErrandsModel.find({}).then(errands => {

    if (errands.length > 0) {
      console.log("errands from the model", errands[0].item_description);
    } else {
      console.log("errands from the model (errands has length 0)", errands)
    }


    for (let i = 0; i < errands.length; i++) {
      errands_list.push({
        item_name: errands[i].item_name,
        item_description: errands[i].item_description,
        pickup_location: errands[i].pickup_location,
        dropoff_location: errands[i].dropoff_location
      })
    }
  })
  console.log("get errands", errands_list)
  res.json({ success: true, list: errands_list })
})

app.post("/createErrand", async (req, res) => {
  console.log(req);
  console.log(req.body);
  newErrand = {
    item_name: req.body.item_name,
    item_description: req.body.item_description,
    pickup_location: req.body.pickup_location,
    dropoff_location: req.body.dropoff_location
  };
  console.log("Alternate Errand Creation Scheme");
  errandSchemaObject = new ErrandsModel(newErrand);
  errandSchemaObject.save();
  let creatingPatron = [];
  await PatronsModel.find({ username: req.body.username }).then(returnedData => {
    creatingPatron = returnedData[0];
  })

  console.log("Patron!")
  console.log(creatingPatron);



  const errandsOfThePatron = creatingPatron.errandsCreated;
  errandsOfThePatron.push(errandSchemaObject);

  let checkIssue = [];


  let patronErrandUpdate = []
  await PatronsModel.findOneAndUpdate({ username: req.body.username }, { errandsCreated: errandsOfThePatron }).then(returnedData => {
    patronErrandUpdate = returnedData;
  })

  //console.log("Check for the update");
  //console.log(patronErrandUpdate);


  //console.log("final check")
  let patronus = [];
  await PatronsModel.find({ username: req.body.username }).then(returnedData => {
    patronus = returnedData;
  })

  let errandor = [];
  await ErrandsModel.findById(patronus[0].errandsCreated[0]).then(returnedErrand => {
    errandor = returnedErrand;
  })

  //console.log("Check patrons")
  //console.log(patronus[0].errandsCreated);

  console.log("Check errand")
  console.log(errandor);
  res.json({
    success: true
  })
})


// this currently only works with patrons
app.post("/login", async (req, res) => {
  console.log(req);
  console.log(req.body);
  console.log(req.body.password);
  console.log("parent", req.body.parent);

  let data = [];
  if (req.body.parent == "patron") {
    await PatronsModel.find({ username: req.body.username }).then(bob => {
      //console.log(bob);
      data = bob;
    });
    console.log("data");
    console.log(data);
    if (data.length !== 0) { // this is an old login
      console.log("OLD LOGIN")
      data = {
        username: req.body.username,
        password: req.body.password
      }
    } else {
      data = [];
    }
  } else if (req.body.parent == "runner") {
    await RunnersModel.find({ username: req.body.username }).then(bob => {
      //console.log(bob);
      data = bob;
    });
    console.log("data");
    console.log(data);
    if (data.length !== 0) { // this is an old login
      console.log("OLD LOGIN")
      data = {
        username: req.body.username,
        password: req.body.password
      }
    } else {
      data = [];
    }
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
