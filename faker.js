const faker = require('faker');

const db = require('./database/index.js');

// Date.prototype.addDays = function(days) {
//   let date = new Date(this.valueOf());
//   date.setDate(date.getDate() + days);
//   return date;
// }

// const getDates = (startDate, stopDate) => {
//   let dateArray = new Array();
//   let currentDate = startDate;
//   while (currentDate <= stopDate) {
//       dateArray.push(new Date (currentDate));
//       currentDate = currentDate.addDays(1);
//   }
//   return dateArray;
// }

const loadNewCar = ((times = 101) => {
  for (let i = 1; i < times; i + 1) {
    const rangeTimes = faker.random.number({
      'min': 1,
      'max': 5,
    });
    let date = new Date();
    let date1 = faker.date.soon(30);
    const reservedDates = [];
    let range = [];
    for (let j = 0; j < rangeTimes; j + 1) {
      const dateStart = faker.date.between(date, date1);
      const dateEnd = faker.date.soon(30, dateStart);
      // let range = getDates(dateStart, dateEnd);
      range.push(dateStart);
      range.push(dateEnd);
      reservedDates.push(range);
      date = dateEnd;
      date1 = faker.date.soon(30, date);
      range = [];
    }
    const document = {
      id: i,
      location: { carLocation: faker.fake('{{address.city}}, {{address.state}}, {{address.zipCode}}'), airport: faker.hacker.abbreviation() },
      time: {
        open: faker.random.number({
          'min': 5,
          'max': 10,
        }),
        close: faker.random.number({
          'min': 19,
          'max': 24,
        }),
      },
      dates: reservedDates,
      price: faker.random.number({
        'min': 1,
        'max': 10,
      }),
      priceAir: faker.random.number({
        'min': 20,
        'max': 100,
      }),
    };
    db.addCar(document, (result) => {
      console.log(result);
    });
  }
})();

module.exports = {
  loadNewCar,
};
