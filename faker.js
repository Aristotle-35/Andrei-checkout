const faker = require ('faker');

const db = require('./database/index.js');

const loadNewCar = ((times=100) => {

  for (var i = 0; i < times; i++) {
    let rangeTimes = faker.random.number({
        'min': 1,
        'max': 5
        });
      var date = new Date();
      var range = [];
    for (var j = 0; j < rangeTimes; j++) {
      var date0 = faker.date.soon(30);
      var date00 = faker.date.soon(90)
      var date1 = faker.date.between(date, date0);
      var date2 = faker.date.between(date1, date00);
      date = date2;
      range.push(date1);
      range.push(date2);
    }
    var document = {
      id: i,
      location: {carLocation: faker.fake("{{address.city}}, {{address.state}}, {{address.zipCode}}"), airport: faker.hacker.abbreviation()},
      time: { open: faker.random.number({
        'min': 5,
        'max': 10
        }),
        close: faker.random.number({
          'min': 19,
          'max': 24
        })
       },
      dates: range,
      price: faker.random.number({
        'min': 1,
        'max': 10
      })
    };
    db.addCar(document, result => {
       console.log(result);
    });
  }
})();

module.exports = {
  loadNewCar
}