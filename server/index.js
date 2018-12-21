const {Car} = require ('../database/index.js');
const express = require('express');
let app = express();

const loadNewCar = require('../faker.js');

var bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(express.static('public'));

app.get('/checkout/:id', jsonParser, (req, res) => {
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

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});