const faker = require ('faker');

const db = require('./database/index.js');

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const getDates = (startDate, stopDate) => {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
      dateArray.push(new Date (currentDate));
      currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

const loadNewCar = ((times=100) => {

  for (var i = 0; i < times; i++) {
    let rangeTimes = faker.random.number({
        'min': 1,
        'max': 5
        });
      var date = new Date();
      var date1 = faker.date.soon(30);
      var reservedDates = [];
    for (var j = 0; j < rangeTimes; j++) {
      var dateStart = faker.date.between(date, date1);
      var dateEnd = faker.date.soon(30, dateStart);
      var range = getDates(dateStart, dateEnd);
      reservedDates.push(range);
      date = dateEnd;
      date1 = faker.date.soon(30, date);
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
      dates: reservedDates,
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