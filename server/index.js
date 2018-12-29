const {Car} = require ('../database/index.js');
const express = require('express');
const app = express();

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

const port = 3000;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});