const {Car} = require ('../database/index.js');
const express = require('express');
const app = express();
// to load 1 faker document to db:
const db = require('../database/index.js');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(express.static('public'));

app.get('/api/turash/checkouts/:id', jsonParser, (req, res) => {
  let item = req.params.id;
  console.log(item);
  Car.find({id: item}).exec((err, doc) => {
    if (err) {
      console.log('Failed getting item from db: ', err)
    } else {
      console.log('Item from db: ', doc)
    }
  })
  .then(result => {
    res.status(200).send(result)
  })
});

app.post('/api/turash/checkouts/:id', jsonParser, (req, res) => {
  let item = req.params.id;
  console.log(item);
  console.log(req.body);
  Car.updateOne({id: item}, {$push: {dates: req.body}}, (err, rawResponse) => {
    if (err) {
      console.log('Failed posting new range to db: ', err)
    } else {
      console.log('rawResponse from db: ', rawResponse)
    }
  })
  .then(result => {
    res.status(201).send(result)
  })
})

// router for posting one fake document (instead not working fake.js):
app.post('/api/checkouts/1', jsonParser, (req, res) => {
  let document = req.body;
  // console.log(item);
  console.log(req.body);
  db.addCar(document, (result) => {
    console.log(result);
  });
})

const port = 3002;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});