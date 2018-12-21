const {Car} = require ('../database/index.js');
const express = require('express');
let app = express();

const loadNewCar = require('../faker.js');

var bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use(express.static(__dirname + '/../client/dist'));

app.post('/cars', jsonParser, (req, res) => {
  // console.log(req);
  loadNewCar();
});

let port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});