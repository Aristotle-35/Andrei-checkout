const mongoose = require('mongoose');
//Set up default mongoose connection
mongoose.connect('mongodb://localhost/fetcher');

// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected!')
});


const carSchema = new mongoose.Schema({
  id: {type: Number, unique: true},
  location: {carLocation: String, airport: String},
  time: { open: Number, close: Number },
  dates: [[Date]],
  price: { type: Number, min: 1, max: 10 },
  priceAir: { type: Number, min: 20, max: 100 },
});

const Car = mongoose.model('Checkout', carSchema); //'Checkout' transformes into 'checkouts' as a collection name.

const addCar = (document, callback) => {
  let vehicle = new Car (document);
  vehicle.save((err, result) => {
    if (err) {
      console.log('Failed writing item in db: ', err);
    } else {
      callback(result);
    }
  })
}

module.exports = {
  addCar: addCar,
  Car: Car
}
